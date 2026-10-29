---
title: "Best AI Coding Harness Plugins for Improving Developer Productivity"
summary: "Most coding-harness plugins are context you pay for on every request and use twice a month. Named GitHub projects that survived a real repository, with the trade-offs of each — plus the second-brain stack."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-10-29"
category: "Engineering"
coverImage: "/insights/ai-coding-harness-plugins.png"
tags: ["ai-coding", "developer-tools", "mcp", "second-brain"]
---

Every harness now has a plugin directory, and most of it is context you pay for on
every single request whether or not the plugin fires.

That is the part the screenshots leave out. A plugin does not cost nothing when it is
idle. Its tool definition, its description, and its examples occupy tokens in the
window, and a window full of plausible tools makes the model worse at choosing the
right one. Install twenty and you have not added twenty capabilities; you have added
twenty ways to pick wrong, plus a larger bill.

So this is not a top ten. It is a short list of named projects, with the case against
each one, ranked by how much work they removed rather than how good the demo looked.
Star counts are from October 2026 and will drift; the trade-offs age better than the
numbers.

## Key Takeaways

- Rank plugins by **tokens removed**, not features added. An integration that replaces a
  pasted file or a manual lookup pays for itself; one that saves a keystroke does not.
- **Context7** and **Serena** are the two highest-leverage installs here, because they
  replace the two things developers waste the most context on: docs and type inference.
- **Deterministic hooks** (format, lint, typecheck) beat model-driven instructions every
  time. If a rule can be enforced by a program, do not spend a prompt on it.
- "Second brain" is two different problems. Personal knowledge (Basic Memory, Obsidian)
  and agent memory (Mem0, Supermemory, Letta) have different failure modes and should
  not be bought as one thing.
- Keep the **tool surface small and scoped**. Each MCP server is a permission decision
  and a context cost, not a free feature.

## What actually counts as a plugin

"Plugin" is not one thing across harnesses, and the ranking only makes sense once the
categories are separated:

| Category | What it does | Cost profile |
|---|---|---|
| MCP server | Exposes tools and data over the Model Context Protocol | Tool schemas in every request |
| Skill | Loads instructions on demand when relevant | Near zero until invoked |
| Hook | Runs a program at a lifecycle point | Local compute only |
| Subagent | Delegates a scoped task to a fresh context | Separate window, summarized back |
| Editor/LSP integration | Gives the model type and symbol information | Smaller than you think |

These have wildly different economics. A skill that is never invoked costs almost
nothing. An MCP server with twelve tools costs you on every turn. That distinction is
the whole game, and most "best plugin" lists ignore it because plugin count makes a
better thumbnail.

## How I ranked these

Four tests, applied after the novelty wore off:

1. **Does it remove input?** Fewer files pasted, fewer docs copied, fewer "let me check
   the types" round trips.
2. **Does it fail safe?** When the server is down or the tool errors, does the agent
   degrade to something useful, or does it hallucinate a result?
3. **Does it survive the repo changing?** New dependency, new directory layout, new
   language. Plugins that encode your folder structure age badly.
4. **Can you remove it in a minute?** If uninstalling requires editing three configs and
   a memory file, you have taken on a dependency, not a tool.

Anything that failed test four usually failed test two as well, because both are about
how tightly the thing is coupled to everything else.

## 1. Documentation retrieval

This is the highest-leverage category, and it is not close.

The default failure mode of an AI coding tool is confident recall of an API that changed
six months ago. The model writes `useEffect`-era code against a library that moved to a
different hook, or invents a config key that never existed. You then spend the next
twenty minutes finding out why the build fails.

### [upstash/context7](https://github.com/upstash/context7) — ⭐64k

The reference implementation. You point it at a library, it fetches current
documentation, and the model answers from that instead of from weights.

**Pros**

- Replaces the single most expensive thing you can paste into a window: a full docs page,
  by hand, hoping the right section survives truncation.
- Version-aware lookups, which is the part that actually fixes the stale-API problem.
- Works across harnesses because it is a plain MCP server, not a vendor feature.
- Permission can be set to `ask`, so every outbound query is visible.

