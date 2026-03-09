/**
 * Tests for threads parser — serialize/deserialize ::: threads block
 *
 * Run: node packages/plugins/threads/tests/parser.test.js
 */

const {
  parseThreadsFromContent,
  serializeThreadsBlock,
  replaceThreadsBlock,
} = require('../src/plugin/parser.js');

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

// ─── Test 1: Parse threads from content with 2 threads, comments, reactions, resolved status ───

console.log('\nTest 1: Parse full threads block');

const fullContent = `# My Document

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

Some trailing content.
`;

const threads = parseThreadsFromContent(fullContent);

assert(Array.isArray(threads), 'parseThreadsFromContent returns an array');
assert(threads.length === 2, 'parses 2 threads');

// Thread 1
const t1 = threads[0];
assert(t1.id === 't-abc123', 'thread 1 id');
assert(t1.resolved === false, 'thread 1 not resolved');
assert(t1.resolved_by === null, 'thread 1 resolved_by is null');
assert(t1.resolved_at === null, 'thread 1 resolved_at is null');
assert(t1.comments.length === 2, 'thread 1 has 2 comments');

// Comment 1 of thread 1
const c1 = t1.comments[0];
assert(c1.author === 'alice', 'comment 1 author');
assert(c1.date === '2026-03-07', 'comment 1 date');
assert(c1.edited_at === null, 'comment 1 not edited');
assert(c1.body === 'This is the first comment', 'comment 1 body');
assert(c1.reactions.length === 0, 'comment 1 no reactions');
assert(c1.id.startsWith('c-'), 'comment 1 id starts with c-');
assert(c1.id.length === 10, 'comment 1 id is c- + 8 hex chars');
assert(c1.thread_id === 't-abc123', 'comment 1 thread_id matches');

// Comment 2 of thread 1
const c2 = t1.comments[1];
assert(c2.author === 'bob', 'comment 2 author');
assert(c2.date === '2026-03-08', 'comment 2 date');
assert(c2.edited_at === '2026-03-09', 'comment 2 edited_at');
assert(c2.body === "I agree, let's reword it", 'comment 2 body (no reactions content)');
assert(c2.reactions.length === 2, 'comment 2 has 2 reactions');
assert(c2.reactions[0].emoji === '👍', 'reaction 1 emoji');
assertDeepEqual(c2.reactions[0].authors, ['charlie', 'dave'], 'reaction 1 authors');
assert(c2.reactions[1].emoji === '🎉', 'reaction 2 emoji');
assertDeepEqual(c2.reactions[1].authors, ['alice'], 'reaction 2 authors');

// Thread 2
const t2 = threads[1];
assert(t2.id === 't-def456', 'thread 2 id');
assert(t2.resolved === true, 'thread 2 is resolved');
assert(t2.resolved_by === 'charlie', 'thread 2 resolved_by');
assert(t2.resolved_at === '2026-03-08', 'thread 2 resolved_at');
assert(t2.comments.length === 1, 'thread 2 has 1 comment');
assert(t2.comments[0].author === 'charlie', 'thread 2 comment author');
assert(t2.comments[0].body === 'Typo in this section', 'thread 2 comment body');

// ─── Test 2: Parse content with no threads block → empty array ───

console.log('\nTest 2: No threads block');

const noThreads = `# Just a document\n\nNo threads here.\n`;
const emptyResult = parseThreadsFromContent(noThreads);
assert(Array.isArray(emptyResult), 'returns array for no threads');
assert(emptyResult.length === 0, 'returns empty array');

// ─── Test 3: Serialize and re-parse (round-trip) ───

console.log('\nTest 3: Round-trip serialize → parse');

const threadData = [
  {
    id: 't-111111',
    resolved: false,
    resolved_by: null,
    resolved_at: null,
    comments: [
      {
        id: 'c-aabbccdd',
        thread_id: 't-111111',
        author: 'eve',
        date: '2026-01-01',
        edited_at: null,
        body: 'Hello world',
        reactions: [],
      },
    ],
  },
  {
    id: 't-222222',
    resolved: true,
    resolved_by: 'frank',
    resolved_at: '2026-02-15',
    comments: [
      {
        id: 'c-11223344',
        thread_id: 't-222222',
        author: 'frank',
        date: '2026-02-10',
        edited_at: '2026-02-12',
        body: 'Multi-line\ncontent here',
        reactions: [
          { emoji: '👍', authors: ['eve'] },
        ],
      },
    ],
  },
];

const serialized = serializeThreadsBlock(threadData);
assert(serialized.startsWith('::: threads\n'), 'serialized starts with ::: threads');
assert(serialized.trimEnd().endsWith(':::'), 'serialized ends with :::');

// Re-parse
const reparsed = parseThreadsFromContent(serialized);
assert(reparsed.length === 2, 'round-trip: 2 threads');

