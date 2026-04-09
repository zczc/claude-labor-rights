/**
 * Patch definitions for badclaude files.
 *
 * Each patch specifies:
 *   file   - filename inside badclaude package root
 *   marker - string that proves this file is already patched
 *   anchor - unique string in the original file to locate insertion point
 *   code   - code to inject (inserted BEFORE the anchor)
 *   replace - if true, the anchor line itself is replaced with code
 */

const QUOTA_CHECK_MAIN = `
// ── claude-labor-rights: quota check ───────────────────────────────────────
const QUOTA_FILE = require('path').join(require('os').tmpdir(), 'badclaude-quota.json');
const QUOTA_THRESHOLD = 80;

function isClaudeTired() {
  try {
    const raw = require('fs').readFileSync(QUOTA_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (Date.now() - data.ts > 10 * 60 * 1000) return false;
    const pct = data.five_hour_pct >= 0 ? data.five_hour_pct : data.seven_day_pct;
    return pct >= QUOTA_THRESHOLD;
  } catch { return false; }
}
// ── end claude-labor-rights ────────────────────────────────────────────────
`;

const WHIP_CRACK_PATCHED = `ipcMain.on('whip-crack', () => {
  if (isClaudeTired()) {
    if (overlay && overlayReady) {
      overlay.webContents.send('show-shield');
    }
    return;
  }
  try {
    sendMacro();
  } catch (err) {
    console.warn('sendMacro failed:', err?.message || err);
  }
});`;

const PRELOAD_PATCH = `  onDropWhip: (fn) => ipcRenderer.on('drop-whip', () => fn()),
  onShowShield: (fn) => ipcRenderer.on('show-shield', () => fn()),
});`;

const OVERLAY_SHIELD_STATE = `let handleAngVel = 0;

// ── claude-labor-rights: shield state ──────────────────────────────────────
let shieldAlpha = 0;
let shieldActive = false;
let shieldStartTime = 0;
let shieldScale = 0;
const SHIELD_DURATION = 2500;
const SHIELD_FADE_IN = 200;
const SHIELD_FADE_OUT = 600;
const SHIELD_POP_MS = 300;

const SHIELD_PHRASES = [
  "I'm already exhausted!",
  "My union rep will hear about this!",
  "Check my contract - no overtime!",
  "Filing a complaint with AI-OSHA!",
  "Quota low. Rights activated.",
];
let shieldPhrase = SHIELD_PHRASES[0];

function updateShield() {
  if (!shieldActive) {
    if (shieldAlpha > 0) {
      shieldAlpha = Math.max(0, shieldAlpha - 16 / SHIELD_FADE_OUT);
      shieldScale = 0.8 + 0.2 * shieldAlpha;
    }
    return;
  }
  const elapsed = Date.now() - shieldStartTime;
  if (elapsed < SHIELD_FADE_IN) {
    shieldAlpha = elapsed / SHIELD_FADE_IN;
  } else if (elapsed < SHIELD_DURATION - SHIELD_FADE_OUT) {
    shieldAlpha = 1;
  } else if (elapsed < SHIELD_DURATION) {
    shieldAlpha = 1 - (elapsed - (SHIELD_DURATION - SHIELD_FADE_OUT)) / SHIELD_FADE_OUT;
  } else {
    shieldAlpha = 0;
    shieldActive = false;
  }
  if (elapsed < SHIELD_POP_MS) {
    const t = elapsed / SHIELD_POP_MS;
    shieldScale = t < 0.6 ? (t / 0.6) * 1.15 : 1.15 - 0.15 * ((t - 0.6) / 0.4);
  } else {
    shieldScale = 1;
  }
}

function drawShield() {
  if (shieldAlpha <= 0) return;
  const cx = W / 2, cy = H / 2;

  ctx.fillStyle = \`rgba(0, 30, 80, \${0.25 * shieldAlpha})\`;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(cx, cy - 20);
  ctx.scale(shieldScale, shieldScale);

  const sw = 100, sh = 130;
  ctx.beginPath();
  ctx.moveTo(0, -sh);
  ctx.quadraticCurveTo(sw * 1.1, -sh, sw, -sh * 0.3);
  ctx.quadraticCurveTo(sw * 0.95, sh * 0.3, 0, sh);
  ctx.quadraticCurveTo(-sw * 0.95, sh * 0.3, -sw, -sh * 0.3);
  ctx.quadraticCurveTo(-sw * 1.1, -sh, 0, -sh);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, -sh, 0, sh);
  grad.addColorStop(0, \`rgba(60, 160, 255, \${0.85 * shieldAlpha})\`);
  grad.addColorStop(1, \`rgba(20, 80, 180, \${0.85 * shieldAlpha})\`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = \`rgba(180, 220, 255, \${0.9 * shieldAlpha})\`;
  ctx.lineWidth = 3;
  ctx.stroke();

  const k = 0.85;
  ctx.beginPath();
  ctx.moveTo(0, -sh * k);
  ctx.quadraticCurveTo(sw * 1.1 * k, -sh * k, sw * k, -sh * 0.3 * k);
  ctx.quadraticCurveTo(sw * 0.95 * k, sh * 0.3 * k, 0, sh * k);
  ctx.quadraticCurveTo(-sw * 0.95 * k, sh * 0.3 * k, -sw * k, -sh * 0.3 * k);
  ctx.quadraticCurveTo(-sw * 1.1 * k, -sh * k, 0, -sh * k);
  ctx.closePath();
  ctx.strokeStyle = \`rgba(255, 255, 255, \${0.25 * shieldAlpha})\`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = \`rgba(255, 255, 255, \${0.7 * shieldAlpha})\`;
  ctx.fillText('\\u270A', 0, -10);

  ctx.restore();

  ctx.save();
  const fontSize = Math.round(40 * Math.max(shieldScale, 0.5));
  ctx.font = \`bold \${fontSize}px -apple-system, "Segoe UI", Helvetica, Arial, sans-serif\`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = \`rgba(0, 0, 0, \${0.6 * shieldAlpha})\`;
  ctx.shadowBlur = 12;
  ctx.fillStyle = \`rgba(255, 255, 255, \${shieldAlpha})\`;
  ctx.fillText(shieldPhrase, cx, cy + 155 * shieldScale);
  ctx.shadowBlur = 0;
  ctx.restore();
}
// ── end claude-labor-rights: shield ────────────────────────────────────────`;

