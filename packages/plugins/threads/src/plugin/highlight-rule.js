/**
 * markdown-it inline rule for ==text=={thread-id} highlight syntax.
 *
 * Renders as: <mark class="threads-highlight" data-thread-id="thread-id">text</mark>
 * Without thread ID: <mark class="threads-highlight">text</mark>
 *
 * Copyright (c) 2026 Saulo Vallory. MIT License.
 */

'use strict';

const MARKER_CHAR = 0x3D; // '='

/**
 * Register the highlight_thread inline rule with a markdown-it instance.
 * @param {import('markdown-it')} md
 */
function setup(md) {
  md.inline.ruler.push('highlight_thread', highlightThreadRule);
}

/**
 * @param {import('markdown-it/lib/rules_inline/state_inline')} state
 * @param {boolean} silent
 * @returns {boolean}
 */
function highlightThreadRule(state, silent) {
  const src = state.src;
  const pos = state.pos;
  const max = state.posMax;

  // Need at least ==x== (5 chars)
  if (pos + 4 > max) return false;

  // Must start with ==
  if (src.charCodeAt(pos) !== MARKER_CHAR || src.charCodeAt(pos + 1) !== MARKER_CHAR) {
    return false;
  }

  // Content must not start immediately with another = (avoid ===)
  if (src.charCodeAt(pos + 2) === MARKER_CHAR) return false;

  // Scan for closing ==
  let closePos = pos + 2;
  while (closePos < max - 1) {
    if (src.charCodeAt(closePos) === MARKER_CHAR && src.charCodeAt(closePos + 1) === MARKER_CHAR) {
      break;
    }
    // No newlines allowed
    if (src.charCodeAt(closePos) === 0x0A) return false;
    closePos++;
  }

  // Did we find closing ==?
  if (closePos >= max - 1) return false;
  if (src.charCodeAt(closePos) !== MARKER_CHAR || src.charCodeAt(closePos + 1) !== MARKER_CHAR) {
    return false;
  }

  const content = src.slice(pos + 2, closePos);

  // Content must not be empty
  if (content.length === 0) return false;

  if (silent) return true;

  // Check for optional {thread-id} after closing ==
  let threadId = null;
  let endPos = closePos + 2;

  if (endPos < max && src.charCodeAt(endPos) === 0x7B /* { */) {
    const braceClose = src.indexOf('}', endPos + 1);
    if (braceClose !== -1) {
      threadId = src.slice(endPos + 1, braceClose);
      endPos = braceClose + 1;
    }
  }

  // Create tokens
  const openToken = state.push('mark_open', 'mark', 1);
  openToken.attrSet('class', 'threads-highlight');
  if (threadId) {
    openToken.attrSet('data-thread-id', threadId);
  }
  openToken.markup = '==';

  // Parse inner content as inline markup so nested syntax (bold, italic, etc.) works.
  // We tokenize into the current token stream by saving/restoring state.pos/posMax.
  const oldPos = state.pos;
  const oldMax = state.posMax;
  state.pos = pos + 2;
  state.posMax = closePos;
  state.md.inline.tokenize(state);
  state.pos = oldPos;
  state.posMax = oldMax;

  const closeToken = state.push('mark_close', 'mark', -1);
  closeToken.markup = '==';

  state.pos = endPos;
  return true;
}

module.exports = { setup };
