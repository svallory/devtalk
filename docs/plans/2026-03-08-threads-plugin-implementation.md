# Threads Plugin Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `@svallory/plugin-threads` — a discussion/comment plugin that stores threads in markdown `::: threads` containers and uses docmd's plugin actions system (WebSocket) instead of SQLite + separate server.

**Architecture:** markdown-it container rules parse `::: threads/thread/comment/reactions` containers for rendering. Server-side action handlers read/write the `::: threads` block via `ctx.readFile()`/`ctx.writeFile()`. Client-side Lit+WebAwesome components (adapted from old `devtalk-*`) use `docmd.call()` for mutations with `docmd.afterReload()`/`docmd.scheduleReload()` for post-reload continuity.

**Tech Stack:** Node.js, markdown-it, Lit, WebAwesome, esbuild, TypeScript (client), JavaScript (plugin entry + containers + parser)

**Package manager:** pnpm (never npm)

**Testing:** Create lightweight test scripts runnable with `node` directly, following the project pattern: `node packages/plugins/threads/tests/<name>.test.js`. Each test file exits 0 on success, 1 on failure.

**Reference:** Design doc at `docs/plans/2026-03-08-threads-plugin-design.md`. Old plugin source at `old-discussions-plugin/`.

---

## Task 1: Scaffold package and configure build

**Files:**
- Create: `packages/plugins/threads/package.json`
- Create: `packages/plugins/threads/build.js`
- Create: `packages/plugins/threads/index.js` (stub)
- Create: `packages/plugins/threads/src/types.ts`

### Step 1: Create package.json

```json
{
  "name": "@svallory/plugin-threads",
  "version": "0.5.1",
  "description": "Inline discussion threads for docmd documentation sites.",
  "main": "index.js",
  "scripts": {
    "build": "node build.js"
  },
  "dependencies": {
    "@awesome.me/webawesome": "^3.3.1",
    "esbuild": "^0.27.3",
    "lit": "^3.3.2"
  },
  "keywords": ["docmd", "plugin", "threads", "discussions", "comments"],
  "author": { "name": "Saulo Vallory" },
  "repository": { "type": "git", "url": "git+https://github.com/docmd-io/docmd.git" },
  "license": "MIT",
  "publishConfig": { "registry": "https://npm.pkg.github.com" }
}
```

### Step 2: Create build.js

Adapted from `old-discussions-plugin/build.js`. Only builds client (no server build needed).

```js
const esbuild = require('esbuild');
const path = require('path');

async function build() {
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, 'src/client/index.ts')],
    bundle: true,
    platform: 'browser',
    target: 'es2020',
    format: 'esm',
    outdir: path.resolve(__dirname, 'dist/client'),
    minify: false,
    sourcemap: 'inline',
    loader: { '.css': 'css' },
  });
  console.log('Client built to dist/client/');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Step 3: Create stub index.js

```js
/**
 * @docmd/plugin-threads — inline discussion threads stored in markdown.
 */
module.exports = {
  markdownSetup(md, options) {},
  generateScripts(config, options) { return {}; },
  getAssets(options) { return []; },
  actions: {}
};
```

### Step 4: Create src/types.ts

Adapted from `old-discussions-plugin/src/types.ts`. Remove database row types, add markdown-specific types.

```ts
export interface Thread {
  id: string;
  resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
  comments: Comment[];
}

export interface Comment {
  id: string;
  thread_id: string;
  author: string;
  date: string;
  edited_at: string | null;
  body: string;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  authors: string[];
}

export interface Anchor {
  quote: string;
  prefix: string | null;
  suffix: string | null;
  selector: string | null;
  offset: number | null;
  blockText: string | null;
}

export interface CreateThreadPayload {
  file: string;
  anchor: Anchor | null;
  author: string;
  body: string;
}

export interface AddCommentPayload {
  file: string;
  threadId: string;
  author: string;
  body: string;
}

export interface EditCommentPayload {
  file: string;
  threadId: string;
  commentId: string;
  body: string;
}

export interface DeleteCommentPayload {
  file: string;
  threadId: string;
  commentId: string;
}

export interface ResolveThreadPayload {
  file: string;
  threadId: string;
  resolved_by: string;
}

export interface ToggleReactionPayload {
  file: string;
  threadId: string;
  commentId: string;
  emoji: string;
  author: string;
}
```

### Step 5: Install dependencies and verify

Run: `pnpm install`
Expected: Installs dependencies, links workspace package.

### Step 6: Commit

```bash
git add packages/plugins/threads/
git commit -m "feat(threads): scaffold plugin package with build config and types"
```

---

## Task 2: Thread parser — serialize/deserialize `::: threads` block

This is the core module that reads/writes the `::: threads` container from markdown files.

**Files:**
- Create: `packages/plugins/threads/src/plugin/parser.js`
- Create: `packages/plugins/threads/tests/parser.test.js`

### Step 1: Write the failing test

Create `packages/plugins/threads/tests/parser.test.js`:

```js
const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

// We'll require the parser after creating it
let parser;

const SAMPLE_MD = `# Page Title

Some content here.

::: threads
  ::: thread t-abc123
    ::: comment "alice" "2026-03-07"
      This is the first comment
    :::

    ::: comment "bob" "2026-03-08" edited "2026-03-09"
      I agree, let's reword it

      ::: reactions
        - 👍 charlie, dave
        - 🎉 alice
      :::
    :::
  :::

  ::: thread t-def456 resolved "charlie" "2026-03-08"
    ::: comment "charlie" "2026-03-08"
      Typo in this section
    :::
  :::
:::
`;

const SAMPLE_NO_THREADS = `# Page Title

Just content, no threads.
`;

