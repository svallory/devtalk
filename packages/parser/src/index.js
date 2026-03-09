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

const { createMarkdownProcessor, processContent } = require('./markdown-processor');
const { renderTemplate } = require('./html-renderer');
const { renderIcon } = require('./utils/icon-renderer');
const { validateConfig } = require('./utils/validator');
const { createDepthTrackingContainer } = require('./features/common-containers');

module.exports = {
  // Logic
  createMarkdownProcessor,
  processContent,
  renderTemplate,
  validateConfig,

  // Utils
  renderIcon,
  createDepthTrackingContainer
};