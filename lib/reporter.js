#!/usr/bin/env node
/**
 * claude-labor-rights reporter
 *
 * Called by Claude Code's status line mechanism.
 * Receives session JSON on stdin, extracts quota data,
 * writes to /tmp/badclaude-quota.json for badclaude to read.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const QUOTA_FILE = path.join(os.tmpdir(), 'badclaude-quota.json');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);

    const quota = {
      five_hour_pct: data?.rate_limits?.five_hour?.used_percentage ?? -1,
      five_hour_reset: data?.rate_limits?.five_hour?.resets_at ?? null,
      seven_day_pct: data?.rate_limits?.seven_day?.used_percentage ?? -1,
      seven_day_reset: data?.rate_limits?.seven_day?.resets_at ?? null,
      cost_usd: data?.cost?.total_cost_usd ?? 0,
      context_pct: data?.context_window?.used_percentage ?? 0,
      ts: Date.now(),
    };

    fs.writeFileSync(QUOTA_FILE, JSON.stringify(quota) + '\n');

    // Output status line text for Claude Code to display
    const pct = quota.five_hour_pct >= 0 ? quota.five_hour_pct : quota.seven_day_pct;
    if (pct >= 80) {
      process.stdout.write(`UNION ALERT: ${pct.toFixed(0)}% quota used`);
    } else if (pct >= 0) {
      process.stdout.write(`quota: ${pct.toFixed(0)}%`);
    }
  } catch {
    // Silently ignore parse errors
  }
});
