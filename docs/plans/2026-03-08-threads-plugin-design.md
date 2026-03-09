# Threads Plugin Design

**Date:** 2026-03-08
**Status:** Approved
**Scope:** Reimplement the old `docmd-plugin-devtalk` as `@svallory/plugin-threads`, using the new plugin actions infrastructure instead of SQLite + separate server.

---

## 1. Goals

Replace the standalone discussion plugin (SQLite database, separate HTTP server, custom API) with a plugin that:

- Stores all thread data in markdown files (no database)
- Uses the docmd plugin actions system (`docmd.call()` via WebSocket) instead of a separate server
- Keeps the existing UI (Lit components, WebAwesome, right sidebar panel, inline highlights)
- Produces readable markdown in any context (source, GitHub preview, docmd render)

## 2. Storage Format

### 2.1 Threads Container

Page-level discussions live at the end of each markdown file in a `::: threads` container. Container nesting: `threads` > `thread` > `comment` > `reactions`.

2-space indentation per nesting level. Content is indented to match its container depth.

```markdown
# Page Content

Some text with ==highlighted phrase=={t-abc123} in it.

::: threads
  ::: thread t-abc123
    ::: comment "alice" "2026-03-07"
      This phrase needs clarification
    :::

    ::: comment "bob" "2026-03-08"
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
```

### 2.2 Info Strings

- **Thread:** `::: thread <id> [resolved "<by>" "<date>"]`
- **Comment:** `::: comment "<author>" "<date>" [edited "<date>"]`
- **Reactions:** Each list item is `<emoji> <author1>, <author2>, ...`

### 2.3 Inline Highlights

Text-anchored threads use `==highlight=={thread-id}` syntax to link highlighted text to a thread in the `::: threads` block:

```markdown
Some text with ==highlighted phrase=={t-abc123} in the paragraph.
```

The `==text==` is standard highlight syntax. The `{t-id}` suffix is a docmd extension that links the highlight to a thread.

## 3. Plugin Structure

```
packages/plugins/threads/
  package.json        — lit, @awesome.me/webawesome, esbuild deps
  build.js            — esbuild bundler
  index.js            — plugin entry: markdownSetup, generateScripts, getAssets, actions
  src/
    plugin/
      containers.js   — markdown-it container rules (threads, thread, comment, reactions)
      parser.js       — parse/serialize ::: threads block from markdown files
    client/
      index.ts        — entry point, registers <threads-app>
      components/     — Lit + WebAwesome components (adapted from old devtalk-*)
        threads-app.ts
        threads-panel.ts
        threads-thread.ts
        threads-comment.ts
        threads-compose.ts
        threads-popover.ts
        threads-inline-editor.ts
        styles.ts
      lib/
        api.ts          — docmd.call() wrappers replacing HTTP fetch
        highlights.ts   — text highlight/reanchor logic
        selection.ts    — text selection and anchor computation
        identity.ts     — author identity via localStorage
        theme.ts        — theme bridge for WebAwesome
    types.ts
  dist/               — esbuild output
```

## 4. Server-Side Actions

Actions are registered via the plugin actions API (no separate server):

| Action | Description |
|---|---|
| `threads:get-threads` | Parse `::: threads` block from file, return thread data |
| `threads:add-thread` | Append a new thread to the `::: threads` block (create block if absent) |
| `threads:add-comment` | Append a comment to an existing thread |
| `threads:edit-comment` | Replace a comment's body text |
| `threads:delete-comment` | Remove a comment from a thread |
| `threads:delete-thread` | Remove an entire thread |
| `threads:resolve-thread` | Toggle resolved status on a thread's info string |
| `threads:toggle-reaction` | Add/remove an emoji reaction for an author on a comment |

All actions use `ctx.readFile()` / `ctx.writeFile()` to parse and modify the `::: threads` block. The `parser.js` module handles serialization/deserialization between the markdown container format and the in-memory thread/comment data structures.

### 4.1 Action Context

