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

const path = require('path');
const fs = require('fs');
const { validateConfig } = require('@svallory/docmd-parser');
const { normalizeConfig } = require('./config-schema');
const { buildAutoNav } = require('./auto-router');
const chalk = require('chalk');

function hasMarkdownFiles(dir, maxDepth = 2, currentDepth = 0) {
  if (currentDepth > maxDepth) return false;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.markdown'))) return true;
      if (entry.isDirectory()) {
        if (hasMarkdownFiles(path.join(dir, entry.name), maxDepth, currentDepth + 1)) return true;
      }
    }
  } catch (e) { }
  return false;
}

async function buildZeroConfig(cwd) {

  if (isDev) {
    console.log(chalk.cyan('✨ Zero-Config mode activated. Analyzing directory...'));
    global.__DOCMD_ZERO_LOGGED = true;
  }

  // Detect if there's a specific docs folder, otherwise use root
  const candidates = ['docs', 'src/docs', 'content'];
  let srcDir = '.';
  for (const c of candidates) {
    if (fs.existsSync(path.join(cwd, c))) {
      srcDir = c;
      break;
    }
  }
  const absSrcDir = path.join(cwd, srcDir);

  if (!hasMarkdownFiles(absSrcDir, 2)) {
    throw new Error(`Zero-Config Error: No markdown files (.md or .markdown) found in '${absSrcDir}'. Please create some content to build documentation.`);
  }

  // Try extracting defaults from package.json
  let autoTitle = path.basename(cwd) || 'Documentation';
  let autoDesc = '';
  try {
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name) {
        autoTitle = pkg.name.replace(/^@[^/]+\//, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      if (pkg.description) autoDesc = pkg.description;
    }
  } catch (e) { }

  // Dynamically build the navigation tree
  const autoNav = buildAutoNav(absSrcDir);

  const autoConfig = {
    title: autoTitle,
    description: autoDesc,
    srcDir: srcDir,
    outputDir: 'site',
    navigation: autoNav,
    layout: { spa: true },
    theme: { name: 'default', defaultMode: 'system' }
  };

  return normalizeConfig(autoConfig);
}

async function loadConfig(configPath, options = {}) {
  const cwd = process.cwd();

  if (options.zeroConfig) {
    return await buildZeroConfig(cwd, options.isDev); 
  }

  let absoluteConfigPath = path.resolve(cwd, configPath);

  if (!fs.existsSync(absoluteConfigPath) && configPath === 'docmd.config.js') {
    const legacyPath = path.resolve(cwd, 'config.js');
    if (fs.existsSync(legacyPath)) absoluteConfigPath = legacyPath;
    else {
      // Fallback to Zero-Config if nothing is found to prevent crashing!
      if (!global.__DOCMD_NO_CONFIG_LOGGED) {
        console.log(chalk.yellow('⚠️  No config file found. Falling back to Zero-Config mode...'));
        global.__DOCMD_NO_CONFIG_LOGGED = true;
      }
      return await buildZeroConfig(cwd);
    }
  }

  try {
    delete require.cache[require.resolve(absoluteConfigPath)];

    // Polyfill defineConfig globally so the config file works 
    // even if @docmd/core isn't installed locally in the target project.
    global.defineConfig = (config) => config;

    const rawConfig = require(absoluteConfigPath);

    // Clean up global to avoid pollution
    delete global.defineConfig;

    // If user has 'search' or 'theme' at root, but no 'layout' object, they are legacy.
    const isLegacy = !rawConfig.layout && (
      rawConfig.search !== undefined ||
      (rawConfig.theme && rawConfig.theme.enableModeToggle !== undefined) ||
      rawConfig.sponsor
    );

    if (isLegacy) {
      console.log(chalk.yellow('┌──────────────────────────────────────────────────────────┐'));
      console.log(chalk.yellow('│  ⚠️  Update Config: Legacy Configuration Detected!        │'));
      console.log(chalk.yellow('│                                                          │'));
      console.log(chalk.yellow('│  Run "') +
        chalk.green('docmd migrate') +
        chalk.yellow('" to upgrade your config to the       │'));
      console.log(chalk.yellow('│  new V2 structure (it will auto backup your old config). │'));
      console.log(chalk.yellow('└──────────────────────────────────────────────────────────┘\n'));
    }

    validateConfig(rawConfig);
    const normalized = normalizeConfig(rawConfig);

    // Ensure we have a navigation array, fallback to Auto-Router if empty
    if (!normalized.navigation || normalized.navigation.length === 0) {
      console.log(chalk.dim('   > No navigation found in config. Auto-generating...'));
      normalized.navigation = buildAutoNav(path.resolve(cwd, normalized.srcDir));
    }

    return normalized;

  } catch (e) {
    if (e.message === 'Invalid configuration file.') throw e;
    throw new Error(`Error parsing config file: ${e.message}`);
  }
}

module.exports = { loadConfig };