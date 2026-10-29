---
title: "Best AI Coding Harness Plugins for Improving Developer Productivity"
summary: "Most coding-harness plugins are context you pay for on every request and use twice a month. Five integration categories that survived a real repository, and the ones I removed."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-10-29"
category: "Engineering"
coverImage: "/insights/ai-coding-harness-plugins.png"
tags: ["ai-coding", "developer-tools", "mcp", "productivity"]
---

Every harness now has a plugin directory, and most of it is context you pay for on
every single request whether or not the plugin fires.

That is the part the screenshots leave out. A plugin does not cost nothing when it is
idle. Its tool definition, its description, and its examples occupy tokens in the
window, and a window full of plausible tools makes the model worse at choosing the
right one. Install twenty and you have not added twenty capabilities; you have added
twenty ways to pick wrong, plus a larger bill.

So this is not a top ten. It is the five categories that survived two weeks on a real
repository, ranked by how much work they removed rather than how good the demo looked,
plus the ones I uninstalled.

## Key Takeaways

- Rank plugins by **tokens removed**, not features added. A integration that replaces a
  pasted file or a manual lookup pays for itself; one that saves a keystroke does not.
- **Documentation retrieval** and **language-server awareness** are the two highest-leverage
  additions, because they replace the two things developers waste the most context on.
- **Deterministic hooks** (format, lint, typecheck) beat model-driven instructions every
  time. If a rule can be enforced by a program, do not spend a prompt on it.
- Keep the **tool surface small and scoped**. Each MCP server is a permission decision
  and a context cost, not a free feature.
- Measure **defects caught and context spent**, not plugin count or lines generated.

## What actually counts as a plugin

"Plugin" is not a single thing across harnesses, and the ranking only makes sense once
the categories are separated:

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

A documentation server fixes the input to that problem. Instead of hoping the weights
remember the current API, the model fetches the relevant page and reads it. The
practical difference is not subtle: version-specific answers, correct signatures, and
far fewer invented options.

Context7 is the one I use, and it is configured with an `ask` permission rather than
auto-approval, which is the right default. Documentation lookups are cheap and safe, but
every external fetch is still a request leaving your machine with your query in it.

The reason this ranks first: it replaces the single most expensive thing you can put in
a context window — an entire documentation page pasted by hand — with a targeted
retrieval that returns the section that matters.

**Install if:** you work against fast-moving frameworks. **Skip if:** you are writing
mostly against an internal, stable API you control, where the docs live in the repo and
the model can just read them.

## 2. Language-server and typecheck awareness

The least glamorous entry, and the one that quietly improves everything else.

An agent that can ask "what type does this function return" does not have to guess. It
stops writing code that typechecks in its head and fails in CI. On a TypeScript project
the difference shows up as fewer edits that shadow a variable or miss a required prop; on
a Python project, fewer calls with the wrong arity.

There is a second-order benefit that matters more: the agent can verify its own change
before handing it back. Read the type error, fix it, re-run. That loop is the difference
between "here is a diff, hope it works" and "here is a diff, and the compiler agrees."

This is also the category people skip because it does not feel like an AI feature. It is
just the language server that was already running for your editor, exposed to the agent.
That is exactly why it works: it is deterministic, it is fast, and it knows things the
model cannot infer from a file.

## 3. Deterministic hooks for format, lint, and typecheck

Hooks run a program at a lifecycle point: before a file is written, after an edit, before
a command executes. They are boring, and they are the most reliable thing in this list.

The rule is simple. If a constraint can be enforced by a program, enforce it with the
program instead of writing it in a prompt. "Always run prettier" is a hook. "Please make
sure the code is formatted" is a suggestion that fails one time in five, and you will not
notice which time.

Useful hooks, in order of payoff:

- **Format on write.** Eliminates an entire class of noisy diff.
- **Lint the touched files.** Catches the unused import and the shadowed variable before
  they reach review.
- **Typecheck before claiming success.** Stops the agent from reporting done on code that
  does not compile.
- **Block writes to protected paths.** Cheap, and it is the difference between a mistake
  and an incident.

The failure mode to watch for is a hook that is slow enough to be disabled. A typecheck
that takes forty seconds on every file write will get turned off within a day. Run the
fast subset on write and the full pass on demand.

## 4. Skills: workflows that load on demand

A skill is a folder with a `SKILL.md` and optional scripts and references. The harness
advertises only the name and description; the body loads when the skill is invoked.

That cost model is what makes skills worth having. The instructions for a deployment
checklist or a release process sit on disk at zero token cost until the moment you need
them. Compare that to an MCP server, which pays its schema cost on every turn whether
you use it or not.

The ones that earn their place are narrow and procedural: cut a release, migrate a
schema, run the security review, draft a post in a house style. The ones that do not are
vague personality instructions, which are cheaper as a line in `AGENTS.md`.

One caveat, learned the hard way in this repo: skills written for a different harness do
not necessarily port. Frontmatter fields such as `argument-hint` are conventions of one
tool and are ignored by another, and paths that assume the skill suite's own repository
root break when you copy only the skills directory. Budget an hour for adaptation, or
vendor the whole suite rather than cherry-picking files.

## 5. Browser automation for verification

This is the category that changes what you are willing to delegate.

