---
type: catalog
status: verified
verified: 2026-10-31
commit: bdb621c
---

# Map schema

The closed set of node types. A new type needs a reason and a row here first.

| Type | Lives in | Answers |
|---|---|---|
| `object` | `objects/<cluster>/` | what a noun is, where it lives, what moves if you change it |
| `process` | `processes/` | a movement that actually runs: Input → Movement → Output |

## Frontmatter

| Field | Applies to | Values | Meaning |
|---|---|---|---|
| `type` | all | `object`, `process`, `catalog` | node kind |
| `cluster` | object | folder name under `objects/` | which shelf it belongs to |
| `universe` | object, process | `live`, `leftover`, `ghost` | see [../CONTEXT.md](../CONTEXT.md) |
| `status` | all | `stub`, `verified`, `stale` | `verified` requires `verified:` date + `commit:` and citations |
| `entity` | object | `path` or `path:line` | the owning file |
| `consumes` / `produces` | process | relative paths to cards | graph edges |

## Rules

- Every card cites `path:line` for its claims. If a comment and the code disagree, the code wins and the card says so.
- One card per noun a person would search for. If one paragraph covers two nouns, merge them.
- Cards never restate the source. They point at it.
- `_index.md` in a cluster is generated:

```bash
python -I map/_tools/index.py objects/<cluster>
```

Never hand-edit a generated index. Never mark a card `verified` because it looks right — cite it.
