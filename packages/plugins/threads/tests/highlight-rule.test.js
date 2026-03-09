/**
 * Tests for highlight inline rule — ==text=={thread-id} syntax
 *
 * Run: node packages/plugins/threads/tests/highlight-rule.test.js
 */

const md = require('markdown-it')();
const highlightRule = require('../src/plugin/highlight-rule');
highlightRule.setup(md);

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

// ─── Test 1: Basic highlight with thread ID ───

console.log('\nTest 1: Basic highlight with thread ID');

const result1 = md.render('==highlighted text=={t-abc123}');
assert(
  result1.includes('<mark class="threads-highlight" data-thread-id="t-abc123">highlighted text</mark>'),
  'renders mark with class and data-thread-id attribute'
);

// ─── Test 2: Plain highlight without thread ID ───

console.log('\nTest 2: Plain highlight without thread ID');

const result2 = md.render('==plain highlight==');
assert(
  result2.includes('<mark class="threads-highlight">plain highlight</mark>'),
  'renders mark with class but no data-thread-id'
);
assert(
  !result2.includes('data-thread-id'),
  'no data-thread-id attribute present'
);

// ─── Test 3: Multiple highlights in one line ───

console.log('\nTest 3: Multiple highlights in one line');

const result3 = md.render('==first=={t-1} and ==second=={t-2}');
assert(
  result3.includes('<mark class="threads-highlight" data-thread-id="t-1">first</mark>'),
  'first highlight rendered correctly'
);
assert(
  result3.includes('<mark class="threads-highlight" data-thread-id="t-2">second</mark>'),
  'second highlight rendered correctly'
);
assert(
  result3.includes(' and '),
  'text between highlights preserved'
);

// ─── Test 4: Highlight inside a paragraph with other text ───

console.log('\nTest 4: Highlight inside a paragraph');

const result4 = md.render('This is a ==highlighted phrase=={t-42} in a sentence.');
assert(
  result4.includes('This is a <mark class="threads-highlight" data-thread-id="t-42">highlighted phrase</mark> in a sentence.'),
  'highlight embedded in paragraph text'
);

// ─── Test 5: Highlight with bold inside ───

console.log('\nTest 5: Highlight with bold inside');

const result5 = md.render('==**bold** text=={t-1}');
assert(
  result5.includes('<mark class="threads-highlight" data-thread-id="t-1">'),
  'mark open tag with thread id'
);
assert(
  result5.includes('<strong>bold</strong>'),
  'bold rendered inside mark'
);
assert(
  result5.includes('</mark>'),
  'mark close tag present'
);

// ─── Test 6: No match for single = ───

console.log('\nTest 6: No false positive on single =');

const result6 = md.render('a = b and c = d');
assert(
  !result6.includes('<mark'),
  'single = signs do not trigger highlight'
);

// ─── Test 7: Empty highlight text is not matched ───

console.log('\nTest 7: Empty highlight text');

const result7 = md.render('===={t-1}');
assert(
  !result7.includes('<mark'),
  'empty content between == markers does not match'
);

// ─── Test 8: Highlight does not span across line breaks ───

console.log('\nTest 8: No match across line breaks');

const result8 = md.render('==start\nend==');
assert(
  !result8.includes('<mark'),
  'highlight does not span newlines'
);

// ─── Test 9: Escaped == is not matched ───

console.log('\nTest 9: Backslash-escaped markers');

const result9 = md.render('\\==not highlighted==');
assert(
  !result9.includes('<mark'),
  'escaped opening == is not treated as highlight'
);

// ─── Done ───

console.log(`\n✓ All ${passed}/${total} tests passed.\n`);
