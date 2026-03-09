# Browser Editing Architecture Design

**Date:** 2026-03-08
**Status:** Approved
**Scope:** Infrastructure for browser-to-source editing in docmd dev server, enabling plugins to modify markdown files through a unified API.

---

## 1. Goals

Allow plugins to modify markdown source files from the browser during development, without:
- Starting separate servers
- Managing source line numbers or file paths directly

The primary use case is a discussion/comment plugin that highlights selected text and inserts comment containers into markdown files.

The architecture must be general enough for any plugin that needs server-side actions triggered from the browser.

## 2. Source Mapping

### 2.1 Block-Level Source Maps

markdown-it tokens carry a `map` property: `[startLine, endLine]` (0-indexed, end-exclusive) relative to the markdown body after frontmatter extraction.

During rendering in dev mode, docmd emits `data-source-map` attributes on block-level HTML elements:

```html
<h2 data-source-map="4:5">Setup</h2>
<p data-source-map="6:8">Some paragraph...</p>
```

**Frontmatter offset:** Since `gray-matter` strips frontmatter before markdown-it sees the content, the line numbers in `data-source-map` are relative to the post-frontmatter body. docmd emits a `data-source-offset` attribute on the content wrapper element with the number of lines consumed by frontmatter (including both `---` delimiters). The server adds this offset internally when resolving block references to file lines.

### 2.2 Block IDs

Line numbers are positions, not identities. They shift on every edit. docmd assigns structural path IDs to every block and inline element.

The ID scheme uses dot-separated node indices representing position in the document tree:

```html
<h2 data-block-id="0">Setup</h2>
<p data-block-id="0.0">First paragraph.</p>
<div class="docmd-container callout" data-block-id="0.1">
  <p data-block-id="0.1.0">Second paragraph.</p>
  <p data-block-id="0.1.1"><strong data-block-id="0.1.1:0">Bold text</strong> here.</p>
</div>
<p data-block-id="0.2">Third paragraph.</p>
```

**Block vs inline separator:** The `:` character separates the block path from the inline path. `0.1.1:0` means "block `0.1.1`, inline node `0`." Nested inlines use dots within the inline portion: `0.1.1:0.0`.

**Stability:** Block IDs are stable across edits that don't restructure the document. Inserting content within a block doesn't change any IDs. Inserting a new sibling block shifts indices of later siblings only.

**Generation:** During the source-map rendering pass in dev mode, docmd walks the token tree, tracks nesting depth and sibling counts, and emits `data-block-id` alongside `data-source-map`.

### 2.3 Fixes Required in Custom Features

The custom block rules (`createDepthTrackingContainer`, `tabsRule`, `stepsRule`) currently push tokens via `state.push()` without setting the `map` property. Each needs a one-line fix:

```js
const openToken = state.push(`custom_${name}_open`, 'div', 1);
openToken.map = [startLine, nextLine + 1];
```

**Tabs special case:** `tabs.js` extracts tab content as strings and re-parses with `state.md.render()`, which resets line numbering. This must be changed to either use `state.md.block.tokenize()` (like containers and steps already do, preserving parent line numbers) or track original line offsets per tab and pass them through.

### 2.4 Dev-Mode Gating

Source map and block ID attributes are only emitted when the dev server is running. The `isDev` flag already passed through the build pipeline controls this. Production builds emit no extra attributes.

## 3. Plugin Actions Architecture

### 3.1 Plugin Registration

Plugins export an `actions` object alongside existing build-time hooks:

```js
module.exports = {
  // Existing build-time hooks
  markdownSetup(md, options) { /* ... */ },
  injectBody(config) { /* ... */ },

  // Server-side action handlers
  actions: {
    'devtalk:add-comment': async (payload, ctx) => {
      // ...
      return { threadId: '...' };
    },
    'devtalk:get-threads': async (payload, ctx) => {
      // ...
      return { threads: [...] };
    }
  }
}
```

Action names are namespaced by convention (e.g., `devtalk:`, `analytics:`). docmd enforces no naming rules but documents the convention.

### 3.2 Actions Run on the Dev Server

Actions are loaded and dispatched only when the dev server is running. The `build` command never instantiates action handlers. This is inherent to the architecture — actions are part of the server lifecycle.

