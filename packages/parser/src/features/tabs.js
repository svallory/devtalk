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

  // Parse "== tab" delimiters to find line ranges for each tab
  const tabs = [];
  let currentTab = null;

  for (let i = startLine + 1; i < nextLine; i++) {
    const lineStart = state.bMarks[i] + state.tShift[i];
    const lineEnd = state.eMarks[i];
    const lineContent = state.src.slice(lineStart, lineEnd).trim();
    const tabMatch = lineContent.match(/^==\s*tab\s+(?:"([^"]+)"|(\S+))$/);

    if (tabMatch) {
      if (currentTab) {
        currentTab.endLine = i;
        tabs.push(currentTab);
      }
      const title = tabMatch[1] || tabMatch[2];
      currentTab = { title, startLine: i + 1, endLine: nextLine };
    }
  }
  if (currentTab) {
    currentTab.endLine = nextLine;
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

    if (tab.startLine < tab.endLine) {
      const oldParentType = state.parentType;
      const oldLineMax = state.lineMax;
      state.parentType = 'container';
      state.lineMax = tab.endLine;
      state.md.block.tokenize(state, tab.startLine, tab.endLine);
      state.parentType = oldParentType;
      state.lineMax = oldLineMax;
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