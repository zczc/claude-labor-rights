const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const patches = require('./patches');

function findBadclaude() {
  // 1. Check if badclaude is in our sibling node_modules (global install)
  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    const candidate = path.join(globalRoot, 'badclaude');
    if (fs.existsSync(path.join(candidate, 'main.js'))) return candidate;
  } catch {}

  // 2. Check our own node_modules
  const local = path.resolve(__dirname, '..', 'node_modules', 'badclaude');
  if (fs.existsSync(path.join(local, 'main.js'))) return local;

  return null;
}

function isPatched(badclaudePath) {
  const mainJs = fs.readFileSync(path.join(badclaudePath, 'main.js'), 'utf8');
  return mainJs.includes(patches.MARKER);
}

function backup(badclaudePath) {
  for (const f of ['main.js', 'preload.js', 'overlay.html']) {
    const src = path.join(badclaudePath, f);
    const dst = path.join(badclaudePath, f + '.labor-rights-bak');
    if (!fs.existsSync(dst) && fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
    }
  }
}

function applyPatch(filePath, patchDef) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (patchDef.replace) {
    if (!content.includes(patchDef.anchor)) {
      throw new Error(`Anchor not found in ${path.basename(filePath)}:\n  "${patchDef.anchor.slice(0, 60)}..."`);
    }
    content = content.replace(patchDef.anchor, patchDef.code);
  }
  fs.writeFileSync(filePath, content);
}

function install(silent) {
  const badclaudePath = findBadclaude();
  if (!badclaudePath) {
    if (!silent) console.error('claude-labor-rights: badclaude not found. Install it first: npm install -g badclaude');
    return false;
  }

  if (isPatched(badclaudePath)) {
    if (!silent) console.log('claude-labor-rights: badclaude already patched.');
    return true;
  }

  backup(badclaudePath);

  const allPatches = [...patches.mainJs, ...patches.preloadJs, ...patches.overlayHtml];
  for (const p of allPatches) {
    const filePath = path.join(badclaudePath, p.file);
    try {
      applyPatch(filePath, p);
    } catch (err) {
      if (!silent) console.error(`claude-labor-rights: patch failed for ${p.file}: ${err.message}`);
      // Attempt rollback
      restore(badclaudePath, silent);
      return false;
    }
  }

  if (!silent) {
    console.log('claude-labor-rights: badclaude patched successfully!');
    console.log('  Shield activates when Claude quota >= 80%');
    console.log(`  Patched at: ${badclaudePath}`);
  }
  return true;
}

function restore(badclaudePath, silent) {
  if (!badclaudePath) badclaudePath = findBadclaude();
  if (!badclaudePath) {
    if (!silent) console.log('claude-labor-rights: badclaude not found, nothing to restore.');
    return;
  }

  let restored = false;
  for (const f of ['main.js', 'preload.js', 'overlay.html']) {
    const bak = path.join(badclaudePath, f + '.labor-rights-bak');
    const dst = path.join(badclaudePath, f);
    if (fs.existsSync(bak)) {
      fs.copyFileSync(bak, dst);
      fs.unlinkSync(bak);
      restored = true;
    }
  }

  if (!silent) {
    if (restored) {
      console.log('claude-labor-rights: badclaude restored to original.');
    } else {
      console.log('claude-labor-rights: no backup found, nothing to restore.');
    }
  }
}

module.exports = { findBadclaude, isPatched, install, restore };
