/**
 * --------------------------------------------------------------------
 * docmd : the minimalist, zero-config documentation generator.
 *
 * @package     @docmd/core (and ecosystem)
 * @website     https://docmd.io
 * @repository  https://github.com/docmd-io/docmd
 * @license     MIT
 * @copyright   Copyright (c) 2025 docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */

const http = require('http');
const WebSocket = require('ws');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('../utils/fs-utils');
const chalk = require('chalk');
const os = require('os');
const readline = require('readline');
const { buildSite } = require('./build');
const { loadConfig } = require('../utils/config-loader');

// Helper Utilities

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'application/font-woff',
  '.woff2': 'font/woff2',
  '.ttf': 'application/font-ttf',
  '.txt': 'text/plain',
};

function formatPathForDisplay(absolutePath, cwd) {
  const relativePath = path.relative(cwd, absolutePath);
  if (!relativePath.startsWith('..') && !path.isAbsolute(relativePath)) {
    return `./${relativePath}`;
  }
  return relativePath;
}

function getNetworkIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

// Static Server Logic

async function serveStatic(req, res, rootDir) {
  // Serve dev-only API script
  if (req.url === '/__dev/docmd-api.js') {
    try {
      const apiScriptPath = require.resolve('@svallory/docmd-ui/assets/js/docmd-api.js');
      const apiScript = await fs.readFile(apiScriptPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(apiScript);
    } catch (err) {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  let safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '').split('?')[0].split('#')[0];
  if (safePath === '/' || safePath === '\\') safePath = 'index.html';

  let filePath = path.join(rootDir, safePath);

  try {
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (e) {
      if (path.extname(filePath) === '') {
        filePath += '.html';
        stats = await fs.stat(filePath);
      } else {
        throw e;
      }
    }

    if (stats.isDirectory()) {
      if (!req.url.split('?')[0].endsWith('/')) {
        res.writeHead(301, { 'Location': req.url + '/' });
        res.end();
        return;
      }

      filePath = path.join(filePath, 'index.html');
      await fs.stat(filePath);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = await fs.readFile(filePath);

    res.writeHead(200, { 'Content-Type': contentType });

    if (contentType === 'text/html') {
      const htmlStr = content.toString('utf-8');
      const liveReloadScript = `<script src="/__dev/docmd-api.js"></script></body>`;
      res.end(htmlStr.replace('</body>', liveReloadScript));
    } else {
      res.end(content);
    }

  } catch (err) {
    if (err.code === 'ENOENT') {
      // console.log(chalk.yellow(`⚠️  404 Not Found: ${req.url}`)); // Optional: Keep log quiet for 404s to avoid noise
      // 1. Try to serve the generated custom 404 page
      const custom404Path = path.join(rootDir, '404.html');
      try {
        const content = await fs.readFile(custom404Path);
        res.writeHead(404, { 'Content-Type': 'text/html' });

        // Inject Live Reload into 404 page too so development continues smoothly
        const htmlStr = content.toString('utf-8');
        const liveReloadScript = `<script src="/__dev/docmd-api.js"></script></body>`;
        res.end(htmlStr.replace('</body>', liveReloadScript));
      } catch (e2) {
        // 2. Fallback if 404.html doesn't exist (e.g. build failed)
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <div style="font-family:system-ui;text-align:center;padding:50px;">
            <h1>404 Not Found</h1>
            <p>The requested URL <code>${req.url}</code> was not found.</p>
            <p style="color:#666;font-size:0.9em;">(docmd dev server)</p>
          </div>
        `);
      }
    } else {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
    }
  }
}

// Main Dev Function
async function startDevServer(configPathOption, opts = {}) {
  // Bulletproof defaults
  const options = {
    preserve: opts.preserve || false,
    port: opts.port || undefined,
    zeroConfig: opts.zeroConfig || false
  };

  let config = await loadConfig(configPathOption, { zeroConfig: options.zeroConfig });
  const CWD = process.cwd();

  // Config Fallback Logic
  let actualConfigPath = path.resolve(CWD, configPathOption);
  if (configPathOption === 'docmd.config.js' && !await fs.pathExists(actualConfigPath)) {
    const legacyPath = path.resolve(CWD, 'config.js');
    if (await fs.pathExists(legacyPath)) actualConfigPath = legacyPath;
  }

  const resolveConfigPaths = (currentConfig) => ({
    outputDir: path.resolve(CWD, currentConfig.out),
    srcDirToWatch: path.resolve(CWD, currentConfig.src),
    configFileToWatch: actualConfigPath,
    userAssetsDir: path.resolve(CWD, 'assets'),
  });

  let paths = resolveConfigPaths(config);

  // Create Server
  const server = http.createServer((req, res) => serveStatic(req, res, paths.outputDir));
  let wss;
  let suppressNextReload = false;

  function broadcastReload() {
    if (suppressNextReload) {
      suppressNextReload = false;
      return;
    }
    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send('reload');
      });
    }
  }

  // Initial Build
  console.log(chalk.blue('🚀 Performing initial build...'));
  try {
    await buildSite(configPathOption, { isDev: true, preserve: options.preserve, zeroConfig: options.zeroConfig });
  } catch (error) {
    console.error(chalk.red('❌ Initial build failed:'), error.message);
  }

  // Watcher Setup
  const userAssetsDirExists = await fs.pathExists(paths.userAssetsDir);
  const watchedPaths = [paths.srcDirToWatch];
  if (!options.zeroConfig && await fs.pathExists(paths.configFileToWatch)) {
    watchedPaths.push(paths.configFileToWatch);
  }
  if (userAssetsDirExists) watchedPaths.push(paths.userAssetsDir);

  // Internal development watch logic
  if (process.env.DOCMD_DEV === 'true') {
    const DOCMD_ROOT = path.resolve(__dirname, '..');
    watchedPaths.push(
      path.join(DOCMD_ROOT, 'templates'),
      path.join(DOCMD_ROOT, 'assets'),
      path.join(DOCMD_ROOT, 'engine'),
      path.join(DOCMD_ROOT, 'plugins')
    );
  }

  console.log(chalk.dim('\n👀 Watching for changes in:'));
  console.log(chalk.dim(`   - Source: ${chalk.cyan(formatPathForDisplay(paths.srcDirToWatch, CWD))}`));
  if (!options.zeroConfig && await fs.pathExists(paths.configFileToWatch)) {
    console.log(chalk.dim(`   - Config: ${chalk.cyan(formatPathForDisplay(paths.configFileToWatch, CWD))}`));
  }
  if (userAssetsDirExists) {
    console.log(chalk.dim(`   - Assets: ${chalk.cyan(formatPathForDisplay(paths.userAssetsDir, CWD))}`));
  }
  console.log('');

  const watcher = chokidar.watch(watchedPaths, {
    ignored: [/(^|[\/\\])\../, '**/.git/**', '**/node_modules/**', paths.outputDir],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 100 }
  });

  let isRebuilding = false;
  let rebuildQueued = false;
  let configNeedsReload = false;
  let rebuildTimeout = null;

  watcher.on('all', (event, filePath) => {
    const relativeFilePath = path.relative(CWD, filePath);

    // Ignore common system file noise from flooding terminals
    if (relativeFilePath.includes('.DS_Store')) return;

    process.stdout.write(chalk.dim(`↻ Change in ${relativeFilePath}... `));

    if (filePath === paths.configFileToWatch) {
      configNeedsReload = true;
    }

    if (rebuildTimeout) clearTimeout(rebuildTimeout);

    rebuildTimeout = setTimeout(() => {
      const executeBuildFn = async () => {
        if (isRebuilding) {
          rebuildQueued = true;
          return;
        }
        isRebuilding = true;
        rebuildQueued = false;

        try {
          if (configNeedsReload) {
            configNeedsReload = false;
            config = await loadConfig(configPathOption, { zeroConfig: options.zeroConfig });
            paths = resolveConfigPaths(config);
          }

          await buildSite(configPathOption, { isDev: true, preserve: options.preserve, zeroConfig: options.zeroConfig });
          broadcastReload();
          process.stdout.write(chalk.green('Done.\n'));

        } catch (error) {
          console.error(chalk.red('\n❌ Rebuild failed:'), error.message);
        } finally {
          isRebuilding = false;
          if (rebuildQueued) {
            executeBuildFn();
          }
        }
      };
      executeBuildFn();
    }, 150);
  });

  // Server Startup Logic
  const PORT = parseInt(options.port || process.env.PORT || 3000, 10);

  function checkPortInUse(port) {
    return new Promise((resolve) => {
      const tester = http.createServer()
        .once('error', (err) => resolve(err.code === 'EADDRINUSE'))
        .once('listening', () => tester.close(() => resolve(false)))
        .listen(port, '0.0.0.0');
    });
  }

  function askUserConfirmation() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      console.log(chalk.yellow(`\n⚠️  Port ${PORT} is already in use.`));
      rl.question('   Start on a different port? (Y/n) ', (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase() === 'y' || answer.trim() === '');
      });
    });
  }

  function tryStartServer(port) {
    server.listen(port, '0.0.0.0')
      .on('listening', async () => {
        wss = new WebSocket.Server({ server });
        wss.on('error', (e) => console.error('WebSocket Error:', e.message));

        // Action dispatcher for plugin actions/events
        const { loadPlugins, hooks } = require('../utils/plugin-loader');
        loadPlugins(config);
        const { createActionDispatcher } = require('../utils/action-dispatcher');
        const dispatcher = createActionDispatcher(hooks, {
          projectRoot: CWD,
          config,
          broadcast: (event, data) => {
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'event', name: event, data }));
              }
            });
          }
        });

        wss.on('connection', (ws) => {
          ws.on('message', async (raw) => {
            let msg;
            try { msg = JSON.parse(raw.toString()); } catch { return; }

            if (msg.type === 'call') {
              try {
                const { result, reload } = await dispatcher.handleCall(msg.action, msg.payload);
                if (reload) suppressNextReload = true;
                ws.send(JSON.stringify({ id: msg.id, type: 'response', result, reload }));
              } catch (e) {
                ws.send(JSON.stringify({ id: msg.id, type: 'response', error: e.message }));
              }
            } else if (msg.type === 'event') {
              dispatcher.handleEvent(msg.name, msg.data);
            }
          });
        });

        const indexHtmlPath = path.join(paths.outputDir, 'index.html');
        const networkIp = getNetworkIp();
        const localUrl = `http://127.0.0.1:${port}`;
        const networkUrl = networkIp ? `http://${networkIp}:${port}` : null;

        const border = chalk.gray('────────────────────────────────────────');
        console.log(border);
        console.log(`  ${chalk.bold.green('SERVER RUNNING')}  ${chalk.dim(`(v${require('../../package.json').version})`)}`);
        console.log('');
        console.log(`  ${chalk.bold('Local:')}    ${chalk.cyan(localUrl)}`);
        if (networkUrl) {
          console.log(`  ${chalk.bold('Network:')}  ${chalk.cyan(networkUrl)}`);
        }
        console.log('');
        console.log(`  ${chalk.dim('Serving:')}  ${formatPathForDisplay(paths.outputDir, CWD)}`);
        console.log(border);
        console.log('');

        if (!await fs.pathExists(indexHtmlPath)) {
          console.warn(chalk.yellow(`⚠️  Warning: Root index.html not found.`));
        }
      })
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          server.close();
          tryStartServer(port + 1);
        } else {
          console.error(chalk.red(`Failed to start server: ${err.message}`));
          process.exit(1);
        }
      });
  }

  // Execution Flow
  if (options.port) {
    tryStartServer(PORT);
  } else {
    const isBusy = await checkPortInUse(PORT);
    if (isBusy) {
      const shouldProceed = await askUserConfirmation();
      if (!shouldProceed) process.exit(0);
      tryStartServer(PORT + 1);
    } else {
      tryStartServer(PORT);
    }
  }

  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n🛑 Shutting down...'));
    watcher.close();
    if (server) {
      server.close(() => {
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  process.on('SIGTERM', () => {
    process.exit(0);
  });
}

module.exports = { startDevServer };