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
 * Action dispatcher for live-edit WebSocket message handling.
 *
 * Routes incoming `call` messages to plugin action handlers and `event`
 * messages to plugin event handlers.  Each call gets a fresh context with
 * file I/O helpers and source editing tools.  Tracks modifications so the
 * caller knows whether a browser reload is needed.
 */

const path = require('path');
const fs = require('fs');
const { createSourceTools } = require('./source-tools');

/**
 * Resolve a relative path against the project root, rejecting any path
 * that would escape the root directory.
 */
function safePath(root, relativePath) {
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error(`Path escapes project root: ${relativePath}`);
  }
  return resolved;
}

/**
 * Create an action dispatcher bound to the given hooks and project context.
 *
 * @param {object} hooks        – { actions: {name: handler}, events: {name: handler} }
 * @param {object} options
 * @param {string} options.projectRoot – absolute path to the project root
 * @param {object} options.config      – docmd site config
 * @param {function} options.broadcast – (event, data) => void
 * @returns {{ handleCall, handleEvent }}
 */
function createActionDispatcher(hooks, { projectRoot, config, broadcast }) {
  return {
    /**
     * Dispatch a call-style action.  Returns { result, reload }.
     */
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
          return fs.promises.readFile(resolved, 'utf8');
        },
        async writeFile(relativePath, content) {
          const resolved = safePath(projectRoot, relativePath);
          await fs.promises.writeFile(resolved, content);
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

    /**
     * Dispatch a fire-and-forget event.  Unknown events are silently ignored.
     */
    handleEvent(name, data) {
      const handler = hooks.events[name];
      if (!handler) return;
      const ctx = { projectRoot, config, broadcast };
      try { handler(data, ctx); } catch (e) {
        console.error(`Event handler error [${name}]:`, e.message);
      }
    }
  };
}

module.exports = { createActionDispatcher };
