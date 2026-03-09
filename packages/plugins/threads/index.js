/**
 * @svallory/plugin-threads — inline discussion threads stored in markdown.
 */
const path = require('path');
const fs = require('fs');
const containers = require('./src/plugin/containers');
const highlightRule = require('./src/plugin/highlight-rule');
const { actions } = require('./src/plugin/actions');

function markdownSetup(md, options) {
  containers.setup(md);
  highlightRule.setup(md);
}

function generateScripts(config, options) {
  // Inject authors map into the page so client-side code can render avatars
  // even in static builds (no WebSocket)
  let authorsJson = '{}';
  try {
    const srcDir = config.src || 'docs';
    const authorsPath = path.resolve(srcDir, '.threads', 'authors.json');
    authorsJson = fs.readFileSync(authorsPath, 'utf8');
  } catch {
    // File doesn't exist yet — that's fine
  }

  return {
    headScriptsHtml: '',
    bodyScriptsHtml: `<script>window.__threads_authors=${authorsJson}</script>`
  };
}

function getAssets(options) {
  return [
    {
      src: path.join(__dirname, 'dist/client/index.js'),
      dest: 'assets/js/threads.js',
      type: 'js',
      location: 'body',
      attributes: { type: 'module' }
    },
    {
      src: path.join(__dirname, 'dist/client/index.css'),
      dest: 'assets/css/threads.css',
      type: 'css',
      location: 'head'
    }
  ];
}

module.exports = { markdownSetup, generateScripts, getAssets, actions };
