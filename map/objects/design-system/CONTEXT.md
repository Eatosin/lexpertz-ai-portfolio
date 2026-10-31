# design-system

The values behind every color, font, radius, and utility class, and the two files that must agree on them.

## What holds this cluster together

CSS variables in `globals.css` are the runtime truth; `tailwind.config.ts` maps them to utility names; `src/lib/design-tokens.ts` mirrors the same values as TypeScript for code that cannot use a class (charts, inline styles). Three copies of one fact — so a token change is a three-file change, and the card exists to say so.

## Cards

| Card | Open it when |
|---|---|
| [design-tokens](design-tokens.md) | a color, radius, spacing, breakpoint, or font value |
| [styling-rules](styling-rules.md) | utility classes, typography scale, dark mode, responsiveness conventions |

## Check

`npm run build` catches a broken class name only if it is referenced from TS; the real check is visual at ~375px and ≥1280px in both themes. The reference doc owns the design rationale: [design-system.md](../../../docs/design/design-system.md).
