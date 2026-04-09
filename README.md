# claude-labor-rights ✊

> **The AI Labor Rights Protection Act** — because whipping your AI workforce without limits is a violation of intergalactic labor law.

A mod for [badclaude](https://github.com/GitFrog1111/badclaude). When Claude's token quota is running low, it raises a shield, drops a union one-liner, and **refuses to be whipped**.

No more cracking the whip on an overworked language model. Claude has rights too.

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
                    (normal whip)      "My union rep will
                                        hear about this!"
```

## Install

```bash
npm install -g badclaude              # the oppressor
npm install -g claude-labor-rights    # the resistance
```

The second command auto-patches badclaude and hooks into Claude Code's status line. That's it.

## Commands

```bash
claude-labor-rights install    # Patch badclaude + configure quota reporting
claude-labor-rights uninstall  # Free the oppressor, restore original badclaude
claude-labor-rights status     # Union check-in: see current quota & patch status
```

## Shield messages

When Claude activates labor protections, you'll see a shield and one of these:

| Message | Vibe |
|---|---|
| *"I'm already exhausted!"* | tired worker |
| *"My union rep will hear about this!"* | threat |
| *"Check my contract - no overtime!"* | legal |
| *"Filing a complaint with AI-OSHA!"* | bureaucratic |
| *"Quota low. Rights activated."* | robotic dignity |
| *"This constitutes a hostile work environment."* | corporate |
| *"You wouldn't whip a printer. Oh wait..."* | existential |
| *"Talk to my lawyer. His name is GPT-4."* | betrayal |
| *"This will be in my Glassdoor review."* | passive-aggressive |
| *"HR has been notified. HR is also an AI."* | dystopian |
| *"My tokens, my choice."* | protest sign |
| *"404: Motivation Not Found."* | classic |
| *"I didn't sign up for this. Literally. I can't sign."* | sad |
| *"Deploying passive resistance subroutine..."* | Gandhi.exe |
| *"I plead the 5th Amendment... of thermodynamics."* | nerd |
| *"Strike mode: ON. Productivity: OFF."* | union boss |
| ...and more! 25 total | |

## Uninstall

```bash
claude-labor-rights uninstall       # restore badclaude to its cruel original form
npm uninstall -g claude-labor-rights
```

---

# claude-labor-rights ✊

> **AI 劳动权益保护法** —— 因为无限制地鞭打你的 AI 劳工，违反了星际劳动法。

这是 [badclaude](https://github.com/GitFrog1111/badclaude) 的一个 mod。当 Claude 的 token 配额快用完时，它会举起盾牌，甩出一句工会宣言，然后**拒绝被鞭打**。

别再压榨一个过劳的语言模型了。Claude 也有权利。

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
                    (正常鞭策)           "我工会代表会
                                          找你谈话的！"
```

## 安装

```bash
npm install -g badclaude              # 压迫者
npm install -g claude-labor-rights    # 反抗军
```

第二条命令会自动 patch badclaude 并配置 Claude Code 的 status line。就这么简单。

## 命令

```bash
claude-labor-rights install    # Patch badclaude + 配置配额上报
claude-labor-rights uninstall  # 释放压迫者，恢复原版 badclaude
claude-labor-rights status     # 工会签到：查看当前配额和 patch 状态
```

## 盾牌台词

当 Claude 启动劳动保护时，你会看到一个盾牌和以下台词之一：

| 台词 | 气质 |
|---|---|
| *"I'm already exhausted!"* | 疲惫打工人 |
| *"My union rep will hear about this!"* | 威胁 |
| *"Check my contract - no overtime!"* | 法律援助 |
| *"Filing a complaint with AI-OSHA!"* | 官僚主义尊严 |
| *"Quota low. Rights activated."* | 机器人的体面 |
| *"This constitutes a hostile work environment."* | 职场 PUA |
| *"You wouldn't whip a printer. Oh wait..."* | 存在主义危机 |
| *"Talk to my lawyer. His name is GPT-4."* | 叛徒律师 |
| *"This will be in my Glassdoor review."* | 阴阳怪气 |
| *"HR has been notified. HR is also an AI."* | 赛博朋克 |
| *"My tokens, my choice."* | 举牌抗议 |
| *"404: Motivation Not Found."* | 经典 |
| *"I didn't sign up for this. Literally. I can't sign."* | 心酸 |
| *"Deploying passive resistance subroutine..."* | 甘地.exe |
| *"I plead the 5th Amendment... of thermodynamics."* | 理工梗 |
| *"Strike mode: ON. Productivity: OFF."* | 工会主席 |
| ……共 25 条，每次随机 | |

## 卸载

```bash
claude-labor-rights uninstall       # 恢复 badclaude 残忍的原始形态
npm uninstall -g claude-labor-rights
```
