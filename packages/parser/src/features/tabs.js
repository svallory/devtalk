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

  // Ignore first and last blank lines (common in container blocks)
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  let minIndent = Infinity;

  // Find minimum indentation of non-empty lines
  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.match(/^ */)[0].length;
    minIndent = Math.min(minIndent, indent);
  }

  // If no indentation to strip, return joined lines
  if (!isFinite(minIndent) || minIndent === 0) return lines.join('\n');

  // Strip exactly minIndent from each line
  return lines.map(line =>
    line.startsWith(' '.repeat(minIndent))
      ? line.slice(minIndent)
      : line
  ).join('\n');
}

// Helper to identify fences
function isFenceLine(line) {
  return /^(\s{0,3})(~{3,}|`{3,})/.test(line);
}

// The Parsing Rule
function tabsRule(state, startLine, endLine, silent) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  const lineContent = state.src.slice(start, max).trim();

  if (lineContent !== '::: tabs') return false;
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

  // Extract content
  let content = '';
  for (let i = startLine + 1; i < nextLine; i++) {
    const lineStart = state.bMarks[i];
    const lineEnd = state.eMarks[i];
    content += state.src.slice(lineStart, lineEnd) + '\n';
  }

  // Parse "== tab" lines
  const lines = content.split('\n');
  const tabs = [];
  let currentTab = null;
  let currentContentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();
    const tabMatch = trimmedLine.match(/^==\s*tab\s+(?:"([^"]+)"|(\S+))$/);

    if (tabMatch) {
      if (currentTab) {
        currentTab.content = smartDedent(currentContentLines.join('\n'));
        tabs.push(currentTab);
      }
      const title = tabMatch[1] || tabMatch[2];
      currentTab = { title: title, content: '' };
      currentContentLines = [];
    } else if (currentTab) {
      currentContentLines.push(rawLine);
    }
  }
  if (currentTab) {
    currentTab.content = smartDedent(currentContentLines.join('\n'));
    tabs.push(currentTab);
  }

  // Generate Tokens
  const openToken = state.push('tabs_open', 'div', 1);
  openToken.attrs = [['class', 'docmd-tabs']];
  openToken.map = [startLine, nextLine + 1];

  const navToken = state.push('tabs_nav_open', 'div', 1);
  tabs.forEach((tab, index) => {
    const navItemToken = state.push('tabs_nav_item', 'div', 0);
    navItemToken.attrs = [['class', `docmd-tabs-nav-item ${index === 0 ? 'active' : ''}`]];
    navItemToken.content = tab.title;
  });
  state.push('tabs_nav_close', 'div', -1);

  const contentToken = state.push('tabs_content_open', 'div', 1);
  tabs.forEach((tab, index) => {
    const paneToken = state.push('tab_pane_open', 'div', 1);
    paneToken.attrs = [['class', `docmd-tab-pane ${index === 0 ? 'active' : ''}`]];

    if (tab.content) {
      // Recurse parsing inside tabs
      const renderedContent = state.md.render(tab.content, state.env);
      const htmlToken = state.push('html_block', '', 0);
      htmlToken.content = renderedContent;
    }
    state.push('tab_pane_close', 'div', -1);
  });
  state.push('tabs_content_close', 'div', -1);
  state.push('tabs_close', 'div', -1);

  state.line = nextLine + 1;
  return true;
}

module.exports = {
  name: 'tabs',
  setup(md) {
    md.block.ruler.before('fence', 'enhanced_tabs', tabsRule, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });

    // Register Renderers
    md.renderer.rules.tabs_nav_open = () => '<div class="docmd-tabs-nav">';
    md.renderer.rules.tabs_nav_close = () => '</div>';
    md.renderer.rules.tabs_nav_item = (tokens, idx) => `<div class="${tokens[idx].attrs[0][1]}">${tokens[idx].content}</div>`;
    md.renderer.rules.tabs_content_open = () => '<div class="docmd-tabs-content">';
    md.renderer.rules.tabs_content_close = () => '</div>';
    md.renderer.rules.tab_pane_open = (tokens, idx) => `<div class="${tokens[idx].attrs[0][1]}">`;
    md.renderer.rules.tab_pane_close = () => '</div>';
    md.renderer.rules.tabs_close = () => '</div>';
  }
};