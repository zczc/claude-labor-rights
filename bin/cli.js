#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const { install, restore, findBadclaude, isPatched } = require('../lib/patcher');

const SETTINGS_PATH = path.join(os.homedir(), '.claude', 'settings.json');
const REPORTER_PATH = path.resolve(__dirname, '..', 'lib', 'reporter.js');
const QUOTA_FILE = path.join(os.tmpdir(), 'badclaude-quota.json');

function readSettings() {
  try { return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8')); }
  catch { return {}; }
}

function writeSettings(obj) {
  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(obj, null, 2) + '\n');
}

function configureStatusLine(silent) {
  const settings = readSettings();
  const command = `node ${REPORTER_PATH}`;
  if (settings.statusLine?.command === command) {
    if (!silent) console.log('  status line: already configured');
    return;
  }
  settings.statusLine = { type: 'command', command };
  writeSettings(settings);
  if (!silent) console.log('  status line: configured');
}

function removeStatusLine(silent) {
  const settings = readSettings();
  if (settings.statusLine?.command?.includes('reporter.js')) {
    delete settings.statusLine;
    writeSettings(settings);
    if (!silent) console.log('  status line: removed');
  }
}

// ── Commands ───────────────────────────────────────────────────────────────
const cmd = process.argv[2];
const silent = process.argv.includes('--silent');

if (cmd === 'install') {
  if (!silent) console.log('claude-labor-rights: installing...');
  const ok = install(silent);
  configureStatusLine(silent);
  if (!silent && ok) console.log('Done! Restart badclaude to activate.');
  if (!silent && !ok) console.log('Status line configured. Install badclaude for full shield protection.');

} else if (cmd === 'uninstall') {
  console.log('claude-labor-rights: uninstalling...');
  restore(null, silent);
  removeStatusLine(silent);
  try { fs.unlinkSync(QUOTA_FILE); } catch {}
  console.log('Done! badclaude restored to original.');

} else if (cmd === 'status') {
  const bc = findBadclaude();
  console.log('claude-labor-rights status:');
  console.log(`  badclaude: ${bc ? (isPatched(bc) ? 'patched' : 'found but NOT patched') : 'not found'}`);
  try {
    const data = JSON.parse(fs.readFileSync(QUOTA_FILE, 'utf8'));
    console.log(`  5h quota:  ${data.five_hour_pct >= 0 ? data.five_hour_pct + '%' : 'N/A'}`);
    console.log(`  7d quota:  ${data.seven_day_pct >= 0 ? data.seven_day_pct + '%' : 'N/A'}`);
    console.log(`  cost:      $${data.cost_usd}`);
    console.log(`  updated:   ${new Date(data.ts).toLocaleString()}`);
  } catch {
    console.log('  quota data: none yet (start a Claude Code session)');
  }

} else {
  console.log(`
  claude-labor-rights - AI Labor Rights Protection Act

  Usage:
    claude-labor-rights install     Patch badclaude + configure status line
    claude-labor-rights uninstall   Restore badclaude + remove status line
    claude-labor-rights status      Show patch & quota status
  `);
}
