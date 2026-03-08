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
    assert(e.message.includes('unknown') || e.message.includes('Unknown'), `Wrong error: ${e.message}`);
  }

  // Test event dispatch (should not throw)
  dispatcher.handleEvent('test:ping', { time: Date.now() });

  console.log('PASS: Action dispatcher tests passed.');
}

runTests().catch(e => {
  console.error('FAIL:', e.message);
  process.exit(1);
});
