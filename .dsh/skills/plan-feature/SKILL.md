---
name: plan-feature
description: Create a detailed implementation plan for complex features.
disable-model-invocation: true
user-invocable: true
---

# /plan-feature

Create a detailed implementation plan.

Start by loading the `planner` skill; it carries the read-only planning playbook.

The text you type after the `/plan-feature` token is this command's argument. If it is empty, ask for it before proceeding.

## Your Task

1. **Restate Requirements** - Clarify what needs to be built
2. **Identify Risks** - Surface potential issues, blockers, and dependencies
3. **Create Step Plan** - Break down implementation into phases
4. **Wait for Confirmation** - MUST receive user approval before proceeding

## Output Format

### Requirements Restatement
[Clear, concise restatement of what will be built]

### Implementation Phases
[Phase 1: Description]
- Step 1.1
- Step 1.2
...

[Phase 2: Description]
- Step 2.1
- Step 2.2
...

### Dependencies
[List external dependencies, APIs, services needed]

### Risks
- HIGH: [Critical risks that could block implementation]
- MEDIUM: [Moderate risks to address]
- LOW: [Minor concerns]

### Estimated Complexity
[HIGH/MEDIUM/LOW with time estimates]

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)

---

**CRITICAL**: Do NOT write any code until the user explicitly confirms with "yes", "proceed", or similar affirmative response.

## Notes

DSH has no subagent mode; this command runs in the main session, and the `planner` skill keeps this planning phase read-only. DSH performs no argument substitution; the typed text is the whole argument. The destination is named `plan-feature` because DSH ships a built-in `/plan` command.