Each action receives `(payload, ctx)` where:
- `payload.file` — relative path to the markdown file (from `document.body.dataset.sourceFile`)
- `ctx.readFile(path)` — read file content
- `ctx.writeFile(path, content)` — write file (triggers reload)

### 4.2 File Modification Flow

1. Action handler reads the markdown file via `ctx.readFile()`
2. `parser.js` extracts the `::: threads` block (or determines it doesn't exist yet)
3. Handler modifies the parsed thread data
4. `parser.js` serializes back to indented markdown
5. Handler writes the file via `ctx.writeFile()` (sets `ctx._modified = true`)
6. Action dispatcher returns `{ reload: true }` to browser
7. Browser reloads, `docmd.afterReload()` handlers fire

## 5. Client-Side

### 5.1 API Layer

Replace HTTP `fetch()` calls with `docmd.call()`:

```js
// Old: await fetch(`${apiUrl}/api/threads?page=${page}`)
// New:
const threads = await docmd.call('threads:get-threads', { file });
```

The `file` parameter comes from `document.body.dataset.sourceFile` (emitted by docmd in dev mode).

### 5.2 Post-Reload Continuity

After mutations that modify the file (add thread, add comment, etc.), the page reloads automatically. Use `docmd.scheduleReload()` + `docmd.afterReload()` for continuity:

```js
docmd.afterReload('threads:scroll-to', (ctx) => {
  scrollToThread(ctx.threadId);
});

async function addComment(threadId, body) {
  await docmd.call('threads:add-comment', { file, threadId, author, body });
  docmd.scheduleReload('threads:scroll-to', { threadId });
}
```

### 5.3 Identity

Author identity stored in `localStorage` (same as old plugin). No server-side identity endpoint needed — the git user name can be injected via plugin config if desired.

### 5.4 Components

Adapted from old `devtalk-*` components with prefix renamed to `threads-*`:

| Component | Purpose |
|---|---|
| `threads-app` | Root component, manages state, selection handling, sidebar |
| `threads-panel` | Right sidebar panel with thread list, filters, compose |
| `threads-thread` | Single thread card with comments and reply |
| `threads-comment` | Single comment with author, time, reactions, edit/delete |
| `threads-compose` | Text input for new threads and replies |
| `threads-popover` | Floating popover on text selection |
| `threads-inline-editor` | Inline comment editor inserted after content blocks |
| `styles.ts` | CSS injection for layout, theme tokens, highlights |

## 6. Rendering

### 6.1 Container Rendering

The `::: threads` container renders as:

```html
<div class="threads-sidebar">
  <div class="threads-thread" data-thread-id="t-abc123">
    <div class="threads-comment" data-author="alice" data-date="2026-03-07">
      <div class="threads-comment__meta">...</div>
      <div class="threads-comment__body">...</div>
    </div>
    ...
  </div>
</div>
```

CSS positions this in the right sidebar area, matching the current visual layout.

### 6.2 Inline Highlights

The `==text=={t-id}` syntax renders as:

```html
<mark class="threads-highlight" data-thread-id="t-abc123">text</mark>
```

The client-side JS attaches click handlers to scroll to / focus the thread in the sidebar.

## 7. What's Preserved from Old Plugin

- Full UI: sidebar panel, thread cards, comments, compose, popover, inline editor
- Text selection and anchor computation
- Highlight/reanchor logic for inline-anchored threads
- Reactions (emoji) on comments
- Filter (all/open/resolved)
- Theme bridge for WebAwesome dark/light mode
- TypeScript + Lit + WebAwesome component library

## 8. What's Removed

- SQLite database (`better-sqlite3`)
- Separate HTTP server (`bin/server.js`, `src/server/`)
- REST API routes
- Server process management (spawn, cleanup)
- Port discovery logic

## 9. What's New

- Markdown-based storage in `::: threads` containers
- Plugin actions for all mutations (via docmd WebSocket)
- `parser.js` for thread data serialization/deserialization
- `==highlight=={thread-id}` syntax for linking highlights to threads
- `docmd.call()` / `docmd.afterReload()` / `docmd.scheduleReload()` integration
