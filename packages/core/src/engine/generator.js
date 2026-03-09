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
const parser = require('@svallory/docmd-parser');
const ui = require('@svallory/docmd-ui');
const { findPageNeighbors } = require('@svallory/docmd-parser/src/utils/navigation-helper');
const { generateAssetTag } = require('./assets');

async function renderPages({ config, srcDir, outputDir, hooks, buildHash, options }) {
  const mdProcessor = parser.createMarkdownProcessor({ ...config, isDev: options.isDev }, (md) => hooks.markdownSetup.forEach(hook => hook(md)));


  // Load Layout Templates
  const templates = {
    layout: await fs.readFile(ui.getTemplatePath('layout'), 'utf8'),
    noStyle: await fs.readFile(ui.getTemplatePath('no-style'), 'utf8'),
    navigation: await fs.readFile(ui.getTemplatePath('navigation'), 'utf8')
  };

  // Load Partials
  const themeInitPath = path.join(ui.getTemplatesDir(), 'partials', 'theme-init.js');
  const themeInitScript = (await fs.exists(themeInitPath))
    ? `<script>${await fs.readFile(themeInitPath, 'utf8')}</script>`
    : '';

  // Footer Processing
  const footerHtml = config.footer?.content ? mdProcessor.renderInline(config.footer.content) : '';

  // --- 1. Identify Assets (Plugin Injection) ---
  const assetTags = { head: [], body: [] };

  // Theme CSS
  if (config.theme.name && config.theme.name !== 'default') {
    assetTags.head.push(rel => generateAssetTag(`${rel}assets/css/docmd-theme-${config.theme.name}.css?v=${buildHash}`, 'css'));
  }
  // Lightbox
  assetTags.body.push(rel => generateAssetTag(`${rel}assets/js/docmd-image-lightbox.js?v=${buildHash}`, 'js'));

  // Plugin Assets
  if (hooks.assets) {
    for (const getAssetsFn of hooks.assets) {
      const assets = getAssetsFn();
      if (Array.isArray(assets)) {
        for (const asset of assets) {
          let tagGen;
          if (asset.src && asset.dest) {
            // Copy is handled in build.js main loop, here we just ref tags
            tagGen = (rel) => generateAssetTag(`${rel}${asset.dest}?v=${buildHash}`, asset.type, asset.attributes);
          } else if (asset.url) {
            tagGen = () => generateAssetTag(asset.url, asset.type, asset.attributes);
          }
          if (tagGen) assetTags[asset.location === 'head' ? 'head' : 'body'].push(tagGen);
        }
      }
    }
  }

  // --- 2. Process Content ---
  // Note: We use a passed-in file list or find them if not provided (future optimization)
  // For now, assume findFilesRecursive is available via utils
  const { findFilesRecursive } = require('./assets');
  const mdFiles = await findFilesRecursive(srcDir, ['.md', '.markdown']);

  const pages = [];
  for (const filePath of mdFiles) {
    const rawContent = await fs.readFile(filePath, 'utf8');
    const relativePath = path.relative(srcDir, filePath);
    const isIndex = path.basename(relativePath).startsWith('index.');
    const processed = parser.processContent(rawContent, mdProcessor, { ...config, isDev: options.isDev }, { isIndex });
    if (!processed) continue;
    const htmlOutputPath = isIndex ? path.join(path.dirname(relativePath), 'index.html') : relativePath.replace(/\.md$/, '/index.html');
    pages.push({ ...processed, sourcePath: filePath, outputPath: htmlOutputPath });
  }

  // --- 3. Render HTML ---
  for (const page of pages) {
    const finalPath = path.join(outputDir, page.outputPath);
    const fileDir = path.dirname(page.outputPath);
    let relativePathToRoot = path.relative(fileDir, '.');
    if (relativePathToRoot === '') relativePathToRoot = './';
    else relativePathToRoot += '/';
    relativePathToRoot = relativePathToRoot.replace(/\\/g, '/');

    // Navigation Context
    let navPath = '/' + page.outputPath.replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
    if (navPath === '/.') navPath = '/';
    const { prevPage, nextPage } = findPageNeighbors(config.navigation, navPath);

    // Fix Neighbor Links
    const fixNeighbor = (node) => {
      if (!node) return null;
      if (node.path.startsWith('http')) return node;
      let p = node.path.replace(/^\//, '');
      if (options.offline && !p.endsWith('.html')) p = p.replace(/\/$/, '') + '/index.html';
      node.url = relativePathToRoot + p;
      return node;
    };

    // Inject Assets
    const assetHeadHtml = assetTags.head.map(gen => gen(relativePathToRoot)).join('\n');
    const assetBodyHtml = assetTags.body.map(gen => gen(relativePathToRoot)).join('\n');
    const pageContext = { frontmatter: page.frontmatter, outputPath: page.outputPath };

    const fullHeadHtml = [
      hooks.injectHead.map(fn => fn(config, pageContext, relativePathToRoot)).join('\n'),
      assetHeadHtml
    ].join('\n');

    const fullBodyHtml = [
      assetBodyHtml,
      hooks.injectBody.map(fn => fn(config, pageContext)).join('\n')
    ].join('\n');

    let editUrl = null;
    let editLinkText = config.editLink?.text || 'Edit this page';

    if (config.editLink && config.editLink.enabled && config.editLink.baseUrl) {
      const cleanBase = config.editLink.baseUrl.replace(/\/$/, '');
      const sourceRelative = path.relative(srcDir, page.sourcePath).replace(/\\/g, '/');
      editUrl = `${cleanBase}/${sourceRelative}`;
    }

    // Navigation HTML
    const navigationHtml = parser.renderTemplate(templates.navigation, {
      config,
      navItems: config.navigation,
      currentPagePath: navPath,
      relativePathToRoot,
      isOfflineMode: options.offline
    }, { filename: ui.getTemplatePath('navigation') });

    // Render Full Page
    const templateString = page.frontmatter.noStyle ? templates.noStyle : templates.layout;
    const fullHtml = parser.renderTemplate(templateString, {
      content: page.htmlContent,
      frontmatter: page.frontmatter,
      headings: page.headings,
      config,
      buildHash,
      siteTitle: config.siteTitle,
      pageTitle: page.frontmatter.title,
      description: page.frontmatter.description || '',
      defaultMode: config.theme?.defaultMode || 'system',
      relativePathToRoot,
      isOfflineMode: options.offline,
      navigationHtml,
      prevPage: fixNeighbor(prevPage),
      nextPage: fixNeighbor(nextPage),
      logo: config.logo,
      theme: config.theme,

      headerConfig: config.header,
      sidebarConfig: config.sidebar,
      footerConfig: config.footer,
      menubarConfig: config.menubar,
      optionsMenu: config.optionsMenu,

      customCssFiles: config.theme.customCss || [],
      customJsFiles: config.customJs || [],

      pluginHeadScriptsHtml: fullHeadHtml,
      pluginBodyScriptsHtml: fullBodyHtml,

      faviconLinkHtml: config.favicon ? `<link id="site-favicon" rel="icon" href="${relativePathToRoot}${config.favicon.replace(/^\//, '')}?v=${buildHash}">` : '',
      themeInitScript,
      footerHtml,
      isActivePage: page.htmlContent && page.htmlContent.trim().length > 0,
      editUrl,
      editLinkText,

      sourceFile: options.isDev ? path.relative(process.cwd(), page.sourcePath).replace(/\\/g, '/') : null,


      // Placeholders for template compatibility
      themeCssLinkHtml: '',
      metaTagsHtml: '',
      pluginStylesHtml: ''
    }, { filename: ui.getTemplatePath('layout') });

    await fs.ensureDir(path.dirname(finalPath));
    await fs.writeFile(finalPath, fullHtml);
  }

  // After the render loop, emit dev manifest
  if (options.isDev) {
    const manifest = {};
    for (const page of pages) {
      // URL path: /guide/setup (derived from outputPath)
      let urlPath = '/' + page.outputPath.replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
      if (urlPath === '/.') urlPath = '/';
      manifest[urlPath] = path.relative(process.cwd(), page.sourcePath).replace(/\\/g, '/');
    }

    const devDir = path.join(outputDir, '__dev');
    await fs.ensureDir(devDir);
    await fs.writeFile(path.join(devDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  }

  return pages;
}

module.exports = { renderPages };