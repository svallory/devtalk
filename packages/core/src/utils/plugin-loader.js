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

const chalk = require('chalk');

const hooks = {
  markdownSetup: [],
  injectHead: [],
  injectBody: [],
  onPostBuild: [],
  assets: [],
  getClientAssets: [], // Legacy support
  actions: {},         // action name → handler function
  events: {}           // event name → handler function
};

// Map short names to package names
const ALIASES = {
  'search': '@docmd/plugin-search',
  'seo': '@docmd/plugin-seo',
  'sitemap': '@docmd/plugin-sitemap',
  'analytics': '@docmd/plugin-analytics',
  'mermaid': '@docmd/plugin-mermaid',
  'llms': '@docmd/plugin-llms',
  'pwa': '@docmd/plugin-pwa',
  'threads': '@svallory/docmd-plugin-threads'
};

function loadPlugins(config) {
  // 1. Reset hooks
  Object.keys(hooks).forEach(key => {
    hooks[key] = Array.isArray(hooks[key]) ? [] : {};
  });

  // 2. Initialize Plugin Map (Name -> Options)
  // This ensures unique plugins (last write wins)
  const pluginMap = new Map();
  const searchEnabled = config.optionsMenu ? config.optionsMenu.components.search !== false : config.search !== false;

  // A. Add Defaults
  pluginMap.set('@docmd/plugin-search', searchEnabled ? {} : false);
  pluginMap.set('@docmd/plugin-seo', config.plugins?.seo || {});
  pluginMap.set('@docmd/plugin-sitemap', config.plugins?.sitemap || {});
  pluginMap.set('@docmd/plugin-analytics', config.plugins?.analytics || {});
  pluginMap.set('@docmd/plugin-pwa', config.plugins?.pwa || {});

  // B. Add/Override from Config
  if (config.plugins) {
    Object.keys(config.plugins).forEach(key => {
      // Resolve Alias (e.g., 'mermaid' -> '@docmd/plugin-mermaid')
      const resolvedName = ALIASES[key] || key;
      const options = config.plugins[key];

      // Update map (Override default if exists)
      pluginMap.set(resolvedName, options);
    });
  }

  // 3. Load and Register
  for (const [name, options] of pluginMap) {
    if (options === false) continue; // Skip disabled

    try {
      // Resolve from the user's project first (process.cwd()), then from core's location.
      // This is critical for pnpm strict mode where plugins installed in the user's
      // project are not visible from core's own node_modules.
      let pluginModule;
      try {
        const resolved = require.resolve(name, { paths: [process.cwd(), __dirname] });
        pluginModule = require(resolved);
      } catch (e) {
        // Fallback to standard require (works when plugin is a dependency of core)
        pluginModule = require(name);
      }

      registerPlugin(name, pluginModule, options);
    } catch (e) {
      console.warn(chalk.yellow(`⚠️  Could not load plugin: ${name}`));
      console.warn(chalk.dim(`   > ${e.message.split('\n')[0]}`));
    }
  }

  return hooks;
}

function registerPlugin(name, plugin, options) {
  if (typeof plugin.markdownSetup === 'function') hooks.markdownSetup.push((md) => plugin.markdownSetup(md, options));

  if (typeof plugin.generateMetaTags === 'function') {
    hooks.injectHead.push((config, page, root) => plugin.generateMetaTags(config, page, root));
  }

  if (typeof plugin.generateScripts === 'function') {
    hooks.injectHead.push((c) => plugin.generateScripts(c, options).headScriptsHtml || '');
    hooks.injectBody.push((c) => plugin.generateScripts(c, options).bodyScriptsHtml || '');
  }

  if (typeof plugin.onPostBuild === 'function') hooks.onPostBuild.push((ctx) => plugin.onPostBuild({ ...ctx, options }));

  if (typeof plugin.getAssets === 'function') hooks.assets.push(() => plugin.getAssets(options));

  if (plugin.actions && typeof plugin.actions === 'object') {
    Object.assign(hooks.actions, plugin.actions);
  }
  if (plugin.events && typeof plugin.events === 'object') {
    Object.assign(hooks.events, plugin.events);
  }
}

module.exports = { loadPlugins, hooks };