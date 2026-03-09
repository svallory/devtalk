/**
 * Thread parser — serialize/deserialize ::: threads block
 *
 * @copyright Copyright (c) 2026 Saulo Vallory
 * @license MIT
 */

const crypto = require('crypto');

/**
 * Generate a comment ID: "c-" + 8 random hex chars.
 * @returns {string}
 */
function generateCommentId() {
  return 'c-' + crypto.randomBytes(4).toString('hex');
}

/**
 * Find the start and end line indices of the top-level `::: threads` block.
 * Returns null if no block found.
 *
 * @param {string[]} lines
 * @returns {{ start: number, end: number } | null}
 */
function findThreadsBlockBounds(lines) {
  let start = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '::: threads') {
      start = i;
      break;
    }
  }

  if (start === -1) return null;

  // Track depth to find matching close
  let depth = 1;
  for (let i = start + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('::: ') || (trimmed === ':::' + '')) {
      // Distinguish opening vs closing
      if (trimmed === ':::') {
        depth--;
        if (depth === 0) {
          return { start, end: i };
        }
      } else {
        depth++;
      }
    }
  }

  // Unclosed block — treat rest of file as the block
  return { start, end: lines.length - 1 };
}

/**
 * Parse a container block (lines between opening ::: and closing :::).
 * Returns array of child containers, each with { infoString, contentLines, startLine }.
 *
 * @param {string[]} lines - lines inside the parent container (not including parent's ::: open/close)
 * @returns {Array<{ infoString: string, contentLines: string[], startLine: number }>}
 */
function parseChildContainers(lines) {
  const children = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('::: ')) {
      const infoString = trimmed.slice(4); // everything after "::: "
      const startLine = i;
      let depth = 1;
      const contentLines = [];
      i++;

      while (i < lines.length && depth > 0) {
        const t = lines[i].trim();
        if (t === ':::') {
          depth--;
          if (depth === 0) break;
          contentLines.push(lines[i]);
        } else if (t.startsWith('::: ')) {
          depth++;
          contentLines.push(lines[i]);
        } else {
          contentLines.push(lines[i]);
        }
        i++;
      }

      children.push({ infoString, contentLines, startLine });
    }
    i++;
  }

  return children;
}

/**
 * Parse the info string of a thread container.
 * Format: `thread <id> [resolved "<by>" "<date>"]`
 *
 * @param {string} info
 * @returns {{ id: string, resolved: boolean, resolved_by: string|null, resolved_at: string|null }}
 */
function parseThreadInfo(info) {
  const resolvedMatch = info.match(
    /^thread\s+(\S+)\s+resolved\s+"([^"]+)"\s+"([^"]+)"$/
  );
  if (resolvedMatch) {
    return {
      id: resolvedMatch[1],
      resolved: true,
      resolved_by: resolvedMatch[2],
      resolved_at: resolvedMatch[3],
    };
  }

  const simpleMatch = info.match(/^thread\s+(\S+)$/);
  if (simpleMatch) {
    return {
      id: simpleMatch[1],
      resolved: false,
      resolved_by: null,
      resolved_at: null,
    };
  }

  return null;
}

/**
 * Parse the info string of a comment container.
 * Format: `comment <id> "<author>" "<date>" [edited "<date>"]`
 * Legacy format (no id): `comment "<author>" "<date>" [edited "<date>"]`
 *
 * @param {string} info
 * @returns {{ id: string|null, author: string, date: string, edited_at: string|null } | null}
 */
