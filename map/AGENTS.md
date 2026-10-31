# Lexpertz AI Portfolio — System map

The catalog over this repository: what each noun is and what a change hits. The subject tree stays the source of truth; cards cite `src/` and never restate it.

## Clusters

| Cluster | Open it when you are changing | Cards |
|---|---|---|
| [app-shell](objects/app-shell/CONTEXT.md) | routes, layout, metadata, sitemap | routes, layout-and-seo |
| [component-library](objects/component-library/CONTEXT.md) | UI, page sections, animation | ui-primitives, page-sections, motion-primitives, layout-and-providers |
| [design-system](objects/design-system/CONTEXT.md) | color, type, spacing, utility classes | design-tokens, styling-rules |
| [content-and-insights](objects/content-and-insights/CONTEXT.md) | static content data, blog posts, markdown | content-modules, insight-posts, markdown-rendering |
| [agent-tooling](objects/agent-tooling/CONTEXT.md) | harness config, skills, commands, subagents | harness-config, skills-and-commands |

## Processes

| Movement | Card |
|---|---|
| run the site locally, verify a change before shipping | [dev-and-build](processes/dev-and-build.md) |
| publish an insight post | [publish-insight](processes/publish-insight.md) |
| add a page section or a reusable primitive | [add-page-section](processes/add-page-section.md) |
| add a skill, command, or subagent | [add-skill-command](processes/add-skill-command.md) |

## Before you change anything

[effects/CONTEXT.md](effects/CONTEXT.md) maps "I am changing X" to the cards to open first, and names what the changes do **not** touch.

After the change, run `/map-update` to bring the affected cards back in sync. The link check runs in CI (`.github/workflows/quality.yml`, job `links`).

## Name collisions

- **`design-system/`** (this map) vs **`docs/design/design-system.md`** (the reference). The doc owns the values; the card owns where they live and what a change hits.
- **`src/lib/insights.ts`** (filesystem loader) vs **`src/content/insights.ts`** (metadata projection). The loader reads disk; the projection shapes props for pages.
- **`hero-cinematic.tsx`** (mounted section) vs **`ui/cinematic-hero.tsx`** (the scene it wraps) vs **`_archive/src-components-old/hero-scroll-morph.tsx`** (dead). Any doc that describes a `ScrollMorphHero` scene is describing the archived one.
- **"Insights"** = published posts. **"Blog"** = the vendored skill suite that writes them. Same artifact, two words.

## Status

A cluster's status is its `_index.md`; a card's status is its `status:` line. Nothing here is a checklist — regenerate the indexes instead of editing them.
