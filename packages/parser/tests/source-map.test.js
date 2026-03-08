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
 * Source-map test for custom feature tokens.
 *
 * Verifies that every custom open token produced by docmd features
 * carries a `.map` property with the correct [startLine, endLine] range.
 *
 * Usage:  node packages/parser/tests/source-map.test.js
 * Exit 0 on pass, 1 on fail.
 */

const { createMarkdownProcessor } = require('../src');

const md = createMarkdownProcessor();

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`PASS: ${message}`);
  }
}

function findToken(tokens, type) {
  return tokens.find(t => t.type === type);
}

// ---------------------------------------------------------------------------
// 1. Callout  (common-containers)
// ---------------------------------------------------------------------------
{
  const src = [
    'some preamble',       // line 0
    '',                    // line 1
    '::: callout info',    // line 2
    'Body text',           // line 3
    ':::',                 // line 4
  ].join('\n');

  const tokens = md.parse(src, {});
  const tok = findToken(tokens, 'custom_callout_open');
  assert(tok, 'callout open token exists');
  assert(tok && tok.map, 'callout open token has .map');
  assert(
    tok && tok.map && tok.map[0] === 2 && tok.map[1] === 5,
    `callout .map = [2, 5], got [${tok && tok.map}]`
  );
}

// ---------------------------------------------------------------------------
// 2. Steps
// ---------------------------------------------------------------------------
{
  const src = [
    '::: steps',           // line 0
    '1. First step',       // line 1
    '2. Second step',      // line 2
    ':::',                 // line 3
  ].join('\n');

  const tokens = md.parse(src, {});
  const tok = findToken(tokens, 'steps_open');
  assert(tok, 'steps open token exists');
  assert(tok && tok.map, 'steps open token has .map');
  assert(
    tok && tok.map && tok.map[0] === 0 && tok.map[1] === 4,
    `steps .map = [0, 4], got [${tok && tok.map}]`
  );
}

// ---------------------------------------------------------------------------
// 3. Tabs
// ---------------------------------------------------------------------------
{
  const src = [
    '::: tabs',            // line 0
    '== tab "One"',        // line 1
    'Content one',         // line 2
    '== tab "Two"',        // line 3
    'Content two',         // line 4
    ':::',                 // line 5
  ].join('\n');

  const tokens = md.parse(src, {});
  const tok = findToken(tokens, 'tabs_open');
  assert(tok, 'tabs open token exists');
  assert(tok && tok.map, 'tabs open token has .map');
  assert(
    tok && tok.map && tok.map[0] === 0 && tok.map[1] === 6,
    `tabs .map = [0, 6], got [${tok && tok.map}]`
  );
}

// ---------------------------------------------------------------------------
// 4. Changelog
// ---------------------------------------------------------------------------
{
  const src = [
    '::: changelog',       // line 0
    '== 2025-01-01',       // line 1
    'Initial release',     // line 2
    ':::',                 // line 3
  ].join('\n');

  const tokens = md.parse(src, {});
  const tok = findToken(tokens, 'changelog_open');
  assert(tok, 'changelog open token exists');
  assert(tok && tok.map, 'changelog open token has .map');
  assert(
    tok && tok.map && tok.map[0] === 0 && tok.map[1] === 4,
    `changelog .map = [0, 4], got [${tok && tok.map}]`
  );
}

// ---------------------------------------------------------------------------
// 5. Button
// ---------------------------------------------------------------------------
{
  const src = [
    'paragraph before',               // line 0
    '',                                // line 1
    '::: button "Click Me" /link',     // line 2
  ].join('\n');

  const tokens = md.parse(src, {});
  // button emits html_inline — find the one with docmd-button
  const tok = tokens.find(
    t => t.type === 'html_inline' && t.content && t.content.includes('docmd-button')
  );
  assert(tok, 'button html_inline token exists');
  assert(tok && tok.map, 'button token has .map');
  assert(
    tok && tok.map && tok.map[0] === 2 && tok.map[1] === 3,
    `button .map = [2, 3], got [${tok && tok.map}]`
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
