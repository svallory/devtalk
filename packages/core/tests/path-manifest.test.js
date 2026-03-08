const fs = require('fs');
const path = require('path');
const os = require('os');

function assert(condition, msg) {
  if (!condition) { console.error(`FAIL: ${msg}`); process.exit(1); }
}

const CWD = process.cwd();
const CLI_BIN = path.join(CWD, 'packages/core/bin/docmd.js');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docmd-manifest-'));

async function run() {
  const { execSync } = require('child_process');

  // Init project
  execSync(`node "${CLI_BIN}" init`, { cwd: tempDir, stdio: 'pipe' });

  // Add nested page
  const docsDir = path.join(tempDir, 'docs');
  fs.mkdirSync(path.join(docsDir, 'guide'), { recursive: true });
  fs.writeFileSync(path.join(docsDir, 'guide', 'setup.md'), '# Setup Guide');

  // Production build — no manifest
  execSync(`node "${CLI_BIN}" build`, { cwd: tempDir, stdio: 'pipe' });
  const prodManifest = path.join(tempDir, 'site', '__dev', 'manifest.json');
  assert(!fs.existsSync(prodManifest), 'Manifest should NOT exist in production builds');

  // Dev build — use buildSite API directly
  // Clean output first
  fs.rmSync(path.join(tempDir, 'site'), { recursive: true, force: true });

  const origCwd = process.cwd();
  process.chdir(tempDir);
  const { buildSite } = require(path.join(CWD, 'packages/core/src/commands/build'));
  await buildSite('docmd.config.js', { isDev: true });
  process.chdir(origCwd);

  const devManifest = path.join(tempDir, 'site', '__dev', 'manifest.json');
  assert(fs.existsSync(devManifest), 'Manifest should exist in dev builds');

  const manifest = JSON.parse(fs.readFileSync(devManifest, 'utf8'));

  // Check root page
  assert(manifest['/'] !== undefined, 'Missing / in manifest');

  // Check nested page
  assert(manifest['/guide/setup'] !== undefined, 'Missing /guide/setup in manifest');
  assert(manifest['/guide/setup'].includes('guide/setup.md'),
    `Wrong source path for /guide/setup: ${manifest['/guide/setup']}`);

  console.log('PASS: Path manifest tests passed.');
}

run().catch(e => {
  console.error(`FAIL: ${e.message}`);
  process.exit(1);
}).finally(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
