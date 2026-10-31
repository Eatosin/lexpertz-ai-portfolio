# _archive — dead code, kept

Nothing imports from this folder. It is excluded from ESLint and from the build, and it exists so a rewrite is reversible.

| Folder | What it was | Superseded by |
|---|---|---|
| `src-components-old/` | the pre-rewrite homepage: `landing`, `hero-scroll-morph`, `scroll-morph-hero`, `process-timeline`, `timeline`, `projects`, `tech-stack`, `founder`, plus old `navbar`, `footer`, `contact` | `src/components/sections/` and `src/components/layout/` |

Do not import these files. If one is worth reviving, move it into `src/` and re-verify it at both breakpoints — do not resurrect it by path.
