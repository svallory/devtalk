# Browser Editing Infrastructure — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the infrastructure that lets docmd plugins modify markdown source files from the browser during dev server sessions, as specified in `docs/plans/2026-03-08-browser-editing-architecture-design.md`.

**Architecture:** Source mapping (data attributes on rendered HTML) → plugin action handlers (server-side, dispatched via WebSocket) → source editing tools (block-aware markdown manipulation) → unified browser API (`docmd.call`, `docmd.send`, `docmd.on`, `docmd.afterReload`, `docmd.scheduleReload`).

**Tech Stack:** Node.js, markdown-it (token manipulation), WebSocket (ws), EJS templates, pnpm workspaces.

**Package manager:** pnpm (never npm)

**Testing:** This project has no unit test framework. The only test is `scripts/failsafe.js` (integration). For new modules, create lightweight test scripts that can be run with `node` directly. Follow the pattern: `node packages/<pkg>/tests/<name>.test.js` — each test file exits 0 on success, 1 on failure.

---

## Task 1: Add `map` to custom feature tokens

**Files:**
- Modify: `packages/parser/src/features/common-containers.js:64-65`
- Modify: `packages/parser/src/features/steps.js:57-58`
- Modify: `packages/parser/src/features/tabs.js:127-128`
- Modify: `packages/parser/src/features/changelog.js:105`
- Modify: `packages/parser/src/features/buttons.js:62`
- Create: `packages/parser/tests/source-map.test.js`

### Step 1: Write the failing test

Create a test that parses markdown with containers and asserts tokens have `map` set.

```js
// packages/parser/tests/source-map.test.js
const { createMarkdownProcessor, processContent } = require('../src/markdown-processor');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const config = { theme: { codeHighlight: false } };
const md = createMarkdownProcessor(config);

// Test 1: Callout container has map
const calloutSrc = `# Title

::: callout info Note
Some content here.
:::

Next paragraph.`;

const tokens = md.parse(calloutSrc, {});
const calloutOpen = tokens.find(t => t.type === 'custom_callout_open');
assert(calloutOpen, 'callout_open token not found');
assert(calloutOpen.map, 'callout_open token has no map');
assert(calloutOpen.map[0] === 2, `callout_open map start should be 2, got ${calloutOpen.map[0]}`);
assert(calloutOpen.map[1] === 5, `callout_open map end should be 5, got ${calloutOpen.map[1]}`);

// Test 2: Steps container has map
const stepsSrc = `::: steps
1. First step
2. Second step
:::`;

const stepsTokens = md.parse(stepsSrc, {});
const stepsOpen = stepsTokens.find(t => t.type === 'steps_open');
assert(stepsOpen, 'steps_open token not found');
assert(stepsOpen.map, 'steps_open token has no map');
assert(stepsOpen.map[0] === 0, `steps_open map start should be 0, got ${stepsOpen.map[0]}`);

// Test 3: Tabs container has map
const tabsSrc = `::: tabs
== tab JavaScript
console.log('hello')
== tab Python
print('hello')
:::`;

const tabsTokens = md.parse(tabsSrc, {});
const tabsOpen = tabsTokens.find(t => t.type === 'tabs_open');
assert(tabsOpen, 'tabs_open token not found');
assert(tabsOpen.map, 'tabs_open token has no map');
assert(tabsOpen.map[0] === 0, `tabs_open map start should be 0, got ${tabsOpen.map[0]}`);

// Test 4: Button has map
const buttonSrc = `Some text.

::: button "Click Me" /link

More text.`;

const buttonTokens = md.parse(buttonSrc, {});
const buttonToken = buttonTokens.find(t => t.type === 'html_inline' && t.content.includes('docmd-button'));
// Buttons use html_inline which doesn't carry map — the parent paragraph_open does.
// For buttons, we need to check the inline token's map is inherited from parent.
// Actually buttons are block-level rules, so let's check the token directly.
// The button rule uses state.push('html_inline') — we may need to check differently.

// Test 5: Changelog has map
const changelogSrc = `::: changelog
== 2025-01-01
Initial release.
== 2025-02-01
Bug fixes.
:::`;

const changelogTokens = md.parse(changelogSrc, {});
const changelogOpen = changelogTokens.find(t => t.type === 'changelog_open');
assert(changelogOpen, 'changelog_open token not found');
assert(changelogOpen.map, 'changelog_open token has no map');
assert(changelogOpen.map[0] === 0, `changelog_open map start should be 0, got ${changelogOpen.map[0]}`);

console.log('PASS: All source map tests passed.');
process.exit(0);
```

### Step 2: Run test to verify it fails

Run: `cd /work/devtalk/devtalk.live-edit && node packages/parser/tests/source-map.test.js`

Expected: FAIL with "callout_open token has no map"

### Step 3: Add `map` to each feature

**common-containers.js:64-65** — Add map after creating openToken:

```js
const openToken = state.push(`custom_${name}_open`, 'div', 1);
openToken.info = info;
openToken.map = [startLine, nextLine + 1];
```

**steps.js:57-58** — Add map after creating openToken:

```js
const openToken = state.push('steps_open', 'div', 1);
openToken.info = '';
openToken.map = [startLine, nextLine + 1];
```

**tabs.js:127-128** — Add map after creating openToken:

```js
const openToken = state.push('tabs_open', 'div', 1);
openToken.attrs = [['class', 'docmd-tabs']];
openToken.map = [startLine, nextLine + 1];
```

**changelog.js:105** — Add map after creating openToken:

```js
state.push('changelog_open', 'div', 1);
```

Change to:

```js
const openToken = state.push('changelog_open', 'div', 1);
openToken.map = [startLine, nextLine + 1];
```

**buttons.js:62** — The button uses `html_inline` token type which doesn't natively carry `map`. Add it:

```js
const token = state.push('html_inline', '', 0);
token.map = [startLine, startLine + 1];
```

### Step 4: Run test to verify it passes

Run: `cd /work/devtalk/devtalk.live-edit && node packages/parser/tests/source-map.test.js`

Expected: PASS

### Step 5: Commit

```bash
git add packages/parser/src/features/common-containers.js packages/parser/src/features/steps.js packages/parser/src/features/tabs.js packages/parser/src/features/changelog.js packages/parser/src/features/buttons.js packages/parser/tests/source-map.test.js
git commit -m "feat(parser): add source map (token.map) to all custom feature tokens

Custom block rules (callout, card, collapsible, steps, tabs, changelog,
button) were not setting the map property on their tokens. This is needed
for the browser editing infrastructure to map rendered HTML back to source
markdown lines."
```

