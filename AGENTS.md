<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Always start with `resolve-library-id` using the library name and the user's question, unless the user provides an exact library ID in `/org/project` format
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version
3. `query-docs` with the selected library ID and the user's full question (not single words), scoped to a single concept. If the question spans multiple distinct concepts (e.g. routing and auth and caching), make a separate `query-docs` call per concept with the same library ID, unless the question is about how the concepts interact — combined queries dilute ranking and return shallow results for each topic
4. Answer using the fetched docs
<!-- /context7 -->

<!-- graphify -->
Use the graphify skill for any question about a codebase, its architecture, file relationships, or project content — especially when `graphify-out/` exists. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.

Key command: `/graphify <path>` — see `.opencode/skills/graphify/SKILL.md` for full reference.
<!-- /graphify -->

<!-- defuddle -->
Defuddle: Extract clean markdown from web pages using `defuddle parse <url> --md`. Prefer over WebFetch for standard web pages (articles, docs, blog posts) — removes clutter and saves tokens. Do NOT use for URLs ending in `.md` (those are already markdown, use WebFetch).

See `.opencode/skills/defuddle/SKILL.md` for full reference.
<!-- /defuddle -->

<!-- json-canvas -->
JSON Canvas: Create and edit `.canvas` files (Obsidian Canvas format) with nodes, edges, groups, and connections. Use for mind maps, flowcharts, or visual canvases. Follows JSON Canvas Spec 1.0.

See `.opencode/skills/json-canvas/SKILL.md` for full reference.
<!-- /json-canvas -->

<!-- obsidian-bases -->
Obsidian Bases: Create and edit `.base` files with views (table, cards, list, map), filters, formulas, and summaries. Use when working with database-like views of notes in Obsidian.

See `.opencode/skills/obsidian-bases/SKILL.md` for full reference.
<!-- /obsidian-bases -->

<!-- obsidian-cli -->
Obsidian CLI: Interact with Obsidian vaults via the `obsidian` CLI. Create, read, search, and manage notes, tasks, properties, and more. Also supports plugin/theme development (reload, run JS, screenshots, DOM inspect). Requires Obsidian to be open.

See `.opencode/skills/obsidian-cli/SKILL.md` for full reference.
<!-- /obsidian-cli -->

<!-- obsidian-markdown -->
Obsidian Flavored Markdown: Create and edit `.md` files with wikilinks, embeds, callouts, properties, and other Obsidian-specific syntax. Use when working with vault notes.

See `.opencode/skills/obsidian-markdown/SKILL.md` for full reference.
<!-- /obsidian-markdown -->

<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->
