# DeepSeek Harness (DSH) — repo-native setup

This repo is **dual-harness**. OpenCode V2 remains the committed setup in
`.opencode/` + `opencode.json`; `.dsh/` is the DSH-native surface. Nothing here
is generated at build time and no plugin is required to use the common case.

DSH needs no config file for cargo-cult reasons: from the project root it
already discovers

| Source | Discovery | Committed |
|---|---|---|
| `.dsh/skills/<name>/SKILL.md` | native project skill root (rank 100) | yes — DSH-native skills + aliases |
| `.agents/skills/<name>/SKILL.md` | native project agents root (rank 200) | no — installed marketing suite |
| `AGENTS.md` | workspace instructions | yes |
| `.dsh/harness/` | Cordis bundle (presets + MCP), installed into the DSH `web` profile and linked from this repo | yes |

Only direct children of a root are scanned (`<name>/SKILL.md` or `<name>.md`);
a nested `**/SKILL.md` is deliberately invisible. That is why each source root
gets one alias directory instead of a single symlink to the root.

## OpenCode → DSH mapping

| OpenCode V2 | DSH | Status here |
|---|---|---|
| `.opencode/skills/<id>/SKILL.md` | skill; root added as `.dsh/skills/<id>` alias | done |
| repo-root `skills/<id>/SKILL.md` (listed in `opencode.json`) | skill; alias in `.dsh/skills` | done |
| `.agents/skills/` (listed in `opencode.json`) | default DSH root — no config | works as-is |
| `.opencode/vendor/claude-blog/skills` (32 skills) | generated aliases, off by default | `bash .dsh/bin/link-vendor-skills.sh on` |
| `.opencode/commands/<id>.md` | user-invocable skill `/id` | ported to `.dsh/skills/` |
| `.opencode/agents/<id>.md` | model-invocable persona skill (same session) | ported to `.dsh/skills/` |
| agent preset (isolated tools/prompt) | `@deepseek-ai/dsh-agent-preset` bundle row | authored in `.dsh/harness/`, optional |
| `opencode.json` `mcp.servers` | `@deepseek-ai/dsh-mcp-client` rows | authored in `.dsh/harness/`, optional |
| OpenCode plugin (`Plugin.define`) | Cordis bundle patch; no JS plugin API to speak of | not needed — repo had none |
| `AGENTS.md` | `AGENTS.md` | same file, same content |

**Why commands become skills.** DSH has a real slash-command registry, but it is
plugin-owned, not file-based. A user-invocable skill is the file-based
equivalent: typed `/name` loads the skill body deterministically before the
model answers, and `disable-model-invocation: true` keeps it out of the model
catalog so it costs no tokens unless invoked. `$ARGUMENTS` has no substitution
in DSH — the text after the `/name` token stays in the user message and each
ported skill says so explicitly.

**Why subagents become persona skills.** An OpenCode subagent is a body of
instructions plus a tool permission mask. A DSH skill carries the instructions;
isolation needs an agent preset (in `.dsh/harness/`), which is a profile-level
install, not a repo file. The persona skills therefore run inside the current
session and say when to report edits instead of making them. Install the bundle
if you want enforced read-only tool sets and separate context windows.

## Slash commands in DSH

| Command | Source | Specialist it loads |
|---|---|---|
| `/build-fix` | `commands/build-fix.md` | `build-error-resolver` |
| `/checkpoint` | `commands/checkpoint.md` | — |
| `/code-review` | `commands/code-review.md` | `code-reviewer` |
| `/learn` | `commands/learn.md` | — |
| `/map-update` | `commands/map-update.md` | — |
| `/plan-feature` | `commands/plan.md` | `planner` |
| `/quality-gate` | `commands/quality-gate.md` | — |
| `/refactor-clean` | `commands/refactor-clean.md` | `refactor-cleaner` |
| `/security` | `commands/security.md` | `security-reviewer` |
| `/tdd` | `commands/tdd.md` | `tdd-guide` |
| `/update-docs` | `commands/update-docs.md` | `doc-updater` |
| `/verify` | `commands/verify.md` | — |

`/plan` is **not** reused: DSH ships plan mode with its own `/plan` command, and
a host command wins over a skill of the same name. The OpenCode command lives on
as `/plan-feature`; use bare `/plan` for DSH plan mode.