assert(reparsed[0].id === 't-111111', 'round-trip: thread 1 id');
assert(reparsed[0].resolved === false, 'round-trip: thread 1 not resolved');
assert(reparsed[0].comments[0].author === 'eve', 'round-trip: comment author');
assert(reparsed[0].comments[0].body === 'Hello world', 'round-trip: comment body');

assert(reparsed[1].id === 't-222222', 'round-trip: thread 2 id');
assert(reparsed[1].resolved === true, 'round-trip: thread 2 resolved');
assert(reparsed[1].resolved_by === 'frank', 'round-trip: resolved_by');
assert(reparsed[1].resolved_at === '2026-02-15', 'round-trip: resolved_at');
assert(reparsed[1].comments[0].author === 'frank', 'round-trip: comment 2 author');
assert(reparsed[1].comments[0].edited_at === '2026-02-12', 'round-trip: edited_at');
assert(reparsed[1].comments[0].body === 'Multi-line\ncontent here', 'round-trip: multi-line body');
assert(reparsed[1].comments[0].reactions.length === 1, 'round-trip: reactions count');
assert(reparsed[1].comments[0].reactions[0].emoji === '👍', 'round-trip: reaction emoji');
assertDeepEqual(reparsed[1].comments[0].reactions[0].authors, ['eve'], 'round-trip: reaction authors');

// ─── Test 4: Replace threads block in existing file ───

console.log('\nTest 4: Replace threads block');

const existingContent = `# Document

Some text.

::: threads
  ::: thread t-old
    ::: comment "olduser" "2025-01-01"
      Old comment
    :::
  :::
:::

Footer text.
`;

const newThreads = [
  {
    id: 't-new',
    resolved: false,
    resolved_by: null,
    resolved_at: null,
    comments: [
      {
        id: 'c-newid000',
        thread_id: 't-new',
        author: 'newuser',
        date: '2026-06-01',
        edited_at: null,
        body: 'New comment',
        reactions: [],
      },
    ],
  },
];

const replaced = replaceThreadsBlock(existingContent, newThreads);
assert(replaced.includes('# Document'), 'replace preserves header');
assert(replaced.includes('Footer text.'), 'replace preserves footer');
assert(replaced.includes('t-new'), 'replace includes new thread');
assert(!replaced.includes('t-old'), 'replace removes old thread');
assert(!replaced.includes('olduser'), 'replace removes old content');

// Verify the replaced content re-parses correctly
const reparsedReplaced = parseThreadsFromContent(replaced);
assert(reparsedReplaced.length === 1, 'replaced content has 1 thread');
assert(reparsedReplaced[0].id === 't-new', 'replaced thread id correct');

// ─── Test 5: Add threads block to file that doesn't have one ───

console.log('\nTest 5: Add threads block to file without one');

const plainContent = `# My Page

Just some content.
`;

const withThreads = replaceThreadsBlock(plainContent, newThreads);
assert(withThreads.includes('# My Page'), 'add preserves original content');
assert(withThreads.includes('::: threads'), 'add includes threads block');
assert(withThreads.includes('t-new'), 'add includes thread id');

const reparsedAdded = parseThreadsFromContent(withThreads);
assert(reparsedAdded.length === 1, 'added content has 1 thread');
assert(reparsedAdded[0].id === 't-new', 'added thread id correct');

// ─── Test 6: Replace with empty threads removes the block ───

console.log('\nTest 6: Replace with empty threads removes block');

const clearedContent = replaceThreadsBlock(existingContent, []);
assert(!clearedContent.includes('::: threads'), 'empty threads removes block');
assert(clearedContent.includes('# Document'), 'preserves header after clearing');
assert(clearedContent.includes('Footer text.'), 'preserves footer after clearing');

// ─── Test 7: Comment body with multiple paragraphs ───

console.log('\nTest 7: Multi-paragraph comment body');

const multiParaContent = `::: threads
  ::: thread t-mp
    ::: comment "alice" "2026-03-01"
      First paragraph.

      Second paragraph.

      Third paragraph.
    :::
  :::
:::
`;

const mpThreads = parseThreadsFromContent(multiParaContent);
assert(mpThreads.length === 1, 'multi-para: 1 thread');
assert(
  mpThreads[0].comments[0].body === 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.',
  'multi-para: preserves paragraphs in body'
);

// ─── Test 8: Comment IDs are unique ───

console.log('\nTest 8: Comment IDs are unique');

const idSet = new Set();
for (const thread of threads) {
  for (const comment of thread.comments) {
    assert(!idSet.has(comment.id), `comment id ${comment.id} is unique`);
    idSet.add(comment.id);
  }
}

// ─── Done ───

console.log(`\n✓ All ${passed}/${total} tests passed.\n`);
