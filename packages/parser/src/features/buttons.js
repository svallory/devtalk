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

function buttonRule(state, startLine, endLine, silent) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  const lineContent = state.src.slice(start, max).trim();

  // Regex matches: ::: button "Text" Link [color]
  const match = lineContent.match(/^:::\s+button\s+(?:["'](.*?)["']|(\S+))\s+(.*)$/);

  if (!match) return false;
  if (silent) return true;

  // Extract Data
  // Group 1 is quoted text, Group 2 is single-word text
  let text = match[1] || match[2] || 'Button';
  // Replace underscores only if it was a single word (legacy support)
  if (match[2]) text = text.replace(/_/g, ' ');

  const rest = match[3].trim();

  // Parse Link and Options
  // We look for the first string as the link, rest as options
  const parts = rest.split(/\s+/);
  let rawLink = parts[0];
  let color = '';

  // Look for color option in remaining parts
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].startsWith('color:')) {
      color = parts[i].replace('color:', '');
    }
  }

  // Handle Link Types
  let href = rawLink;
  let isExternal = false;

  if (href.startsWith('external:')) {
    href = href.replace('external:', '');
    isExternal = true;
  } else if (href.startsWith('mailto:')) {
    // Keep as is
  } else if (href.startsWith('http')) {
    // Auto-detect external http
    isExternal = true;
  }

  // Generate Token
  const token = state.push('html_inline', '', 0);
  token.map = [startLine, startLine + 1];

  let styleAttr = '';
  if (color) {
    // Basic validation to prevent CSS injection if needed, or allow flexibility
    styleAttr = ` style="background-color: ${color}; border-color: ${color}; color: #fff;"`;
  }

  const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';

  token.content = `<a href="${href}" class="docmd-button"${styleAttr}${targetAttr}>${text}</a>`;

  state.line = startLine + 1;
  return true;
}

module.exports = {
  name: 'buttons',
  setup(md) {
    md.block.ruler.before('paragraph', 'docmd_button', buttonRule, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });
  }
};