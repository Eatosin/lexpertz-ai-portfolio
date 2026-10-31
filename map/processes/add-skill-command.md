---
type: process
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
consumes:
  - ../objects/agent-tooling/harness-config.md
  - ../objects/agent-tooling/skills-and-commands.md
produces:
  - ../objects/agent-tooling/skills-and-commands.md
---

# add-skill-command

Add instruction surface to the harness: a skill, a slash command, or a subagent.

## Input → Movement → Output

The input is a repeated task worth encoding. The movement is: pick the shape (skill = folder with `SKILL.md`, command = one file, subagent = one file), put it in the discovered folder, and register the skill root only if it lives somewhere new. The output is something the next session can load without being told where it is.

## Why this shape

Discovery is by folder convention and fails silently: a skill in an unlisted root is invisible, and no error is raised. That is why the check is "load it in a fresh session and confirm the base directory", not "the file exists".

## Steps

1. Choose the shape — `SKILL.md` for a loadable procedure, `.opencode/commands/<id>.md` for a slash entry, `.opencode/agents/<id>.md` for a delegated worker.
2. Put it where discovery looks (`.opencode/skills/<id>/SKILL.md` or a root already in `opencode.json:9-12`).
3. If the root is new, add it to the `skills` array in `opencode.json`.
4. Start a new session and load it with the skill tool; confirm the reported base directory.
5. If it encodes a repo rule, link it from the relevant map card rather than duplicating the rule.

## If you change this

- **Hits:** a new root without a config entry is silently ignored; renaming a folder breaks existing invocations; a skill that hardcodes paths breaks when the tree moves.
- **Does not hit:** the site build, routes, content.

## Surfaces

| Surface | Role |
|---|---|
| OpenCode sessions | discover and load |
| `docs/process/development.md` | the documented install and verification path |

## See

- Objects: [harness-config](../objects/agent-tooling/harness-config.md), [skills-and-commands](../objects/agent-tooling/skills-and-commands.md)
- Source: `opencode.json`
