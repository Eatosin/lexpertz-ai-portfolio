# `.dsh/harness/` — DSH bundle (installed)

A workspace Cordis bundle for this repo's DeepSeek Harness profile. It gives DSH
native equivalents of the 8 OpenCode subagents in `.opencode/agents/` and the 2
MCP servers declared in `opencode.json`.

**This bundle is installed** in the DSH `web` profile on 2026-11-05 as a
`link:` package pointing at this directory. New sessions can select the
presets; the MCP rows stay disabled. Editing a file here changes what the
profile loads on the next reload, and the repo still works without the bundle
(`plugin_manager remove_bundle lexpertz-dsh-harness`).

## Contents

| File | Holds |
|---|---|
| `package.json` | private bundle manifest: `dsh.bundle.patch: "./cordis.patch.yml"`, no dependencies |
| `cordis.patch.yml` | one `- insert:` list: 8 `@deepseek-ai/dsh-agent-preset` rows + 2 `@deepseek-ai/dsh-mcp-client` rows |
| `README.md` | this file |

There are no dependencies and no build step: every plugin package in the patch
is a shipped `@deepseek-ai/*` package resolved from the running dsh installation.
The bundle is plain YAML + JSON, installed by the harness itself.

### Presets

Each row's `config.id` is the bare OpenCode agent id (`planner`, `code-reviewer`,
…), which is the identity sessions save and the Web preset selector shows. The
Loader row id is `preset-<id>`. `order` places the roster entries after the
shipped presets (20–27).

The persona prefix of every preset is the **full body** of the matching
`.opencode/agents/<id>.md`, with the OpenCode frontmatter (`description`, `mode`,
`permissions`) stripped; the frontmatter description is reused as the preset's
`description`. OpenCode permission lists are not carried over — the tool sets are
re-declared in the preset itself, and read-only agents are enforced with the
shipped `@deepseek-ai/dsh-tool-fs` switches rather than a custom plugin.

| Preset id / row | Order | Access | `tool-fs` config |
|---|---|---|---|
| `planner` / `preset-planner` | 20 | read-only | `read: true, write: false, edit: false, applyPatch: false` |
| `code-reviewer` / `preset-code-reviewer` | 21 | read-only | `read: true, write: false, edit: false, applyPatch: false` |
| `security-reviewer` / `preset-security-reviewer` | 22 | read-only | `read: true, write: false, edit: false, applyPatch: false` |
| `tdd-guide` / `preset-tdd-guide` | 23 | writable | `read: true, write: true, edit: true, applyPatch: true` |
| `build-error-resolver` / `preset-build-error-resolver` | 24 | writable | `read: true, write: true, edit: true, applyPatch: true` |
| `doc-updater` / `preset-doc-updater` | 25 | read-only | `read: true, write: false, edit: false, applyPatch: false` |
| `refactor-cleaner` / `preset-refactor-cleaner` | 26 | writable | `read: true, write: true, edit: true, applyPatch: true` |
| `harness-optimizer` / `preset-harness-optimizer` | 27 | read-only | `read: true, write: false, edit: false, applyPatch: false` |

Every preset mounts the same plugin list, in this order: persona, agent
instructions (`maxBytes: 65536`), time context, filesystem skills + skill tool,
bash (disabled on win32), filesystem tools, filesystem search, todo, web,
ask-user, then the `compaction` and `delegation` groups copied verbatim from
`@deepseek-ai/dsh-web-app/presets/standard.patch.yml`. The delegation group keeps
`modelSelection: true` on the spawn `subagent` tool, so a preset session can pick
a model for its children.

### MCP servers

Both rows are `disabled: true` at the **row** level (not inside `config`):

| Row | Server | Transport | Why disabled |
|---|---|---|---|
| `mcp-shadcn` | `shadcn` | stdio: `npx -y shadcn@latest mcp` | `disabled: true` in `opencode.json`; starts a real `npx` process on enable |
| `mcp-resend` | `resend` | streamable-http: `https://mcp.resend.com/mcp` | remote endpoint needs auth; see comment in `cordis.patch.yml` |

To enable a row, flip its `disabled` flag to `false` (or delete the line). For
`resend`, configure `config.headers.Authorization` (or OAuth) first — the
upstream endpoint rejects unauthenticated requests and no tools will register.

## Install or reinstall

Installing executes plugin code in the Host process and affects every session in
the profile, so it needs full access or approval. The profile installer spawns
`pnpm`, so `pnpm` must be on `PATH` (the repo itself uses npm). Install with the
`plugin_manager` tool, not by hand:

```
plugin_manager({
  action: "install_bundle",
  target: "/home/tosin/projects/lexpertz-ai-portfolio/.dsh/harness"
})
```

That runs whatever package installation/registration the harness requires and
selects the bundle; do not reproduce those steps with `npm` or shell commands.

## Verify before or after install

Dry-run the composition (no profile writes, no install):

```bash
dsh --profile web --dump-config \
  --patch "/home/tosin/projects/lexpertz-ai-portfolio/.dsh/harness/cordis.patch.yml"
```

Rows to look for:

```bash
dsh --profile web --dump-config \
  --patch "/home/tosin/projects/lexpertz-ai-portfolio/.dsh/harness/cordis.patch.yml" 2>&1 \
  | grep -E "id: (preset-|mcp-)"
```

A plain `grep -E "preset-|mcp-|warn|skip|error"` is noisier: the persona block
scalars contain the word "error", so anchor on `^- id:` when counting rows. A
clean run exits 0 with empty stderr and shows all 8 `preset-*` rows plus
`mcp-shadcn` and `mcp-resend` with `disabled: true`.

**Limitation:** `--dump-config` composes the profile tree but does *not* mount
preset children. It proves the patch parses and the rows are present; it does not
prove the persona, tool, compaction, or delegation child plugins activate. Those
are only exercised after installation, in a new session.

## What changes after install

- The 8 presets appear in the Web preset selector (roster order 20–27) and can
  be chosen for a new session; each mounts its own persona and tool set.
- The two MCP rows exist in the composed profile but register no tools while
  `disabled: true`. Enabling `mcp-shadcn` spawns `npx`; enabling `mcp-resend`
  requires auth headers first.
- Nothing else in the repo changes: the patch is additive (`- insert:`), the
  OpenCode harness in `.opencode/` + `opencode.json` stays authoritative for
  OpenCode, and per-session presets do not alter existing sessions.

Install is profile-wide: it affects every session in the profile, not just this
repo's. Remove it with:

```
plugin_manager({ action: "remove_bundle", target: "lexpertz-dsh-harness" })
```

(or use the installed bundle identifier reported by `plugin_manager`
`list_bundles`). Removal leaves this directory untouched.
