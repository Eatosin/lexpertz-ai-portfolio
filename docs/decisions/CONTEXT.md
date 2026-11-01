# decisions

Open and closed decisions, one file each. A decision here is a choice with a cost, not a task.

## Format

`NNNN-<slug>.md`, numbered in order of decision, not order of importance.

| Field | Meaning |
|---|---|
| `status` | `proposed`, `accepted`, `deferred`, `rejected`, `superseded` |
| `date` | when the status last changed |
| `owner` | who decides |
| `revisit` | the condition that reopens it |

Sections: Context, Options, Criteria, Decision, Consequences. A decision without criteria becomes a preference; write the criteria first.

## Rules

- One decision per file. If two choices are entangled, split them.
- Record the option that was rejected and why. That is the value of the file.
- When a decision changes, do not rewrite history: set `superseded` and link the new file.
- An open decision that blocks work names the work and the interim path.
