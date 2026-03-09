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
const esbuild = require('esbuild');
const themes = require('@docmd/themes');
const ui = require('@svallory/docmd-ui');

const COPYRIGHT_BANNER = `/*!
 * docmd (v${require('../../package.json').version})
 * Copyright (c) 2025-present docmd.io
 * License: MIT
 */`;

async function findFilesRecursive(dir, extensions) {
  let files = [];
  if (!await fs.exists(dir)) return [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    // Explicitly ignore system files, git, and node_modules to prevent duplicate ID crashes
    if (item.name === 'node_modules' || item.name.startsWith('.') || item.name === 'site') continue;

    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(await findFilesRecursive(fullPath, extensions));
    } else if (item.isFile()) {
      if (!extensions || extensions.includes(path.extname(item.name))) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function prepareAssets(config, outputDir, options = {}) {
  const CWD = process.cwd();

  // 1. Core UI Assets
  const uiAssets = ui.getAssetsDir();
  if (await fs.exists(uiAssets)) await fs.copy(uiAssets, path.join(outputDir, 'assets'));

  // 2. Theme Assets
  const themesDir = themes.getThemesDir();
  if (await fs.exists(themesDir)) await fs.copy(themesDir, path.join(outputDir, 'assets/css'));

  // 3. User Assets
  const userAssets = path.resolve(CWD, 'assets');
  if (await fs.exists(userAssets)) await fs.copy(userAssets, path.join(outputDir, 'assets'));

  // 4. Minification (Production only)
  if (config.minify !== false && !options.isDev) {
    await minifyDir(path.join(outputDir, 'assets'));
  }
}

async function minifyDir(dir) {
  const assets = await findFilesRecursive(dir, ['.css', '.js']);
  for (const file of assets) {
    if (file.endsWith('.min.js') || file.endsWith('.min.css')) continue;
    try {
      const ext = path.extname(file);
      const content = await fs.readFile(file, 'utf8');
      const result = await esbuild.transform(content, {
        loader: ext.slice(1),
        minify: true,
        legalComments: 'none'
      });
      await fs.writeFile(file, COPYRIGHT_BANNER + '\n' + result.code);
    } catch (e) {
      // Ignore errors for non-standard files or mixed content
    }
  }
}

// Generate HTML Tag Helper
function generateAssetTag(pathOrUrl, type, attributes = {}) {
  const attrs = Object.entries(attributes).map(([k, v]) => v === true ? k : `${k}="${v}"`).join(' ');
  if (type === 'css') return `<link rel="stylesheet" href="${pathOrUrl}" ${attrs}>`;
  if (type === 'js') return `<script src="${pathOrUrl}" ${attrs}></script>`;
  return '';
}

module.exports = {
  findFilesRecursive,
  prepareAssets,
  generateAssetTag
};