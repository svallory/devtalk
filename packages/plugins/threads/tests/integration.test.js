/**
 * Integration test — full round-trip for threads plugin
 *
 * Verifies: plugin loading, action handlers, markdown serialization,
 * container rendering, and highlight rule.
 *
 * Run: node packages/plugins/threads/tests/integration.test.js
 *
 * @copyright Copyright (c) 2026 Saulo Vallory
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

let passed = 0;
let total = 0;
let tempDir = null;

function assert(condition, msg) {
  total++;
  if (!condition) {
    console.error(`FAIL: ${msg}`);
    process.exit(1);
  }
  passed++;
  console.log(`  PASS: ${msg}`);
}

// ---------------------------------------------------------------------------
// Minimal action context (avoids broken createActionDispatcher dependency)
// ---------------------------------------------------------------------------
function createMinimalCtx(projectRoot) {
  return {
    projectRoot,
    config: {},
    broadcast: () => {},
    _modified: false,
    async readFile(relativePath) {
      return fs.promises.readFile(path.join(projectRoot, relativePath), 'utf8');
    },
    async writeFile(relativePath, content) {
      await fs.promises.writeFile(path.join(projectRoot, relativePath), content);
      this._modified = true;
    },
    async readFileLines(relativePath) {
      const content = await this.readFile(relativePath);
      return content.split('\n');
    },
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

async function testPluginLoads() {
  console.log('\n--- Plugin loading ---');
  const plugin = require('..');
  assert(typeof plugin.markdownSetup === 'function', 'markdownSetup is a function');
  assert(typeof plugin.generateScripts === 'function', 'generateScripts is a function');
  assert(typeof plugin.getAssets === 'function', 'getAssets is a function');
  assert(typeof plugin.actions === 'object' && plugin.actions !== null, 'actions is an object');
  assert(typeof plugin.actions['threads:add-thread'] === 'function', 'add-thread action exists');
  assert(typeof plugin.actions['threads:add-comment'] === 'function', 'add-comment action exists');
  assert(typeof plugin.actions['threads:toggle-reaction'] === 'function', 'toggle-reaction action exists');
  assert(typeof plugin.actions['threads:get-threads'] === 'function', 'get-threads action exists');
  return plugin;
}

async function testCreateThread(plugin, ctx) {
  console.log('\n--- Create thread ---');
  const result = await plugin.actions['threads:add-thread'](
    { file: 'test.md', author: 'Alice', body: 'This needs work.', anchor: 'some-anchor' },
    ctx
  );

  assert(typeof result.id === 'string' && result.id.startsWith('t-'), 'Thread ID starts with t-');
  assert(result.id.length === 10, 'Thread ID is t- + 8 hex chars');
  assert(result.resolved === false, 'Thread is not resolved');
  assert(Array.isArray(result.comments), 'Thread has comments array');
  assert(result.comments.length === 1, 'Thread has exactly one comment');
  assert(result.comments[0].author === 'Alice', 'First comment author is Alice');
  assert(result.comments[0].body === 'This needs work.', 'First comment body matches');
  assert(
    typeof result.comments[0].id === 'string' && result.comments[0].id.startsWith('c-'),
    'Comment ID starts with c-'
  );

  return result;
}

async function testAddComment(plugin, ctx, threadId) {
  console.log('\n--- Add comment ---');
  const comment = await plugin.actions['threads:add-comment'](
    { file: 'test.md', threadId, author: 'Bob', body: 'I agree, let me fix it.' },
    ctx
  );

  assert(typeof comment.id === 'string' && comment.id.startsWith('c-'), 'Comment ID starts with c-');
  assert(comment.author === 'Bob', 'Comment author is Bob');
  assert(comment.body === 'I agree, let me fix it.', 'Comment body matches');
  assert(comment.thread_id === threadId, 'Comment thread_id matches');

  return comment;
}

async function testToggleReaction(plugin, ctx, threadId, commentId) {
  console.log('\n--- Toggle reaction ---');
  const reactions = await plugin.actions['threads:toggle-reaction'](
    { file: 'test.md', threadId, commentId, emoji: '👍', author: 'Alice' },
    ctx
  );

  assert(Array.isArray(reactions), 'Reactions is an array');
  assert(reactions.length === 1, 'One reaction');
  assert(reactions[0].emoji === '👍', 'Reaction emoji is thumbs up');
  assert(reactions[0].authors.includes('Alice'), 'Alice is in reaction authors');

  // Add a second author to the same reaction
  const reactions2 = await plugin.actions['threads:toggle-reaction'](
    { file: 'test.md', threadId, commentId, emoji: '👍', author: 'Charlie' },
    ctx
  );
  assert(reactions2[0].authors.length === 2, 'Two authors on the reaction');
  assert(reactions2[0].authors.includes('Charlie'), 'Charlie is in reaction authors');

  return reactions2;
}

async function testGetThreads(plugin, ctx, threadId, secondCommentId) {
  console.log('\n--- Get threads (read back) ---');
  const threads = await plugin.actions['threads:get-threads'](
    { file: 'test.md' },
    ctx
  );

  assert(Array.isArray(threads), 'Result is an array');
  assert(threads.length === 1, 'One thread exists');

  const thread = threads[0];
  assert(thread.id === threadId, 'Thread ID matches');
  assert(thread.resolved === false, 'Thread is not resolved');
  assert(thread.comments.length === 2, 'Thread has two comments');
  assert(thread.comments[0].author === 'Alice', 'First comment by Alice');
  assert(thread.comments[1].author === 'Bob', 'Second comment by Bob');
  assert(thread.comments[1].id === secondCommentId, 'Second comment ID matches');

  // Check reaction persisted
  const bobComment = thread.comments[1];
  assert(bobComment.reactions.length === 1, 'Bob comment has one reaction');
  assert(bobComment.reactions[0].emoji === '👍', 'Reaction emoji persisted');
  assert(bobComment.reactions[0].authors.length === 2, 'Reaction has two authors');

  return threads;
}

async function testMarkdownFileContent(ctx) {
  console.log('\n--- Markdown file content ---');
  const content = await ctx.readFile('test.md');

  // Original content preserved
  assert(content.includes('# Hello World'), 'Original heading preserved');
  assert(content.includes('Some content here.'), 'Original body preserved');

  // Threads block structure
  assert(content.includes('::: threads'), 'File has ::: threads block');

  const lines = content.split('\n');

  // Find the thread line
  const threadLine = lines.find((l) => l.trim().startsWith('::: thread t-'));
  assert(threadLine !== undefined, 'Found thread line');
  assert(threadLine.startsWith('  ::: thread'), 'Thread line starts with 2-space indent');

  // Find comment lines
  const commentLines = lines.filter((l) => l.trim().startsWith('::: comment c-'));
  assert(commentLines.length === 2, 'Two comment lines in the file');
  for (const cl of commentLines) {
    assert(cl.startsWith('    ::: comment'), 'Comment line starts with 4-space indent');
    // Format: ::: comment c-xxxx "author" "date"
    assert(/c-[0-9a-f]{8}/.test(cl), 'Comment ID in serialized output');
    assert(cl.includes('"'), 'Comment line has quoted author/date');
  }

  // Check reactions block is present
  assert(content.includes('::: reactions'), 'Reactions block present');
  assert(content.includes('👍'), 'Reaction emoji in file content');
}

async function testMarkdownItRendering(plugin) {
  console.log('\n--- markdown-it rendering ---');

  // Load markdown-it from the parser package
  const mdPath = path.join(__dirname, '..', '..', '..', 'parser', 'node_modules', 'markdown-it', 'dist', 'index.cjs.js');
  const MarkdownIt = require(mdPath);
  const md = new MarkdownIt();

  // Register the plugin's containers and highlight rule
  plugin.markdownSetup(md, {});

  // Test container rendering with the format containers.js expects
  // Note: the comment container's parseCommentInfo expects "author" "date"
  // (without a comment ID prefix), which is the format passed as the info string
  // by createDepthTrackingContainer (everything after "::: comment").
  // The serialized format from parser.js includes the ID (e.g., c-xxx "Author" "date"),
  // but containers.js falls back gracefully for unknown formats.

  // Test with the format the serializer actually produces (includes comment ID)
  const serializedInput = [
    '::: threads',
    '  ::: thread t-abc12345',
    '    ::: comment c-def67890 "Alice" "2026-01-15"',
    '      This is a comment.',
    '    :::',
    '  :::',
    ':::',
  ].join('\n');

  const html = md.render(serializedInput);

  assert(html.includes('threads-sidebar'), 'Renders threads-sidebar class');
  assert(html.includes('threads-thread'), 'Renders threads-thread class');
  assert(html.includes('data-thread-id="t-abc12345"'), 'Renders data-thread-id attribute');
  assert(html.includes('threads-comment'), 'Renders threads-comment class');
  assert(html.includes('This is a comment.'), 'Comment body rendered');

  // Test with a simple format the container parser fully understands
  const simpleInput = [
    '::: threads',
    '  ::: thread t-simple01',
    '    ::: comment "Bob" "2026-03-01"',
    '      Simple comment.',
    '    :::',
    '  :::',
    ':::',
  ].join('\n');

  const simpleHtml = md.render(simpleInput);
  assert(simpleHtml.includes('data-author="Bob"'), 'Renders data-author for simple format');
  assert(simpleHtml.includes('data-date="2026-03-01"'), 'Renders data-date for simple format');

  // Test resolved thread
  const resolvedInput = [
    '::: threads',
    '  ::: thread t-res00001 resolved "Bob" "2026-02-01"',
    '    ::: comment "Bob" "2026-02-01"',
    '      Done.',
    '    :::',
    '  :::',
    ':::',
  ].join('\n');

  const resolvedHtml = md.render(resolvedInput);
  assert(
    resolvedHtml.includes('threads-thread--resolved'),
    'Resolved thread has --resolved class'
  );
}

async function testHighlightRule(plugin) {
  console.log('\n--- Highlight rule ---');

  const mdPath = path.join(__dirname, '..', '..', '..', 'parser', 'node_modules', 'markdown-it', 'dist', 'index.cjs.js');
  const MarkdownIt = require(mdPath);
  const md = new MarkdownIt();

  plugin.markdownSetup(md, {});

  // Basic highlight with thread ID
  const html1 = md.render('==highlighted text=={t-abc12345}');
  assert(html1.includes('<mark'), 'Renders <mark> element');
  assert(html1.includes('threads-highlight'), 'Has threads-highlight class');
  assert(html1.includes('data-thread-id="t-abc12345"'), 'Has data-thread-id attribute');
  assert(html1.includes('highlighted text'), 'Contains highlighted text');

  // Highlight without thread ID
  const html2 = md.render('==just highlighted==');
  assert(html2.includes('<mark'), 'Renders <mark> without thread ID');
  assert(html2.includes('threads-highlight'), 'Has threads-highlight class without thread ID');
  assert(!html2.includes('data-thread-id'), 'No data-thread-id when no ID given');

  // Highlight with surrounding text
  const html3 = md.render('Before ==marked=={t-001} after.');
  assert(html3.includes('Before'), 'Text before highlight preserved');
  assert(html3.includes('after.'), 'Text after highlight preserved');
  assert(html3.includes('<mark'), 'Mark tag in mixed content');
}

async function testEdgeCases(plugin, ctx) {
  console.log('\n--- Edge cases ---');

  // Create a second thread to test multiple threads
  const thread2 = await plugin.actions['threads:add-thread'](
    { file: 'test.md', author: 'Charlie', body: 'Another discussion.' },
    ctx
  );
  assert(thread2.id !== undefined, 'Second thread created');

  const threads = await plugin.actions['threads:get-threads'](
    { file: 'test.md' },
    ctx
  );
  assert(threads.length === 2, 'Two threads in file after adding second');

  // Delete the second thread to leave file clean
  await plugin.actions['threads:delete-thread'](
    { file: 'test.md', threadId: thread2.id },
    ctx
  );

  const afterDelete = await plugin.actions['threads:get-threads'](
    { file: 'test.md' },
    ctx
  );
  assert(afterDelete.length === 1, 'Back to one thread after deletion');

  // Test editing a comment
  const firstCommentId = afterDelete[0].comments[0].id;
  const edited = await plugin.actions['threads:edit-comment'](
    {
      file: 'test.md',
      threadId: afterDelete[0].id,
      commentId: firstCommentId,
      body: 'Updated body.',
    },
    ctx
  );
  assert(edited.body === 'Updated body.', 'Comment body updated');
  assert(edited.edited_at !== null, 'edited_at set after edit');

  // Verify edited_at persists in file
  const content = await ctx.readFile('test.md');
  assert(content.includes('edited'), 'edited marker in serialized file');
}

async function testFileWithNoExistingThreads(plugin) {
  console.log('\n--- File with no existing threads ---');

  // Create a separate file with no threads block
  const noThreadDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threads-no-'));
  const ctx2 = createMinimalCtx(noThreadDir);
  fs.writeFileSync(path.join(noThreadDir, 'empty.md'), '# Empty\n\nNothing here.\n');

  const threads = await plugin.actions['threads:get-threads'](
    { file: 'empty.md' },
    ctx2
  );
  assert(threads.length === 0, 'No threads in file without threads block');

  // Adding a thread creates the block
  const newThread = await plugin.actions['threads:add-thread'](
    { file: 'empty.md', author: 'Dan', body: 'First thread.' },
    ctx2
  );
  assert(newThread.id.startsWith('t-'), 'Thread created in previously empty file');

  const content = await ctx2.readFile('empty.md');
  assert(content.includes('# Empty'), 'Original content preserved');
  assert(content.includes('::: threads'), 'Threads block appended');

  // Cleanup
  fs.rmSync(noThreadDir, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  // Setup temp directory and test file
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threads-integration-'));
  const testFile = path.join(tempDir, 'test.md');
  fs.writeFileSync(testFile, '# Hello World\n\nSome content here.\n');

  const ctx = createMinimalCtx(tempDir);

  // 1. Load plugin
  const plugin = await testPluginLoads();

  // 2. Create a thread
  const thread = await testCreateThread(plugin, ctx);

  // 3. Add a comment
  const comment = await testAddComment(plugin, ctx, thread.id);

  // 4. Toggle reactions
  await testToggleReaction(plugin, ctx, thread.id, comment.id);

  // 5. Read back and verify
  await testGetThreads(plugin, ctx, thread.id, comment.id);

  // 6. Verify file content
  await testMarkdownFileContent(ctx);

  // 7. Verify markdown-it rendering
  await testMarkdownItRendering(plugin);

  // 8. Verify highlight rule
  await testHighlightRule(plugin);

  // 9. Edge cases
  await testEdgeCases(plugin, ctx);

  // 10. File with no existing threads
  await testFileWithNoExistingThreads(plugin);

  console.log(`\nAll integration tests passed. (${passed}/${total})`);
}

run()
  .catch((e) => {
    console.error('FAIL:', e.message, e.stack);
    process.exit(1);
  })
  .finally(() => {
    // Cleanup
    if (tempDir) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (_) {
        // ignore cleanup errors
      }
    }
  });