There is no special mode required to enable actions. Any loaded plugin's actions are available whenever the dev server runs. The security model is the same as existing build-time hooks: plugins are fully trusted (they already execute arbitrary Node.js code in `onPostBuild`).

### 3.3 Action Context (`ctx`)

Every action handler receives a `ctx` object with file operations scoped to the project directory:

```js
ctx.readFile(relativePath)        // → string
ctx.writeFile(relativePath, content) // → void
ctx.readFileLines(relativePath)   // → string[]
ctx.config                        // current docmd config
ctx.broadcast(event, data)        // push event to all connected clients
ctx.projectRoot                   // absolute path to project root
ctx.source                        // source editing tools (see section 4)
```

**Guardrail:** All file operations resolve paths relative to `projectRoot` and reject any path that escapes it.

**Modification tracking:** `ctx` internally tracks whether any file was modified during the action (set by `writeFile` and all `ctx.source.*` write methods). This flag drives the reload behavior described in section 5.

## 4. Source Editing Tools (`ctx.source`)

These tools let plugins express edits in terms of the rendered output (block IDs, plain text, selections) while docmd handles the translation to raw markdown source positions. Plugins never parse markdown themselves.

### 4.1 `ctx.source.getBlockAt(file, blockRef, options?)`

The primary query method. Returns a block descriptor with structural, raw, and parsed information.

**Parameters:**
- `file` — relative path to the markdown file
- `blockRef` — block ID string (e.g., `"0.1.1"`) or `[startLine, endLine]` fallback
- `options.textOffset` — character offset in the block's plain text content; resolves to a specific inline segment
- `options.withAncestors` — if `true`, returns the full block tree up to the document root

**Returns:**

```js
{
  id: '0.1.1',
  line: { start: 10, end: 11 },
  raw: '**Bold text** here.',
  textContent: 'Bold text here.',
  segments: [
    { text: 'Bold text', rawOffset: 2, rawLength: 9, syntax: ['**', '**'] },
    { text: ' here.',    rawOffset: 15, rawLength: 6, syntax: null },
  ],

  // Present when options.textOffset is provided
  cursor: {
    segment: 0,
    text: 'Bold text',
    rawOffset: 2,
    syntax: ['**', '**'],
  },

  // Present when options.withAncestors is true
  ancestors: [
    { id: '0.1', line: { start: 8, end: 12 }, type: 'callout' },
    { id: '0',   line: { start: 4, end: 14 }, type: 'heading' },
  ]
}
```

**Implementation:** When called, docmd reads the file, extracts the target lines, runs markdown-it's inline tokenizer on the block content (not a full render — just tokenization of 1–5 lines), and walks inline tokens to build the `segments` array.

### 4.2 `ctx.source.findText(file, blockRef, text, textOffset)`

Convenience method. Locates a text selection within a block and returns its exact source position.

**Returns:**

```js
{
  line: 14,
  startCol: 2,
  endCol: 11,
  rawText: 'bold text',
  wrappingSyntax: { before: '**', after: '**' }
}
```

### 4.3 `ctx.source.wrapText(file, blockRef, text, textOffset, before, after)`

Finds the text within the block and wraps it with the given syntax markers. docmd places markers inside existing syntax wrappers, not outside:

```
**bold text** → **==bold text==**   (not ==**bold text**==)
```

### 4.4 `ctx.source.insertAfter(file, blockRef, content)`

Inserts markdown content after a block. Handles blank line spacing to prevent the parser from merging the new content with the preceding block.

### 4.5 `ctx.source.replaceBlock(file, blockRef, content)`

Replaces an entire block's source lines.

### 4.6 `ctx.source.removeBlock(file, blockRef)`

Removes a block's source lines and cleans up excess blank lines.

### 4.7 Block ID Re-Resolution

When an action handler calls multiple write methods sequentially (e.g., `wrapText` then `insertAfter`), the first write may change line numbers. docmd re-resolves block IDs before each operation by re-parsing the file's block structure. Block IDs remain stable across these edits because they represent structural position, not line numbers.

## 5. Client-Server Communication

### 5.1 Unified Browser API

All communication goes through the `docmd` global object, extending the existing browser API. The transport is WebSocket (already present for live reload). The plugin author never sees the transport.

