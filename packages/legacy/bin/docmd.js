#!/usr/bin/env node

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

console.error('\x1b[33m%s\x1b[0m', '⚠️  DEPRECATION NOTICE:');
console.error('\x1b[33m%s\x1b[0m', '   You are using the legacy package "@mgks/docmd".');
console.error('\x1b[33m%s\x1b[0m', '   Please uninstall it and install "@svallory/core" for future updates.');
console.error('\x1b[33m%s\x1b[0m', '   Redirecting to new engine...\n');

// Pass control to the core binary
require('@svallory/core/bin/docmd.js');