function testParseThreads() {
  const threads = parser.parseThreadsFromContent(SAMPLE_MD);

  assert(threads.length === 2, `Expected 2 threads, got ${threads.length}`);

  // Thread 1
  const t1 = threads[0];
  assert(t1.id === 't-abc123', `Thread 1 id: ${t1.id}`);
  assert(t1.resolved === false, 'Thread 1 should not be resolved');
  assert(t1.comments.length === 2, `Thread 1 comments: ${t1.comments.length}`);

  const c1 = t1.comments[0];
  assert(c1.author === 'alice', `Comment 1 author: ${c1.author}`);
  assert(c1.date === '2026-03-07', `Comment 1 date: ${c1.date}`);
  assert(c1.body.trim() === 'This is the first comment', `Comment 1 body: "${c1.body.trim()}"`);
  assert(c1.reactions.length === 0, 'Comment 1 should have no reactions');

  const c2 = t1.comments[1];
  assert(c2.author === 'bob', `Comment 2 author: ${c2.author}`);
  assert(c2.edited_at === '2026-03-09', `Comment 2 edited_at: ${c2.edited_at}`);
  assert(c2.body.includes('I agree'), `Comment 2 body: "${c2.body}"`);
  assert(c2.reactions.length === 2, `Comment 2 reactions: ${c2.reactions.length}`);
  assert(c2.reactions[0].emoji === '👍', `Reaction 1 emoji: ${c2.reactions[0].emoji}`);
  assert(c2.reactions[0].authors.length === 2, `Reaction 1 authors: ${c2.reactions[0].authors.length}`);
  assert(c2.reactions[0].authors[0] === 'charlie', `Reaction 1 author 0: ${c2.reactions[0].authors[0]}`);

  // Thread 2
  const t2 = threads[1];
  assert(t2.id === 't-def456', `Thread 2 id: ${t2.id}`);
  assert(t2.resolved === true, 'Thread 2 should be resolved');
  assert(t2.resolved_by === 'charlie', `Thread 2 resolved_by: ${t2.resolved_by}`);
  assert(t2.resolved_at === '2026-03-08', `Thread 2 resolved_at: ${t2.resolved_at}`);

  console.log('PASS: parseThreadsFromContent');
}

function testParseNoThreads() {
  const threads = parser.parseThreadsFromContent(SAMPLE_NO_THREADS);
  assert(threads.length === 0, 'Should return empty array when no threads block');
  console.log('PASS: parseThreadsFromContent (no threads)');
}

function testSerializeThreads() {
  const threads = parser.parseThreadsFromContent(SAMPLE_MD);
  const serialized = parser.serializeThreadsBlock(threads);

  // Re-parse to verify round-trip
  const reparsed = parser.parseThreadsFromContent(serialized);
  assert(reparsed.length === 2, `Round-trip: expected 2 threads, got ${reparsed.length}`);
  assert(reparsed[0].id === 't-abc123', 'Round-trip: thread 1 id');
  assert(reparsed[0].comments[1].reactions.length === 2, 'Round-trip: reactions preserved');
  assert(reparsed[1].resolved === true, 'Round-trip: resolved preserved');

  console.log('PASS: serializeThreadsBlock round-trip');
}

function testReplaceThreadsBlock() {
  const threads = parser.parseThreadsFromContent(SAMPLE_MD);
  threads.push({
    id: 't-new789',
    resolved: false,
    resolved_by: null,
    resolved_at: null,
    comments: [{
      id: 'c-new1',
      thread_id: 't-new789',
      author: 'eve',
      date: '2026-03-09',
      edited_at: null,
      body: 'New thread comment',
      reactions: []
    }]
  });

  const updated = parser.replaceThreadsBlock(SAMPLE_MD, threads);
  const reparsed = parser.parseThreadsFromContent(updated);
  assert(reparsed.length === 3, `After add: expected 3 threads, got ${reparsed.length}`);
  assert(reparsed[2].id === 't-new789', 'New thread id preserved');

  // Content before threads block should be preserved
  assert(updated.startsWith('# Page Title'), 'Page content preserved');
  assert(updated.includes('Some content here.'), 'Page content preserved');

  console.log('PASS: replaceThreadsBlock');
}

function testAddThreadsBlockToFileWithout() {
  const updated = parser.replaceThreadsBlock(SAMPLE_NO_THREADS, [{
    id: 't-first',
    resolved: false,
    resolved_by: null,
    resolved_at: null,
    comments: [{
      id: 'c-1',
      thread_id: 't-first',
      author: 'alice',
      date: '2026-03-09',
      edited_at: null,
      body: 'First comment',
      reactions: []
    }]
  }]);

  assert(updated.includes('::: threads'), 'Should add threads block');
  assert(updated.includes('Just content'), 'Original content preserved');
  const reparsed = parser.parseThreadsFromContent(updated);
  assert(reparsed.length === 1, 'Should have 1 thread');

  console.log('PASS: replaceThreadsBlock (file without threads)');
}

// Load parser and run
try {
  parser = require('../src/plugin/parser');
} catch (e) {
  console.error(`FAIL: Could not load parser: ${e.message}`);
  process.exit(1);
}

testParseThreads();
testParseNoThreads();
testSerializeThreads();
testReplaceThreadsBlock();
testAddThreadsBlockToFileWithout();

