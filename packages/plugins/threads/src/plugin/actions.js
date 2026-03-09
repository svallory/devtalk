/**
 * Thread action handlers — server-side read/write operations on ::: threads blocks
 *
 * @copyright Copyright (c) 2026 Saulo Vallory
 * @license MIT
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const parser = require('./parser');

/**
 * Resolve the .threads directory inside the docs source folder.
 * Falls back to projectRoot if config.src is not available.
 * @param {object} ctx
 * @returns {string}
 */
function getThreadsDir(ctx) {
  const srcDir = ctx.config?.src || '';
  return path.join(ctx.projectRoot, srcDir, '.threads');
}

/**
 * Read the authors map from <docsRoot>/.threads/authors.json.
 * Returns {} if file doesn't exist.
 * @param {object} ctx
 * @returns {Promise<object>}
 */
async function readAuthors(ctx) {
  const filePath = path.join(getThreadsDir(ctx), 'authors.json');
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    if (e.code === 'ENOENT') return {};
    throw e;
  }
}

/**
 * Write the authors map to <docsRoot>/.threads/authors.json.
 * Creates the directory if needed.
 * @param {object} ctx
 * @param {object} authors
 */
async function writeAuthors(ctx, authors) {
  const dirPath = getThreadsDir(ctx);
  const filePath = path.join(dirPath, 'authors.json');
  await fs.promises.mkdir(dirPath, { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify(authors, null, 2) + '\n');
}

/**
 * Upsert an author entry. Updates name/avatarUrl if provided.
 * @param {object} ctx
 * @param {string} authorKey
 * @param {string} name
 * @param {string} [avatarUrl]
 */
async function upsertAuthor(ctx, authorKey, name, avatarUrl) {
  const authors = await readAuthors(ctx);
  const existing = authors[authorKey] || {};
  authors[authorKey] = {
    name: name || existing.name || authorKey,
    avatarUrl: avatarUrl || existing.avatarUrl || '',
  };
  await writeAuthors(ctx, authors);
}

/**
 * Generate a thread ID: "t-" + 8 random hex chars.
 * @returns {string}
 */
function generateThreadId() {
  return 't-' + crypto.randomBytes(4).toString('hex');
}

/**
 * Generate a comment ID: "c-" + 8 random hex chars.
 * @returns {string}
 */
function generateCommentId() {
  return 'c-' + crypto.randomBytes(4).toString('hex');
}

/**
 * Get today's date in YYYY-MM-DD format.
 * @returns {string}
 */
function todayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Read a file's content and parse its threads.
 * @param {string} file
 * @param {object} ctx
 * @returns {Promise<{ content: string, threads: Array }>}
 */
async function readAndParse(file, ctx) {
  const content = await ctx.readFile(file);
  const threads = parser.parseThreadsFromContent(content);
  return { content, threads };
}

/**
 * Write threads back to a file, replacing the existing threads block.
 * @param {string} file
 * @param {string} content - original file content
 * @param {Array} threads - updated threads array
 * @param {object} ctx
 */
async function writeBack(file, content, threads, ctx) {
  const updated = parser.replaceThreadsBlock(content, threads);
  await ctx.writeFile(file, updated);
}

/**
 * Find a thread by ID, throwing if not found.
 * @param {Array} threads
 * @param {string} threadId
 * @returns {object}
 */
function findThread(threads, threadId) {
  const thread = threads.find((t) => t.id === threadId);
  if (!thread) throw new Error(`Thread not found: ${threadId}`);
  return thread;
}

/**
 * Find a comment by ID within a thread, throwing if not found.
 * @param {object} thread
 * @param {string} commentId
 * @returns {object}
 */
function findComment(thread, commentId) {
  const comment = thread.comments.find((c) => c.id === commentId);
  if (!comment) throw new Error(`Comment not found: ${commentId}`);
  return comment;
}

/**
 * Validate that required string fields are present and non-empty.
 * @param {string} action - action name for error messages
 * @param {object} payload
 * @param {string[]} fields
 */
function requireFields(action, payload, fields) {
  for (const field of fields) {
    if (!payload[field] || (typeof payload[field] === 'string' && !payload[field].trim())) {
      throw new Error(`${action}: ${field} is required`);
    }
  }
}

const actions = {
  /**
   * Get the authors map. Read-only, no reload.
   */
  'threads:get-authors': async (payload, ctx) => {
    return readAuthors(ctx);
  },

  /**
   * Upsert an author entry directly.
   */
  'threads:upsert-author': async (payload, ctx) => {
    requireFields('threads:upsert-author', payload, ['authorKey', 'name']);
    await upsertAuthor(ctx, payload.authorKey, payload.name, payload.avatarUrl);
    return { ok: true };
  },

  /**
   * Get all threads from a file. Read-only, no reload.
   */
  'threads:get-threads': async (payload, ctx) => {
    requireFields('threads:get-threads', payload, ['file']);
    const content = await ctx.readFile(payload.file);
    return parser.parseThreadsFromContent(content);
  },

  /**
   * Add a new thread with its first comment.
   */
  'threads:add-thread': async (payload, ctx) => {
    requireFields('threads:add-thread', payload, ['file', 'author', 'body']);
    const { file, author, body, anchor, authorKey, avatarUrl } = payload;

    // Upsert author profile if key provided
    if (authorKey) {
      await upsertAuthor(ctx, authorKey, author, avatarUrl);
    }
    const { content, threads } = await readAndParse(file, ctx);

    const threadId = generateThreadId();
    const commentId = generateCommentId();
    const date = todayDate();

    const thread = {
      id: threadId,
      resolved: false,
      resolved_by: null,
      resolved_at: null,
      comments: [
        {
          id: commentId,
          thread_id: threadId,
          parent_id: null,
          author,
          date,
          edited_at: null,
          body,
          reactions: [],
        },
      ],
    };

    threads.push(thread);

    // If anchor has a quote, wrap it with highlight markup in the document body
    let contentForWrite = content;
    if (anchor && anchor.quote) {
      const quote = anchor.quote;
      // Split at ::: threads boundary to avoid matching inside the threads block
      const threadsIdx = content.indexOf('\n::: threads');
      let bodyContent, rest;
      if (threadsIdx >= 0) {
        bodyContent = content.slice(0, threadsIdx);
        rest = content.slice(threadsIdx);
      } else {
        bodyContent = content;
        rest = '';
      }

      const quoteIdx = bodyContent.indexOf(quote);
      if (quoteIdx >= 0) {
        bodyContent =
          bodyContent.slice(0, quoteIdx) +
          `==${quote}=={${threadId}}` +
          bodyContent.slice(quoteIdx + quote.length);
      }

      contentForWrite = bodyContent + rest;
    }

    const updated = parser.replaceThreadsBlock(contentForWrite, threads);
    await ctx.writeFile(file, updated);
    return thread;
  },

  /**
   * Add a comment to an existing thread.
   */
  'threads:add-comment': async (payload, ctx) => {
    requireFields('threads:add-comment', payload, ['file', 'threadId', 'author', 'body']);
    const { file, threadId, author, body, parentId, authorKey, avatarUrl } = payload;

    // Upsert author profile if key provided
    if (authorKey) {
      await upsertAuthor(ctx, authorKey, author, avatarUrl);
    }
    const { content, threads } = await readAndParse(file, ctx);
    const thread = findThread(threads, threadId);

    const commentId = generateCommentId();
    const date = todayDate();

    const comment = {
      id: commentId,
      thread_id: threadId,
      parent_id: parentId || null,
      author,
      date,
      edited_at: null,
      body,
      reactions: [],
    };

    thread.comments.push(comment);
    await writeBack(file, content, threads, ctx);
    return comment;
  },

  /**
   * Edit an existing comment's body.
   */
  'threads:edit-comment': async (payload, ctx) => {
    requireFields('threads:edit-comment', payload, ['file', 'threadId', 'commentId', 'body']);
    const { file, threadId, commentId, body } = payload;
    const { content, threads } = await readAndParse(file, ctx);
    const thread = findThread(threads, threadId);
    const comment = findComment(thread, commentId);

    comment.body = body;
    comment.edited_at = todayDate();

    await writeBack(file, content, threads, ctx);
    return comment;
  },

  /**
   * Delete a comment from a thread.
   */
  'threads:delete-comment': async (payload, ctx) => {
    requireFields('threads:delete-comment', payload, ['file', 'threadId', 'commentId']);
    const { file, threadId, commentId } = payload;
    const { content, threads } = await readAndParse(file, ctx);
    const thread = findThread(threads, threadId);

    const idx = thread.comments.findIndex((c) => c.id === commentId);
    if (idx === -1) throw new Error(`Comment not found: ${commentId}`);
    thread.comments.splice(idx, 1);

    await writeBack(file, content, threads, ctx);
    return { deleted: true };
  },

  /**
   * Delete an entire thread.
   */
  'threads:delete-thread': async (payload, ctx) => {
    requireFields('threads:delete-thread', payload, ['file', 'threadId']);
    const { file, threadId } = payload;
    let { content, threads } = await readAndParse(file, ctx);

    const idx = threads.findIndex((t) => t.id === threadId);
    if (idx === -1) throw new Error(`Thread not found: ${threadId}`);
    threads.splice(idx, 1);

    // Remove orphaned ==highlight=={threadId} markup from the body,
    // keeping just the inner text
    const highlightRe = new RegExp(`==((?:(?!==).)+)==\\{${threadId}\\}`, 'g');
    content = content.replace(highlightRe, '$1');

    await writeBack(file, content, threads, ctx);
    return { deleted: true };
  },

  /**
   * Toggle resolved status on a thread.
   */
  'threads:resolve-thread': async (payload, ctx) => {
    requireFields('threads:resolve-thread', payload, ['file', 'threadId', 'resolved_by']);
    const { file, threadId, resolved_by } = payload;
    const { content, threads } = await readAndParse(file, ctx);
    const thread = findThread(threads, threadId);

    if (thread.resolved) {
      thread.resolved = false;
      thread.resolved_by = null;
      thread.resolved_at = null;
    } else {
      thread.resolved = true;
      thread.resolved_by = resolved_by;
      thread.resolved_at = todayDate();
    }

    await writeBack(file, content, threads, ctx);
    return thread;
  },

  /**
   * Toggle a reaction emoji on a comment.
   */
  'threads:toggle-reaction': async (payload, ctx) => {
    requireFields('threads:toggle-reaction', payload, ['file', 'threadId', 'commentId', 'emoji', 'author']);
    const { file, threadId, commentId, emoji, author } = payload;
    const { content, threads } = await readAndParse(file, ctx);
    const thread = findThread(threads, threadId);
    const comment = findComment(thread, commentId);

    if (!comment.reactions) comment.reactions = [];

    const reaction = comment.reactions.find((r) => r.emoji === emoji);

    if (reaction) {
      const authorIdx = reaction.authors.indexOf(author);
      if (authorIdx >= 0) {
        // Remove author from this reaction
        reaction.authors.splice(authorIdx, 1);
        // If no authors left, remove the reaction entirely
        if (reaction.authors.length === 0) {
          const reactionIdx = comment.reactions.indexOf(reaction);
          comment.reactions.splice(reactionIdx, 1);
        }
      } else {
        // Add author to existing reaction
        reaction.authors.push(author);
      }
    } else {
      // Create new reaction
      comment.reactions.push({ emoji, authors: [author] });
    }

    await writeBack(file, content, threads, ctx);
    return comment.reactions;
  },
};

module.exports = { actions };