```js
// Request-response (returns a promise)
const result = await docmd.call('devtalk:get-threads', { file, blockId })

// Fire-and-forget client → server
docmd.send('devtalk:text-selected', { file, blockId, selection })

// Subscribe to server-pushed events
const unsub = docmd.on('devtalk:comment-added', (data) => { /* ... */ })

// Post-reload continuity (see 5.4)
docmd.afterReload('handler-name', (context) => { /* runs after reload if context was stashed */ })
docmd.scheduleReload('handler-name', { /* serializable context */ })
```

### 5.2 Wire Protocol

All messages are JSON over the existing WebSocket connection:

```json
// call (client → server)
{"id": "a1b2", "type": "call", "action": "devtalk:add-comment", "payload": {...}}

// response (server → client)
{"id": "a1b2", "type": "response", "result": {...}, "reload": true}

// event, either direction
{"type": "event", "name": "devtalk:comment-added", "data": {...}}

// existing reload signal (kept for chokidar-triggered rebuilds)
"reload"
```

`call` expects a `response` with a matching `id`. `send`/events are fire-and-forget.

### 5.3 Reload After Mutations

When a `call` action modifies source files (detected via `ctx`'s internal modification tracking), the server includes `"reload": true` in the response.

The `docmd.call` implementation:

1. Sends the call message, waits for the response
2. If the response contains an error, rejects the promise
3. If `reload` is `true`:
   - Stashes the result in `sessionStorage` under `docmd:action-result` (keyed by action name, with timestamp)
   - Resolves the promise with the result
   - On the next microtask (`queueMicrotask`), triggers `window.location.reload()`
4. If `reload` is `false`, resolves the promise normally

**What this means for plugin developers:**

- The promise always resolves with the result (or rejects with an error)
- After a mutating call, the plugin's synchronous continuation runs before the reload
- Then the page reloads — the plugin doesn't control this and doesn't need to think about it
- Plugins use `docmd.afterReload()` + `docmd.scheduleReload()` (see 5.4) to schedule work that should happen after the page reloads

**Why not two separate methods (`call` vs `callAndReload`):** Plugin developers would assume they can use `call` to avoid the reload, operating on a stale DOM with stale block IDs. Making reload automatic and implicit when the source was modified prevents this class of bugs.

**Suppressing double reload:** When the server sends `"reload": true` in an action response, it suppresses the chokidar-triggered WebSocket `'reload'` broadcast for the file change caused by that action. This prevents the page from reloading twice.

### 5.4 Post-Reload Continuity

Plugins often need to perform an action after the page reloads (scroll to a new element, flash a highlight, show a toast). docmd provides a two-part helper:

```js
docmd.afterReload(name, callback)   // Declare: "after a reload, if there's context for this name, run this"
docmd.scheduleReload(name, context) // Stash: "on the next reload, pass this context to the named handler"
```

**`docmd.afterReload(name, callback)`** — Declares a named reload handler. Called at the top level of the plugin's client script, which means it runs on every page load. On execution, it checks `sessionStorage` for stashed context under `name`. If found, it calls `callback(context)` immediately and clears the stash. If nothing is stashed, it's a no-op.

**`docmd.scheduleReload(name, context?)`** — Stashes JSON-serializable context into `sessionStorage` under `name`. After the page reloads, the plugin's script re-executes, `afterReload` runs again, finds the stashed context, and fires the callback.

**Example:**

```js
// Top-level: declare what to do after a reload (runs every page load, fires only if context is stashed)
docmd.afterReload('devtalk:scroll-to-thread', (ctx) => {
  scrollToThread(ctx.threadId);
  flashHighlight(ctx.threadId);
});

// After a mutating call
async function saveComment(selectionInfo, commentText) {
  const result = await docmd.call('devtalk:add-comment', {
    ...selectionInfo,
    comment: commentText,
    user: 'anonymous',
  });

  // Stash context — the afterReload handler picks it up after the page reloads
  docmd.scheduleReload('devtalk:scroll-to-thread', { threadId: result.threadId });

  // Page reloads automatically on next microtask
}
```

**Why two methods instead of passing a function to `scheduleReload`:** Functions can't survive a page reload — they reference closures and module-scoped variables that don't exist after the script re-executes. Separating declaration (`afterReload`, top-level) from scheduling (`scheduleReload`, inside action flow) means only serializable data crosses the reload boundary. The function reference is re-created naturally by the plugin's script running again on page load.

Multiple `scheduleReload` calls queue up. All matching `afterReload` handlers fire after reload in registration order. Multiple plugins can register independent handlers without collision (names are namespaced by convention).

## 6. Server-Side Event Handlers

Plugins can optionally export `events` for fire-and-forget messages from the client:

```js
module.exports = {
  actions: { /* ... */ },
  events: {
    'devtalk:text-selected': (data, ctx) => {
      // Log, track, or react — no response sent
    }
  }
}
```

These are dispatched when the client calls `docmd.send(name, data)`. No response is returned.

## 7. End-to-End Example: Discussion Plugin

### Plugin server side

```js
module.exports = {
  markdownSetup(md, options) {
    // Register ::: discussion and ::: comment container syntax
  },

  injectBody(config) {
    // Inject client-side selection UI script
    return '<script src="/__plugins/devtalk/client.js"></script>';
  },

  actions: {
    'devtalk:add-comment': async (payload, ctx) => {
      const { file, blockId, selectedText, textOffset, comment, user } = payload;
      const threadId = generateId();

      await ctx.source.wrapText(file, blockId, selectedText, textOffset, '==', '==');
      await ctx.source.insertAfter(file, blockId,
        `::: discussion ${threadId}\n::: comment ${user}\n${comment}\n:::\n:::`
      );

      return { threadId };
    },

    'devtalk:resolve-thread': async (payload, ctx) => {
      // Remove discussion container, unwrap highlighted text
    }
  }
}
```

### Plugin client side

```js
// Top-level: declare post-reload behavior
docmd.afterReload('devtalk:scroll-to-thread', (ctx) => {
  scrollToThread(ctx.threadId);
  flashHighlight(ctx.threadId);
});

// Selection handling
document.addEventListener('mouseup', () => {
  const sel = window.getSelection();
  if (sel.isCollapsed) return;

  const block = sel.anchorNode.closest('[data-block-id]');
  if (!block) return;

  showCommentButton(sel, {
    blockId: block.dataset.blockId,
    file: document.body.dataset.sourceFile,
    selectedText: sel.toString(),
    textOffset: getTextOffset(sel, block),
  });
});

// Save comment
async function saveComment(selectionInfo, commentText) {
  const result = await docmd.call('devtalk:add-comment', {
    ...selectionInfo,
    comment: commentText,
    user: 'anonymous',
  });

  // Stash context for after reload
  docmd.scheduleReload('devtalk:scroll-to-thread', { threadId: result.threadId });

  // Page reloads automatically on next microtask
}
```

## 8. Implementation Summary

| Component | Location | Description |
|---|---|---|
| Source map emission | `packages/parser/src/markdown-processor.js` | Renderer plugin emitting `data-source-map` and `data-block-id` on tokens, gated by `isDev` |
| Token map fixes | `packages/parser/src/features/*.js` | Add `.map` to custom container/tabs/steps tokens |
| Tabs line mapping fix | `packages/parser/src/features/tabs.js` | Switch from `state.md.render()` to `block.tokenize()` or track line offsets |
| Frontmatter offset | `packages/parser/src/markdown-processor.js` | Compute and return frontmatter line count in `processContent` |
| Action dispatcher | `packages/core/src/commands/dev.js` | WebSocket message handling, action routing to plugin handlers |
| Source editing tools | New: `packages/core/src/utils/source-tools.js` | `getBlockAt`, `findText`, `wrapText`, `insertAfter`, `replaceBlock`, `removeBlock` |
| Browser API | `packages/ui/assets/js/docmd-main.js` or injected script | `docmd.call()`, `docmd.send()`, `docmd.on()` with WebSocket transport |
| Plugin loader changes | `packages/core/src/utils/plugin-loader.js` | Load `actions` and `events` exports from plugins, pass to dev server |
| Path manifest | `packages/core/src/engine/generator.js` | Emit URL-to-source-file mapping during dev builds for the API to resolve paths |