**Cons**

- Adds a network round trip and a remote dependency to a local workflow.
- Coverage is uneven. Popular libraries are well indexed; your internal or obscure
  dependency probably is not, and the model may not tell you it fell back to recall.
- The tool schema is always present, so you pay for it on turns where you never look
  anything up.

**Verdict:** install it if you work against fast-moving frameworks. Skip it if your work
is mostly an internal API that already lives in the repo, where the agent can just read
the source.

## 2. Language-server and typecheck awareness

The least glamorous category, and the one that quietly improves everything else.

An agent that can ask "what type does this function return" does not have to guess. It
stops writing code that typechecks in its head and fails in CI. On a TypeScript project
the difference shows up as fewer edits that shadow a variable or miss a required prop; on
a Python project, fewer calls with the wrong arity.

There is a second-order benefit that matters more: the agent can verify its own change
before handing it back. Read the type error, fix it, re-run.

### [oraios/serena](https://github.com/oraios/serena) — ⭐31k

A semantic code toolkit built on language servers. It exposes symbol-level operations —
find definition, find references, rename — rather than making the model grep and read
whole files.

**Pros**

- Edits become surgical. Renaming a symbol across a codebase is one operation instead of
  a search-and-replace the model hopes is complete.
- Far less context spent reading files to establish what a symbol is.
- Language-agnostic in principle, so the same workflow survives a polyglot repo.

**Cons**

- Requires a working language server per language, with its own startup cost and
  occasional crashes.
- Another process to run and debug, and one more thing that can be misconfigured per
  project.
- The tool surface is large. On a small repo it can cost more than it saves.

### [isaacphi/mcp-language-server](https://github.com/isaacphi/mcp-language-server) — ⭐1.6k

A generic bridge that exposes any LSP server to MCP clients.

**Pros**

- Works with whatever language server you already use, including ones Serena does not
  cover.
- Small and composable. You supply the server; it supplies the protocol glue.

**Cons**

- Maintenance is the risk. Last push was March 2026, which is a long gap in a fast-moving
  protocol ecosystem.
- You own the lifecycle: starting, restarting, and scoping the server is your problem.

**Verdict:** Serena if you want the batteries included; the generic bridge if you have an
unusual language or want to keep the dependency thin.

## 3. Deterministic hooks for format, lint, and typecheck

Hooks run a program at a lifecycle point: before a file is written, after an edit, before
a command executes. They are boring, and they are the most reliable thing in this list.

The rule is simple. If a constraint can be enforced by a program, enforce it with the
program instead of writing it in a prompt. "Always run prettier" is a hook. "Please make
sure the code is formatted" is a suggestion that fails one time in five, and you will not
notice which time.

There is no headline repo for this category because it is harness-native — every serious
harness has some version of it. Use it for:

- **Format on write.** Eliminates an entire class of noisy diff.
- **Lint the touched files.** Catches the unused import and the shadowed variable before
  they reach review.
- **Typecheck before claiming success.** Stops the agent reporting done on code that does
  not compile.
- **Block writes to protected paths.** Cheap, and it is the difference between a mistake
  and an incident.

The failure mode to watch for is a hook slow enough to be disabled. A typecheck that
takes forty seconds on every file write will get turned off within a day. Run the fast
subset on write and the full pass on demand.

## 4. Skills: workflows that load on demand

A skill is a folder with a `SKILL.md` and optional scripts and references. The harness
advertises only the name and description; the body loads when the skill is invoked.

That cost model is what makes skills worth having. The instructions for a deployment
checklist sit on disk at zero token cost until the moment you need them.

### [obra/superpowers](https://github.com/obra/superpowers) — ⭐308k

An agentic skills framework and development methodology: planning, review, and workflow
skills with an opinionated process attached.

**Pros**

- The largest skills ecosystem by a wide margin, so common workflows are already written.
- The methodology is the real product. It encodes a way of working, not just a set of
  prompts, which is what most skill collections lack.
- Plain files on disk, so you can read and edit every skill.

**Cons**

- Heavy. The full process is a lot of ceremony for a small change, and the skills that
  load carry real token cost.
