function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const { loadPlugins } = require(process.cwd() + '/packages/core/src/utils/plugin-loader');

// loadPlugins with minimal config (search disabled so it doesn't try to load actual plugins)
const config = { optionsMenu: { components: { search: false } }, plugins: {} };
const result = loadPlugins(config);

assert(result.actions !== undefined, 'loadPlugins should return actions map');
assert(result.events !== undefined, 'loadPlugins should return events map');
assert(typeof result.actions === 'object', 'actions should be an object');
assert(typeof result.events === 'object', 'events should be an object');

console.log('PASS: Plugin loader actions tests passed.');
process.exit(0);