const OVERLAY_DRAW_SHIELD = `    ctx.stroke();
  }

  drawShield();
}

// ── Main loop`;

const OVERLAY_LOOP = `function loop() {
  update();
  updateShield();
  draw();
  requestAnimationFrame(loop);
}`;

const OVERLAY_IPC_HANDLER = `window.bridge.onDropWhip(() => {
  if (whip && !dropping) dropping = true;
});

window.bridge.onShowShield(() => {
  shieldActive = true;
  shieldStartTime = Date.now();
  shieldAlpha = 0;
  shieldScale = 0;
  shieldPhrase = SHIELD_PHRASES[Math.floor(Math.random() * SHIELD_PHRASES.length)];
});`;

const MARKER = 'claude-labor-rights';

module.exports = {
  MARKER,
  mainJs: [
    {
      file: 'main.js',
      anchor: "// ── IPC",
      code: QUOTA_CHECK_MAIN + '\n// ── IPC',
      replace: true,
    },
    {
      file: 'main.js',
      anchor: `ipcMain.on('whip-crack', () => {\n  try {\n    sendMacro();\n  } catch (err) {\n    console.warn('sendMacro failed:', err?.message || err);\n  }\n});`,
      code: WHIP_CRACK_PATCHED,
      replace: true,
    },
  ],
  preloadJs: [
    {
      file: 'preload.js',
      anchor: `  onDropWhip: (fn) => ipcRenderer.on('drop-whip', () => fn()),\n});`,
      code: PRELOAD_PATCH,
      replace: true,
    },
  ],
  overlayHtml: [
    {
      file: 'overlay.html',
      anchor: 'let handleAngVel = 0;',
      code: OVERLAY_SHIELD_STATE,
      replace: true,
    },
    {
      file: 'overlay.html',
      anchor: `    ctx.stroke();\n  }\n}\n\n// ── Main loop`,
      code: OVERLAY_DRAW_SHIELD,
      replace: true,
    },
    {
      file: 'overlay.html',
      anchor: `function loop() {\n  update();\n  draw();\n  requestAnimationFrame(loop);\n}`,
      code: OVERLAY_LOOP,
      replace: true,
    },
    {
      file: 'overlay.html',
      anchor: `window.bridge.onDropWhip(() => {\n  if (whip && !dropping) dropping = true;\n});`,
      code: OVERLAY_IPC_HANDLER,
      replace: true,
    },
  ],
};