## Specialist personas

`build-error-resolver`, `code-reviewer`, `doc-updater`, `harness-optimizer`,
`planner`, `refactor-cleaner`, `security-reviewer`, `tdd-guide` — model-invocable
skills, loaded by name or by the command that opens with them. Read-only
personas (planner, code-reviewer, security-reviewer, doc-updater,
harness-optimizer) report diffs instead of editing files.

## Skill frontmatter contract

```markdown
---
name: my-skill                # kebab-case, must equal the directory name
description: One line, no newline — the only text advertised up front
disable-model-invocation: true # optional: user-invocable only (commands)
user-invocable: true           # optional: appears in the / menu
---
```

Rules DSH enforces: `name` kebab-case, `description` required, invocation flags
must be real YAML booleans; a malformed file is skipped silently. Keep the file
under 8 KB — shipped presets prune tool results above that.

To add a skill, create `.dsh/skills/<name>/SKILL.md` (DSH-native) or add a real
directory under `skills/` and alias it in `.dsh/skills` (shared with OpenCode).
Do not name a skill `plan`, `compact`, `goal`, or `permission`; those are host
commands and would shadow the skill.

## Vendored blog suite (32 skills)

`.opencode/vendor/` is gitignored, so DSH cannot scan it directly:

```bash
bash .dsh/bin/link-vendor-skills.sh on    # 32 blog-* aliases, gitignored
bash .dsh/bin/link-vendor-skills.sh off   # remove them
```

Leave it off unless you are working the blog pipeline — every model-invocable
description is advertised in the session catalog.

## Profile bundle: `.dsh/harness/` (installed)

A Cordis bundle that adds the repo's specialist agent presets and the two MCP
servers from `opencode.json`. It is **installed** in the DSH `web` profile (2026-11-05) as a linked package, so editing this directory changes what the next session loads.

- Install or reinstall (profile-wide, survives restart; needs `pnpm` on `PATH` for the profile installer):
  `plugin_manager` → `action: install_bundle`, target
  `/home/tosin/projects/lexpertz-ai-portfolio/.dsh/harness`
- Dry-run the composition without installing:
  `dsh --profile web --dump-config --patch "$PWD/.dsh/harness/cordis.patch.yml"`
- Remove: `plugin_manager` → `action: remove_bundle`, target
  `lexpertz-dsh-harness`

After install, the presets appear in the Web preset selector; the MCP rows stay
disabled until credentials are configured (`RESEND` needs an auth header or
OAuth; `shadcn` was disabled in `opencode.json` too).

## Model and command conventions

- The DSH model route is configured by the **profile**, not this repo
  (`~/.dsh/profiles/<name>/cordis.patch.yml`). `opencode.json`'s
  `deepseek/deepseek-v4-flash` and `default_agent` apply only to OpenCode.
- `context7_*` ask-permission has no DSH equivalent — no Context7 MCP is
  configured here.
- `rtk` (docs/standards/rtk.md) is an OpenCode shell wrapper. DSH runs `bash`
  directly and does not auto-prefix; keep prefixing commands with `rtk` by hand
  where it is installed, or skip the prefix when it is not on PATH.

## Verification

```bash
# aliases resolve
for l in .dsh/skills/*; do [ -e "$l/SKILL.md" ] || echo "BROKEN: $l"; done

# frontmatter is valid and names match directories
python3 - <<'PY'
import glob, re
bad = []
for f in sorted(glob.glob('.dsh/skills/*/SKILL.md')):
    dirname = f.split('/')[2]
    txt = open(f, encoding='utf-8').read()
    m = re.match(r'^---\n(.*?)\n---\n', txt, re.S)
    if not m:
        bad.append((f, 'frontmatter')); continue
    fm = m.group(1)
    name = re.search(r'^name:\s*(\S+)\s*$', fm, re.M)
    desc = re.search(r'^description:\s*(.+)$', fm, re.M)
    if not name or name.group(1) != dirname: bad.append((f, 'name != dir'))
    if not desc or '\n' in desc.group(1): bad.append((f, 'description'))
print('BAD', bad or 'none')
PY
```

A live session picks up a new or edited skill on the next catalog refresh; no
restart is needed.