- Strong opinions about how work should flow. If your team's process differs, you spend
  time fighting it rather than using it.
- Ecosystem momentum creates lock-in to its conventions.

### [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — ⭐45k

Anthropic's managed directory of Claude Code plugins.

**Pros**

- Vetted and curated, which is worth a lot when the alternative is installing random
  shell scripts from a marketplace.
- Good discovery surface for hooks, subagents, and MCP servers in one place.

**Cons**

- Claude-specific. The plugins assume Claude Code's conventions and do not port cleanly to
  other harnesses; frontmatter fields and path assumptions differ.
- A curated directory still moves slower than the ecosystem.

**Verdict:** take the individual skill you need rather than adopting a framework wholesale.
A skill is cheap to try and cheap to delete; a methodology is neither.

## 5. Browser automation for verification

This is the category that changes what you are willing to delegate.

Without a browser, an agent working on a UI is guessing. It can read the JSX, it can
reason about the CSS, and it cannot tell you whether the thing renders.

### [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) — ⭐39k

Playwright exposed as an MCP server, so the agent can navigate, click, and inspect the
page.

**Pros**

- Closes the runtime loop. Layout collapse at 375px, double submit, hydration mismatch —
  none are visible in a diff, all are visible in a browser.
- Uses the accessibility tree rather than screenshots for most interactions, which keeps
  the per-step token cost far below an image-based approach.
- Backed by the same engine as your existing Playwright tests.

**Cons**

- Network egress. A browser tool can reach any URL the machine can reach; treat it as a
  security decision, not a convenience.
- Slow and occasionally flaky on highly dynamic apps. Waiting strategies become the
  agent's problem.
- Large tool schema, paid on every request even when you are not touching the UI.

**Cheaper alternative:** install the Playwright CLI on the machine first.
`playwright install chromium` plus the `screenshot` command covers most verification
needs with no server process and no extra tool schema. Reach for the MCP server when you
need interactive flows.

## Honorable mention: token reduction

### [rtk-ai/rtk](https://github.com/rtk-ai/rtk) — ⭐85k

A CLI proxy that sits between the agent and the shell, trims command output to the part
that matters, and passes the rest through. The project claims 60–90% token reduction on
common dev commands.

**Pros**

- Single Rust binary, zero dependencies. Installs and disappears.
- The direction is right even if you discount the number: the agent does not need four
  hundred lines of successful test output.
- Failures still surface, which is the requirement that makes or breaks this category.

**Cons**

- Output filtering can hide the line you needed. A truncated stack trace is worse than a
  long one.
- Savings depend entirely on your command mix. A repo that mostly runs edits sees far
  less than one that runs test suites all day.
- Another layer between you and the shell when something behaves oddly.

**Verdict:** install it once and forget it. That is the highest compliment available to
infrastructure.

## Second brain: two different problems

This is where most comparison articles go wrong. "Second brain" gets used for two things
that share no failure modes:

1. **Personal knowledge** — your notes, decisions, and research, usually in Markdown.
2. **Agent memory** — facts the assistant should carry between sessions about you, the
   project, or the codebase.

The first is a retrieval problem over documents you own. The second is a state management
problem over inferences the model made. Buying one tool for both is how you end up with a
vault the agent can write to and a memory store nobody can audit.

### Personal knowledge

#### [basicmachines-co/basic-memory](https://github.com/basicmachines-co/basic-memory) — ⭐4.4k

Markdown files on disk, indexed into a knowledge graph with semantic search. Both you
and the agent read and write the same files.

**Pros**

- Local-first and plain text. Your knowledge is not trapped in a proprietary store, and
  it is diffable in git.
- Two-way sync, so the agent's notes land where you can review them.
- A real graph via observations and wikilinks, which is closer to how notes actually
  connect than a flat vector index.
- Hosted option if you do not want to run Python locally.

**Cons**

- Python install plus a local index to maintain, and an opinionated note structure to
  adopt.
- Semantic search quality depends on an embedding model you now have to choose and keep.
- Write access to your notes is a real risk. An agent that can edit your vault can also
  corrupt it.
