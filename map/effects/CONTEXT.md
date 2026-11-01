# Effects — what a change hits

Open this before editing. It answers one question: **I am changing X, which cards do I read first?** It does not copy the waterfall; if this table and a card disagree, the card wins and this table is fixed.

## Change → cards

| I am changing | Read first | Then |
|---|---|---|
| a URL, route file, or route group | [routes](../objects/app-shell/routes.md) | [layout-and-seo](../objects/app-shell/layout-and-seo.md), `src/app/sitemap.ts` |
| fonts, providers, root chrome, metadata | [layout-and-seo](../objects/app-shell/layout-and-seo.md) | [layout-and-providers](../objects/component-library/layout-and-providers.md) |
| a color, radius, font, or breakpoint | [design-tokens](../objects/design-system/design-tokens.md) | [styling-rules](../objects/design-system/styling-rules.md) |
| a heading class or typography utility | [styling-rules](../objects/design-system/styling-rules.md) | [design-tokens](../objects/design-system/design-tokens.md) |
| a reusable component's props or exports | [ui-primitives](../objects/component-library/ui-primitives.md) | grep every call site, then [page-sections](../objects/component-library/page-sections.md) |
| a homepage or marketing block | [page-sections](../objects/component-library/page-sections.md) | [add-page-section](../processes/add-page-section.md) |
| any animation or scroll behaviour | [motion-primitives](../objects/component-library/motion-primitives.md) | reduced-motion path in the same component |
| a service, case study, team member, or stat | [content-modules](../objects/content-and-insights/content-modules.md) | [routes](../objects/app-shell/routes.md) if a slug moved |
| a blog post or its frontmatter | [insight-posts](../objects/content-and-insights/insight-posts.md) | [publish-insight](../processes/publish-insight.md), [markdown-rendering](../objects/content-and-insights/markdown-rendering.md) |
| markdown output, tables, figures, reading time | [markdown-rendering](../objects/content-and-insights/markdown-rendering.md) | [insight-posts](../objects/content-and-insights/insight-posts.md) |
| the model, skill roots, MCP, permissions | [harness-config](../objects/agent-tooling/harness-config.md) | [add-skill-command](../processes/add-skill-command.md) |
| a skill, command, or subagent | [skills-and-commands](../objects/agent-tooling/skills-and-commands.md) | [add-skill-command](../processes/add-skill-command.md) |
| campaign copy, social posts, or positioning | [skills-and-commands](../objects/agent-tooling/skills-and-commands.md) | `.agents/product-marketing.md`, then `marketing/CONTEXT.md` |

## First-order "does not hit", the wrong next noun

- Changing a design token does **not** hit post markdown — posts use `prose` classes.
- Adding a content module does **not** hit `src/components/ui/`.
- Changing the hero section does **not** hit `docs/` or the sitemap (the hero is not a route).
- Editing `src/content/insights.ts` does **not** change any post — it is a projection.
- Moving files under `src/` does **not** update `src/app/sitemap.ts`; static routes are hand-listed.

## Consumers outside this tree

Nothing in the tree names these, so no card could list them until asked. They break silently:

| Consumer | What it points at |
|---|---|
| Vercel project | repo root; build command `npm run build` |
| GitHub Actions (`.github/workflows/quality.yml`) | `npm install`, `npm run build`, `npm run lint` |
| Live domain `lexpertzai.cc` | `siteConfig.url` (`src/lib/constants.ts:150`) — canonical, OG and sitemap URLs all derive from it |
| OpenCode sessions (local + CI) | `opencode.json` skill roots, including `.opencode/vendor/claude-blog/` which is cloned, not committed |
| Codespaces dev container (`.devcontainer/`) | `npm install` on create |

## Reverse question

"What points into this tree?" is answered above, not by the cards. If you add a scheduled job, an external agent config, or a second deployment that hardcodes a path, add a row here on the same change.
