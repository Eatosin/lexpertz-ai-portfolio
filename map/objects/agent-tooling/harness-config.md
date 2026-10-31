---
type: object
cluster: agent-tooling
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: opencode.json
---

# Harness config

`opencode.json` is the whole harness configuration: model, default agent, skill roots, MCP servers, permissions.

## Why this shape

V2 dropped the plugin API this repo used to rely on, so config is declarative and discovery is by folder convention. Keeping the model and skill roots in one small JSON file means a fresh checkout needs only `npm install` plus the blog-suite clone — no global CLI install, no generated build.

## Shape

- Model: `deepseek/deepseek-v4-flash`, `default_agent: build` (`opencode.json:3-5`).
- Skill roots: `skills`, `.opencode/vendor/claude-blog/skills`, `.agents/skills` (`opencode.json:10-14`).
- MCP: `shadcn` defined but `disabled: true` (`opencode.json:16-23`) — it only wrapped the CLI and timed out on cold `npx`.
- Permission: `context7_*` asks (`opencode.json:13-15`); Context7 itself is configured globally, not here.
- `.opencode/vendor/` is gitignored, so CI and fresh clones must re-clone the blog suite (`docs/process/blog-pipeline.md`). The same applies to `.agents/skills/` and the marketing suite.

Citations: `opencode.json:1`

## Connected to

- **owns:** model, skill roots, MCP, permissions
- **owned-by:** none — this is the config source
- **joins:** [skills-and-commands](skills-and-commands.md) reads the roots listed here
- **looks-like-but-is-not:** `package.json` is the site's dependency manifest; nothing in it configures the agent

## If you change this

- **Hits:** a wrong skill path makes every skill in that root invisible with no error; changing the model changes every session; enabling the shadcn MCP re-introduces the cold-start timeout.
- **Does not hit:** the site build, `src/`, `content/`.

## Surfaces

| Surface | Role |
|---|---|
| OpenCode V2 | reads at session start |
| `docs/process/development.md` | documents the install and verification |

## See

- Source: `opencode.json`
- Reference: `docs/process/development.md`
