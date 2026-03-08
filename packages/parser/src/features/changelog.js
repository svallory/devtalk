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
  let minIndent = Infinity;
  lines.forEach(line => {
    if (line.trim().length === 0) return;
    const match = line.match(/^ */);
    if (match[0].length < minIndent) minIndent = match[0].length;
  });
  if (minIndent === Infinity) return str;
  return lines.map(line => line.trim().length ? line.substring(minIndent) : '').join('\n');
}

function changelogRule(state, startLine, endLine, silent) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  const lineContent = state.src.slice(start, max).trim();

  if (lineContent !== '::: changelog') return false;
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

  // Extract content block
  let content = '';
  for (let i = startLine + 1; i < nextLine; i++) {
    const lineStart = state.bMarks[i] + state.tShift[i];
    const lineEnd = state.eMarks[i];
    content += state.src.slice(lineStart, lineEnd) + '\n';
  }

  // Parse "== Date" entries
  const lines = content.split('\n');
  const entries = [];
  let currentEntry = null;
  let currentContentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();
    const markerMatch = trimmedLine.match(/^==\s+(.+)$/);

    if (markerMatch) {
      if (currentEntry) {
        currentEntry.content = smartDedent(currentContentLines.join('\n'));
        entries.push(currentEntry);
      }
      currentEntry = { meta: markerMatch[1], content: '' };
      currentContentLines = [];
    } else if (currentEntry) {
      currentContentLines.push(rawLine);
    }
  }
  if (currentEntry) {
    currentEntry.content = smartDedent(currentContentLines.join('\n'));
    entries.push(currentEntry);
  }

  const openToken = state.push('changelog_open', 'div', 1);
  openToken.map = [startLine, nextLine + 1];

  entries.forEach(entry => {
    // We render HTML blocks directly for the timeline structure
    const entryOpen = state.push('html_block', '', 0);
    entryOpen.content = `<div class="changelog-entry">
      <div class="changelog-meta"><span class="changelog-date">${entry.meta}</span></div>
      <div class="changelog-body">`;

    // Recurse render the markdown inside the entry
    entryOpen.content += state.md.render(entry.content, state.env);

    const entryClose = state.push('html_block', '', 0);
    entryClose.content = `</div></div>`;
  });

  state.push('changelog_close', 'div', -1);
  state.line = nextLine + 1;
  return true;
}

module.exports = {
  name: 'changelog',
  setup(md) {
    // Register Rule
    md.block.ruler.before('fence', 'changelog_timeline', changelogRule, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });

    // Register Container Renderer
    md.renderer.rules.changelog_open = () => '<div class="docmd-container changelog-timeline">';
    md.renderer.rules.changelog_close = () => '</div>';
  }
};