function parseCommentInfo(info) {
  // New format with ID: comment <id> "<author>" "<date>" [edited "<date>"]
  const editedWithIdMatch = info.match(
    /^comment\s+(\S+)\s+"([^"]+)"\s+"([^"]+)"\s+edited\s+"([^"]+)"$/
  );
  if (editedWithIdMatch) {
    return {
      id: editedWithIdMatch[1],
      author: editedWithIdMatch[2],
      date: editedWithIdMatch[3],
      edited_at: editedWithIdMatch[4],
    };
  }

  const simpleWithIdMatch = info.match(/^comment\s+(\S+)\s+"([^"]+)"\s+"([^"]+)"$/);
  if (simpleWithIdMatch) {
    return {
      id: simpleWithIdMatch[1],
      author: simpleWithIdMatch[2],
      date: simpleWithIdMatch[3],
      edited_at: null,
    };
  }

  // Legacy format without ID: comment "<author>" "<date>" [edited "<date>"]
  const editedMatch = info.match(
    /^comment\s+"([^"]+)"\s+"([^"]+)"\s+edited\s+"([^"]+)"$/
  );
  if (editedMatch) {
    return {
      id: null,
      author: editedMatch[1],
      date: editedMatch[2],
      edited_at: editedMatch[3],
    };
  }

  const simpleMatch = info.match(/^comment\s+"([^"]+)"\s+"([^"]+)"$/);
  if (simpleMatch) {
    return {
      id: null,
      author: simpleMatch[1],
      date: simpleMatch[2],
      edited_at: null,
    };
  }

  return null;
}

/**
 * Parse reactions from content lines inside a ::: reactions block.
 * Each line: `- <emoji> <author1>, <author2>, ...`
 *
 * @param {string[]} lines
 * @returns {Array<{ emoji: string, authors: string[] }>}
 */
function parseReactions(lines) {
  const reactions = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(/^-\s+(\S+)\s+(.+)$/);
    if (match) {
      const emoji = match[1];
      const authors = match[2].split(',').map((a) => a.trim()).filter(Boolean);
      reactions.push({ emoji, authors });
    }
  }
  return reactions;
}

/**
 * Strip indentation common to all non-empty lines, then trim leading/trailing blank lines.
 *
 * @param {string[]} lines
 * @returns {string}
 */
function extractBody(lines) {
  // Find minimum indentation of non-empty lines
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim() === '') continue;
    const indent = line.match(/^(\s*)/)[1].length;
    if (indent < minIndent) minIndent = indent;
  }
  if (minIndent === Infinity) minIndent = 0;

  const stripped = lines.map((l) => (l.trim() === '' ? '' : l.slice(minIndent)));

  // Trim leading and trailing empty lines
  while (stripped.length > 0 && stripped[0].trim() === '') stripped.shift();
  while (stripped.length > 0 && stripped[stripped.length - 1].trim() === '') stripped.pop();

  return stripped.join('\n');
}

/**
 * Parse a comment container's content lines into body and reactions.
 *
 * @param {string[]} contentLines
 * @returns {{ body: string, reactions: Array<{ emoji: string, authors: string[] }> }}
 */
function parseCommentContent(contentLines) {
  // Find if there's a ::: reactions block
  let reactionsStart = -1;
  let reactionsEnd = -1;

  for (let i = 0; i < contentLines.length; i++) {
    if (contentLines[i].trim() === '::: reactions') {
      reactionsStart = i;
      let depth = 1;
      for (let j = i + 1; j < contentLines.length; j++) {
        const t = contentLines[j].trim();
        if (t === ':::') {
          depth--;
          if (depth === 0) {
            reactionsEnd = j;
            break;
          }
        } else if (t.startsWith('::: ')) {
          depth++;
        }
      }
      break;
    }
  }

  let reactions = [];
  let bodyLines;

  if (reactionsStart >= 0 && reactionsEnd >= 0) {
    reactions = parseReactions(contentLines.slice(reactionsStart + 1, reactionsEnd));
    // Body is everything except the reactions block
    bodyLines = [
      ...contentLines.slice(0, reactionsStart),
      ...contentLines.slice(reactionsEnd + 1),
    ];
  } else {
    bodyLines = contentLines;
  }

  const body = extractBody(bodyLines);
  return { body, reactions };
}

/**
 * Parse threads from markdown content.
 *
 * @param {string} markdownContent
 * @returns {Array<Thread>}
 */
