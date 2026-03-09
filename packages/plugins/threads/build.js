const esbuild = require('esbuild');
const path = require('path');

async function build() {
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, 'src/client/index.ts')],
    bundle: true,
    platform: 'browser',
    target: 'es2020',
    format: 'esm',
    outdir: path.resolve(__dirname, 'dist/client'),
    minify: false,
    sourcemap: 'inline',
    loader: { '.css': 'css' },
  });
  console.log('Client built to dist/client/');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