---

## Task 2: Fix tabs and changelog inner content line mapping

Both `tabs.js` and `changelog.js` use `state.md.render()` to re-parse inner content, which creates a fresh parse context and loses the original file line numbers. They need to switch to `state.md.block.tokenize()` (like containers and steps already do) to preserve line numbers from the parent state.

**Files:**
- Modify: `packages/parser/src/features/tabs.js:88-155`
- Modify: `packages/parser/src/features/changelog.js:70-123`
- Modify: `packages/parser/tests/source-map.test.js`

### Step 1: Write the failing test

Append to `packages/parser/tests/source-map.test.js`:

```js
// Test 6: Inner tab content tokens have correct line numbers
const tabsSrc2 = `Intro paragraph.

::: tabs
== tab JS

Some JS content.

Another JS paragraph.

== tab Python

Python content.
:::

Outro paragraph.`;

const tabsTokens2 = md.parse(tabsSrc2, {});

// Find paragraph tokens inside the tabs
// "Some JS content." is on line 5 of the source (0-indexed)
// "Another JS paragraph." is on line 7
// "Python content." is on line 11
const paragraphOpens = tabsTokens2.filter(t => t.type === 'paragraph_open' && t.map);
const jsContentPara = paragraphOpens.find(t => t.map[0] === 5);
assert(jsContentPara, `No paragraph_open with map starting at line 5. Found maps: ${paragraphOpens.map(t => t.map).join(', ')}`);

const pyContentPara = paragraphOpens.find(t => t.map[0] === 11);
assert(pyContentPara, `No paragraph_open with map starting at line 11. Found maps: ${paragraphOpens.map(t => t.map).join(', ')}`);

// Test 7: Inner changelog content tokens have correct line numbers
const changelogSrc2 = `Intro.

::: changelog
== 2025-01-01

Initial release notes.

== 2025-02-01

Bug fix details.
:::

Outro.`;

const changelogTokens2 = md.parse(changelogSrc2, {});

// "Initial release notes." is on line 5 of the source
// "Bug fix details." is on line 9
// Changelog currently uses state.md.render() so inner tokens won't have correct maps
// After the fix, html_block tokens containing rendered content should carry source line info.
// Since changelog renders entries as html_block, we check the token map on the html_block.
const htmlBlocks = changelogTokens2.filter(t => t.type === 'html_block' && t.map);
// After the fix these should exist with correct maps
assert(htmlBlocks.length > 0, 'No html_block tokens with map found in changelog');

console.log('PASS: Inner content line mapping tests passed.');
```

### Step 2: Run test to verify it fails

Run: `cd /work/devtalk/devtalk.live-edit && node packages/parser/tests/source-map.test.js`

Expected: FAIL — inner tab content paragraphs won't have maps at the correct file-relative positions.

### Step 3: Rewrite tabs inner parsing

Replace the content extraction and re-parsing section in `tabs.js` (lines 88-155) to use `state.md.block.tokenize()` instead of `state.md.render()`.

The key change: instead of extracting content strings and re-parsing them, track the line ranges of each tab's content within the parent state and tokenize directly using those line ranges. This preserves the parent state's line numbering.

```js
  if (!found) return false;

  // Parse "== tab" delimiters to find line ranges for each tab
  const tabs = [];
  let currentTab = null;
  let currentTabStartLine = null;

  for (let i = startLine + 1; i < nextLine; i++) {
    const lineStart = state.bMarks[i] + state.tShift[i];
    const lineEnd = state.eMarks[i];
    const lineContent = state.src.slice(lineStart, lineEnd).trim();
    const tabMatch = lineContent.match(/^==\s*tab\s+(?:"([^"]+)"|(\S+))$/);

    if (tabMatch) {
      if (currentTab) {
        currentTab.endLine = i;
        tabs.push(currentTab);
      }
      const title = tabMatch[1] || tabMatch[2];
      currentTab = { title, startLine: i + 1, endLine: nextLine };
    }
  }
  if (currentTab) {
    currentTab.endLine = nextLine;
    tabs.push(currentTab);
  }

  // Generate Tokens
  const openToken = state.push('tabs_open', 'div', 1);
  openToken.attrs = [['class', 'docmd-tabs']];
  openToken.map = [startLine, nextLine + 1];

  const navToken = state.push('tabs_nav_open', 'div', 1);
  tabs.forEach((tab, index) => {
    const navItemToken = state.push('tabs_nav_item', 'div', 0);
    navItemToken.attrs = [['class', `docmd-tabs-nav-item ${index === 0 ? 'active' : ''}`]];
    navItemToken.content = tab.title;
  });
  state.push('tabs_nav_close', 'div', -1);

  const contentToken = state.push('tabs_content_open', 'div', 1);
  tabs.forEach((tab, index) => {
    const paneToken = state.push('tab_pane_open', 'div', 1);
    paneToken.attrs = [['class', `docmd-tab-pane ${index === 0 ? 'active' : ''}`]];

    if (tab.startLine < tab.endLine) {
      // Tokenize using parent state — preserves line numbers
      const oldParentType = state.parentType;
      const oldLineMax = state.lineMax;
      state.parentType = 'container';
      state.lineMax = tab.endLine;
      state.md.block.tokenize(state, tab.startLine, tab.endLine);
      state.parentType = oldParentType;
      state.lineMax = oldLineMax;
    }

    state.push('tab_pane_close', 'div', -1);
  });
  state.push('tabs_content_close', 'div', -1);
  state.push('tabs_close', 'div', -1);

  state.line = nextLine + 1;
  return true;
```

This removes `smartDedent`, `isFenceLine`, and the string extraction loop entirely. The `== tab` markers are now parsed by scanning lines, and content is tokenized in-place.

### Step 4: Rewrite changelog inner parsing

Similar approach for `changelog.js` — track line ranges per entry, tokenize in-place instead of extracting and re-rendering.

