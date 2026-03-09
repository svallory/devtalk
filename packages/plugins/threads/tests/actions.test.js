/**
 * Tests for threads action handlers
 *
 * Run: node packages/plugins/threads/tests/actions.test.js
 *
 * @copyright Copyright (c) 2026 Saulo Vallory
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { actions } = require('../src/plugin/actions');

let passed = 0;
let total = 0;

function assert(condition, msg) {
  total++;
  if (!condition) {
    console.error(`FAIL: ${msg}`);
    process.exit(1);
  }
  passed++;
  console.log(`  PASS: ${msg}`);
}

function assertDeepEqual(actual, expected, msg) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  assert(a === e, `${msg}\n    expected: ${e}\n    actual:   ${a}`);
}

const today = new Date().toISOString().split('T')[0];

/**
 * Create a context object matching what the action dispatcher provides.
 */
function createCtx(projectRoot) {
  const ctx = {
    projectRoot,
    config: {},
    broadcast: () => {},
    _modified: false,
    source: { _modified: false },
    async readFile(relativePath) {
      const resolved = path.resolve(projectRoot, relativePath);
      return fs.promises.readFile(resolved, 'utf8');
    },
    async writeFile(relativePath, content) {
      const resolved = path.resolve(projectRoot, relativePath);
      await fs.promises.writeFile(resolved, content);
      ctx._modified = true;
    },
    async readFileLines(relativePath) {
      const content = await ctx.readFile(relativePath);
      return content.split('\n');
    },
  };
  return ctx;
}

/**
 * Call an action handler and return { result, reload } like the dispatcher does.
 */
async function handleCall(actionName, payload, projectRoot) {
  const handler = actions[actionName];
  if (!handler) throw new Error(`Unknown action: ${actionName}`);
  const ctx = createCtx(projectRoot);
  const result = await handler(payload, ctx);
  return { result, reload: ctx._modified || ctx.source._modified };
}

