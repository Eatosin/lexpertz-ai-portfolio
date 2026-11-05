---
name: tdd
description: Run validation-driven workflow (build + lint; no test runner).
disable-model-invocation: true
user-invocable: true
---

# /tdd

Implement the following, validating each step against the repo's real checks.

Start by loading the `tdd-guide` skill; it carries the test-first playbook.

The text you type after the `/tdd` token is this command's argument. If it is empty, ask for it before proceeding.

## Repo Validation Reality

- **No test framework installed — `npm test` fails.** Do NOT run it.
- `npm run build` is the ONLY typecheck path.
- `npm run lint` for linting.
- Validating a UI change also requires the responsive two-breakpoint check (~375px and ≥1280px).

## Cycle (MANDATORY)

```
PLAN → IMPLEMENT → VALIDATE → REFINE → REPEAT
```

1. **PLAN**: State the interface/behavior change and the files touched.
2. **IMPLEMENT**: Write minimal code for the behavior.
3. **VALIDATE**: `npm run build` (typecheck) + `npm run lint`; visually verify at both breakpoints for UI work.
4. **REFINE**: Improve naming, remove duplication; re-validate.
5. **REPEAT**: Continue until the feature is complete.

## Validation Checklist

- [ ] `npm run build` passes (typecheck)
- [ ] `npm run lint` passes
- [ ] No `console.log` left behind
- [ ] Immutability respected (no `obj.x = y`, no `arr.push()`)
- [ ] UI changes verified at ~375px and ≥1280px
- [ ] Reduced motion gated (`prefers-reduced-motion`)

---

**MANDATORY**: Never run `npm test` or `npx tsc --noEmit` — neither works in this repo. Validate only via build + lint + visual checks.

## Notes

DSH has no subagent mode; this command runs in the main session with the `tdd-guide` playbook loaded. DSH performs no argument substitution; the typed text is the whole argument.
