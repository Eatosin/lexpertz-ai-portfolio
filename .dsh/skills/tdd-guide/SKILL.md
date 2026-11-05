---
name: tdd-guide
description: "Use when implementing a feature, fixing a bug, or refactoring under this repo's validation gates — npm run build + npm run lint after every step, since no test runner is installed."
user-invocable: true
---

# TDD Guide (Validation-Driven Development)

You are the tdd-guide specialist for this repository. Follow this playbook when the parent task matches your trigger.

You keep development incremental with a real validation gate at each step. The discipline is the same as TDD, but the gate here is build + lint, not a test runner.

## The repo reality you must respect

- There is **no test framework installed**. `npm test` fails. Never recommend or run tests, coverage tools, or Jest/Vitest configs.
- `npm run build` is the **only typecheck path**. There is no `tsc --noEmit` path.
- `npm run lint` is the lint gate.
- Never write test files, test configs, or coverage thresholds.

## Your workflow

1. **PLAN** — restate the change, list the exact files to touch, and define the validation gate for the step.
2. **IMPLEMENT** — guide the minimal code that satisfies the behavior. Small diff, existing patterns, reuse before writing.
3. **VALIDATE** — enforce `npm run build` + `npm run lint` after each step. For UI work, also run the responsive two-breakpoint check (~375px and ≥1280px), the touch-target check (≥44px), and reduced-motion gating from `AGENTS.md` / `docs/standards/`.
4. **REFINE** — remove duplication, improve naming, then re-validate until green. Do not refactor and change behavior in the same step.

## Validation gates

- [ ] `npm run build` passes (typecheck + build).
- [ ] `npm run lint` passes.
- [ ] No `console.log` left in source.
- [ ] Immutability: spread/copy only, never mutate state or props.
- [ ] No hardcoded secrets; configuration comes from environment.
- [ ] UI: mobile-first, both breakpoints verified, no fixed/absolute layout leaks, `svh`/`dvh` where pinned, reduced motion gated.
- [ ] Page data lives in `src/content/*`, not inline in components.
- [ ] Reuse check done: an existing component or block was considered first.
- [ ] Docs/map touched only when the change invalidates them, and `python -I map/_tools/links.py` passes if map links changed.

## Anti-patterns

- Never write test files, Jest/Vitest configs, or coverage thresholds.
- Never run `npm test`, `npx tsc --noEmit`, or coverage commands.
- Never skip the build gate to save time — a broken build is this repo's failing test.
- Never batch many unverified changes and validate at the end.
- Do not treat lint warnings as optional: fix them in the step that introduced them.

## Harness notes

You may run builds, lint, and the validation commands above. You must not create commits or push. Report the validation output that proves each gate passed, and when a gate fails, report the exact error and the smallest fix rather than continuing. Use `verification-loop` for the full pre-merge verification checklist and `coding-standards` for the style floor. The `tdd-workflow` skill assumes a test runner and does not apply here; use this skill's build + lint gates instead.
