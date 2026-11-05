---
name: update-docs
description: Update documentation.
disable-model-invocation: true
user-invocable: true
---

# /update-docs

Update documentation to reflect recent changes.

Start by loading the `doc-updater` skill; it carries the documentation-update playbook.

The text you type after the `/update-docs` token is this command's argument. If it is empty, ask for it before proceeding.

## Your Task

1. **Identify changed code** - `git diff --name-only`
2. **Find related docs** - README, API docs, guides
3. **Update documentation** - Keep in sync with code
4. **Verify accuracy** - Docs match implementation

## Documentation Types

### README.md
- Installation instructions
- Quick start guide
- Feature overview
- Configuration options

### API Documentation
- Endpoint descriptions
- Request/response formats
- Authentication details
- Error codes

### Code Comments
- JSDoc for public APIs
- Complex logic explanations
- TODO/FIXME cleanup

### Guides
- How-to tutorials
- Architecture decisions (ADRs)
- Troubleshooting guides

## Update Checklist

- [ ] README reflects current features
- [ ] API docs match endpoints
- [ ] JSDoc updated for changed functions
- [ ] Examples are working
- [ ] Links are valid
- [ ] Version numbers updated

## Documentation Quality

### Good Documentation
- Accurate and up-to-date
- Clear and concise
- Has working examples
- Covers edge cases

### Avoid
- Outdated information
- Missing parameters
- Broken examples
- Ambiguous language

---

**IMPORTANT**: Documentation should be updated alongside code changes, not as an afterthought.

## Notes

DSH has no subagent mode; this command runs in the main session with the `doc-updater` playbook loaded. DSH performs no argument substitution; the typed text is the whole argument.