console.log('\nAll parser tests passed.');
```

### Step 2: Run test to verify it fails

Run: `node packages/plugins/threads/tests/parser.test.js`
Expected: FAIL — parser module doesn't exist yet.

### Step 3: Implement parser.js

Create `packages/plugins/threads/src/plugin/parser.js`. This module provides:

- `parseThreadsFromContent(markdownContent)` → `Thread[]`
- `serializeThreadsBlock(threads)` → string (the full `::: threads ... :::` block)
- `replaceThreadsBlock(markdownContent, threads)` → string (full file content with updated threads block)

Key implementation details:

1. **Finding the threads block:** Scan for a line matching `/^\s*::: threads\s*$/` and its matching closing `:::` (tracking depth for nested containers).

2. **Parsing threads:** Within the threads block, find each `::: thread <id> [resolved "<by>" "<date>"]` container. Parse the info string with a regex.

3. **Parsing comments:** Within each thread, find `::: comment "<author>" "<date>" [edited "<date>"]` containers. The body is the content minus any nested `::: reactions` block.

4. **Parsing reactions:** Within a comment, find `::: reactions` and parse `- <emoji> <author1>, <author2>` list items.

5. **Serialization:** Reconstruct with 2-space indentation per nesting level. Content indented to match container depth.

6. **Replacement:** Find the existing `::: threads` block boundaries (or end of file), splice in the new serialized block.

Use the 2-space indentation format from the design:
```
::: threads
  ::: thread t-abc123
    ::: comment "alice" "2026-03-07"
      Comment body here
    :::
  :::
:::
```

### Step 4: Run test to verify it passes

Run: `node packages/plugins/threads/tests/parser.test.js`
Expected: All tests PASS.

### Step 5: Commit

```bash
git add packages/plugins/threads/src/plugin/parser.js packages/plugins/threads/tests/parser.test.js
git commit -m "feat(threads): add thread parser for markdown serialization/deserialization"
```

---

## Task 3: markdown-it container rules for rendering

Register custom containers: `threads`, `thread`, `comment`, `reactions`. These render the `::: threads` block into HTML that CSS positions in the right sidebar.

**Files:**
- Create: `packages/plugins/threads/src/plugin/containers.js`
- Create: `packages/plugins/threads/tests/containers.test.js`
- Modify: `packages/plugins/threads/index.js` — wire up `markdownSetup`

### Step 1: Write the failing test

Create `packages/plugins/threads/tests/containers.test.js`:

```js
function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const md = require('markdown-it')();

// Load the containers module (must be done before tests)
let containers;
try {
  containers = require('../src/plugin/containers');
} catch (e) {
  console.error(`FAIL: Could not load containers: ${e.message}`);
  process.exit(1);
}

containers.setup(md);

const input = `# Title

Some paragraph.

::: threads
  ::: thread t-abc123
    ::: comment "alice" "2026-03-07"
      This is a comment
    :::
  :::

  ::: thread t-def456 resolved "bob" "2026-03-08"
    ::: comment "bob" "2026-03-08"
      Resolved comment

      ::: reactions
        - 👍 alice
      :::
    :::
  :::
:::
`;

const result = md.render(input);

// Verify threads sidebar wrapper
assert(result.includes('class="threads-sidebar"'), `Missing threads-sidebar class. Got:\n${result}`);

// Verify thread containers with data attributes
assert(result.includes('data-thread-id="t-abc123"'), 'Missing thread id attribute');
assert(result.includes('data-thread-id="t-def456"'), 'Missing second thread id');

// Verify resolved thread has resolved class
assert(result.includes('threads-thread--resolved'), 'Missing resolved class');

// Verify comment rendering
assert(result.includes('data-author="alice"'), 'Missing author attribute');
assert(result.includes('data-date="2026-03-07"'), 'Missing date attribute');
assert(result.includes('This is a comment'), 'Missing comment body');

// Verify reactions rendering
assert(result.includes('threads-reaction'), 'Missing reaction class');
assert(result.includes('👍'), 'Missing emoji');

console.log('PASS: Container rendering');
console.log('\nAll container tests passed.');
```

### Step 2: Run test to verify it fails

Run: `node packages/plugins/threads/tests/containers.test.js`
Expected: FAIL — containers module doesn't exist yet.

### Step 3: Implement containers.js

Create `packages/plugins/threads/src/plugin/containers.js`. Uses docmd's `createDepthTrackingContainer` pattern from `packages/parser/src/features/common-containers.js`.

Register four containers:
1. **`threads`** → `<div class="threads-sidebar">` — the outer wrapper
2. **`thread`** → `<div class="threads-thread" data-thread-id="...">` — parse info string for id and resolved status
3. **`comment`** → `<div class="threads-comment" data-author="..." data-date="...">` with meta header and body wrapper
4. **`reactions`** → `<div class="threads-reactions">` — parse list items into reaction buttons

Each container uses `markdown-it-container` (already available in the project via common-containers) for validation and rendering.

Note: docmd's `createDepthTrackingContainer` from `common-containers.js` handles recursive parsing with `smartDedent`, so nested `::: comment` inside `::: thread` inside `::: threads` will parse correctly.

### Step 4: Wire up markdownSetup in index.js

Update `packages/plugins/threads/index.js` to call `containers.setup(md)` in `markdownSetup`.

### Step 5: Run test to verify it passes

Run: `node packages/plugins/threads/tests/containers.test.js`
Expected: All tests PASS.

### Step 6: Commit

```bash
git add packages/plugins/threads/src/plugin/containers.js packages/plugins/threads/tests/containers.test.js packages/plugins/threads/index.js
git commit -m "feat(threads): add markdown-it container rules for threads/thread/comment/reactions"
```

---

## Task 4: Server-side action handlers

Implement all 8 action handlers that read/write the `::: threads` block.

**Files:**
- Create: `packages/plugins/threads/src/plugin/actions.js`
- Create: `packages/plugins/threads/tests/actions.test.js`
- Modify: `packages/plugins/threads/index.js` — export actions

### Step 1: Write the failing test

Create `packages/plugins/threads/tests/actions.test.js`:

```js
const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const { createActionDispatcher } = require(process.cwd() + '/packages/core/src/utils/action-dispatcher');

