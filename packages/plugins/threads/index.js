/**
 * @svallory/plugin-threads — inline discussion threads stored in markdown.
 */
const path = require('path');
const containers = require('./src/plugin/containers');
const highlightRule = require('./src/plugin/highlight-rule');
const { actions } = require('./src/plugin/actions');

function markdownSetup(md, options) {
  containers.setup(md);
  highlightRule.setup(md);
}

function generateScripts(config, options) {
  return {
    headScriptsHtml: '',
    bodyScriptsHtml: ''
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