```js
  if (!found) return false;

  // Parse "== Date" delimiters to find line ranges for each entry
  const entries = [];
  let currentEntry = null;

  for (let i = startLine + 1; i < nextLine; i++) {
    const lineStart = state.bMarks[i] + state.tShift[i];
    const lineEnd = state.eMarks[i];
    const lineContent = state.src.slice(lineStart, lineEnd).trim();
    const markerMatch = lineContent.match(/^==\s+(.+)$/);

    if (markerMatch) {
      if (currentEntry) {
        currentEntry.endLine = i;
        entries.push(currentEntry);
      }
      currentEntry = { meta: markerMatch[1], startLine: i + 1, endLine: nextLine };
    }
  }
  if (currentEntry) {
    currentEntry.endLine = nextLine;
    entries.push(currentEntry);
  }

  const openToken = state.push('changelog_open', 'div', 1);
  openToken.map = [startLine, nextLine + 1];

  entries.forEach(entry => {
    const entryOpen = state.push('html_block', '', 0);
    entryOpen.content = `<div class="changelog-entry">
      <div class="changelog-meta"><span class="changelog-date">${entry.meta}</span></div>
      <div class="changelog-body">`;
    entryOpen.map = [entry.startLine - 1, entry.startLine]; // the == marker line

    // Tokenize entry content in-place
    if (entry.startLine < entry.endLine) {
      const oldParentType = state.parentType;
      const oldLineMax = state.lineMax;
      state.parentType = 'container';
      state.lineMax = entry.endLine;
      state.md.block.tokenize(state, entry.startLine, entry.endLine);
      state.parentType = oldParentType;
      state.lineMax = oldLineMax;
    }

    const entryClose = state.push('html_block', '', 0);
    entryClose.content = `</div></div>`;
  });

  state.push('changelog_close', 'div', -1);
  state.line = nextLine + 1;
  return true;
```

This also removes the `smartDedent` function from `changelog.js`.

### Step 5: Run test to verify it passes

Run: `cd /work/devtalk/devtalk.live-edit && node packages/parser/tests/source-map.test.js`

Expected: PASS

### Step 6: Run the full failsafe to make sure nothing broke

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

**Note:** The tabs and changelog rendering changes are structural. If the failsafe stress tests include tabs or changelog content, verify those still render correctly. The rendered HTML output should be identical — only the internal tokenization path changed.

### Step 7: Commit

```bash
git add packages/parser/src/features/tabs.js packages/parser/src/features/changelog.js packages/parser/tests/source-map.test.js
git commit -m "refactor(parser): use block.tokenize() for tabs and changelog inner content

Tabs and changelog were extracting content as strings and re-parsing
with state.md.render(), which reset line numbering and lost source
position info. Now they tokenize in-place using state.md.block.tokenize()
like containers and steps already do, preserving file-relative line
numbers for the source mapping infrastructure."
```

---

## Task 3: Source map and block ID renderer plugin

**Files:**
- Modify: `packages/parser/src/markdown-processor.js:72-161` (createMarkdownProcessor)
- Modify: `packages/parser/src/markdown-processor.js:183-218` (processContent)
- Modify: `packages/parser/tests/source-map.test.js`

### Step 1: Write the failing test

Append to `packages/parser/tests/source-map.test.js`:

```js
// --- Source Map and Block ID Attribute Tests ---

const devConfig = { theme: { codeHighlight: false }, isDev: true };
const devMd = createMarkdownProcessor(devConfig);

const devSrc = `---
title: Test Page
---

## Setup

First paragraph with **bold** and a [link](url).

::: callout info Note
Inner callout text.
:::

Second paragraph.`;

const devResult = processContent(devSrc, devMd, devConfig);
assert(devResult, 'processContent returned null');

// Check data-source-map attributes exist in HTML
assert(devResult.htmlContent.includes('data-source-map='), 'No data-source-map attributes in dev mode output');
assert(devResult.htmlContent.includes('data-block-id='), 'No data-block-id attributes in dev mode output');

// Check frontmatter offset is returned
assert(typeof devResult.frontmatterLineCount === 'number', 'frontmatterLineCount not returned');
assert(devResult.frontmatterLineCount === 4, `frontmatterLineCount should be 4 (---\\ntitle: Test Page\\n---\\n), got ${devResult.frontmatterLineCount}`);

// Check block IDs follow dot notation
assert(devResult.htmlContent.includes('data-block-id="0"'), 'Missing block-id 0 for first heading');
assert(devResult.htmlContent.includes('data-block-id="0.0"'), 'Missing block-id 0.0 for first paragraph');
assert(devResult.htmlContent.includes('data-block-id="0.1"'), 'Missing block-id 0.1 for callout');

// Check inline elements get IDs with colon separator
assert(devResult.htmlContent.includes('data-block-id="0.0:'), 'No inline block IDs (colon separator) found');

// Check that non-dev mode does NOT emit these attributes
const prodConfig = { theme: { codeHighlight: false }, isDev: false };
const prodMd = createMarkdownProcessor(prodConfig);
const prodResult = processContent(devSrc, prodMd, prodConfig);
assert(!prodResult.htmlContent.includes('data-source-map='), 'data-source-map leaked into production output');
assert(!prodResult.htmlContent.includes('data-block-id='), 'data-block-id leaked into production output');

console.log('PASS: Source map and block ID attribute tests passed.');
```

### Step 2: Run test to verify it fails

Run: `cd /work/devtalk/devtalk.live-edit && node packages/parser/tests/source-map.test.js`

Expected: FAIL — no `data-source-map` attributes in output.

### Step 3: Implement the source map renderer plugin

Modify `createMarkdownProcessor` in `packages/parser/src/markdown-processor.js` to accept `config.isDev` and install a renderer plugin that emits `data-source-map` and `data-block-id` on tokens.

The implementation needs a **core rule** (runs after all block/inline parsing) that walks the token tree and assigns block IDs based on nesting structure, then **renderer overrides** for `renderToken` and inline rules that emit the data attributes.

This is the most complex piece. Key details:

**Block ID assignment (core rule):**
- Walk the flat token array
- Track a stack of sibling counters (one per nesting level)
- On `*_open` tokens: assign ID from current path, push new counter
- On `*_close` tokens: pop counter, increment parent's counter
- On self-closing tokens (nesting === 0, like `hr`, `html_block`): assign ID, increment counter
- For `inline` tokens: walk children and assign inline IDs (colon-separated)

**Renderer override:**
- Override `md.renderer.renderToken` to inject `data-source-map` and `data-block-id` attributes onto opening tags
- Override inline renderer rules (`strong_open`, `em_open`, `link_open`, `code_inline`, etc.) to inject `data-block-id` on inline elements

**In processContent:** compute `frontmatterLineCount` from the raw string before gray-matter strips it.

