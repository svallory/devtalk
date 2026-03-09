/**
 * @svallory/plugin-threads — inline discussion threads stored in markdown.
 */
const containers = require('./src/plugin/containers');
const { actions } = require('./src/plugin/actions');

module.exports = {
  markdownSetup(md, options) { containers.setup(md); },
  generateScripts(config, options) { return {}; },
  getAssets(options) { return []; },
  actions
};
