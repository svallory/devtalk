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

function stepsRule(state, startLine, endLine, silent) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  const lineContent = state.src.slice(start, max).trim();
  if (lineContent !== '::: steps') return false;
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

  const openToken = state.push('steps_open', 'div', 1);
  openToken.info = '';
  openToken.map = [startLine, nextLine + 1];

  const oldParentType = state.parentType;
  const oldLineMax = state.lineMax;
  state.parentType = 'container';
  state.lineMax = nextLine;

  state.md.block.tokenize(state, startLine + 1, nextLine);

  const closeToken = state.push('steps_close', 'div', -1);

  state.parentType = oldParentType;
  state.lineMax = oldLineMax;
  state.line = nextLine + 1;
  return true;
}

module.exports = {
  name: 'steps',
  setup(md) {
    md.block.ruler.before('fence', 'steps_container', stepsRule, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });

    // Custom List Renderer for Steps
    md.renderer.rules.steps_open = () => '<div class="docmd-container steps steps-reset">';
    md.renderer.rules.steps_close = () => '</div>';

    // Hook into list rendering to add classes when inside steps
    md.renderer.rules.ordered_list_open = function (tokens, idx, options, env, self) {
      let isInSteps = false;
      // Check tokens backward to see if we are inside a steps container
      for (let i = idx - 1; i >= 0; i--) {
        if (tokens[i].type === 'steps_open') { isInSteps = true; break; }
        if (tokens[i].type === 'steps_close') break;
      }
      if (isInSteps) {
        const start = tokens[idx].attrGet('start');
        return start ? `<ol class="steps-list" start="${start}">` : '<ol class="steps-list">';
      }
      return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.list_item_open = function (tokens, idx, options, env, self) {
      let isInSteps = false;
      for (let i = idx - 1; i >= 0; i--) {
        if (tokens[i].type === 'steps_open') { isInSteps = true; break; }
        if (tokens[i].type === 'steps_close') break;
      }
      if (isInSteps) return '<li class="step-item">';
      return '<li>';
    };
  }
};