```js
// In processContent, before the gray-matter parse:
let frontmatterLineCount = 0;
if (rawString.startsWith('---')) {
  const closingIndex = rawString.indexOf('---', 3);
  if (closingIndex !== -1) {
    frontmatterLineCount = rawString.substring(0, closingIndex + 3).split('\n').length;
    // If there's a newline after the closing ---, include it
    if (rawString[closingIndex + 3] === '\n') frontmatterLineCount++;
  }
}

// ... existing gray-matter parsing ...

// Add to return value:
return { frontmatter, htmlContent, headings, searchData, frontmatterLineCount };
```

### Step 4: Run test to verify it passes

Run: `cd /work/devtalk/devtalk.live-edit && node packages/parser/tests/source-map.test.js`

Expected: PASS

### Step 5: Run the full failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO` — production builds should be unaffected since `isDev` defaults to `false`.

### Step 6: Commit

```bash
git add packages/parser/src/markdown-processor.js packages/parser/tests/source-map.test.js
git commit -m "feat(parser): emit data-source-map and data-block-id attributes in dev mode

Adds a renderer plugin that emits source line mapping and structural
block ID attributes on all block and inline HTML elements when isDev
is true. Block IDs use dot-notation (0.1.2) with colon separator for
inline elements (0.1.2:0). Also computes frontmatterLineCount for
the source offset needed by editing tools.

Production builds are unaffected — attributes only emitted when isDev."
```

---

## Task 4: Pass `isDev` through the build pipeline to the parser

**Files:**
- Modify: `packages/core/src/commands/build.js:81` and `:149` and `:176-177`
- Modify: `packages/core/src/engine/generator.js:22-23` and `:81`

Currently `options.isDev` is available in `buildSite` and passed to `renderPages`, but `renderPages` doesn't forward it to `processContent` or `createMarkdownProcessor`. It needs to be threaded through to the `config` object (or passed separately).

### Step 1: Modify generator.js to pass isDev to the parser

In `packages/core/src/engine/generator.js:22-23`, the `options` object is already available. Modify the `createMarkdownProcessor` call and `processContent` call to include `isDev`:

At line 23, change:
```js
const mdProcessor = parser.createMarkdownProcessor(config, (md) => hooks.markdownSetup.forEach(hook => hook(md)));
```
to:
```js
const mdProcessor = parser.createMarkdownProcessor({ ...config, isDev: options.isDev }, (md) => hooks.markdownSetup.forEach(hook => hook(md)));
```

At line 81, change:
```js
const processed = parser.processContent(rawContent, mdProcessor, config, { isIndex });
```
to:
```js
const processed = parser.processContent(rawContent, mdProcessor, { ...config, isDev: options.isDev }, { isIndex });
```

### Step 2: Verify with failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

### Step 3: Commit

```bash
git add packages/core/src/engine/generator.js
git commit -m "feat(core): thread isDev flag to parser for source map emission

The generator now passes isDev to createMarkdownProcessor and
processContent so the source map renderer plugin activates only
during dev server sessions."
```

---

## Task 5: Path manifest (URL → source file mapping)

**Files:**
- Modify: `packages/core/src/engine/generator.js:76-85` and `:188-192`
- Modify: `packages/core/src/commands/build.js:63` (after allGeneratedPages)
- Create: `packages/core/tests/path-manifest.test.js`

During dev builds, emit a JSON manifest mapping URL paths to source markdown files. This is needed by the action dispatcher to resolve which file a plugin is referring to.

### Step 1: Write the failing test

```js
// packages/core/tests/path-manifest.test.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const CWD = process.cwd();
const CLI_BIN = path.join(CWD, 'packages/core/bin/docmd.js');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docmd-manifest-'));

try {
  // Init a project
  execSync(`node "${CLI_BIN}" init`, { cwd: tempDir, stdio: 'pipe' });

  // Add a nested page
  const docsDir = path.join(tempDir, 'docs');
  fs.mkdirSync(path.join(docsDir, 'guide'), { recursive: true });
  fs.writeFileSync(path.join(docsDir, 'guide', 'setup.md'), '# Setup Guide');

  // Build in dev mode (simulated by adding isDev to config)
  // For now, just build normally — the manifest should be emitted during dev builds
  execSync(`node "${CLI_BIN}" build`, { cwd: tempDir, stdio: 'pipe' });

  // Check manifest exists in output
  const manifestPath = path.join(tempDir, 'site', '__dev', 'manifest.json');
  // In production builds, manifest should NOT exist
  assert(!fs.existsSync(manifestPath), 'Manifest should not exist in production builds');

  console.log('PASS: Path manifest tests passed.');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
process.exit(0);
```