function parseThreadsFromContent(markdownContent) {
  const lines = markdownContent.split('\n');
  const bounds = findThreadsBlockBounds(lines);
  if (!bounds) return [];

  const innerLines = lines.slice(bounds.start + 1, bounds.end);
  const threadContainers = parseChildContainers(innerLines);
  const threads = [];

  for (const tc of threadContainers) {
    const threadInfo = parseThreadInfo(tc.infoString);
    if (!threadInfo) continue;

    const commentContainers = parseChildContainers(tc.contentLines);
    const comments = [];

    for (const cc of commentContainers) {
      const commentInfo = parseCommentInfo(cc.infoString);
      if (!commentInfo) continue;

      const { body, reactions } = parseCommentContent(cc.contentLines);

      comments.push({
        id: commentInfo.id || generateCommentId(),
        thread_id: threadInfo.id,
        author: commentInfo.author,
        date: commentInfo.date,
        edited_at: commentInfo.edited_at,
        body,
        reactions,
      });
    }

    threads.push({
      id: threadInfo.id,
      resolved: threadInfo.resolved,
      resolved_by: threadInfo.resolved_by,
      resolved_at: threadInfo.resolved_at,
      comments,
    });
  }

  return threads;
}

/**
 * Serialize threads to a ::: threads block string.
 *
 * @param {Array<Thread>} threads
 * @returns {string}
 */
function serializeThreadsBlock(threads) {
  if (threads.length === 0) return '';

  const lines = ['::: threads'];

  for (const thread of threads) {
    let threadLine = `  ::: thread ${thread.id}`;
    if (thread.resolved && thread.resolved_by && thread.resolved_at) {
      threadLine += ` resolved "${thread.resolved_by}" "${thread.resolved_at}"`;
    }
    lines.push(threadLine);

    for (let ci = 0; ci < thread.comments.length; ci++) {
      const comment = thread.comments[ci];
      let commentLine = `    ::: comment ${comment.id} "${comment.author}" "${comment.date}"`;
      if (comment.edited_at) {
        commentLine += ` edited "${comment.edited_at}"`;
      }
      lines.push(commentLine);

      // Indent body to 6 spaces (container depth 3)
      const bodyLines = comment.body.split('\n');
      for (const bl of bodyLines) {
        lines.push(bl === '' ? '' : `      ${bl}`);
      }

      // Reactions
      if (comment.reactions && comment.reactions.length > 0) {
        lines.push('');
        lines.push('      ::: reactions');
        for (const r of comment.reactions) {
          lines.push(`        - ${r.emoji} ${r.authors.join(', ')}`);
        }
        lines.push('      :::');
      }

      lines.push('    :::');

      // Blank line between comments (not after the last one)
      if (ci < thread.comments.length - 1) {
        lines.push('');
      }
    }

    lines.push('  :::');
  }

  lines.push(':::');
  return lines.join('\n') + '\n';
}

/**
 * Replace (or append) the threads block in a full markdown file.
 *
 * @param {string} markdownContent
 * @param {Array<Thread>} threads
 * @returns {string}
 */
function replaceThreadsBlock(markdownContent, threads) {
  const lines = markdownContent.split('\n');
  const bounds = findThreadsBlockBounds(lines);
  const serialized = serializeThreadsBlock(threads);

  if (bounds) {
    // Replace existing block
    const before = lines.slice(0, bounds.start);
    const after = lines.slice(bounds.end + 1);

    if (serialized === '') {
      // Remove block entirely, trim extra blank lines at boundary
      const result = [...before, ...after].join('\n');
      // Clean up double blank lines at the splice point
      return result.replace(/\n{3,}/g, '\n\n');
    }

    return [...before, ...serialized.trimEnd().split('\n'), ...after].join('\n');
  }

  // No existing block — append
  if (serialized === '') return markdownContent;

  // Ensure there's a blank line before the threads block
  const trimmedContent = markdownContent.trimEnd();
  return trimmedContent + '\n\n' + serialized;
}

module.exports = {
  parseThreadsFromContent,
  serializeThreadsBlock,
  replaceThreadsBlock,
};