const INITIAL_MD = `# Test Page

Some content here.
`;

let tempDir;
let dispatcher;

function setup() {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threads-test-'));
  fs.writeFileSync(path.join(tempDir, 'test.md'), INITIAL_MD);

  const actions = require('../src/plugin/actions');
  dispatcher = createActionDispatcher(
    { actions: actions.actions, events: {} },
    { projectRoot: tempDir, config: {}, broadcast: () => {} }
  );
}

function teardown() {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

async function testGetThreadsEmpty() {
  const result = await dispatcher.handleCall('threads:get-threads', { file: 'test.md' });
  assert(Array.isArray(result.result), 'Should return array');
  assert(result.result.length === 0, 'Should be empty initially');
  assert(result.reload === false, 'Get should not trigger reload');
  console.log('PASS: get-threads empty');
}

async function testAddThread() {
  const result = await dispatcher.handleCall('threads:add-thread', {
    file: 'test.md',
    author: 'alice',
    body: 'First comment on this page',
    anchor: null,
  });
  assert(result.reload === true, 'Add should trigger reload');
  assert(result.result.id, 'Should return thread with id');
  assert(result.result.comments.length === 1, 'Should have 1 comment');
  assert(result.result.comments[0].author === 'alice', 'Comment author');

  // Verify file was modified
  const content = fs.readFileSync(path.join(tempDir, 'test.md'), 'utf8');
  assert(content.includes('::: threads'), 'File should have threads block');
  assert(content.includes('Some content here.'), 'Original content preserved');
  console.log('PASS: add-thread');
  return result.result;
}

async function testAddComment(threadId) {
  const result = await dispatcher.handleCall('threads:add-comment', {
    file: 'test.md',
    threadId,
    author: 'bob',
    body: 'I agree with alice',
  });
  assert(result.reload === true, 'Add comment should trigger reload');
  assert(result.result.author === 'bob', 'Comment author');
  console.log('PASS: add-comment');
}

async function testGetThreadsAfterAdd() {
  const result = await dispatcher.handleCall('threads:get-threads', { file: 'test.md' });
  assert(result.result.length === 1, `Should have 1 thread, got ${result.result.length}`);
  assert(result.result[0].comments.length === 2, `Should have 2 comments, got ${result.result[0].comments.length}`);
  console.log('PASS: get-threads after add');
  return result.result[0];
}

async function testEditComment(threadId, commentId) {
  const result = await dispatcher.handleCall('threads:edit-comment', {
    file: 'test.md',
    threadId,
    commentId,
    body: 'Updated comment body',
  });
  assert(result.reload === true, 'Edit should trigger reload');

  const threads = (await dispatcher.handleCall('threads:get-threads', { file: 'test.md' })).result;
  const comment = threads[0].comments.find(c => c.id === commentId);
  assert(comment.body.includes('Updated comment body'), `Body not updated: "${comment.body}"`);
  assert(comment.edited_at, 'Should have edited_at');
  console.log('PASS: edit-comment');
}

async function testToggleReaction(threadId, commentId) {
  // Add reaction
  await dispatcher.handleCall('threads:toggle-reaction', {
    file: 'test.md',
    threadId,
    commentId,
    emoji: '👍',
    author: 'charlie',
  });

  let threads = (await dispatcher.handleCall('threads:get-threads', { file: 'test.md' })).result;
  let comment = threads[0].comments.find(c => c.id === commentId);
  assert(comment.reactions.length === 1, 'Should have 1 reaction');
  assert(comment.reactions[0].emoji === '👍', 'Reaction emoji');
  assert(comment.reactions[0].authors.includes('charlie'), 'Reaction author');

  // Toggle off
  await dispatcher.handleCall('threads:toggle-reaction', {
    file: 'test.md',
    threadId,
    commentId,
    emoji: '👍',
    author: 'charlie',
  });

  threads = (await dispatcher.handleCall('threads:get-threads', { file: 'test.md' })).result;
  comment = threads[0].comments.find(c => c.id === commentId);
  const thumbsReaction = comment.reactions.find(r => r.emoji === '👍');
  assert(!thumbsReaction || !thumbsReaction.authors.includes('charlie'), 'Reaction should be removed');
  console.log('PASS: toggle-reaction');
}

async function testResolveThread(threadId) {
  const result = await dispatcher.handleCall('threads:resolve-thread', {
    file: 'test.md',
    threadId,
    resolved_by: 'alice',
  });
  assert(result.reload === true, 'Resolve should trigger reload');

  const threads = (await dispatcher.handleCall('threads:get-threads', { file: 'test.md' })).result;
  assert(threads[0].resolved === true, 'Thread should be resolved');
  assert(threads[0].resolved_by === 'alice', 'Resolved by');
  console.log('PASS: resolve-thread');
}

async function testDeleteComment(threadId, commentId) {
  const result = await dispatcher.handleCall('threads:delete-comment', {
    file: 'test.md',
    threadId,
    commentId,
  });
  assert(result.reload === true, 'Delete comment should trigger reload');

  const threads = (await dispatcher.handleCall('threads:get-threads', { file: 'test.md' })).result;
  const remaining = threads[0].comments.find(c => c.id === commentId);
  assert(!remaining, 'Deleted comment should be gone');
  console.log('PASS: delete-comment');
}

async function testDeleteThread(threadId) {
  const result = await dispatcher.handleCall('threads:delete-thread', {
    file: 'test.md',
    threadId,
  });
  assert(result.reload === true, 'Delete thread should trigger reload');

  const threads = (await dispatcher.handleCall('threads:get-threads', { file: 'test.md' })).result;
  assert(threads.length === 0, 'No threads should remain');
  console.log('PASS: delete-thread');
}

async function run() {
  setup();
  try {
    await testGetThreadsEmpty();
    const thread = await testAddThread();
    await testAddComment(thread.id);
    const fullThread = await testGetThreadsAfterAdd();
    const firstCommentId = fullThread.comments[0].id;
    const secondCommentId = fullThread.comments[1].id;
    await testEditComment(fullThread.id, secondCommentId);
    await testToggleReaction(fullThread.id, firstCommentId);
    await testResolveThread(fullThread.id);
    await testDeleteComment(fullThread.id, secondCommentId);
    await testDeleteThread(fullThread.id);
    console.log('\nAll action tests passed.');
  } finally {
    teardown();
  }
}

run().catch(e => {
  console.error('FAIL:', e.message, e.stack);
  teardown();
  process.exit(1);
});
```

### Step 2: Run test to verify it fails

Run: `node packages/plugins/threads/tests/actions.test.js`
Expected: FAIL — actions module doesn't exist yet.

### Step 3: Implement actions.js

Create `packages/plugins/threads/src/plugin/actions.js`. Each handler:
1. Reads file via `ctx.readFile(payload.file)`
2. Uses `parser.parseThreadsFromContent()` to get thread data
3. Modifies the data
4. Uses `parser.replaceThreadsBlock()` to get updated content
5. Writes via `ctx.writeFile(payload.file, updated)`

Action handlers:

- **`threads:get-threads`** — read-only, returns parsed threads
- **`threads:add-thread`** — generate ID (`t-` + random hex), create thread with first comment, append to threads array
- **`threads:add-comment`** — generate ID (`c-` + random hex), append to thread's comments
- **`threads:edit-comment`** — find comment by ID, update body, set `edited_at`
- **`threads:delete-comment`** — find and remove comment by ID
- **`threads:delete-thread`** — find and remove thread by ID
- **`threads:resolve-thread`** — toggle resolved flag, set/clear `resolved_by` and `resolved_at`
- **`threads:toggle-reaction`** — find comment, add/remove author from reaction's authors list

### Step 4: Run test to verify it passes

Run: `node packages/plugins/threads/tests/actions.test.js`
Expected: All tests PASS.

### Step 5: Wire actions into index.js

Update `packages/plugins/threads/index.js`:

```js
const containers = require('./src/plugin/containers');
const { actions } = require('./src/plugin/actions');

module.exports = {
  markdownSetup(md, options) {
    containers.setup(md);
  },
  generateScripts(config, options) { return {}; },
  getAssets(options) { return []; },
  actions
};
```

### Step 6: Commit

```bash
git add packages/plugins/threads/src/plugin/actions.js packages/plugins/threads/tests/actions.test.js packages/plugins/threads/index.js
git commit -m "feat(threads): add server-side action handlers for thread CRUD operations"
```

---

## Task 5: Client-side API layer

Replace HTTP fetch calls with `docmd.call()` wrappers.

**Files:**
- Create: `packages/plugins/threads/src/client/lib/api.ts`

### Step 1: Create api.ts

Adapt from `old-discussions-plugin/src/client/lib/api.ts`. Replace all `fetch()` calls with `docmd.call()`. Remove `getApiUrl()`. Use `document.body.dataset.sourceFile` for the file parameter.

```ts
import type { Thread, Comment, Reaction } from '../../types.ts';

declare global {
  var docmd: {
    call(action: string, payload: any): Promise<any>;
    send(name: string, data: any): void;
    on(name: string, callback: (data: any) => void): () => void;
    afterReload(name: string, callback: (ctx: any) => void): void;
    scheduleReload(name: string, context?: any): void;
  };
}

function getSourceFile(): string {
  const file = document.body.dataset['sourceFile'];
  if (!file) throw new Error('[threads] data-source-file not found on body element');
  return file;
}

export async function fetchThreads(): Promise<Thread[]> {
  return docmd.call('threads:get-threads', { file: getSourceFile() });
}

export async function createThread(payload: {
  anchor: any | null;
  author: string;
  body: string;
}): Promise<Thread> {
  return docmd.call('threads:add-thread', {
    file: getSourceFile(),
    ...payload,
  });
}

export async function addComment(
  threadId: string,
  payload: { author: string; body: string },
): Promise<Comment> {
  return docmd.call('threads:add-comment', {
    file: getSourceFile(),
    threadId,
    ...payload,
  });
}

export async function editComment(
  threadId: string,
  commentId: string,
  payload: { body: string },
): Promise<Comment> {
  return docmd.call('threads:edit-comment', {
    file: getSourceFile(),
    threadId,
    commentId,
    ...payload,
  });
}

export async function deleteComment(
  threadId: string,
  commentId: string,
): Promise<void> {
  await docmd.call('threads:delete-comment', {
    file: getSourceFile(),
    threadId,
    commentId,
  });
}

export async function deleteThread(threadId: string): Promise<void> {
  await docmd.call('threads:delete-thread', {
    file: getSourceFile(),
    threadId,
  });
}

export async function resolveThread(
  threadId: string,
  payload: { resolved_by: string },
): Promise<Thread> {
  return docmd.call('threads:resolve-thread', {
    file: getSourceFile(),
    threadId,
    ...payload,
  });
}

export async function toggleReaction(
  threadId: string,
  commentId: string,
  payload: { emoji: string; author: string },
): Promise<Reaction[]> {
  return docmd.call('threads:toggle-reaction', {
    file: getSourceFile(),
    threadId,
    commentId,
    ...payload,
  });
}
```

### Step 2: Commit

```bash
git add packages/plugins/threads/src/client/lib/api.ts
git commit -m "feat(threads): add client API layer using docmd.call()"
```

---

## Task 6: Client-side utility libraries

Port the selection, highlights, identity, and theme libraries from the old plugin.

**Files:**
- Create: `packages/plugins/threads/src/client/lib/selection.ts` — copy from `old-discussions-plugin/src/client/lib/selection.ts` (no changes needed)
- Create: `packages/plugins/threads/src/client/lib/highlights.ts` — copy from `old-discussions-plugin/src/client/lib/highlights.ts`, update import paths and CSS class names from `devtalk-*` to `threads-*`
- Create: `packages/plugins/threads/src/client/lib/identity.ts` — adapt from old plugin, remove `fetchIdentity()` API call (no server identity endpoint), keep localStorage-based identity with `ensureAuthor()`
- Create: `packages/plugins/threads/src/client/lib/theme.ts` — copy from old plugin, update CSS class prefixes from `devtalk-*` to `threads-*`

### Step 1: Port selection.ts

Copy `old-discussions-plugin/src/client/lib/selection.ts` to `packages/plugins/threads/src/client/lib/selection.ts`. Update the import path for `Anchor` type to `../../types.ts`. No other changes needed — the selection logic is generic.

### Step 2: Port highlights.ts

Copy and update:
- Import path: `../../types.ts`
- CSS class names: `devtalk-highlight` → `threads-highlight`, `devtalk-highlight--resolved` → `threads-highlight--resolved`, `devtalk-highlight--flash` → `threads-highlight--flash`

### Step 3: Port identity.ts

Simplify from old version:
- Remove `fetchIdentity()` import and the server call in `initIdentity()`
- Keep `getAuthor()`, `setAuthor()`, `ensureAuthor()` with localStorage
- Change storage key from `devtalk_author` to `threads_author`
- `initIdentity()` becomes a no-op or reads from plugin config if available

### Step 4: Port theme.ts

Copy and update:
- CSS class names: `devtalk-highlight` → `threads-highlight` in the theme CSS
- Style ID: `devtalk-theme-bridge` → `threads-theme-bridge`
- Import path for `injectComponentStyles`

### Step 5: Commit

```bash
git add packages/plugins/threads/src/client/lib/
git commit -m "feat(threads): port client utility libraries (selection, highlights, identity, theme)"
```

---

## Task 7: Client-side Lit components

Port all Lit+WebAwesome components from `devtalk-*` to `threads-*`.

**Files:**
- Create: `packages/plugins/threads/src/client/components/styles.ts`
- Create: `packages/plugins/threads/src/client/components/threads-compose.ts`
- Create: `packages/plugins/threads/src/client/components/threads-comment.ts`
- Create: `packages/plugins/threads/src/client/components/threads-thread.ts`
- Create: `packages/plugins/threads/src/client/components/threads-panel.ts`
- Create: `packages/plugins/threads/src/client/components/threads-popover.ts`
- Create: `packages/plugins/threads/src/client/components/threads-inline-editor.ts`
- Create: `packages/plugins/threads/src/client/components/threads-app.ts`
- Create: `packages/plugins/threads/src/client/index.ts`

### Step 1: Port styles.ts

Copy from `old-discussions-plugin/src/client/components/styles.ts`. Rename all CSS classes:
- `dc-*` → `tc-*` (thread comments)
- `devtalk-*` → `threads-*`
- Style ID: `dc-styles` → `tc-styles`

### Step 2: Port simple components

Copy and adapt each component. For each one:
- Rename custom element tag: `devtalk-*` → `threads-*`
- Rename CSS classes: `dc-*` → `tc-*`
- Update import paths for types and lib modules
- Keep all Lit decorators, WebAwesome elements, and event dispatching unchanged

Port order (simplest to most complex):
1. `threads-compose.ts` ← `devtalk-compose.ts`
2. `threads-comment.ts` ← `devtalk-comment.ts`
3. `threads-thread.ts` ← `devtalk-thread.ts`
4. `threads-popover.ts` ← `devtalk-popover.ts`
5. `threads-inline-editor.ts` ← `devtalk-inline-editor.ts`
6. `threads-panel.ts` ← `devtalk-panel.ts`

### Step 3: Port threads-app.ts (the main component)

This is the most complex component. Copy from `old-discussions-plugin/src/client/components/devtalk-app.ts` and make these changes:

1. **Rename:** `devtalk-app` → `threads-app`, class `DiscussionsApp` → `ThreadsApp`
2. **Remove:** `loadThreads()` via HTTP — replace with `docmd.call('threads:get-threads', ...)`
3. **Replace:** All `api.createThread()`, `api.addComment()`, etc. calls with the new `api.ts` functions
4. **Remove:** `handleInlineSubmit` that called `api.insertPageComment()` — replace with `docmd.call('threads:add-thread', ...)` with the anchor info
5. **Add:** `docmd.afterReload()` handlers for post-mutation continuity
6. **Add:** `docmd.scheduleReload()` calls after mutations
7. **Remove:** `enhanceDiscussions()` and `startDiscussionReply()` — the in-page `::: discussion` enhance logic is replaced by the rendered `::: threads` container output
8. **Update:** CSS class names `dc-*` → `tc-*`

### Step 4: Create client entry point

Create `packages/plugins/threads/src/client/index.ts`:

```ts
import '@awesome.me/webawesome/dist/styles/themes/default.css';
import './components/threads-app.ts';

function init(): void {
  if (document.querySelector('threads-app')) return;
  const app = document.createElement('threads-app');
  document.body.appendChild(app);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

### Step 5: Build and verify

Run: `cd packages/plugins/threads && node build.js`
Expected: `Client built to dist/client/` — no errors.

### Step 6: Commit

```bash
git add packages/plugins/threads/src/client/
git commit -m "feat(threads): port Lit+WebAwesome client components from devtalk"
```

---

## Task 8: Wire up plugin entry (generateScripts + getAssets)

Complete the `index.js` to inject client JS/CSS via docmd's plugin hooks.

**Files:**
- Modify: `packages/plugins/threads/index.js`

### Step 1: Complete index.js

```js
const path = require('path');
const containers = require('./src/plugin/containers');
const { actions } = require('./src/plugin/actions');

function markdownSetup(md, options) {
  containers.setup(md);
}

function generateScripts(config, options) {
  return {
    headScriptsHtml: '',
    bodyScriptsHtml: ''
  };
}

function getAssets(options) {
  return [
    {
      src: path.join(__dirname, 'dist/client/index.js'),
      dest: 'assets/js/threads.js',
      type: 'js',
      location: 'body',
      attributes: 'type="module"'
    },
    {
      src: path.join(__dirname, 'dist/client/index.css'),
      dest: 'assets/css/threads.css',
      type: 'css',
      location: 'head'
    }
  ];
}

module.exports = { markdownSetup, generateScripts, getAssets, actions };
```

### Step 2: Commit

```bash
git add packages/plugins/threads/index.js
git commit -m "feat(threads): wire plugin entry with generateScripts and getAssets"
```

---

## Task 9: Register plugin alias in plugin-loader

Add `threads` as a plugin alias so users can configure it as `threads: {}` in `docmd.config.cjs`.

**Files:**
- Modify: `packages/core/src/utils/plugin-loader.js:29-37`

### Step 1: Add alias

Add to the `ALIASES` object:

```js
'threads': '@svallory/plugin-threads'
```

Note: Unlike the other `@docmd/plugin-*` aliases, this uses `@svallory/plugin-threads` since it's published under a different scope. Also, unlike the defaults (search, seo, sitemap, analytics, pwa), threads should NOT be added to the default plugin list — it should only load when explicitly configured.

### Step 2: Commit

```bash
git add packages/core/src/utils/plugin-loader.js
git commit -m "feat(core): add 'threads' alias to plugin-loader"
```

---

## Task 10: Integration test — full round-trip

End-to-end test that verifies the plugin works with the docmd action dispatcher: register containers, create threads via actions, verify markdown output.

**Files:**
- Create: `packages/plugins/threads/tests/integration.test.js`

### Step 1: Write integration test

```js
const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const plugin = require('..');
const { createActionDispatcher } = require(process.cwd() + '/packages/core/src/utils/action-dispatcher');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threads-integration-'));

const INITIAL_MD = `---
title: Integration Test
---

# Test Page

This is a test paragraph.
`;

fs.writeFileSync(path.join(tempDir, 'test.md'), INITIAL_MD);

const dispatcher = createActionDispatcher(
  { actions: plugin.actions, events: {} },
  { projectRoot: tempDir, config: {}, broadcast: () => {} }
);

async function run() {
  // 1. Create a thread
  const { result: thread } = await dispatcher.handleCall('threads:add-thread', {
    file: 'test.md',
    author: 'alice',
    body: 'This paragraph needs work',
    anchor: null,
  });
  assert(thread.id, 'Thread created');

  // 2. Add a comment
  await dispatcher.handleCall('threads:add-comment', {
    file: 'test.md',
    threadId: thread.id,
    author: 'bob',
    body: 'Agreed, lets rewrite it',
  });

  // 3. Add a reaction
  await dispatcher.handleCall('threads:toggle-reaction', {
    file: 'test.md',
    threadId: thread.id,
    commentId: thread.comments[0].id,
    emoji: '👍',
    author: 'bob',
  });

  // 4. Read back and verify
  const { result: threads } = await dispatcher.handleCall('threads:get-threads', {
    file: 'test.md',
  });
  assert(threads.length === 1, `Expected 1 thread, got ${threads.length}`);
  assert(threads[0].comments.length === 2, `Expected 2 comments, got ${threads[0].comments.length}`);
  assert(threads[0].comments[0].reactions.length === 1, 'Should have reaction');

  // 5. Verify the markdown is readable
  const content = fs.readFileSync(path.join(tempDir, 'test.md'), 'utf8');
  assert(content.includes('# Test Page'), 'Original content preserved');
  assert(content.includes('::: threads'), 'Threads block present');
  assert(content.includes('::: thread'), 'Thread container present');
  assert(content.includes('::: comment "alice"'), 'Comment with author present');
  assert(content.includes('::: reactions'), 'Reactions block present');
  assert(content.includes('👍 bob'), 'Reaction content present');

  // 6. Verify indentation (2-space)
  const lines = content.split('\n');
  const threadLine = lines.find(l => l.includes('::: thread'));
  assert(threadLine && threadLine.startsWith('  ::: thread'), `Thread should be indented 2 spaces: "${threadLine}"`);

  // 7. Verify markdown-it rendering
  const md = require('markdown-it')();
  plugin.markdownSetup(md);
  const rendered = md.render(content);
  assert(rendered.includes('threads-sidebar'), 'Rendered HTML has sidebar');
  assert(rendered.includes('threads-comment'), 'Rendered HTML has comments');

  console.log('PASS: Integration test');
  console.log('\nFinal markdown:\n' + content);
}

run().catch(e => {
  console.error('FAIL:', e.message, e.stack);
  process.exit(1);
}).finally(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
```

### Step 2: Run integration test

Run: `node packages/plugins/threads/tests/integration.test.js`
Expected: PASS.

### Step 3: Commit

```bash
git add packages/plugins/threads/tests/integration.test.js
git commit -m "test(threads): add integration test for full round-trip"
```

---

## Task 11: Highlight-to-thread linking (`==text=={thread-id}`)

Add markdown-it inline rule that renders `==text=={t-id}` as `<mark class="threads-highlight" data-thread-id="t-id">text</mark>`.

**Files:**
- Create: `packages/plugins/threads/src/plugin/highlight-rule.js`
- Create: `packages/plugins/threads/tests/highlight-rule.test.js`
- Modify: `packages/plugins/threads/src/plugin/containers.js` or `index.js` — register the inline rule

### Step 1: Write failing test

```js
function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const md = require('markdown-it')();
const highlightRule = require('../src/plugin/highlight-rule');
highlightRule.setup(md);

// Test 1: Basic highlight with thread ID
const r1 = md.render('Some ==highlighted text=={t-abc123} here.');
assert(r1.includes('<mark'), 'Should render mark element');
assert(r1.includes('class="threads-highlight"'), 'Should have threads-highlight class');
assert(r1.includes('data-thread-id="t-abc123"'), 'Should have thread id');
assert(r1.includes('highlighted text'), 'Should contain highlight text');
console.log('PASS: basic highlight');

// Test 2: Plain highlight without thread ID (standard ==text== syntax)
const r2 = md.render('Some ==plain highlight== here.');
assert(r2.includes('<mark'), 'Plain highlight should render');
assert(!r2.includes('data-thread-id'), 'Plain highlight should not have thread id');
console.log('PASS: plain highlight');

// Test 3: Multiple highlights
const r3 = md.render('==first=={t-1} and ==second=={t-2}');
assert(r3.includes('data-thread-id="t-1"'), 'First thread id');
assert(r3.includes('data-thread-id="t-2"'), 'Second thread id');
console.log('PASS: multiple highlights');

console.log('\nAll highlight rule tests passed.');
```

### Step 2: Implement highlight-rule.js

A markdown-it inline rule that:
1. Matches `==` as opening marker
2. Scans for closing `==`
3. Optionally matches `{thread-id}` immediately after
4. Emits `mark_open` / `mark_close` tokens with `data-thread-id` attribute if present

### Step 3: Register in index.js markdownSetup

### Step 4: Run test, verify pass

### Step 5: Commit

```bash
git add packages/plugins/threads/src/plugin/highlight-rule.js packages/plugins/threads/tests/highlight-rule.test.js packages/plugins/threads/index.js
git commit -m "feat(threads): add inline highlight rule for ==text=={thread-id} syntax"
```

---

## Task 12: Wire highlight creation in add-thread action

When creating a thread with an anchor (selected text), the action should:
1. Find the selected text in the source file
2. Wrap it with `==text=={thread-id}`
3. Add the thread to the `::: threads` block

**Files:**
- Modify: `packages/plugins/threads/src/plugin/actions.js` — update `threads:add-thread` handler
- Add test case to: `packages/plugins/threads/tests/actions.test.js`

### Step 1: Add test case for anchored thread

Add to `actions.test.js`:

```js
async function testAddThreadWithAnchor() {
  // Reset file with content that has highlightable text
  fs.writeFileSync(path.join(tempDir, 'anchor-test.md'), `# Test\n\nSome important text in a paragraph.\n`);

  const result = await dispatcher.handleCall('threads:add-thread', {
    file: 'anchor-test.md',
    author: 'alice',
    body: 'This is important',
    anchor: {
      quote: 'important text',
      prefix: 'Some ',
      suffix: ' in a',
      selector: 'p',
      offset: 5,
      blockText: 'Some important text in a paragraph.',
    },
  });

  assert(result.reload === true, 'Should trigger reload');
  const content = fs.readFileSync(path.join(tempDir, 'anchor-test.md'), 'utf8');
  assert(content.includes(`==important text=={${result.result.id}}`), `Should have highlight markup. Got:\n${content}`);
  assert(content.includes('::: threads'), 'Should have threads block');
  console.log('PASS: add-thread with anchor');
}
```

### Step 2: Update add-thread action

When `payload.anchor` is provided with a `quote`:
1. Use `ctx.source.findText()` or manual text search to locate the quote in the file
2. Replace the quote text with `==quote=={thread-id}`
3. Then add the thread to the `::: threads` block

### Step 3: Run tests, verify pass

### Step 4: Commit

```bash
git add packages/plugins/threads/src/plugin/actions.js packages/plugins/threads/tests/actions.test.js
git commit -m "feat(threads): wire highlight creation when adding thread with anchor"
```

---

## Task Summary

| Task | Description | Dependencies |
|---|---|---|
| 1 | Scaffold package, build config, types | None |
| 2 | Thread parser (serialize/deserialize) | Task 1 |
| 3 | markdown-it container rules | Task 1 |
| 4 | Server-side action handlers | Tasks 2, 3 |
| 5 | Client API layer (`docmd.call()`) | Task 1 |
| 6 | Client utility libraries | Task 5 |
| 7 | Client Lit components | Tasks 5, 6 |
| 8 | Plugin entry (generateScripts + getAssets) | Tasks 3, 4, 7 |
| 9 | Plugin alias in plugin-loader | Task 8 |
| 10 | Integration test | Tasks 4, 8 |
| 11 | Highlight inline rule (`==text=={id}`) | Task 3 |
| 12 | Anchor highlight in add-thread action | Tasks 4, 11 |

Tasks 2, 3, 5 can run in parallel (no dependencies between them). Tasks 6, 7 are sequential (7 depends on 6). Task 11 can run in parallel with tasks 4-10.
