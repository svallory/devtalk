/**
 * Thread container rules — markdown-it rendering of ::: threads blocks
 *
 * Registers custom block rules for: threads, thread, comment, reactions.
 * Uses the same depth-tracking container pattern as common-containers.js
 * in @docmd/parser.
 *
 * @copyright Copyright (c) 2026 Saulo Vallory
 * @license MIT
 */

const path = require('path');

// Import createDepthTrackingContainer from the parser package
const {
  createDepthTrackingContainer,
} = require(path.join(__dirname, '..', '..', '..', '..', 'parser', 'src', 'features', 'common-containers.js'));

/**
 * Parse a thread info string.
 * Format: `<id> [resolved "<by>" "<date>"]`
 *
 * @param {string} info
 * @returns {{ id: string, resolved: boolean, resolvedBy: string|null, resolvedAt: string|null }}
 */
function parseThreadInfo(info) {
  const trimmed = info.trim();
  const resolvedMatch = trimmed.match(
    /^(\S+)\s+resolved\s+"([^"]+)"\s+"([^"]+)"$/
  );
  if (resolvedMatch) {
    return {
      id: resolvedMatch[1],
      resolved: true,
      resolvedBy: resolvedMatch[2],
      resolvedAt: resolvedMatch[3],
    };
  }

  const simpleMatch = trimmed.match(/^(\S+)$/);
  if (simpleMatch) {
    return {
      id: simpleMatch[1],
      resolved: false,
      resolvedBy: null,
      resolvedAt: null,
    };
  }

  return { id: 'unknown', resolved: false, resolvedBy: null, resolvedAt: null };
}

/**
 * Parse a comment info string.
 * Format: `"<author>" "<date>" [edited "<date>"]`
 *
 * @param {string} info
 * @returns {{ author: string, date: string, editedAt: string|null }}
 */
function parseCommentInfo(info) {
  const trimmed = info.trim();
  const editedMatch = trimmed.match(
    /^"([^"]+)"\s+"([^"]+)"\s+edited\s+"([^"]+)"$/
  );
  if (editedMatch) {
    return {
      author: editedMatch[1],
      date: editedMatch[2],
      editedAt: editedMatch[3],
    };
  }

  const simpleMatch = trimmed.match(/^"([^"]+)"\s+"([^"]+)"$/);
  if (simpleMatch) {
    return {
      author: simpleMatch[1],
      date: simpleMatch[2],
      editedAt: null,
    };
  }

  return { author: 'unknown', date: '', editedAt: null };
}

/**
 * Register all thread-related container rules on a markdown-it instance.
 *
 * @param {import('markdown-it')} md
 */
function setup(md) {
  // 1. threads — outer wrapper
  createDepthTrackingContainer(
    md,
    'threads',
    () => '<div class="threads-sidebar">\n',
    () => '</div>\n'
  );

  // 2. thread — individual thread
  createDepthTrackingContainer(
    md,
    'thread',
    (tokens, idx) => {
      const info = tokens[idx].info.trim();
      const parsed = parseThreadInfo(info);
      const resolvedClass = parsed.resolved ? ' threads-thread--resolved' : '';
      return `<div class="threads-thread${resolvedClass}" data-thread-id="${parsed.id}">\n`;
    },
    () => '</div>\n'
  );

  // 3. comment — individual comment
  createDepthTrackingContainer(
    md,
    'comment',
    (tokens, idx) => {
      const info = tokens[idx].info.trim();
      const parsed = parseCommentInfo(info);
      const editedAttr = parsed.editedAt ? ` data-edited="${parsed.editedAt}"` : '';
      return (
        `<div class="threads-comment" data-author="${parsed.author}" data-date="${parsed.date}"${editedAttr}>` +
        `<div class="threads-comment__meta"><strong>${parsed.author}</strong> &middot; ${parsed.date}</div>` +
        `<div class="threads-comment__body">\n`
      );
    },
    () => '</div></div>\n'
  );

  // 4. reactions — reactions container
  createDepthTrackingContainer(
    md,
    'reactions',
    () => '<div class="threads-reactions">\n',
    () => '</div>\n'
  );
}

module.exports = { setup, parseThreadInfo, parseCommentInfo };
