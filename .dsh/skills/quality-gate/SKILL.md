---
name: quality-gate
description: Run quality gate checks before merging.
disable-model-invocation: true
user-invocable: true
---

# /quality-gate

Run the ECC quality pipeline on demand for a file or project scope.

Start by loading the `code-reviewer` skill; it carries the code-review playbook.

## Usage

`/quality-gate [path|.] [--fix] [--strict]`

## Arguments

The text you type after the `/quality-gate` token is this command's argument. If it is empty, ask for it before proceeding.

- `[path|.]` optional target path (default: current directory)
- `--fix` allow auto-format/fix where configured
- `--strict` fail on warnings where supported

## Pipeline

1. Detect language/tooling for target.
2. Run formatter checks.
3. Run lint/type checks when available.
4. Produce a concise remediation list.

## Notes

This command mirrors hook behavior but is operator-invoked. DSH has no subagent mode; this command runs in the main session with the `code-reviewer` playbook loaded. DSH performs no argument substitution; the typed token list is the argument.
