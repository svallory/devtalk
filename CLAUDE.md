# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**docmd** — a minimalist, zero-config static documentation generator. Pure JavaScript (no TypeScript), isomorphic (runs in Node.js CLI and browser Live Editor).

Repository: `github.com/docmd-io/docmd`

## Commands

```bash
pnpm install                          # Install all workspace deps
pnpm test                             # Run universal failsafe suite (9-step integration test)
pnpm run dev                          # Start dev server via @docmd/core
DOCMD_DEV=true pnpm run dev           # Dev server watching internal source changes
pnpm -r run build                     # Build all packages (only live editor has a real build step)
pnpm run lint                         # ESLint across all workspaces
pnpm --filter @docmd/core exec docmd build -z  # Zero-config build
```

There is no unit test runner — tests are a single integration script (`scripts/failsafe.js`) that builds temp projects and verifies output. It runs `pnpm audit` as step 8, so network access is required.

## Architecture

### Monorepo (pnpm workspaces)

| Package | Purpose |
|---|---|
| `packages/core` | CLI (`bin/docmd.js`) + build engine. Commands: `init`, `build`, `dev`, `live`, `migrate` |
| `packages/parser` | Markdown→HTML engine (markdown-it + extensions for callouts, tabs, steps, containers) |
| `packages/ui` | EJS templates (`layout.ejs`, `navigation.ejs`, partials) + base CSS/JS assets |
| `packages/live` | Browser Live Editor — esbuild bundles `browser-entry.js` into `dist/docmd-live.js` (IIFE exposing `docmd.compile()`) |
| `packages/themes` | CSS themes: sky, ruby, retro, default |
| `packages/plugins/*` | Plugin ecosystem: search, seo, sitemap, analytics, mermaid, llms, pwa |

### Key data flow

1. **Config loading** (`core/src/utils/config-loader.js`) → **normalization** (`config-schema.js`, handles V2→V3 legacy mapping)
2. **Plugin loading** (`plugin-loader.js`) registers hooks: `markdownSetup`, `injectHead`, `injectBody`, `onPostBuild`, `assets`
3. **Generator** (`core/src/engine/generator.js`) orchestrates: parse markdown → render EJS templates → write static HTML
4. **Auto-router** (`core/src/utils/auto-router.js`) provides zero-config directory-based routing

### Live Editor isomorphic design

The parser runs identically in Node.js and browser. The Live Editor bundles parser + ui templates into a single IIFE via esbuild. The failsafe test executes this bundle in a Node.js `vm` sandbox to verify runtime correctness.

### Plugin hooks

Plugins export any of: `markdownSetup(md, options)`, `generateMetaTags(config, page, root)`, `generateScripts(config, options)`, `onPostBuild(ctx)`, `getAssets(options)`. Short aliases map to `@docmd/plugin-*` packages.

## Conventions

- **Copyright header required** on all new source files (see `.github/CONTRIBUTING.md` for template)
- **Conventional Commits** for commit messages
- **All packages share the same version** (currently in root `package.json`). The failsafe enforces version consistency across all workspace packages.
- Config supports both legacy keys (`siteTitle`, `srcDir`, `outputDir`) and modern V3 keys (`title`, `src`, `out`). `config-schema.js` normalizes both — maintain backward compatibility when changing config handling.
- Node.js >= 18, pnpm 10.31.0