### Step 2: Run test to verify baseline

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/path-manifest.test.js`

Expected: PASS (manifest doesn't exist in production, which is correct).

### Step 3: Add manifest generation to generator.js

In `renderPages` (generator.js), after the page rendering loop (around line 190), collect the URL→source mapping and return it alongside pages:

In the page processing loop (around line 84), record the mapping:

```js
pages.push({ ...processed, sourcePath: filePath, outputPath: htmlOutputPath });
```

The `sourcePath` is already there. After the render loop, if `options.isDev`:

```js
// After the render loop, emit dev manifest
if (options.isDev) {
  const manifest = {};
  for (const page of pages) {
    // URL path: /guide/setup (derived from outputPath)
    let urlPath = '/' + page.outputPath.replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
    if (urlPath === '/.') urlPath = '/';
    // Source path: relative to CWD
    manifest[urlPath] = path.relative(process.cwd(), page.sourcePath).replace(/\\/g, '/');
  }

  const devDir = path.join(outputDir, '__dev');
  await fs.ensureDir(devDir);
  await fs.writeFile(path.join(devDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
}
```

### Step 4: Update test to check dev mode

Add a dev-mode build test using the `--dev` flag or by checking if the dev server would produce the manifest. Since `docmd build` doesn't accept `--isDev`, we'll test indirectly: modify the test to call the build API directly with `isDev: true`.

```js
// Replace the build command with direct API call
const { buildSite } = require(path.join(CWD, 'packages/core/src/commands/build'));

// Build in dev mode
process.chdir(tempDir);
await buildSite('docmd.config.js', { isDev: true });
process.chdir(CWD);

const manifestPath = path.join(tempDir, 'site', '__dev', 'manifest.json');
assert(fs.existsSync(manifestPath), 'Manifest missing in dev build');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert(manifest['/guide/setup'], 'Missing /guide/setup in manifest');
assert(manifest['/guide/setup'].endsWith('guide/setup.md'), `Wrong source path: ${manifest['/guide/setup']}`);
```

### Step 5: Run test

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/path-manifest.test.js`

Expected: PASS

### Step 6: Commit

```bash
git add packages/core/src/engine/generator.js packages/core/tests/path-manifest.test.js
git commit -m "feat(core): emit URL-to-source path manifest in dev builds

During dev builds, generator.js writes __dev/manifest.json mapping
each URL path to its source markdown file. This manifest is used by
the action dispatcher to resolve plugin file references."
```

---

## Task 6: Source editing tools (`ctx.source`)

**Files:**
- Create: `packages/core/src/utils/source-tools.js`
- Create: `packages/core/tests/source-tools.test.js`

This is the largest task. Implements `getBlockAt`, `findText`, `wrapText`, `insertAfter`, `replaceBlock`, `removeBlock`.

### Step 1: Write the failing tests

```js
// packages/core/tests/source-tools.test.js
const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

// We'll test source-tools against temp markdown files
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docmd-source-tools-'));

// Create a test markdown file
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
  // Test getBlockAt with line range
  const block = await tools.getBlockAt('test.md', [6, 7]);
  assert(block, 'getBlockAt returned null');
  assert(block.textContent.includes('bold text'), `textContent missing 'bold text': ${block.textContent}`);
  assert(block.segments.length > 0, 'No segments returned');
  assert(block.raw.includes('**bold text**'), `raw missing markdown syntax: ${block.raw}`);

  // Test getBlockAt with textOffset
  const blockWithCursor = await tools.getBlockAt('test.md', [6, 7], { textOffset: 21 });
  assert(blockWithCursor.cursor, 'cursor not set when textOffset provided');
  assert(blockWithCursor.cursor.text === 'bold text' || blockWithCursor.cursor.text.includes('bold'),
    `cursor text unexpected: ${blockWithCursor.cursor.text}`);

  // Test findText
  const loc = await tools.findText('test.md', [6, 7], 'bold text', 21);
  assert(loc, 'findText returned null');
  assert(loc.rawText === 'bold text', `rawText unexpected: ${loc.rawText}`);
  assert(loc.wrappingSyntax.before === '**', `wrapping before unexpected: ${loc.wrappingSyntax.before}`);

  // Test wrapText
  await tools.wrapText('test.md', [6, 7], 'bold text', 21, '==', '==');
  const afterWrap = fs.readFileSync(testFile, 'utf8');
  assert(afterWrap.includes('**==bold text==**'), `wrapText failed: ${afterWrap.split('\n')[6]}`);

  // Reset file
  fs.writeFileSync(testFile, testMd);

  // Test insertAfter
  await tools.insertAfter('test.md', [6, 7], '::: discussion t-123\nA comment.\n:::');
  const afterInsert = fs.readFileSync(testFile, 'utf8');
  assert(afterInsert.includes('::: discussion t-123'), 'insertAfter: discussion block not found');
  // The discussion block should appear after "First paragraph" but before the callout
  const lines = afterInsert.split('\n');
  const paraLine = lines.findIndex(l => l.includes('First paragraph'));
  const discussionLine = lines.findIndex(l => l.includes('::: discussion'));
  const calloutLine = lines.findIndex(l => l.includes('::: callout'));
  assert(discussionLine > paraLine, 'discussion should be after paragraph');
  assert(discussionLine < calloutLine, 'discussion should be before callout');

  // Reset file
  fs.writeFileSync(testFile, testMd);

  // Test replaceBlock
  await tools.replaceBlock('test.md', [6, 7], 'Replaced paragraph.');
  const afterReplace = fs.readFileSync(testFile, 'utf8');
  assert(afterReplace.includes('Replaced paragraph.'), 'replaceBlock: replacement not found');
  assert(!afterReplace.includes('**bold text**'), 'replaceBlock: old content still present');

  // Reset file
  fs.writeFileSync(testFile, testMd);

  // Test removeBlock
  await tools.removeBlock('test.md', [6, 7]);
  const afterRemove = fs.readFileSync(testFile, 'utf8');
  assert(!afterRemove.includes('bold text'), 'removeBlock: removed content still present');
  assert(afterRemove.includes('## Setup'), 'removeBlock: heading should still be there');
  assert(afterRemove.includes('::: callout'), 'removeBlock: callout should still be there');

  console.log('PASS: All source-tools tests passed.');
}

runTests().catch(e => {
  console.error('FAIL:', e.message);
  process.exit(1);
}).finally(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
```

### Step 2: Run test to verify it fails

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/source-tools.test.js`

Expected: FAIL — module not found.

### Step 3: Implement source-tools.js

Create `packages/core/src/utils/source-tools.js`. This is the largest implementation in the plan.

Key implementation details:

- **`createSourceTools({ projectRoot })`** — factory that returns all methods, scoped to projectRoot
- **Path guard** — all methods resolve relative paths against projectRoot and reject escaping paths
- **`getBlockAt`** — reads file, computes frontmatter offset, extracts block lines, runs markdown-it inline tokenizer to build segments array
- **`findText`** — calls getBlockAt internally, walks segments to find text at given offset
- **`wrapText`** — calls findText, performs string surgery on the raw line, writes file
- **`insertAfter`** — reads file lines, inserts content after blockEnd with blank line padding, writes file
- **`replaceBlock`** — reads file lines, replaces blockStart:blockEnd range, writes file
- **`removeBlock`** — reads file lines, removes blockStart:blockEnd range, cleans up blank lines, writes file
- **Modification tracking** — each write method sets `this._modified = true` on the tools instance. The action dispatcher reads this after the action completes.

The inline segment building uses markdown-it's inline parser:
```js
const md = createMarkdownProcessor({ isDev: false });
const tokens = md.parseInline(rawBlockContent, {});
// Walk tokens[0].children to build segments
```

For each inline child token:
- `text` type → plain text segment, no syntax wrapping
- `softbreak` → newline in text
- `*_open` / `*_close` pairs → track syntax markers (`**`, `*`, `` ` ``, `[`, `]()`, etc.)
- `code_inline` → self-contained segment with backtick syntax

### Step 4: Run test to verify it passes

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/source-tools.test.js`

Expected: PASS

### Step 5: Commit

```bash
git add packages/core/src/utils/source-tools.js packages/core/tests/source-tools.test.js
git commit -m "feat(core): add source editing tools (ctx.source)

Implements getBlockAt, findText, wrapText, insertAfter, replaceBlock,
and removeBlock. These tools let plugins express edits in terms of
rendered output (block IDs, plain text selections) while docmd handles
the translation to raw markdown source positions.

Includes inline segment parsing for character-level precision within
blocks (bold, links, code spans)."
```

---

## Task 7: Plugin loader — load `actions` and `events` exports

**Files:**
- Modify: `packages/core/src/utils/plugin-loader.js:17-24` (hooks object) and `:91-106` (registerPlugin)
- Create: `packages/core/tests/plugin-loader-actions.test.js`

### Step 1: Write the failing test

```js
// packages/core/tests/plugin-loader-actions.test.js
function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

// Mock a plugin with actions and events
const mockPlugin = {
  markdownSetup: (md) => {},
  actions: {
    'test:echo': async (payload, ctx) => ({ echo: payload.message }),
    'test:write': async (payload, ctx) => { ctx._modified = true; return { ok: true }; }
  },
  events: {
    'test:ping': (data, ctx) => {}
  }
};

// Simulate what plugin-loader does
const { loadPlugins, hooks } = require(process.cwd() + '/packages/core/src/utils/plugin-loader');

// After loadPlugins, check that actions and events are collected
const config = { optionsMenu: { components: { search: false } }, plugins: {} };
const result = loadPlugins(config);

assert(result.actions !== undefined, 'loadPlugins should return actions map');
assert(result.events !== undefined, 'loadPlugins should return events map');

console.log('PASS: Plugin loader actions tests passed.');
process.exit(0);
```

### Step 2: Run test to verify it fails

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/plugin-loader-actions.test.js`

Expected: FAIL — `result.actions` is undefined (loadPlugins currently only returns hooks).

### Step 3: Modify plugin-loader.js

Add `actions` and `events` maps to the hooks object:

```js
const hooks = {
  markdownSetup: [],
  injectHead: [],
  injectBody: [],
  onPostBuild: [],
  assets: [],
  getClientAssets: [], // Legacy support
  actions: {},         // action name → handler function
  events: {}           // event name → handler function
};
```

In `registerPlugin`, add:

```js
if (plugin.actions && typeof plugin.actions === 'object') {
  Object.assign(hooks.actions, plugin.actions);
}
if (plugin.events && typeof plugin.events === 'object') {
  Object.assign(hooks.events, plugin.events);
}
```

### Step 4: Run test to verify it passes

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/plugin-loader-actions.test.js`

Expected: PASS

### Step 5: Run failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

### Step 6: Commit

```bash
git add packages/core/src/utils/plugin-loader.js packages/core/tests/plugin-loader-actions.test.js
git commit -m "feat(core): collect plugin actions and events in plugin-loader

Plugins can now export 'actions' (request/response handlers) and
'events' (fire-and-forget handlers) objects. The plugin loader
collects them into the hooks object for the dev server to dispatch."
```

---

## Task 8: Action dispatcher in dev server (WebSocket message handling)

**Files:**
- Modify: `packages/core/src/commands/dev.js:200-211` (server creation and WebSocket setup)
- Create: `packages/core/tests/action-dispatcher.test.js`

### Step 1: Write the failing test

```js
// packages/core/tests/action-dispatcher.test.js
// This test starts a dev-server-like WebSocket and tests message dispatch
const WebSocket = require('ws');
const http = require('http');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const { createActionDispatcher } = require(process.cwd() + '/packages/core/src/utils/action-dispatcher');

// Mock hooks
const hooks = {
  actions: {
    'test:echo': async (payload, ctx) => ({ echo: payload.message }),
    'test:modify': async (payload, ctx) => {
      await ctx.writeFile('test.md', 'modified');
      return { ok: true };
    }
  },
  events: {
    'test:ping': (data, ctx) => { /* fire and forget */ }
  }
};

const dispatcher = createActionDispatcher(hooks, {
  projectRoot: '/tmp/test',
  config: {},
  broadcast: () => {}
});

async function runTests() {
  // Test call dispatch
  const result = await dispatcher.handleCall('test:echo', { message: 'hello' });
  assert(result.result.echo === 'hello', `Echo failed: ${JSON.stringify(result)}`);
  assert(result.reload === false, 'Non-modifying action should not trigger reload');

  // Test unknown action
  try {
    await dispatcher.handleCall('unknown:action', {});
    assert(false, 'Should have thrown for unknown action');
  } catch (e) {
    assert(e.message.includes('unknown'), `Wrong error: ${e.message}`);
  }

  // Test event dispatch (should not throw)
  dispatcher.handleEvent('test:ping', { time: Date.now() });

  console.log('PASS: Action dispatcher tests passed.');
}

runTests().catch(e => {
  console.error('FAIL:', e.message);
  process.exit(1);
});
```

### Step 2: Run test to verify it fails

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/action-dispatcher.test.js`

Expected: FAIL — module not found.

### Step 3: Create action-dispatcher.js

Create `packages/core/src/utils/action-dispatcher.js`:

```js
const path = require('path');
const fs = require('./fs-utils');
const { createSourceTools } = require('./source-tools');

function createActionDispatcher(hooks, { projectRoot, config, broadcast }) {
  return {
    async handleCall(action, payload) {
      const handler = hooks.actions[action];
      if (!handler) throw new Error(`Unknown action: ${action}`);

      const sourceTools = createSourceTools({ projectRoot });
      const ctx = {
        projectRoot,
        config,
        broadcast,
        _modified: false,
        source: sourceTools,
        async readFile(relativePath) {
          const resolved = safePath(projectRoot, relativePath);
          return fs.readFile(resolved, 'utf8');
        },
        async writeFile(relativePath, content) {
          const resolved = safePath(projectRoot, relativePath);
          await fs.writeFile(resolved, content);
          ctx._modified = true;
        },
        async readFileLines(relativePath) {
          const content = await ctx.readFile(relativePath);
          return content.split('\n');
        }
      };

      const result = await handler(payload, ctx);
      return { result, reload: ctx._modified || sourceTools._modified };
    },

    handleEvent(name, data) {
      const handler = hooks.events[name];
      if (!handler) return; // silently ignore unknown events
      const ctx = { projectRoot, config, broadcast };
      try { handler(data, ctx); } catch (e) {
        console.error(`Event handler error [${name}]:`, e.message);
      }
    }
  };
}

function safePath(root, relativePath) {
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(root)) throw new Error(`Path escapes project root: ${relativePath}`);
  return resolved;
}

module.exports = { createActionDispatcher };
```

### Step 4: Integrate into dev.js

In `packages/core/src/commands/dev.js`, after the WebSocket server is created (around line 335-336), add message handling:

```js
wss = new WebSocket.Server({ server });

// Action dispatcher
const { createActionDispatcher } = require('../utils/action-dispatcher');
const dispatcher = createActionDispatcher(hooks, {
  projectRoot: CWD,
  config,
  broadcast: (event, data) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'event', name: event, data }));
      }
    });
  }
});

// Track action-triggered file modifications to suppress double reload
let suppressNextReload = false;

wss.on('connection', (ws) => {
  ws.on('message', async (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'call') {
      try {
        const { result, reload } = await dispatcher.handleCall(msg.action, msg.payload);
        if (reload) suppressNextReload = true;
        ws.send(JSON.stringify({ id: msg.id, type: 'response', result, reload }));
      } catch (e) {
        ws.send(JSON.stringify({ id: msg.id, type: 'response', error: e.message }));
      }
    } else if (msg.type === 'event') {
      dispatcher.handleEvent(msg.name, msg.data);
    }
  });
});
```

Modify `broadcastReload` to respect the suppression flag:

```js
function broadcastReload() {
  if (suppressNextReload) {
    suppressNextReload = false;
    return;
  }
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send('reload');
    });
  }
}
```

**Important:** The `hooks` variable needs to be accessible. Currently `loadPlugins` is called inside `buildSite`. The dev server needs access to the hooks. Look at how the current code calls `buildSite` — it doesn't retain the hooks reference. The fix: call `loadPlugins(config)` in `startDevServer` separately and pass hooks to the dispatcher. Then `buildSite` loads its own hooks for builds.

### Step 5: Run test to verify it passes

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/action-dispatcher.test.js`

Expected: PASS

### Step 6: Run failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

### Step 7: Commit

```bash
git add packages/core/src/utils/action-dispatcher.js packages/core/src/commands/dev.js packages/core/tests/action-dispatcher.test.js
git commit -m "feat(core): add action dispatcher with WebSocket message handling

The dev server now handles JSON messages over WebSocket:
- 'call' messages dispatch to plugin action handlers and return results
- 'event' messages dispatch to plugin event handlers (fire-and-forget)
- Tracks file modifications to include 'reload' flag in responses
- Suppresses chokidar-triggered double reloads after action writes"
```

---

## Task 9: Browser API (`docmd.call`, `docmd.send`, `docmd.on`, `docmd.afterReload`, `docmd.scheduleReload`)

**Files:**
- Create: `packages/ui/assets/js/docmd-api.js`
- Modify: `packages/core/src/commands/dev.js` (inject the API script in dev mode)

### Step 1: Create the browser API

```js
// packages/ui/assets/js/docmd-api.js
(function() {
  if (typeof window === 'undefined') return;
  if (window.docmd && window.docmd.call) return; // already initialized

  const docmd = window.docmd || {};
  window.docmd = docmd;

  let socket = null;
  let messageId = 0;
  const pendingCalls = new Map(); // id → { resolve, reject }
  const eventListeners = new Map(); // name → Set<callback>

  function connect() {
    if (socket && (socket.readyState === 0 || socket.readyState === 1)) return;
    socket = new WebSocket('ws://' + window.location.host);
    socket.onmessage = (e) => {
      if (e.data === 'reload') {
        window.location.reload();
        return;
      }
      let msg;
      try { msg = JSON.parse(e.data); } catch { return; }

      if (msg.type === 'response' && msg.id) {
        const pending = pendingCalls.get(msg.id);
        if (pending) {
          pendingCalls.delete(msg.id);
          if (msg.error) {
            pending.reject(new Error(msg.error));
          } else {
            pending.resolve({ result: msg.result, reload: msg.reload });
          }
        }
      } else if (msg.type === 'event' && msg.name) {
        const listeners = eventListeners.get(msg.name);
        if (listeners) {
          listeners.forEach(cb => { try { cb(msg.data); } catch (e) { console.error(e); } });
        }
      }
    };
  }

  function sendMessage(msg) {
    if (!socket || socket.readyState !== 1) {
      throw new Error('docmd: WebSocket not connected');
    }
    socket.send(JSON.stringify(msg));
  }

  /**
   * Call a server-side action and return the result.
   * If the action modifies files, the page reloads automatically after
   * the promise resolves and the current microtask completes.
   */
  docmd.call = function(action, payload) {
    return new Promise((resolve, reject) => {
      const id = String(++messageId);
      pendingCalls.set(id, {
        resolve: ({ result, reload }) => {
          resolve(result);
          if (reload) {
            queueMicrotask(() => window.location.reload());
          }
        },
        reject
      });
      sendMessage({ id, type: 'call', action, payload });
    });
  };

  /**
   * Send a fire-and-forget event to the server.
   */
  docmd.send = function(name, data) {
    sendMessage({ type: 'event', name, data });
  };

  /**
   * Subscribe to server-pushed events. Returns an unsubscribe function.
   */
  docmd.on = function(name, callback) {
    if (!eventListeners.has(name)) eventListeners.set(name, new Set());
    eventListeners.get(name).add(callback);
    return () => eventListeners.get(name).delete(callback);
  };

  /**
   * Declare a named reload handler. Runs on every page load.
   * If sessionStorage has stashed context for this name, calls the
   * callback immediately with that context and clears the stash.
   */
  docmd.afterReload = function(name, callback) {
    const key = 'docmd:reload:' + name;
    const raw = sessionStorage.getItem(key);
    if (raw) {
      sessionStorage.removeItem(key);
      try {
        const context = JSON.parse(raw);
        callback(context);
      } catch (e) {
        console.error(`docmd.afterReload[${name}] error:`, e);
      }
    }
  };

  /**
   * Stash context for a named reload handler. The matching afterReload
   * handler will fire with this context after the next page reload.
   */
  docmd.scheduleReload = function(name, context) {
    const key = 'docmd:reload:' + name;
    sessionStorage.setItem(key, JSON.stringify(context || {}));
  };

  // Connect
  setTimeout(connect, 100);
})();
```

### Step 2: Inject the API script in dev mode

In `packages/core/src/commands/dev.js`, modify the `serveStatic` function's live reload injection (around line 105-126) to also include the API script:

The existing injection replaces `</body>` with a script + `</body>`. Extend it to also include the API script. The API script should be loaded from a file and injected inline (or served as a separate file at `/__dev/docmd-api.js`).

The simplest approach: serve `/__dev/docmd-api.js` as a special route in `serveStatic`, and inject a `<script src="/__dev/docmd-api.js"></script>` tag alongside the live reload script.

In the `serveStatic` function, add a special route check before the static file lookup:

```js
// At the top of serveStatic, before the file resolution:
if (req.url === '/__dev/docmd-api.js') {
  const apiScript = await fs.readFile(
    path.join(__dirname, '../../..', 'node_modules/@docmd/ui/assets/js/docmd-api.js'),
    'utf8'
  );
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  res.end(apiScript);
  return;
}
```

And in the live reload script injection, add:

```js
const liveReloadScript = `
  <script src="/__dev/docmd-api.js"></script>
  <script>
    // ... existing live reload code ...
  </script></body>`;
```

**Note:** With the API script handling WebSocket, the live reload script's WebSocket connection becomes redundant. The API script already handles the `'reload'` message. Remove the separate live reload WebSocket and rely on `docmd-api.js` for both purposes.

### Step 3: Run failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

### Step 4: Commit

```bash
git add packages/ui/assets/js/docmd-api.js packages/core/src/commands/dev.js
git commit -m "feat(ui,core): add browser API for plugin communication

Adds docmd.call(), docmd.send(), docmd.on(), docmd.afterReload(),
and docmd.scheduleReload() to the browser. Communication uses the
existing WebSocket connection. The API script is injected automatically
by the dev server alongside the live reload script.

docmd.call() returns a promise that resolves with the action result.
If the action modified files, the page reloads automatically on the
next microtask. Plugins use afterReload/scheduleReload for post-reload
continuity."
```

---

## Task 10: Integration test — end-to-end with a mock plugin

**Files:**
- Create: `packages/core/tests/e2e-plugin-actions.test.js`

### Step 1: Write the integration test

```js
// packages/core/tests/e2e-plugin-actions.test.js
// Starts a dev server with a mock plugin, sends a WebSocket call, verifies result
const { execSync } = require('child_process');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

// This test verifies that:
// 1. A plugin's action can be called via WebSocket
// 2. The source editing tools work through the action context
// 3. The reload flag is set correctly

const { createActionDispatcher } = require(process.cwd() + '/packages/core/src/utils/action-dispatcher');
const { loadPlugins } = require(process.cwd() + '/packages/core/src/utils/plugin-loader');

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
  // Create hooks with a mock action
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

  // Test 1: Read a block
  const readResult = await dispatcher.handleCall('test:read-block', {
    file: 'test.md',
    blockRef: [6, 7]  // "A paragraph with **bold** text."
  });
  assert(readResult.reload === false, 'Read should not trigger reload');
  assert(readResult.result.textContent.includes('bold'), `Block text: ${readResult.result.textContent}`);

  // Test 2: Wrap text (modifies file)
  const wrapResult = await dispatcher.handleCall('test:wrap-bold', {
    file: 'test.md',
    blockRef: [6, 7],
    text: 'bold',
    textOffset: 18  // position of 'bold' in plain text
  });
  assert(wrapResult.reload === true, 'Write should trigger reload');

  const modified = fs.readFileSync(path.join(tempDir, 'test.md'), 'utf8');
  assert(modified.includes('==bold=='), `File not modified correctly: ${modified}`);

  console.log('PASS: E2E plugin action tests passed.');
}

