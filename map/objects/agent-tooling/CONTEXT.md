# agent-tooling

The harness, not the site: model config, skill paths, commands, subagents, and the vendored blog suite.

## What holds this cluster together

There is no plugin and no build step. OpenCode V2 discovers `.opencode/{agents,commands,skills}/` by convention and reads extra skill roots from `opencode.json`. Everything in this cluster is instruction surface, which means a wrong path here fails silently — the agent simply does not see the skill.

## Cards

| Card | Open it when |
|---|---|
| [harness-config](harness-config.md) | model, skill roots, MCP servers, permissions |
| [skills-and-commands](skills-and-commands.md) | adding or debugging a skill, command, or subagent |

## Check

Load the skill in a session and confirm the reported base directory matches its folder (`docs/process/development.md`, "Verifying Skills Are Loaded"). A config edit needs a new session before it is visible.
