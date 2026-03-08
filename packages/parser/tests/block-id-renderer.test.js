/**
 * --------------------------------------------------------------------
 * docmd : the minimalist, zero-config documentation generator.
 *
 * @package     @docmd/core (and ecosystem)
 * @website     https://docmd.io
 * @repository  https://github.com/docmd-io/docmd
 * @license     MIT
 * @copyright   Copyright (c) 2025 docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */

/**
 * Block ID renderer plugin tests.
 *
 * Verifies that when isDev is true, HTML output includes data-source-map
 * and data-block-id attributes. When isDev is false, output is clean.
 * Also tests frontmatterLineCount computation.
 *
 * Usage:  node packages/parser/tests/block-id-renderer.test.js
 * Exit 0 on pass, 1 on fail.
 */

const { createMarkdownProcessor, processContent } = require('../src');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// ---------------------------------------------------------------------------
// 1. isDev: true — data-source-map and data-block-id appear in output
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: true });
  const src = [
    '# Hello',          // line 0
    '',                  // line 1
    'A paragraph.',      // line 2
  ].join('\n');

  const html = md.render(src, {});
  assert(
    html.includes('data-source-map='),
    'isDev:true — HTML contains data-source-map attribute'
  );
  assert(
    html.includes('data-block-id='),
    'isDev:true — HTML contains data-block-id attribute'
  );
}

// ---------------------------------------------------------------------------
// 2. Block IDs follow dot notation (0, 0.0, 0.1)
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: true });
  const src = [
    '# Heading',         // line 0 → block 0 (heading)
    '',                   // line 1
    'First paragraph.',   // line 2 → block 1
    '',                   // line 3
    'Second paragraph.',  // line 4 → block 2
  ].join('\n');

  const html = md.render(src, {});

  assert(
    html.includes('data-block-id="0"'),
    'dot notation — first block has id "0"'
  );
  assert(
    html.includes('data-block-id="1"'),
    'dot notation — second block has id "1"'
  );
  assert(
    html.includes('data-block-id="2"'),
    'dot notation — third block has id "2"'
  );
}

// ---------------------------------------------------------------------------
// 3. Inline elements get colon-separated IDs
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: true });
  const src = [
    'Text with **bold** word.',  // line 0
  ].join('\n');

  const html = md.render(src, {});

  // The paragraph is block 0, its inline child is 0.0, bold inside inline is 0.0:0
  assert(
    html.includes('data-block-id="0.0:0"'),
    'inline — bold element has colon-separated id "0.0:0"'
  );
}

// ---------------------------------------------------------------------------
// 4. isDev: false — NO data attributes appear
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: false });
  const src = [
    '# Hello',
    '',
    'A paragraph with **bold**.',
  ].join('\n');

  const html = md.render(src, {});
  assert(
    !html.includes('data-source-map'),
    'isDev:false — no data-source-map in output'
  );
  assert(
    !html.includes('data-block-id'),
    'isDev:false — no data-block-id in output'
  );
}

// ---------------------------------------------------------------------------
// 4b. Default config (no isDev) — NO data attributes
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({});
  const src = '# Hello\n\nParagraph.\n';
  const html = md.render(src, {});
  assert(
    !html.includes('data-source-map'),
    'default config — no data-source-map in output'
  );
  assert(
    !html.includes('data-block-id'),
    'default config — no data-block-id in output'
  );
}

// ---------------------------------------------------------------------------
// 5. frontmatterLineCount is computed correctly
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({});
  const rawString = '---\ntitle: Test\n---\nSome content here.\n';
  const result = processContent(rawString, md, {});

  assert(result !== null, 'frontmatter — processContent returns non-null');
  assert(
    result.frontmatterLineCount === 4,
    `frontmatter — frontmatterLineCount = 4, got ${result.frontmatterLineCount}`
  );
}

// ---------------------------------------------------------------------------
// 5b. frontmatterLineCount is 0 when no frontmatter
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({});
  const rawString = '# No Frontmatter\n\nJust content.\n';
  const result = processContent(rawString, md, {});

  assert(result !== null, 'no frontmatter — processContent returns non-null');
  assert(
    result.frontmatterLineCount === 0,
    `no frontmatter — frontmatterLineCount = 0, got ${result.frontmatterLineCount}`
  );
}

// ---------------------------------------------------------------------------
// 6. data-source-map format is "startLine:endLine"
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: true });
  const src = [
    '# Heading',         // line 0
    '',                   // line 1
    'Paragraph text.',    // line 2
  ].join('\n');

  const html = md.render(src, {});

  // The heading should have data-source-map="0:1"
  const sourceMapMatch = html.match(/data-source-map="(\d+:\d+)"/);
  assert(
    sourceMapMatch !== null,
    'source-map format — found data-source-map with "start:end" format'
  );
  assert(
    sourceMapMatch && sourceMapMatch[1] === '0:1',
    `source-map format — heading has "0:1", got "${sourceMapMatch && sourceMapMatch[1]}"`
  );
}

// ---------------------------------------------------------------------------
// 7. Existing heading ID and class attributes are preserved
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: true });
  const src = '## My Heading\n\nParagraph.\n';
  const html = md.render(src, {});

  assert(
    html.includes('id="my-heading"'),
    'heading id attribute preserved with isDev:true'
  );
  assert(
    html.includes('docmd-heading'),
    'heading class attribute preserved with isDev:true'
  );
  assert(
    html.includes('data-block-id='),
    'heading also has data-block-id with isDev:true'
  );
}

// ---------------------------------------------------------------------------
// 8. code_inline gets data-block-id
// ---------------------------------------------------------------------------
{
  const md = createMarkdownProcessor({ isDev: true });
  const src = 'Use `code here` in text.\n';
  const html = md.render(src, {});

  // code_inline should have a data-block-id (paragraph=0, inline=0.0, code_inline=0.0:0)
  assert(
    html.includes('<code') && html.match(/data-block-id="0\.0:\d+"/),
    'code_inline — has data-block-id with colon separator'
  );
}

// ---------------------------------------------------------------------------
// Result
// ---------------------------------------------------------------------------
if (failed) {
  console.error('\nSome tests FAILED.');
  process.exit(1);
} else {
  console.log('\nAll tests PASSED.');
  process.exit(0);
}
