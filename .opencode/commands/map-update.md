---
description: "Update the System map after a code or docs change"
agent: build
---
# Update the map

Bring `map/` back in sync after a change: $ARGUMENTS

Run this at the end of any change that adds, moves, renames, or reshapes a noun (route, component, content module, loader, token, skill root). A card that describes code which no longer exists is worse than no card.

## Steps

1. **Establish the change.** If `$ARGUMENTS` is empty, derive it from `git diff --name-only` and `git diff --stat`. Name the noun and the movement, not the files.
2. **Locate it.** Find the matching row in `map/effects/CONTEXT.md`. If no row fits, add one — that gap is the finding.
3. **Read only the named cards.** Compare each card's `Shape`, `Hits`, and `Does not hit` against the code. Every claim you keep must still cite a real `path:line`.
4. **Edit, don't append.** Update the card in place. Set `status: verified`, `verified: YYYY-MM-DD` and `commit: <short hash>` only when you re-read every citation in that card; otherwise set `status: stale` and say which claim is unverified.
5. **Structural changes need structural edits.** A new noun gets a card copied from `map/_templates/object.md`; a moved noun gets its `entity:` and citations updated; a removed noun gets archived — never a silently deleted card. Update `map/AGENTS.md` if a cluster's card list changed.
6. **Regenerate indexes** (never hand-edit them):

   ```bash
   python -I map/_tools/index.py objects/<cluster>
   ```

7. **Check the links:**

   ```bash
   python -I map/_tools/links.py . --skip node_modules --skip skills --skip .opencode
   ```

   Fix every broken link. Zero broken is the pass condition; the same check runs in CI.
8. **Report** three lists: cards updated, cards checked and unchanged, claims you could not verify. Do not claim `verified` on an unread citation.

## Do not

- Paste a changelog or audit report into a card — cards describe shape, not history.
- Add "how to read this map" prose; if the structure needs explaining, fix the structure.
- Duplicate a fact the source owns. Point at `path:line`; the code wins.
- Edit `_index.md` by hand.