- The cloud upsell in the README is prominent enough to be a tell about where the
  project's incentives sit.

#### [StevenStavrakis/obsidian-mcp](https://github.com/StevenStavrakis/obsidian-mcp) — ⭐747

A deliberately simple MCP server for an Obsidian vault: list, read, search, and edit
notes.

**Pros**

- Small surface, easy to audit. If you want the agent to read your notes and nothing
  more, this is the right shape.
- Actively maintained, and it does not require replacing how you already use Obsidian.
- Read-only configurations are straightforward.

**Cons**

- No semantic search. It is keyword and path based, so you need to know roughly where
  something lives.
- Vault-shaped. It is not a general knowledge store, and it does nothing for codebase
  context.

#### The archived-plugin warning

[jacksteamdev/obsidian-mcp-tools](https://github.com/jacksteamdev/obsidian-mcp-tools)
— ⭐828, **archived** as of May 2026 — is the cautionary example. It offered semantic
search and Templater integration and looked like the obvious pick on stars alone.

An archived dependency in a security-adjacent path is a liability: no fixes, no protocol
updates, and no one to ask when an MCP revision breaks it. Check the archive flag before
the star count. This is exactly why test four — can you remove it in a minute — matters.

### Agent memory

#### [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐68k

A drop-in memory layer: it extracts facts from conversations, stores them, and retrieves
what is relevant on the next turn.

**Pros**

- The most mature option, with both an open-source path and a hosted service.
- Handles the unglamorous parts: extraction, deduplication, and updates when a fact
  changes.
- Framework-agnostic, so it is not tied to one harness.

**Cons**

- Another datastore and another service in the request path.
- Extraction is lossy and opaque. What the model remembers is a summary of what you said,
  chosen by a model, and you generally cannot see why one fact survived and another did
  not.
- Default deployments lean hosted, which means your conversation content leaves the
  machine unless you self-host deliberately.

#### [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) — ⭐31k

A memory and context engine with a self-hosting path, positioned around recall and
context reduction.

**Pros**

- Explicit self-host option, which matters if the data cannot leave your infrastructure.
- Handles contradictions and expiring information rather than accumulating everything.
- Ships plugins and connectors, so adoption is not a from-scratch integration.

**Cons**

- The headline benchmarks are vendor-run. Treat them as a claim to reproduce, not a
  result.
- Another API boundary in the critical path of every request.
- Feature surface is broad, which means more configuration before it behaves predictably.

#### [letta-ai/letta](https://github.com/letta-ai/letta) — ⭐25k

A platform for stateful agents with long-term memory and self-editing context.

**Pros**

- The most complete model of agent state: memory blocks, summarization, and context
  management as first-class concepts rather than a bolt-on.
- Good fit if your product *is* the agent, not if you are adding memory to an editor
  workflow.

**Cons**

- It is a runtime, not a plugin. Adopting it means rebuilding your agent around its
  abstractions.
- That is a large commitment for what is, in a coding harness, a small problem.
- Operational overhead: a service to run, state to back up, migrations to track.

**Verdict:** for coding work, start with plain files. A `NOTES.md` or `AGENTS.md` in the
repo, reviewed like code, beats an opaque memory store for the first year. Reach for
Mem0 or Supermemory when you need cross-session personalization at scale, and for Letta
only when the agent's state is the product.

### Side by side

| Project | Problem it solves | Storage | Local by default | Main cost |
|---|---|---|---|---|
| Basic Memory | Personal knowledge | Markdown + graph index | Yes | Python stack, opinionated structure |
| Obsidian MCP | Personal knowledge | Obsidian vault | Yes | No semantic search |
| Mem0 | Agent memory | Vector + graph store | Hosted-first | Opaque extraction |
| Supermemory | Agent memory | Managed engine | Self-host option | Vendor benchmarks |
| Letta | Agent runtime | Stateful service | Self-host | Full rearchitecture |

## What I removed, and why

- **A component-registry MCP server.** It wrapped a CLI that already worked. The extra
  hop meant a cold `npx` download on first use, occasional timeouts, and a tool schema in
  every request to save one terminal command. Disabled.
- **"Memory" plugins that write notes the model never reads back.** Either the note is in
  the repo where it can be reviewed, or it is a cache with no eviction policy.
- **Broad GitHub servers with write scope.** Read access to issues is useful. The ability
  to open pull requests autonomously is a different risk category, and the productivity
  gain does not justify it before you have a review process for machine output.
- **Three plugins that all summarized the same thing.** Redundant tools do not add
  capability; they add selection noise. The model picks one at random and you spend the
  rest of the session wondering why it ignored the good one.

If you want the failure patterns behind that last point, the best treatment I have read is
on [how agents go wrong when tool selection
degrades](https://tosinowadokun.substack.com/p/when-agents-go-wrong).

## The install protocol

Install one thing at a time, and give each one a job.

1. **Write down the task you expect it to remove.** "Stop pasting docs", "stop guessing
   types". If you cannot name the removed work, you are installing a demo.
2. **Run it for a week on real tasks.** Not a toy repository. The failure modes only
   appear when the repo is messy.
3. **Check the context cost.** Compare a request before and after. If the schema is large
   and the tool rarely fires, the trade is bad.
4. **Remove it if you did not miss it.** Most plugins fail here and stay installed
   anyway, which is how the window fills up.

The order that worked: language server, then formatter and typecheck hooks, then
documentation retrieval, then skills, then browser automation. Each proved itself before
the next arrived.

## What to measure

Plugin count is not a metric. These are:

- **Context spent per task.** Tokens in, before the work starts. This is the cost plugins
  add.
- **Round trips to a correct diff.** Fewer is better, and it is the clearest signal that
  the tool is actually helping.
- **Defects caught before review.** The number that justifies the hooks and the typecheck
  pass.
- **Uninstalls.** If the number is zero after a quarter, you are not evaluating, you are
  accumulating.

That framing is the same one that makes [the security case for bounding an agent's
authority](/insights/ai-powered-security-agents) work: decide what you are willing to hand
over, then measure whether the handover paid for itself. Tooling is a smaller version of
the same decision.

## Frequently Asked Questions

### Do plugins slow down AI coding assistants?

They can, in two ways. Each MCP server adds tool definitions to the context on every
request, which costs tokens and can degrade tool selection. And each tool call is a round
trip. A small, well-chosen set is usually faster than a large one, even though the large
one has more capabilities on paper.

### What is the difference between an MCP server and a skill?

An MCP server exposes executable tools and pays a schema cost on every request. A skill is
a set of instructions loaded on demand, so it costs almost nothing until it is invoked. If
your need is procedural knowledge, a skill is cheaper. If your need is live data or an
action, you need a server.

### Are AI coding plugins safe to install?

Treat each one as a permission decision. A plugin that can read your files, call external
APIs, or execute shell commands is a principal in your environment. Prefer servers scoped
to read-only access, review what they send outbound, and keep write-capable tools behind
approval rather than auto-approval. Check the archive flag and the last commit date before
the star count.

### Which plugin gives the biggest productivity gain?

Documentation retrieval, for most teams, because it eliminates the most common failure:
confident use of an outdated API. If you are on a large typed codebase, language-server
awareness is close behind, since it lets the agent verify its own edits instead of
guessing.

### Do I need a second-brain tool at all?

Not for coding. A reviewed Markdown file in the repo covers most of it. A dedicated
memory system earns its cost when you need personalization across sessions and users, or
when the knowledge base is large enough that retrieval quality matters more than
auditability.

## The short version

Install the boring things. A language server and a typecheck hook will outperform any demo
you saw on social media, and they cost almost nothing in context. Add Context7 when you
are tired of correcting stale API calls. Add a skill for the procedures you repeat. Add
Playwright when you need to know whether the page actually renders. Add memory only when
you can describe what the agent should remember and why.

Then stop. The goal is not a full plugin directory. It is a short list of tools whose cost
you can justify on every request, and the discipline to remove the ones you cannot. If you
are setting this up for a team and want the rollout sequenced, [that is the kind of
engagement we take on](/services).
