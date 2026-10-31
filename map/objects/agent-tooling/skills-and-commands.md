---
type: object
cluster: agent-tooling
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: .opencode
---

# Skills and commands

Eleven repo skills, six `.opencode/skills`, eleven commands and eight subagents — all plain markdown folders that OpenCode V2 discovers by naming convention.

## Why this shape

A skill is a folder with `SKILL.md`; a command is a file in `.opencode/commands/`; a subagent is a file in `.opencode/agents/`. No registry, so the filesystem is the index. This repo splits them: `skills/` holds the general engineering suites, `.opencode/skills/` the tool-specific ones (graphify, obsidian, defuddle), `.agents/skills/` the installed marketing suite, and `.opencode/vendor/` the third-party blog suite that is cloned, never committed.

## Shape

- Repo skills (11): `skills/<id>/SKILL.md` — api-design, backend-patterns, coding-standards, e2e-testing, eval-harness, frontend-patterns, frontend-slides, security-review, strategic-compact, tdd-workflow, verification-loop.
- Local skills (6): `.opencode/skills/{defuddle,graphify,json-canvas,obsidian-bases,obsidian-cli,obsidian-markdown}/SKILL.md`.
- Installed marketing skills (10): `.agents/skills/` — product-marketing, social, content-strategy, copywriting, ad-creative, marketing-psychology, analytics, conversion-tracking, ai-seo, marketing-loops. Gitignored; restore with `npx skills add coreyhaines31/marketingskills -a opencode` (`docs/process/development.md`). Their source and hashes are in `skills-lock.json`.
- Commands (12): `.opencode/commands/*.md` — `/plan`, `/tdd`, `/code-review`, `/security`, `/build-fix`, `/refactor-clean`, `/quality-gate`, `/update-docs`, `/verify`, `/checkpoint`, `/learn`, `/map-update`.
- Subagents (8): `.opencode/agents/*.md`.
- Vendored (31 `blog-*`): `.opencode/vendor/claude-blog/`, gitignored, registered in `opencode.json:10`.

Citations: `opencode.json:9-12`

## Connected to

- **owns:** `.opencode/{skills,agents,commands}/`, `skills/`
- **owned-by:** [harness-config](harness-config.md) lists the roots
- **joins:** `docs/standards/reusable-blocks.md` is referenced by `/refactor-clean`; `.agents/product-marketing.md` is the positioning context every marketing skill reads first
- **looks-like-but-is-not:** vendored blog skills are invoked flat (`/blog-write`), not nested (`/blog write`)

## If you change this

- **Hits:** renaming a skill folder breaks its invocation; deleting a command removes the slash entry; a skill that hardcodes repo paths (as the blog suite does) breaks when the tree moves.
- **Does not hit:** the site build, routes, content data.

## Surfaces

| Surface | Role |
|---|---|
| OpenCode sessions | discover and load on demand |
| humans | invoke via `/command` or the skill tool |

## See

- Source: `.opencode/README.md`
- Reference: `docs/process/development.md`