Without a browser, an agent working on a UI is guessing. It can read the JSX, it can
reason about the CSS, and it cannot tell you whether the thing renders. With Playwright
available as a tool, it can open the page, take a screenshot, click the button, and check
that the modal appeared. The loop closes.

That matters most for the class of bug that only exists at runtime: a layout that
collapses at 375px, a form that submits twice, a hydration mismatch that only appears
after the client boots. None of those are visible in a diff.

Install it as a CLI on the machine first. `playwright install chromium` plus the
`screenshot` command gets you ninety percent of the value with no server process and no
extra tool schema, and you can reach for the full MCP integration later if you need
interactive flows.

There is a security note here that generalizes to every plugin in this post: a browser
tool can reach any URL the machine can reach. Treat it as a network egress decision, not
a convenience. The same discipline that applies to [giving an agent authority it cannot
be trusted with](/insights/ai-powered-security-agents) applies to giving it a browser.

## Honorable mention: token-reduction wrappers

Worth its own line because it is the inverse of the usual plugin pitch.

A token-reduction wrapper sits between the agent and the shell, trims command output to
the part that matters, and passes the rest through. Failures get shown; passing test
suites become a single line. In this repo's harness the wrapper advertises 60–90%
context savings on shell-heavy commands, and the direction is right even if you discount
the number: the agent does not need four hundred lines of successful test output.

The reason it is a mention rather than a pick is that it is infrastructure, not a
feature. You install it once and forget it, which is the highest compliment available
to a tool in this category.

## What I removed, and why

- **A component-registry MCP server.** It wrapped a CLI that already worked. The extra
  hop meant a cold `npx` download on first use, occasional timeouts, and a tool schema
  in every request to save one terminal command. Disabled.
- **"Memory" plugins that write notes the model never reads back.** Either the note is
  in the repo where it can be reviewed, or it is a cache with no eviction policy.
- **Broad GitHub servers with write scope.** Read access to issues is useful. The
  ability to open pull requests autonomously is a different risk category, and the
  productivity gain does not justify it before you have a review process for machine
  output.
- **Three plugins that all summarized the same thing.** Redundant tools do not add
  capability; they add selection noise. The model picks one at random and you spend the
  rest of the session wondering why it ignored the good one.

If you want the failure patterns behind that last point, the best treatment I have read
is on [how agents go wrong when tool selection
degrades](https://tosinowadokun.substack.com/p/when-agents-go-wrong).

## The install protocol

Install one thing at a time, and give each one a job.

1. **Write down the task you expect it to remove.** "Stop pasting docs", "stop guessing
   types". If you cannot name the removed work, you are installing a demo.
2. **Run it for a week on real tasks.** Not a toy repository. The failure modes only
   appear when the repo is messy.
3. **Check the context cost.** Compare a request before and after. If the schema is
   large and the tool rarely fires, the trade is bad.
4. **Remove it if you did not miss it.** Most plugins fail here and stay installed
   anyway, which is how the window fills up.

The installation order that worked: language server, then formatter and typecheck hooks,
then documentation retrieval, then skills, then browser automation. Each one proved
itself before the next arrived, and the ones that did not prove themselves never made it
into the config.

## What to measure

Plugin count is not a metric. These are:

- **Context spent per task.** Tokens in, before the work starts. This is the cost plugins
  add.
- **Round trips to a correct diff.** Fewer is better, and it is the clearest signal that
  the tool is actually helping.
- **Defects caught before review.** The number that justifies the hooks and the
  typecheck pass.
- **Uninstalls.** If the number is zero after a quarter, you are not evaluating, you are
  accumulating.

That framing is the same one that makes [the security case for bounding an agent's
authority](/insights/ai-powered-security-agents) work: decide what you are willing to
hand over, then measure whether the handover paid for itself. Tooling is a smaller
version of the same decision.

## Frequently Asked Questions

### Do plugins slow down AI coding assistants?

They can, in two ways. Each MCP server adds tool definitions to the context on every
request, which costs tokens and can degrade tool selection. And each tool call is a round
trip. A small, well-chosen set is usually faster than a large one, even though the large
one has more capabilities on paper.

### What is the difference between an MCP server and a skill?

An MCP server exposes executable tools and pays a schema cost on every request. A skill
is a set of instructions loaded on demand, so it costs almost nothing until it is
invoked. If your need is procedural knowledge, a skill is cheaper. If your need is live
data or an action, you need a server.

### Are AI coding plugins safe to install?

Treat each one as a permission decision. A plugin that can read your files, call external
APIs, or execute shell commands is a principal in your environment. Prefer servers that
are scoped to read-only access, review what they send outbound, and keep write-capable
tools behind approval rather than auto-approval.

### Which plugin gives the biggest productivity gain?

Documentation retrieval, for most teams, because it eliminates the most common failure —
confident use of an outdated API. If you are on a large typed codebase, language-server
awareness is close behind, since it lets the agent verify its own edits instead of
guessing.

## The short version

Install the boring things. A language server and a typecheck hook will outperform any
demo you saw on social media, and they cost almost nothing in context. Add documentation
retrieval when you are tired of correcting stale API calls. Add skills for the procedures
you repeat. Add a browser when you need to know whether the page actually renders.

Then stop. The goal is not a full plugin directory. It is a short list of tools whose
cost you can justify on every request, and the discipline to remove the ones you cannot.
If you are setting this up for a team and want the rollout sequenced, [that is the kind
of engagement we take on](/services).
