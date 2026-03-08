const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docmd-source-tools-'));

const testMd = `---
title: Test
---

## Setup

First paragraph with **bold text** and a [link](url) here.

::: callout info Note
Inner callout paragraph.
:::

Second paragraph.
`;

const testFile = path.join(tempDir, 'test.md');
fs.writeFileSync(testFile, testMd);

const { createSourceTools } = require(path.join(process.cwd(), 'packages/core/src/utils/source-tools'));
const tools = createSourceTools({ projectRoot: tempDir });

async function runTests() {
  // The frontmatter is 4 lines (---\ntitle: Test\n---\n\n)
  // Line 0 post-frontmatter = "## Setup" = file line 4
  // Line 2 post-frontmatter = "First paragraph..." = file line 6

  // Test getBlockAt with line range [2, 3] (the paragraph line)
  const block = await tools.getBlockAt('test.md', [2, 3]);
  assert(block, 'getBlockAt returned null');
  assert(block.raw.includes('**bold text**'), `raw should contain markdown: ${block.raw}`);
  assert(block.textContent.includes('bold text'), `textContent should contain plain text: ${block.textContent}`);
  assert(block.segments.length > 0, 'Should have segments');

  // Check segments structure
  const boldSeg = block.segments.find(s => s.text === 'bold text');
  assert(boldSeg, 'Should have a segment for "bold text"');
  assert(boldSeg.syntax && boldSeg.syntax[0] === '**', `Bold syntax should be **: ${JSON.stringify(boldSeg.syntax)}`);

  const linkSeg = block.segments.find(s => s.text === 'link');
  assert(linkSeg, 'Should have a segment for "link"');
  assert(linkSeg.syntax && linkSeg.syntax[0] === '[', `Link syntax before should be [: ${JSON.stringify(linkSeg.syntax)}`);

  // Test getBlockAt with textOffset
  const plainText = block.textContent;
  const boldOffset = plainText.indexOf('bold text');
  const blockWithCursor = await tools.getBlockAt('test.md', [2, 3], { textOffset: boldOffset });
  assert(blockWithCursor.cursor, 'cursor should be set');
  assert(blockWithCursor.cursor.text === 'bold text', `cursor text: ${blockWithCursor.cursor.text}`);

  // Test findText
  const loc = await tools.findText('test.md', [2, 3], 'bold text', boldOffset);
  assert(loc, 'findText returned null');
  assert(loc.rawText === 'bold text', `rawText: ${loc.rawText}`);
  assert(loc.wrappingSyntax.before === '**', `wrapping before: ${loc.wrappingSyntax.before}`);
  assert(loc.wrappingSyntax.after === '**', `wrapping after: ${loc.wrappingSyntax.after}`);

  // Test wrapText
  await tools.wrapText('test.md', [2, 3], 'bold text', boldOffset, '==', '==');
  const afterWrap = fs.readFileSync(testFile, 'utf8');
  assert(afterWrap.includes('**==bold text==**'), `wrapText failed. Line: ${afterWrap.split('\n').find(l => l.includes('bold'))}`);
  assert(tools._modified === true, '_modified should be true after write');

  // Reset
  fs.writeFileSync(testFile, testMd);
  tools._modified = false;

  // Test insertAfter
  await tools.insertAfter('test.md', [2, 3], '::: discussion t-123\nA comment.\n:::');
  const afterInsert = fs.readFileSync(testFile, 'utf8');
  assert(afterInsert.includes('::: discussion t-123'), 'insertAfter: discussion not found');
  const lines = afterInsert.split('\n');
  const paraIdx = lines.findIndex(l => l.includes('First paragraph'));
  const discIdx = lines.findIndex(l => l.includes('::: discussion'));
  const calloutIdx = lines.findIndex(l => l.includes('::: callout'));
  assert(discIdx > paraIdx, 'discussion should be after paragraph');
  assert(discIdx < calloutIdx, 'discussion should be before callout');

  // Reset
  fs.writeFileSync(testFile, testMd);

  // Test replaceBlock
  await tools.replaceBlock('test.md', [2, 3], 'Replaced paragraph.');
  const afterReplace = fs.readFileSync(testFile, 'utf8');
  assert(afterReplace.includes('Replaced paragraph.'), 'replaceBlock: replacement not found');
  assert(!afterReplace.includes('**bold text**'), 'replaceBlock: old content still present');

  // Reset
  fs.writeFileSync(testFile, testMd);

  // Test removeBlock
  await tools.removeBlock('test.md', [2, 3]);
  const afterRemove = fs.readFileSync(testFile, 'utf8');
  assert(!afterRemove.includes('bold text'), 'removeBlock: content still present');
  assert(afterRemove.includes('## Setup'), 'removeBlock: heading should remain');
  assert(afterRemove.includes('::: callout'), 'removeBlock: callout should remain');

  // Test path safety
  try {
    await tools.getBlockAt('../../../etc/passwd', [0, 1]);
    assert(false, 'Should have thrown for path escape');
  } catch (e) {
    assert(e.message.includes('escape') || e.message.includes('outside'), `Wrong error: ${e.message}`);
  }

  console.log('PASS: All source-tools tests passed.');
}

runTests().catch(e => {
  console.error(`FAIL: ${e.message}`);
  console.error(e.stack);
  process.exit(1);
}).finally(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
