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
const fs = require('../utils/fs-utils');
const chalk = require('chalk');
const { loadConfig } = require('../utils/config-loader');
const { loadPlugins } = require('../utils/plugin-loader');
const { prepareAssets } = require('../engine/assets');
const { renderPages } = require('../engine/generator');

async function buildSite(configPath, opts = {}) {

  // Defaults to prevent ReferenceErrors
  const options = {
    isDev: opts.isDev || false,
    offline: opts.offline || false,
    zeroConfig: opts.zeroConfig || false
  };

  const CWD = process.cwd();

  // 1. Load Config (Zero-Config aware)
  try {
    const config = await loadConfig(configPath, { zeroConfig: options.zeroConfig, isDev: options.isDev });
    const hooks = loadPlugins(config);
    const buildHash = Date.now().toString(36);

    // Use V3 labels (config.out / config.src) which are normalized by config-schema
    const rootOutputDir = path.resolve(CWD, config.out);
    await fs.ensureDir(rootOutputDir);

    // Helper: Build Assets for a specific output directory
    const buildAssetsForDir = async (targetOutDir) => {
      await prepareAssets(config, targetOutDir, options);
      if (hooks.assets) {
        for (const getAssetsFn of hooks.assets) {
          const assets = getAssetsFn();
          if (Array.isArray(assets)) {
            for (const asset of assets) {
              if (asset.src && asset.dest) {
                const destPath = path.join(targetOutDir, asset.dest);
                await fs.ensureDir(path.dirname(destPath));
                await fs.copy(asset.src, destPath);
              }
            }
          }
        }
      }
    };

    let allGeneratedPages = [];

    // Filter out Ghost Versions (folders that don't exist)
    if (config.versions && config.versions.all) {
        const validVersions = [];
        for (const v of config.versions.all) {
            const vSrcDir = path.resolve(CWD, v.dir);
            if (await fs.exists(vSrcDir)) {
                validVersions.push(v);
            } else {
                if (!options.isDev) console.log(chalk.yellow(`⚠️  Skipping missing version: ${v.id} (${v.dir})`));
            }
        }
        config.versions.all = validVersions;
    }

    // --- 1. THE VERSIONING LOOP ---
    if (config.versions && config.versions.all && config.versions.all.length > 0) {
      for (const v of config.versions.all) {
        const isCurrent = v.id === config.versions.current;
        const vSrcDir = path.resolve(CWD, v.dir);

        // Failsafe: Skip if version directory doesn't exist
        if (!await fs.exists(vSrcDir)) {
          if (!options.isDev) console.log(chalk.yellow(`⚠️  Version directory missing: ${v.dir}. Skipping ${v.id}...`));
          continue;
        }

        // Current version goes to root, others go to subfolders (e.g., site/v1/)
        const vOutputDir = isCurrent ? rootOutputDir : path.join(rootOutputDir, v.id);
        await fs.ensureDir(vOutputDir);
        await buildAssetsForDir(vOutputDir);

        // Inject current version data into config for the generator to use
        // 1. Navigation Override: Use version-specific nav if provided
        let activeNav = v.navigation || config.navigation;

        // 2. Smart Filter: Remove dead links for this specific version directory
        // This ensures if 'advanced.md' was added in v2, it won't show in v1 nav
        const filterNav = (items) => {
          return items.reduce((acc, item) => {
            const newItem = { ...item };

            // If it has children, filter them recursively
            if (newItem.children) {
              newItem.children = filterNav(newItem.children);
              // If it was a group and now has no children, remove the group? 
              // Optional: keeping empty groups might be confusing. Let's keep for now.
            }

            // If it's a link to a file (not external)
            if (newItem.path && !newItem.path.startsWith('http') && !newItem.external) {
              // Normalize path: /guide/intro -> guide/intro.md
              let relativeFilePath = newItem.path.replace(/^\//, '');
              if (!relativeFilePath.endsWith('.md')) relativeFilePath += '.md';
              // Handle index case
              if (relativeFilePath.endsWith('/.md')) relativeFilePath = relativeFilePath.replace('/.md', '/index.md');
              if (relativeFilePath === '.md') relativeFilePath = 'index.md';

              const absoluteFilePath = path.join(vSrcDir, relativeFilePath);

              // Check existence synchronously (fast enough for build time)
              // We use try-catch because fs.statSync throws if missing
              try {
                const fs = require('fs'); // Native fs for sync check
                if (!fs.existsSync(absoluteFilePath)) {
                   // File doesn't exist in this version -> Skip this item
                   return acc;
                }
              } catch(e) { return acc; }
            }

            acc.push(newItem);
            return acc;
          }, []);
        };

        const cleanedNav = filterNav(activeNav);
        
        // Inject filtered nav into a temporary config for this build run
        const versionedConfig = { 
            ...config, 
            _activeVersion: v,
            navigation: cleanedNav 
        };

        const pages = await renderPages({
          config: versionedConfig,
          srcDir: vSrcDir,
          outputDir: vOutputDir,
          hooks,
          buildHash,
          options // <-- This is where 'options' is needed!
        });

        // Adjust output paths for plugins (Sitemap/Search) to include the subfolder
        if (!isCurrent) {
          pages.forEach(p => p.outputPath = `${v.id}/${p.outputPath}`);
        }
        allGeneratedPages.push(...pages);
      }
    } else {
      // --- STANDARD BUILD (No Versioning) ---
      const srcDir = path.resolve(CWD, config.src);

      // Zero-Config Failsafe: Create src dir if missing
      if (options.zeroConfig && !await fs.exists(srcDir)) {
        await fs.ensureDir(srcDir);
      }

      if (!await fs.exists(srcDir)) throw new Error(`Source directory not found: ${srcDir}`);

      await buildAssetsForDir(rootOutputDir);
      allGeneratedPages = await renderPages({
        config, srcDir, outputDir: rootOutputDir, hooks, buildHash, options
      });
    }

    // --- 3. GENERATE CUSTOM 404 PAGE ---
    const { renderTemplate } = require('@svallory/docmd-parser/src/html-renderer');
    const ui = require('@svallory/docmd-ui');
    
    const notFoundTemplatePath = path.join(ui.getTemplatesDir(), '404.ejs');
    let notFoundTemplateStr = '';
    if (await fs.exists(notFoundTemplatePath)) {
        notFoundTemplateStr = await fs.readFile(notFoundTemplatePath, 'utf8');
    } else {
        notFoundTemplateStr = `<h1>404</h1><p>Page Not Found</p>`;
    }

    const themeInitPath = path.join(ui.getTemplatesDir(), 'partials', 'theme-init.js');
    const themeInitScript = (await fs.exists(themeInitPath)) ? `<script>${await fs.readFile(themeInitPath, 'utf8')}</script>` : '';

    // Determine Absolute Base (usually '/' unless 'base' config is set)
    const absoluteRoot = config.base && config.base !== '/' ? config.base.replace(/\/$/, '') + '/' : '/';

    const full404Html = renderTemplate(notFoundTemplateStr, {
        pageTitle: config.notFound.title || 'Page Not Found',
        title: config.notFound.title || 'Page Not Found',
        content: config.notFound.content || 'The page you are looking for does not exist.',
        logo: config.logo,
        
        // Context for Assets
        relativePathToRoot: absoluteRoot, 
        buildHash,
        defaultMode: config.theme?.defaultMode || 'system',
        theme: config.theme,
        customCssFiles: config.theme.customCss || [],
        
        faviconLinkHtml: config.favicon ? `<link rel="icon" href="${absoluteRoot}${config.favicon.replace(/^\//,'')}">` : '',
        themeInitScript
    });

    await fs.writeFile(path.join(rootOutputDir, '404.html'), full404Html);

    // --- 4. GENERATE STATIC REDIRECTS ---
    if (config.redirects && Object.keys(config.redirects).length > 0) {
      for (const [from, to] of Object.entries(config.redirects)) {
        let cleanFrom = from.replace(/^\//, '');
        if (!cleanFrom.endsWith('.html')) cleanFrom = path.join(cleanFrom, 'index.html');

        const redirectPath = path.join(rootOutputDir, cleanFrom);
        const redirectHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting...</title><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${to}"><script>window.location.replace("${to}");</script></head><body><p>Redirecting to <a href="${to}">${to}</a>...</p></body></html>`;

        await fs.ensureDir(path.dirname(redirectPath));
        await fs.writeFile(redirectPath, redirectHtml);
      }
    }

    // --- 5. Post Build Hooks (Search, Sitemap, LLMs) ---
    await Promise.all(hooks.onPostBuild.map(fn => fn({
      config,
      pages: allGeneratedPages,
      outputDir: rootOutputDir,
      log: (msg) => !options.isDev && console.log(msg)
    })));

    if (!options.isDev) {
      console.log(chalk.green(`✅ Build complete. Generated ${allGeneratedPages.length} pages.`));
    }

  } catch (e) {
    if (!options.isDev) {
      console.error(chalk.red('Build failed:'));
      // Show full stack trace if we are in a testing/CI environment
      if (process.env.npm_lifecycle_event === 'test' || process.env.CI) {
        console.error(e.stack);
      } else {
        console.error(e.message);
      }
      process.exit(1);
    }
    throw e;
  }
}

module.exports = { buildSite };