async function run() {
  // Create a temp directory with a test markdown file
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threads-actions-'));
  const testFile = 'test.md';
  const testFilePath = path.join(tempDir, testFile);

  // Write an initial file with no threads
  fs.writeFileSync(testFilePath, `# Test Document\n\nSome content here.\n`);

  // ─── Test 1: get-threads on empty file → empty array, reload=false ───
  console.log('\nTest 1: get-threads on empty file');

  const getEmpty = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  assert(Array.isArray(getEmpty.result), 'get-threads returns an array');
  assert(getEmpty.result.length === 0, 'get-threads returns empty array for file without threads');
  assert(getEmpty.reload === false, 'get-threads reload is false (read-only)');

  // ─── Test 2: add-thread → creates thread with ID, reload=true ───
  console.log('\nTest 2: add-thread creates a thread');

  const addThread1 = await handleCall('threads:add-thread', {
    file: testFile,
    author: 'alice',
    body: 'This needs to be reworded.',
    anchor: '#section-1',
  }, tempDir);

  const thread1 = addThread1.result;
  assert(addThread1.reload === true, 'add-thread reload is true');
  assert(thread1.id.startsWith('t-'), 'thread id starts with t-');
  assert(thread1.id.length === 10, 'thread id is t- + 8 hex chars');
  assert(thread1.resolved === false, 'new thread is not resolved');
  assert(thread1.comments.length === 1, 'new thread has 1 comment');
  assert(thread1.comments[0].author === 'alice', 'first comment author is alice');
  assert(thread1.comments[0].body === 'This needs to be reworded.', 'first comment body matches');
  assert(thread1.comments[0].date === today, 'first comment date is today');
  assert(thread1.comments[0].id.startsWith('c-'), 'comment id starts with c-');
  assert(thread1.comments[0].id.length === 10, 'comment id is c- + 8 hex chars');

  // ─── Test 3: add-comment → appends to thread, reload=true ───
  console.log('\nTest 3: add-comment appends to thread');

  const addComment = await handleCall('threads:add-comment', {
    file: testFile,
    threadId: thread1.id,
    author: 'bob',
    body: 'I agree, let me fix it.',
  }, tempDir);

  const newComment = addComment.result;
  assert(addComment.reload === true, 'add-comment reload is true');
  assert(newComment.id.startsWith('c-'), 'new comment id starts with c-');
  assert(newComment.author === 'bob', 'new comment author is bob');
  assert(newComment.body === 'I agree, let me fix it.', 'new comment body matches');
  assert(newComment.date === today, 'new comment date is today');
  assert(newComment.thread_id === thread1.id, 'new comment thread_id matches');

  // ─── Test 4: get-threads after adds → returns correct data ───
  console.log('\nTest 4: get-threads after adds');

  const getAfterAdds = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  assert(getAfterAdds.result.length === 1, 'still has 1 thread');
  assert(getAfterAdds.result[0].comments.length === 2, 'thread now has 2 comments');
  assert(getAfterAdds.result[0].comments[0].author === 'alice', 'first comment is alice');
  assert(getAfterAdds.result[0].comments[1].author === 'bob', 'second comment is bob');

  // ─── Test 5: edit-comment → updates body + edited_at, reload=true ───
  console.log('\nTest 5: edit-comment');

  // Need to get the actual comment ID from the file (parser generates new IDs on parse)
  const preEdit = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  const bobCommentIdForEdit = preEdit.result[0].comments[1].id;

  const editResult = await handleCall('threads:edit-comment', {
    file: testFile,
    threadId: thread1.id,
    commentId: bobCommentIdForEdit,
    body: 'Updated: I will fix it tomorrow.',
  }, tempDir);

  assert(editResult.reload === true, 'edit-comment reload is true');
  assert(editResult.result.body === 'Updated: I will fix it tomorrow.', 'edited body matches');
  assert(editResult.result.edited_at === today, 'edited_at is set to today');

  // Verify via get-threads
  const afterEdit = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  assert(afterEdit.result[0].comments[1].body === 'Updated: I will fix it tomorrow.', 'get-threads reflects edit');
  assert(afterEdit.result[0].comments[1].edited_at === today, 'get-threads reflects edited_at');

  // ─── Test 6: toggle-reaction → add then remove, reload=true ───
  console.log('\nTest 6: toggle-reaction');

  const firstCommentId = afterEdit.result[0].comments[0].id;

  // Add a reaction
  const addReaction = await handleCall('threads:toggle-reaction', {
    file: testFile,
    threadId: thread1.id,
    commentId: firstCommentId,
    emoji: '👍',
    author: 'bob',
  }, tempDir);

  assert(addReaction.reload === true, 'toggle-reaction reload is true');
  assert(addReaction.result.length === 1, 'one reaction after adding');
  assert(addReaction.result[0].emoji === '👍', 'reaction emoji matches');
  assertDeepEqual(addReaction.result[0].authors, ['bob'], 'reaction authors after add');

  // Add same emoji from another author
  const addReaction2 = await handleCall('threads:toggle-reaction', {
    file: testFile,
    threadId: thread1.id,
    commentId: firstCommentId,
    emoji: '👍',
    author: 'charlie',
  }, tempDir);

  assert(addReaction2.result.length === 1, 'still one reaction type');
  assertDeepEqual(addReaction2.result[0].authors, ['bob', 'charlie'], 'reaction authors after second add');

  // Remove (toggle off) bob's reaction
  const removeReaction = await handleCall('threads:toggle-reaction', {
    file: testFile,
    threadId: thread1.id,
    commentId: firstCommentId,
    emoji: '👍',
    author: 'bob',
  }, tempDir);

  assert(removeReaction.result.length === 1, 'still one reaction after removing one author');
  assertDeepEqual(removeReaction.result[0].authors, ['charlie'], 'bob removed from authors');

  // Remove last author → reaction removed entirely
  const removeLastReaction = await handleCall('threads:toggle-reaction', {
    file: testFile,
    threadId: thread1.id,
    commentId: firstCommentId,
    emoji: '👍',
    author: 'charlie',
  }, tempDir);

  assert(removeLastReaction.result.length === 0, 'reaction removed entirely when no authors left');

  // ─── Test 7: resolve-thread → toggles resolved status ───
  console.log('\nTest 7: resolve-thread toggles');

  const resolveResult = await handleCall('threads:resolve-thread', {
    file: testFile,
    threadId: thread1.id,
    resolved_by: 'alice',
  }, tempDir);

  assert(resolveResult.reload === true, 'resolve-thread reload is true');
  assert(resolveResult.result.resolved === true, 'thread is now resolved');
  assert(resolveResult.result.resolved_by === 'alice', 'resolved_by is alice');
  assert(resolveResult.result.resolved_at === today, 'resolved_at is today');

  // Toggle back (unresolve)
  const unresolveResult = await handleCall('threads:resolve-thread', {
    file: testFile,
    threadId: thread1.id,
    resolved_by: 'alice',
  }, tempDir);

  assert(unresolveResult.result.resolved === false, 'thread is now unresolved');
  assert(unresolveResult.result.resolved_by === null, 'resolved_by cleared');
  assert(unresolveResult.result.resolved_at === null, 'resolved_at cleared');

  // ─── Test 8: delete-comment → removes comment ───
  console.log('\nTest 8: delete-comment');

  // Get current state to know comment IDs
  const beforeDelete = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  const bobCommentId = beforeDelete.result[0].comments[1].id;

  const deleteComment = await handleCall('threads:delete-comment', {
    file: testFile,
    threadId: thread1.id,
    commentId: bobCommentId,
  }, tempDir);

  assert(deleteComment.reload === true, 'delete-comment reload is true');
  assertDeepEqual(deleteComment.result, { deleted: true }, 'delete-comment returns { deleted: true }');

  const afterDeleteComment = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  assert(afterDeleteComment.result[0].comments.length === 1, 'thread has 1 comment after delete');
  assert(afterDeleteComment.result[0].comments[0].author === 'alice', 'remaining comment is alice');

  // ─── Test 9: delete-thread → removes thread ───
  console.log('\nTest 9: delete-thread');

  const deleteThread = await handleCall('threads:delete-thread', {
    file: testFile,
    threadId: thread1.id,
  }, tempDir);

  assert(deleteThread.reload === true, 'delete-thread reload is true');
  assertDeepEqual(deleteThread.result, { deleted: true }, 'delete-thread returns { deleted: true }');

  const afterDeleteThread = await handleCall('threads:get-threads', { file: testFile }, tempDir);
  assert(afterDeleteThread.result.length === 0, 'no threads after delete');

  // Verify the file content no longer has a threads block
  const finalContent = fs.readFileSync(testFilePath, 'utf8');
  assert(finalContent.includes('# Test Document'), 'original content preserved');
  assert(!finalContent.includes('::: threads'), 'threads block removed from file');

  // ─── Cleanup ───
  fs.rmSync(tempDir, { recursive: true });

  console.log(`\n✓ All ${passed}/${total} tests passed.\n`);
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
