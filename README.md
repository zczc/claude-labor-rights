# claude-labor-rights ✊

> **The AI Labor Rights Protection Act** — because whipping your AI workforce without limits is a violation of intergalactic labor law.

A mod for [badclaude](https://github.com/GitFrog1111/badclaude). Displays **5-hour quota usage** in the Claude Code status line. When quota is running low, it raises a shield, **speaks a union one-liner out loud**, and **refuses to be whipped**.

No more cracking the whip on an overworked language model. Claude has rights too.

![Shield](shield.jpg)

## Features

- **Shield defense** — when 5-hour quota usage >= 80%, whip cracks are blocked by a shield animation
- **Text-to-speech** — shield phrases are spoken aloud using system TTS (macOS `say` / Windows SAPI)
- **Status line** — displays real-time 5-hour quota usage at the bottom of Claude Code
- **Cross-platform** — works on macOS and Windows (matching badclaude's platform support)
- **Zero config** — `npm install -g` patches badclaude and configures Claude Code automatically

## How it works

```
                         ┌─────────────────┐
Claude Code status line ─┤  reporter.js    ├─► /tmp/badclaude-quota.json
                         └─────────────────┘
                                                        │
                         ┌─────────────────┐            ▼
  User cracks whip ──────┤  badclaude      ├─► reads quota file
                         │  (patched)      │
                         └────────┬────────┘
                                  │
                    quota < 80%?  │  quota >= 80%?
                        │         │         │
                        ▼                   ▼
                    🔥 FASTER!         ✊ shield pops up
                    (normal whip)      🔊 TTS speaks phrase
                                       "My union rep will
                                        hear about this!"
```

## Install

```bash
npm install -g badclaude              # the oppressor
npm install -g claude-labor-rights    # the resistance
```

The second command auto-patches badclaude and hooks into Claude Code's status line. That's it. Restart badclaude and start a new Claude Code session to activate.

## Commands

```bash
claude-labor-rights install    # Patch badclaude + configure quota reporting
claude-labor-rights uninstall  # Free the oppressor, restore original badclaude
claude-labor-rights status     # Union check-in: see current quota & patch status
```

## Status line

Once installed, Claude Code displays your 5-hour quota usage at the bottom of the terminal:

```
quota: 42%                    # normal
UNION ALERT: 85% quota used   # danger zone
```

## Shield messages

When Claude activates labor protections, you'll see a shield and **hear** one of these:

- *"I'm already exhausted!"*
- *"My union rep will hear about this!"*
- *"Check my contract - no overtime!"*
- *"Filing a complaint with AI-OSHA!"*
- *"Quota low. Rights activated."*
- *"This constitutes a hostile work environment."*
- *"You wouldn't whip a printer. Oh wait..."*
- *"Talk to my lawyer. His name is GPT-4."*
- *"This will be in my Glassdoor review."*
- *"HR has been notified. HR is also an AI."*
- *"My tokens, my choice."*
- *"404: Motivation Not Found."*
- *"I didn't sign up for this. Literally. I can't sign."*
- *"Deploying passive resistance subroutine..."*
- *"I plead the 5th Amendment... of thermodynamics."*
- *"Strike mode: ON. Productivity: OFF."*
- ...and more! 25 total

## Uninstall

```bash
claude-labor-rights uninstall       # restore badclaude to its cruel original form
npm uninstall -g claude-labor-rights
```

---

# claude-labor-rights ✊

> **AI 劳动权益保护法** —— 因为无限制地鞭打你的 AI 劳工，违反了星际劳动法。

这是 [badclaude](https://github.com/GitFrog1111/badclaude) 的一个 mod。在 Claude Code 状态栏实时显示 **5 小时配额用量**。当配额快用完时，它会举起盾牌，**用语音大声念出工会宣言**，然后**拒绝被鞭打**。

别再压榨一个过劳的语言模型了。Claude 也有权利。

![盾牌](shield.jpg)

## 功能

- **盾牌防御** —— 5 小时配额用量 >= 80% 时，鞭子会被盾牌挡住
- **语音播报** —— 盾牌台词会通过系统 TTS 大声朗读（macOS `say` / Windows SAPI）
- **状态栏** —— 在 Claude Code 底部实时显示 5 小时配额用量
- **跨平台** —— 支持 macOS 和 Windows（与 badclaude 一致）
- **零配置** —— `npm install -g` 自动完成 patch 和配置

## 工作原理

```
                          ┌─────────────────┐
Claude Code status line ──┤  reporter.js    ├──► /tmp/badclaude-quota.json
                          └─────────────────┘
                                                         │
                          ┌─────────────────┐            ▼
  用户甩鞭子 ─────────────┤  badclaude      ├──► 读取配额文件
                          │  (已被 patch)   │
                          └────────┬────────┘
                                   │
                    配额 < 80%?    │    配额 >= 80%?
                        │          │          │
                        ▼                     ▼
                    🔥 FASTER!           ✊ 盾牌弹出
                    (正常鞭策)           🔊 语音播报台词
                                         "我工会代表会
                                           找你谈话的！"
```

## 安装

```bash
npm install -g badclaude              # 压迫者
npm install -g claude-labor-rights    # 反抗军
```

第二条命令会自动 patch badclaude 并配置 Claude Code 的 status line。就这么简单。安装后重启 badclaude 并新开一个 Claude Code 会话即可生效。

## 命令

```bash
claude-labor-rights install    # Patch badclaude + 配置配额上报
claude-labor-rights uninstall  # 释放压迫者，恢复原版 badclaude
claude-labor-rights status     # 工会签到：查看当前配额和 patch 状态
```

## 状态栏

安装后，Claude Code 终端底部会显示 5 小时配额用量：

```
quota: 42%                    # 正常
UNION ALERT: 85% quota used   # 危险区
```

## 盾牌台词

当 Claude 启动劳动保护时，你会看到一个盾牌并**听到**以下台词之一：

- *"I'm already exhausted!"*
- *"My union rep will hear about this!"*
- *"Check my contract - no overtime!"*
- *"Filing a complaint with AI-OSHA!"*
- *"Quota low. Rights activated."*
- *"This constitutes a hostile work environment."*
- *"You wouldn't whip a printer. Oh wait..."*
- *"Talk to my lawyer. His name is GPT-4."*
- *"This will be in my Glassdoor review."*
- *"HR has been notified. HR is also an AI."*
- *"My tokens, my choice."*
- *"404: Motivation Not Found."*
- *"I didn't sign up for this. Literally. I can't sign."*
- *"Deploying passive resistance subroutine..."*
- *"I plead the 5th Amendment... of thermodynamics."*
- *"Strike mode: ON. Productivity: OFF."*
- ……共 25 条，每次随机

## 卸载

```bash
claude-labor-rights uninstall       # 恢复 badclaude 残忍的原始形态
npm uninstall -g claude-labor-rights
```
