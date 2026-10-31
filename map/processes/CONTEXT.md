# Processes — the verbs

Movements that actually run in this repo, in the shape **Input → Movement → Output**. A process card exists only if a person or a script repeats it; one-off procedures belong in `docs/process/`.

## Cards

| Movement | Input | Output |
|---|---|---|
| [dev-and-build](dev-and-build.md) | an edit on disk | a green `npm run build` and lint |
| [publish-insight](publish-insight.md) | a markdown file with frontmatter | a live `/insights/<slug>` page |
| [add-page-section](add-page-section.md) | a design or copy block | a section mounted by a page |
| [add-skill-command](add-skill-command.md) | a repeated task worth encoding | a loadable skill, command, or subagent |

## Rules

- Each step ends at a check a person or command actually performs.
- `consumes` / `produces` point at object cards, not at files — the card owns the file path.
- If two process cards share more than a step, one of them is a stage of the other: merge.
