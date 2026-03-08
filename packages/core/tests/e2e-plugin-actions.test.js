const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const { createActionDispatcher } = require(process.cwd() + '/packages/core/src/utils/action-dispatcher');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docmd-e2e-'));
const testMd = `---
title: Test
---

## Hello

A paragraph with **bold** text.

Another paragraph.
`;
fs.writeFileSync(path.join(tempDir, 'test.md'), testMd);

async function runTests() {
  const hooks = {
    actions: {
      'test:wrap-bold': async (payload, ctx) => {
        await ctx.source.wrapText(payload.file, payload.blockRef, payload.text, payload.textOffset, '==', '==');
        return { wrapped: true };
      },
      'test:read-block': async (payload, ctx) => {
        const block = await ctx.source.getBlockAt(payload.file, payload.blockRef);
        return block;
      }
    },
    events: {}
  };

  const dispatcher = createActionDispatcher(hooks, {
    projectRoot: tempDir,
    config: {},
    broadcast: () => {}
  });

  // Frontmatter is 4 lines (---, title: Test, ---, empty line).
  // Post-FM line 0 = "## Hello" (file line 4)
  // Post-FM line 2 = "A paragraph with **bold** text." (file line 6)
  // blockRef [2, 3] targets that paragraph line (slice(6, 7))

  // Test 1: Read a block via dispatcher
  const readResult = await dispatcher.handleCall('test:read-block', {
    file: 'test.md',
    blockRef: [2, 3]
  });
  assert(readResult.reload === false, 'Read should not trigger reload');
  assert(readResult.result.textContent.includes('bold'), `Block text should contain 'bold': ${readResult.result.textContent}`);
  assert(readResult.result.raw.includes('**bold**'), `Raw should contain markdown: ${readResult.result.raw}`);

  // Test 2: Wrap text (modifies file)
  // Reset file first
  fs.writeFileSync(path.join(tempDir, 'test.md'), testMd);

  // Find 'bold' offset in plain text
  const plainText = readResult.result.textContent;
  const boldOffset = plainText.indexOf('bold');

  const wrapResult = await dispatcher.handleCall('test:wrap-bold', {
    file: 'test.md',
    blockRef: [2, 3],
    text: 'bold',
    textOffset: boldOffset
  });
  assert(wrapResult.reload === true, 'Write should trigger reload');

  const modified = fs.readFileSync(path.join(tempDir, 'test.md'), 'utf8');
  assert(modified.includes('==bold=='), `File not modified correctly. Got: ${modified.split('\n').find(l => l.includes('bold'))}`);

  console.log('PASS: E2E plugin action tests passed.');
}

runTests().catch(e => {
  console.error('FAIL:', e.message, e.stack);
  process.exit(1);
}).finally(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