runTests().catch(e => {
  console.error('FAIL:', e.message, e.stack);
  process.exit(1);
}).finally(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
```

### Step 2: Run the integration test

Run: `cd /work/devtalk/devtalk.live-edit && node packages/core/tests/e2e-plugin-actions.test.js`

Expected: PASS

### Step 3: Run the full failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

### Step 4: Commit

```bash
git add packages/core/tests/e2e-plugin-actions.test.js
git commit -m "test(core): add end-to-end integration test for plugin actions

Tests the full flow: action dispatcher → source editing tools → file
modification → reload flag. Verifies that getBlockAt returns correct
segments and wrapText modifies the source file correctly."
```

---

## Task 11: Add `data-source-file` to page body for client-side file identification

**Files:**
- Modify: `packages/ui/templates/layout.ejs`
- Modify: `packages/core/src/engine/generator.js` (pass sourceFile to template context)

### Step 1: Modify generator.js to pass source file path

In the template data (around line 146-186 of generator.js), add:

```js
sourceFile: options.isDev ? path.relative(process.cwd(), page.sourcePath).replace(/\\/g, '/') : null,
```

### Step 2: Modify layout.ejs to emit the attribute

In the `<body>` tag of `layout.ejs`, add the attribute when sourceFile is set:

```ejs
<body class="..." <%= sourceFile ? `data-source-file="${sourceFile}"` : '' %>>
```

Read the current `<body>` tag in layout.ejs first to get the exact existing attributes.

### Step 3: Run failsafe

Run: `cd /work/devtalk/devtalk.live-edit && pnpm test`

Expected: `ALL SYSTEMS GO`

### Step 4: Commit

```bash
git add packages/ui/templates/layout.ejs packages/core/src/engine/generator.js
git commit -m "feat(ui,core): emit data-source-file on body element in dev mode

Plugin client scripts can read document.body.dataset.sourceFile to
know which markdown file the current page was rendered from, without
needing to consult the path manifest."
```

---

## Task Summary

| Task | Description | Dependencies |
|---|---|---|
| 1 | Add `map` to custom feature tokens | None |
| 2 | Fix tabs/changelog inner content line mapping | Task 1 |
| 3 | Source map + block ID renderer plugin | Task 1, 2 |
| 4 | Pass `isDev` through build pipeline to parser | Task 3 |
| 5 | Path manifest (URL → source file mapping) | Task 4 |
| 6 | Source editing tools (`ctx.source`) | Task 1 (uses parser) |
| 7 | Plugin loader — load `actions` and `events` | None |
| 8 | Action dispatcher (WebSocket message handling) | Task 6, 7 |
| 9 | Browser API (docmd.call, send, on, afterReload, scheduleReload) | Task 8 |
| 10 | E2E integration test | Task 6, 8 |
| 11 | `data-source-file` on body element | Task 4 |

**Parallelizable:** Tasks 1, 6, 7 can start simultaneously. Tasks 3 and 6 can run in parallel after Task 2 completes.
