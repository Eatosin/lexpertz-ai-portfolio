# Objects — the nouns

One shelf per cluster, one card per noun a person would search for. Cluster by how an editor asks ("I am changing the hero"), not by folder layout.

## Clusters

| Cluster | Cards | Read it when |
|---|---|---|
| [app-shell](app-shell/CONTEXT.md) | routes, layout-and-seo | the URL surface, root chrome, metadata |
| [component-library](component-library/CONTEXT.md) | ui-primitives, page-sections, motion-primitives, layout-and-providers | any React component |
| [design-system](design-system/CONTEXT.md) | design-tokens, styling-rules | a color, font, spacing, or utility class |
| [content-and-insights](content-and-insights/CONTEXT.md) | content-modules, insight-posts, markdown-rendering | data, posts, markdown |
| [agent-tooling](agent-tooling/CONTEXT.md) | harness-config, skills-and-commands | the harness, not the site |

## Rules

- A card cites `path:line`; open the citation before editing.
- Change one card in a cluster, regenerate that cluster's `_index.md` with `python -I map/_tools/index.py objects/<cluster>`.
- If a card and the code disagree, the code wins. Fix the card in the same change.
