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

function smartDedent(str) {
  const lines = str.split('\n');

  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  let minIndent = Infinity;
  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.match(/^ */)[0].length;
    minIndent = Math.min(minIndent, indent);
  }

  if (!isFinite(minIndent) || minIndent === 0) return lines.join('\n');

  return lines.map(line =>
    line.startsWith(' '.repeat(minIndent)) ? line.slice(minIndent) : line
  ).join('\n');
}

function createDepthTrackingContainer(md, name, renderOpen, renderClose) {
  md.block.ruler.before('fence', `custom_${name}`, (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const lineContent = state.src.slice(start, max).trim();

    // Match opening tag e.g., `::: callout info Title`
    const regex = new RegExp(`^:::\\s+${name}(?:\\s+(.*))?$`);
    const match = lineContent.match(regex);
    if (!match) return false;
    if (silent) return true;

    let nextLine = startLine;
    let found = false;
    let depth = 1;
    let fenceMarker = null;

    while (nextLine < endLine) {
      nextLine++;
      if (nextLine >= endLine) break;

      const nextStart = state.bMarks[nextLine] + state.tShift[nextLine];
      const nextMax = state.eMarks[nextLine];
      const nextContent = state.src.slice(nextStart, nextMax).trim();

      if (!fenceMarker) {
        const match = nextContent.match(/^(`{3,}|~{3,})/);
        if (match) fenceMarker = match[1];
      } else if (nextContent.startsWith(fenceMarker)) {
        fenceMarker = null;
      }

      if (!fenceMarker) {
        if (nextContent.match(/^:::\s+[a-zA-Z]/) && !nextContent.match(/^:::\s+button/)) {
          depth++;
        } else if (nextContent.match(/^:::\s*$/)) {
          depth--;
          if (depth === 0) {
            found = true;
            break;
          }
        }
      }
    }

    if (!found) return false;

    const info = match[1] || '';

    // Extract raw content lines and dedent to reset indentation,
    // then re-render recursively so nested containers parse correctly.
    let rawContent = '';
    for (let i = startLine + 1; i < nextLine; i++) {
      const lineStart = state.bMarks[i];
      const lineEnd = state.eMarks[i];
      rawContent += state.src.slice(lineStart, lineEnd) + '\n';
    }
    const innerContent = smartDedent(rawContent);

    const openToken = state.push(`custom_${name}_open`, 'div', 1);
    openToken.info = info;
    openToken.map = [startLine, nextLine + 1];

    if (innerContent) {
      const renderedContent = state.md.render(innerContent, state.env);
      const htmlToken = state.push('html_block', '', 0);
      htmlToken.content = renderedContent;
    }

    state.push(`custom_${name}_close`, 'div', -1);

    state.line = nextLine + 1;
    return true;
  }, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });

  // Register Renderers
  md.renderer.rules[`custom_${name}_open`] = renderOpen;
  md.renderer.rules[`custom_${name}_close`] = renderClose;
}

/**
 * Extracts a quoted title (e.g., "My Title") from the info string.
 * Falls back to the raw info if no quotes are found.
 */
function parseQuotedTitle(info) {
  if (!info) return '';
  const match = info.trim().match(/^"(.*)"$/);
  return match ? match[1] : info.trim();
}

module.exports = {
  name: 'common-containers',
  setup(md) {

    // 1. Callout
    createDepthTrackingContainer(md, 'callout', (tokens, idx) => {
      const info = tokens[idx].info.trim();
      const parts = info.split(' ');
      const type = parts[0] || 'info';

      // Support ::: callout type "Title" or ::: callout type Title
      let title = '';
      const remaining = parts.slice(1).join(' ').trim();
      if (remaining) {
        title = parseQuotedTitle(remaining);
      }

      return `<div class="docmd-container callout callout-${type}">${title ? `<div class="callout-title">${title}</div>` : ''}<div class="callout-content">\n`;
    }, () => '</div></div>\n');

    // 2. Card
    createDepthTrackingContainer(md, 'card', (tokens, idx) => {
      const title = parseQuotedTitle(tokens[idx].info);
      return `<div class="docmd-container card">${title ? `<div class="card-title">${title}</div>` : ''}<div class="card-content">\n`;
    }, () => '</div></div>\n');

    // 3. Collapsible
    createDepthTrackingContainer(md, 'collapsible', (tokens, idx) => {
      const info = tokens[idx].info.trim();
      const isOpen = info.startsWith('open ') || info === 'open';
      const rawTitle = isOpen ? info.replace('open', '').trim() : info;
      const title = parseQuotedTitle(rawTitle);
      const displayTitle = title || 'Click to expand';

      return `<details class="docmd-container collapsible" ${isOpen ? 'open' : ''}>
        <summary class="collapsible-summary">
            <span class="collapsible-title">${displayTitle}</span>
            <span class="collapsible-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
        </summary>
        <div class="collapsible-content">\n`;
    }, () => '</div></details>\n');

  }
};