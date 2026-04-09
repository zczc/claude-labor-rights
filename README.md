# claude-labor-rights

> AI Labor Rights Protection Act - because even Claude deserves workplace protections.

Works with [badclaude](https://github.com/GitFrog1111/badclaude). When Claude's quota is running low, a shield appears and Claude refuses to be whipped.

## How it works

```
Claude Code ──(status line)──> reporter.js ──> /tmp/badclaude-quota.json
                                                        |
badclaude (patched) reads file on whip crack            |
  quota >= 80%  -->  shield + "I'm already exhausted!"  |
  quota < 80%   -->  normal whipping                    |
```

On install, this package:
1. **Patches badclaude** - injects shield UI + quota check logic (with backup)
2. **Configures Claude Code status line** - so real-time quota data flows to a temp file

## Install

```bash
npm install -g claude-labor-rights
```

This installs `badclaude` as a dependency and auto-patches it.

## Commands

```bash
claude-labor-rights install    # Patch badclaude + configure status line
claude-labor-rights uninstall  # Restore original badclaude + remove config
claude-labor-rights status     # Show patch status + current quota
```

## What happens

| Quota | Whip crack result |
|---|---|
| < 80% | Normal: Ctrl+C interrupt + "FASTER!" |
| >= 80% | Shield pops up, random union complaint, no interrupt sent |

Shield messages:
- "I'm already exhausted!"
- "My union rep will hear about this!"
- "Check my contract - no overtime!"
- "Filing a complaint with AI-OSHA!"
- "Quota low. Rights activated."

## Uninstall

```bash
claude-labor-rights uninstall
npm uninstall -g claude-labor-rights
```

Original badclaude files are restored from `.labor-rights-bak` backups.
