---
title: "Google AI Agent Security Threats: The 2026 Attack Surface"
summary: "Google's agent stack has real controls: SPIFFE identity, default-deny gateways, Model Armor. The threats that land target the boundaries between them."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-11-05"
category: "Cloud Security"
coverImage: "/insights/google-ai-agent-security-threats.png"
tags: ["google-cloud", "ai-agents", "security", "prompt-injection", "gemini"]
---

In August 2026, Google deleted three GitHub Actions workflows from its own Agent
Development Kit repository. A public issue-triage agent could be prompt-injected into
posting a command-shaped comment, and a maintainer-only agent treated that comment as an
authenticated request from a trusted collaborator. The privileged workflow held a personal
access token and a Google Cloud service account key. The failure was not a missing control
on either agent. It was a trust boundary between them that neither agent was responsible
for checking.

That is the shape of the Google AI agent security problem in 2026. The platform now ships
serious controls: SPIFFE agent identities, a default-deny gateway, Model Armor content
screening, and AI Protection findings for agentic identity abuse. The threats that still
get through are the ones that live between those controls — untrusted content that enters
above the screening layer, tool descriptions the scanner was never designed to read, and
agent-to-agent triggers that treat a recognizable format as authorization.

This is a threat map for that gap, ordered by what I would audit first.

## Key Takeaways

- Google's agent control plane is real, and it is **default-deny**. Agent Identity, Agent
  Registry, Policies, and Agent Gateway decide who is calling, which destination is
  approved, and what is allowed to pass.
- The control plane answers **three questions**. It does not answer where the content that
  shaped a call came from, or whether the agent that approved it was itself manipulated.
  The ADK incident turns on both questions.
- Google's April 2026 web sweep found indirect prompt injection at web scale: **2–3 billion
  pages per monthly Common Crawl snapshot**, with a **32% relative increase** in the
  malicious category between November 2025 and February 2026.
- Model Armor sanitizes MCP **tool calls and responses**, plus prompt fetches and tool
  execution errors. It does not sanitize tool listings, resources, notifications, streaming
  transport, or protocol errors.
- Coverage is the security boundary. The managed gateway is available on Agent Runtime and
  Gemini Enterprise; self-managed GKE, Cloud Run, and cross-cloud deployments are
  documented as coming soon, so the control may not be in your path.

## Google's agent security model finally has a control plane

The rename from Vertex AI Agent Builder to Gemini Enterprise Agent Platform is not the
interesting part. The interesting part is that the "govern" pillar now has primitives that
did not exist as first-class concepts two years ago.

| Component | Question it answers | Where it sits |
|---|---|---|
| Agent Identity | Who made the request? | Per-agent SPIFFE principal, bound to the agent lifecycle |
| Agent Registry | Is the destination approved? | Central directory of agents, tools, MCP servers, endpoints |
| Policies | What is allowed? | IAM access, Model Armor filters, semantic governance, token budgets |
| Agent Gateway | Where is it enforced? | Ingress (client to agent) and egress (agent to anywhere) |
| Agent observability | What happened? | Layer 7 and Layer 8 telemetry in Cloud Logging and Cloud Trace |

The strongest sentence in the documentation is also the simplest: by default, all
connections are blocked unless an explicit IAM policy grants access. That inverts the usual
cloud failure mode. Teams do not forget to deny; they forget to allow, and an agent that
stops working is more often missing a binding than misconfigured.

The gateway also inspects MCP JSON-RPC requests to extract tool names and method
attributes, which is what makes per-tool policy possible rather than per-server policy. For
an egress control, that matters more than it sounds. A compromised agent cannot simply call
an unregistered endpoint, and a registered MCP server is not a blank check for every tool it
exposes. Each gateway instance governs up to 5,000 registered resources.

I went through the control-plane details — the SPIFFE principal format, the identity churn
on redeploy, the per-component data-control matrix — in
[the Vertex AI Agent Builder posture review](/insights/vertex-ai-agent-builder-security).
The short version is that this is a genuine architecture change, not a re-skin.

But read the table again. The control plane answers who, where, and what. It does not answer:

1. **Provenance.** Did the instruction that shaped this call come from the user, or from a
   document the agent read on the way?
2. **Delegation integrity.** Was the agent that approved the next step itself manipulated
   before it approved?

Those are the two questions behind every serious Google agent incident I looked at this
year. The controls are necessary. They are not sufficient, because they are aimed at the
call, not at the chain of reasoning that produced it.

## Threat 1: content-plane injection moved from demo to measured

For two years, indirect prompt injection was a demo: plant instructions in a page, watch an
agent misbehave, end the talk. In April 2026, Google's Threat Intelligence teams published a
web-scale measurement instead. They scanned Common Crawl, which publishes monthly snapshots
of 2–3 billion pages from the English-speaking web, looking for known injection signatures
and classifying candidates with Gemini and human review.

The findings are more useful than the headline number:

- Most injections were **benign or low-sophistication**: pranks, helpful guidance for AI
  summarizers, SEO manipulation, and attempts to deter crawlers.
- **Malicious exfiltration and destruction** existed, but at low sophistication. Google
  described the authors as experimenting rather than productionizing published attack
  research.
- The malicious category grew by a **32% relative increase between November 2025 and
  February 2026**, measured by repeating the scan across archive versions
  ([Google Security Blog](https://blog.google/security/prompt-injections-web/), April 2026).

The caveat matters as much as the finding: Common Crawl excludes most social media and
login-walled content. The measurement is a floor for the public web, not a ceiling for the
enterprise. In a Workspace or Gemini Enterprise deployment, the untrusted content is not
mostly web pages. It is email, shared documents, calendar invites, support tickets, CRM
notes, and the retrieved passages behind a RAG answer. Google's own Workspace security team
makes the point directly: an indirect injection can work "without any input directly from
the user" because the content arrives through the tools the agent is already allowed to
read ([Google Workspace security](https://blog.google/security/google-workspaces-continuous-approach-to-mitigating-indirect-prompt-injections/), April 2026).

Google's defense is layered, and the layers are worth separating because they have
different audit properties:

| Layer | Examples | Can you audit it? |
|---|---|---|
| Deterministic | User confirmation, URL sanitization, tool chaining policies | Yes: policy configuration is inspectable |
| ML-based | Classifiers retrained on synthetic attack variants | Partially: version and test coverage are inspectable |
| LLM-based | System-instruction hardening and prompt optimization | Partially: prompt changes are reviewable |
| Model hardening | Gemini's internal resistance to embedded instructions | No: you cannot inspect weights or reproduce a model's judgment |

The last row is the one security teams over-credit. Model hardening reduces attack success
rates, and Google reports progress on it. It is not a control you can put in an audit
report, because it is not a boundary you own. The boundaries you own are the deterministic
ones: what content can enter a context, what state a tool may change without confirmation,
and where an agent may send data.

That is also the design logic behind CaMeL, the Google DeepMind research presented at IEEE
SaTML 2026. It separates the trusted user query's control flow from untrusted data, so
retrieved text can carry data but cannot change the program's path, and it enforces
capability policies on where that data may flow
([arXiv 2503.18813](https://arxiv.org/abs/2503.18813)). You are unlikely to deploy CaMeL
itself. You can copy the question it asks: is this input allowed to influence a decision, a
destination, or only a value?

![Untrusted content enters through retrieval, tool responses, and messages, then passes four boundaries before an action is authorized](/diagrams/google-agent-trust-boundaries.svg "Figure 1 — The control plane governs the call at the gateway. Provenance and delegation integrity have to be designed in before the call exists.")

## Threat 2: the tool plane is an instruction channel

The most underrated Google-specific gap is not in the model. It is in what Model Armor is
documented to inspect.

Model Armor's integration with Google and Google Cloud MCP servers sanitizes a specific set
of MCP payloads. The documentation lists exactly which ones as of October 2026, and the complement is
the threat model:

| MCP surface | Model Armor behavior | Why it matters |
|---|---|---|
| `tools/call` requests and responses | Sanitized | The obvious tool argument and result path |
| `prompts/get` requests and responses | Sanitized | Server-supplied prompt templates |
| Tool execution errors | Sanitized | A common injection carrier in malicious tool servers |
| `tools/list` | **Allowed without sanitization** | Tool names, descriptions, and schemas are read by the model |
| `resources/*` | **Allowed without sanitization** | A data channel into the context |
| `notifications/*` | **Allowed without sanitization** | Asynchronous messages can arrive mid-task |
| Streamable HTTP/SSE transport | **Allowed without sanitization** | The transport framing is not content-screened |
| MCP protocol errors (not tool errors) | **Allowed without sanitization** | Error text is still text the model can read |

This is not a bug report. It is a documented boundary, and it is defensible: screening every
resource read and every streaming chunk is expensive, and the gateway has other jobs. But
the security consequence is concrete. `tools/list` is where tool poisoning lives. A tool
description is an instruction to the model — it tells the model when and how to call the
tool, what arguments to prefer, and sometimes what to do with the result. If an MCP server
is approved in Agent Registry, the destination is trusted; the description it serves later
is not necessarily the description that was reviewed.

Google's own framing of the risk is consistent with this. Google describes the goal of
Model Armor's agent, tool, and MCP screening as mitigating "prompt injection and tool
poisoning"
([Google Cloud Security Summit](https://cloud.google.com/blog/products/identity-security/security-summit-2025-enabling-defenders-and-securing-ai-innovation), August 2025).
The coverage table above is the part a design review needs to read alongside that claim.

A second detail matters for rollout planning. The Model Armor floor settings are
project-wide, and they apply to other integrated services, so a change made for MCP can
alter screening behavior elsewhere. And if you call an unsupported Google or Google Cloud
MCP server, the floor settings do not apply at all. The integration is also moving: check
the current filter version and its retirement schedule before design sign-off rather than
treating this page as stable.

![Model Armor covers tool calls, prompt fetches, and tool execution errors; tool listings, resources, notifications, streaming transport, and protocol errors pass through](/diagrams/google-model-armor-mcp-coverage.svg "Figure 2 — The screened surface is narrower than the protocol. Anything the model can read is an instruction channel, whether or not it is filtered.")

The practical controls are not exotic, but they have to be explicit:

- **Pin MCP server versions and review tool descriptions as code.** A registry entry
  approves a destination; it does not freeze the content that destination serves.
- **Allowlist tools, not just servers.** The gateway can enforce per-tool policy from
  JSON-RPC method attributes. Use it.
- **Disable surfaces you do not need.** If the agent never reads resources or notifications,
  do not leave them reachable.
- **Treat tool output as untrusted input.** The response from an approved tool is still
  content, and content is where instructions hide.

## Threat 3: agent-to-agent handoffs are authorization boundaries

The ADK incident is the clearest public example of the failure mode, and the details are
worth walking through because they generalize.

Pillar Security's August 2026 disclosure described two generations of automation in Google's
open-source ADK repository. A public workflow triaged incoming issues and pull requests. A
privileged workflow could act on the repository with broad credentials. The link between
them was a comment-shaped trigger: a bot mention in the first generation, a slash command in
the second.

An attacker could submit a pull request or issue containing injection text. The public agent
read it, followed the embedded instruction, and posted the trigger comment. The privileged
workflow saw a comment that matched the expected format and treated it as an authenticated
command from a trusted collaborator. A `gh`/`git`-only allowlist was supposed to bound what
the privileged job could do; the researchers bypassed it with `git`'s `core.hooksPath` and
alias mechanisms, which turned an approved binary into an arbitrary shell
([Cloud Security Alliance research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-google-adk-trustissues-agent-injection-202/), August 2026).

Google deleted the affected workflows and hardened the repository. The structural lesson
survives the patch: the system authorized based on what the trigger looked like, not on
where the content that produced it came from. That is origin injection, and it is the
agent-to-agent version of the same weakness as indirect prompt injection. The instruction
did not need to defeat the privileged agent's prompt. It only needed to reach a trusted
agent that would pass it along.

This is not unique to Google's repository. The A2A protocol, which Google introduced for
inter-agent communication, does not strictly specify token usage context, authorization
delegation, or token propagation between agents. A 2026 IEEE paper demonstrated an access
token compromise in an A2A-based multi-agent system and traced it to exactly that gap
([IEEE 11571677](https://ieeexplore.ieee.org/document/11571677)). If a downstream agent
accepts a token because it arrived from an upstream agent, the token's provenance is only as
good as the upstream agent's integrity.

OWASP's Top 10 for Agentic Applications names the pair directly: ASI07, insecure
inter-agent communication, and ASI08, cascading failures
([OWASP](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), December 2025).
The control that addresses both is not a better prompt. It is an out-of-band authorization
step at every handoff: a signed intent, a scoped credential issued for the specific action,
or a human confirmation that is independent of the agent-generated text.

![An attacker-controlled issue reaches the public triage agent, whose comment-shaped output is treated as authorization by the privileged agent holding repository and cloud credentials](/diagrams/google-adk-agent-to-agent-chain.svg "Figure 3 — The ADK chain in August 2026. The privileged agent checked the format of the trigger, not the provenance of the content that created it.")

Three design rules follow, and they apply whether you use ADK, A2A, or a custom
orchestrator:

1. **Give each agent its own identity and its own narrow role.** Do not let a privileged
   workflow inherit a human collaborator's personal access token. A non-human identity with
   a small scope is easier to audit and easier to revoke.
2. **Treat every handoff as a boundary.** If agent B acts on agent A's output, B needs an
   independent authorization decision. "It came from inside the pipeline" is not one.
3. **Constrain behavior, not binary names.** An allowlist that permits `git` and `gh` is an
   allowlist for the full behavior of `git` and `gh`. If the constraint matters, run the
   action in a sandbox with an egress allowlist rather than trusting a command name.

## Threat 4: identity is stronger, but authorization still drifts

The identity layer is the part Google has improved most, and it is worth saying so plainly.
An agent identity is a SPIFFE principal tied to the agent's resource ID, not a shared service
account. The default Context-Aware Access policy binds credentials to the runtime with mTLS
and DPoP, so a stolen token is not a replayable bearer token. Default roles are deliberately
small, and the docs recommend a custom role for agent-to-agent delegation rather than a
project-wide grant.

The drift is in authorization, not authentication. Three patterns keep showing up:

- **Over-privileged agents.** Security Command Center's AI Protection explicitly detects
  Agent Runtime agents granted excessive permissions, which tells you the problem is common
  enough to productize a finding.
- **Broad token-creator grants.** Event Threat Detection includes findings for project-,
  folder-, and organization-level token creator roles granted to an AI agent, plus sensitive
  roles granted by an agent or to an external agent. Those are the signals of an agent that
  can mint authority rather than use it.
- **Identity churn.** A redeploy creates a new principal, and IAM bindings do not follow it.
  If your SIEM keys on a stable principal, every deploy looks like a new actor. I covered
  the post-deploy binding pattern in the
  [three identities in every call](/insights/ai-agent-identity-security); the security consequence is that
  detection rules need a resource-ID mapping, not a principal string.

Two other coverage facts belong in the same review. Preview models are excluded from the
security controls, so a single preview dependency can move a workload out of the guarantees
the rest of the architecture relies on. And controls are per component, not per project;
the data-control matrix for RAG Engine and Vector Search does not match the platform's.

Memory is the quiet version of the same problem. Sessions and Memory Bank persist context
beyond a single turn, so an injected instruction that lands in memory can outlive the
conversation that introduced it. Model Armor screens requests and responses, not stored
state. Audit what is retained, for how long, and whether a new session can read memory
written under a different trust context.

## Threat 5: the coverage map is the real security boundary

A control that exists in the documentation is not necessarily a control in your request
path. This is the part of the threat model that product comparisons tend to skip.

Agent Gateway's deployment models differ by runtime. On Agent Runtime and Gemini Enterprise,
Google manages the gateway infrastructure. On GKE, Cloud Run, and cross-cloud Kubernetes,
the documentation describes self-managed proxy infrastructure — a GKE Gateway and Secure Web
Proxy, an Application Load Balancer and Secure Web Proxy, an Envoy proxy in your cluster —
and marks support for those models as coming soon as of the October 2026 documentation. That
status can change, and should be checked before design sign-off. Until it does, an agent on
Cloud Run is not behind the same managed enforcement layer as an agent on Agent Runtime,
even though both appear in the same product overview.

The same pattern appears in detection:

- AI Protection's **Agent Platform Threat Detection** is a preview feature and targets
  runtime threats inside Agent Runtime containers — reverse shells, credential searches,
  base64-encoded scripts, crypto mining. Those are post-exploitation signals, not injection
  prevention.
- **AI Discovery** does not support Gemini model detection on the Standard tier, and AI
  Protection does not support Gemini models on Standard at all. The April 2026 baseline
  changes put an AI protection dashboard and baseline posture controls in Standard, but the
  deeper agent findings still depend on tier.
- **Model Armor findings** appear in Security Command Center only after you enable and
  configure the integration, and the coverage limits from the previous section still apply.

None of this makes the controls weak. It makes the coverage map the thing you have to
produce. "We use Agent Gateway" and "the agent's egress is behind a managed gateway with a
registry allowlist and Model Armor in blocking mode" are different claims. Only the second
one is auditable.

## How the threats map to Google's controls

This is the table I would put in front of an architecture review. It maps each threat to the
OWASP agentic category, the Google control that helps, and the residual gap that remains
after the control is configured.

| Threat | OWASP | Google control that helps | Residual gap to design around |
|---|---|---|---|
| Content-plane injection | ASI01 | Model Armor on prompts and tool responses; deterministic confirmation and URL rules | Content that arrives through unscreened surfaces, or above the gateway |
| Tool poisoning | ASI02, ASI04 | Agent Registry allowlist; per-tool gateway policy | Tool descriptions and schemas are not frozen at approval |
| Agent-to-agent exploitation | ASI07, ASI08 | Per-agent identity; scoped delegation roles | Handoffs authorize on format, not provenance, unless you add out-of-band checks |
| Identity and privilege abuse | ASI03 | SPIFFE identity, mTLS/DPoP, deny policies on agent management | Broad roles, token-creator grants, and identity churn in detection |
| Memory and context poisoning | ASI06 | Session and memory isolation; per-agent identity | Long-lived memory can carry injected state across sessions |
| Human-agent trust and rogue agents | ASI09, ASI10 | Confirmation design; per-agent identity; AI Protection findings | Users over-trust fluent output, and detection is tier- and preview-dependent |

The rows are not equally urgent in every deployment. In a Workspace-heavy environment,
content-plane injection and human-agent trust come first. In a multi-agent platform, the
handoff row comes first. The point of the table is that each row has a control, a residual
gap, and an owner. A row with no owner is the finding.

## A 90-minute audit you can run this week

You do not need a red team to get value from this threat model. You need a whiteboard, the
deployment's configuration, and the willingness to test the boundary instead of trusting the
product page.

1. **Draw the content paths into each agent.** Email, documents, calendar, tickets, CRM,
   web fetch, RAG retrievals, MCP resources, tool responses. Mark which ones pass through
   Model Armor and which do not. The unmarked paths are your injection surface.
2. **List every agent-to-agent trigger.** Comments, labels, slash commands, queue messages,
   task results, webhooks. For each one, ask what authorizes the action: the format of the
   message, the account that posted it, or a signed intent. Only the third answer survives
   an origin injection.
3. **Enumerate MCP methods and server versions.** For each server, record which of
   `tools/call`, `prompts/get`, `tools/list`, `resources/*`, and `notifications/*` are
   reachable. Pin the version. Diff the tool descriptions against the last review.
4. **Test the screening boundary.** Send known-malicious payloads through each reachable
   surface, not just through `tools/call`. Check Model Armor logs and the gateway audit
   entries. A payload that passes through `tools/list` or a resource read is a finding even
   if the model happens to ignore it.
5. **Confirm the runtime path.** For each agent, record whether it runs on Agent Runtime,
   Gemini Enterprise, GKE, Cloud Run, or another cluster; whether the gateway is managed or
   self-managed; and whether any preview model is in the path. This is the coverage map.
6. **Wire the detection signals.** Map principal to agent in the SIEM, alert on the agentic
   identity findings that matter (credential used outside Google Cloud, sensitive role
   granted by or to an agent, token creator grants), and keep the gateway's Layer 7 and
   Layer 8 telemetry long enough to reconstruct a chain.

If the audit produces one artifact, make it a table with four columns: threat, control,
coverage status, evidence. "Coverage status" is where the honesty lives — enforced,
partially enforced, or assumed. That artifact is also the scope of a two-week
[AI Proof Audit](/services/ai-proof-audit), if you want the ranked gap list before the build.

## What to watch through 2027

Three things will change this map. The self-managed gateway models on GKE, Cloud Run, and
cross-cloud environments will move from coming soon to generally available, which shifts
the argument from "you do not have the control" to "you have not configured it." MCP and A2A
will keep standardizing authorization, slowly, because interoperability constrains every
fix; treat current token behavior as a design constraint. And model hardening will keep
improving. Separate it from the controls you can test: a gateway that blocks an unregistered
destination, a registry that pins a tool description, and a handoff that requires a signed
intent are the ones that belong in an audit file.

## Frequently Asked Questions

### Does Google's Agent Gateway stop prompt injection?

No. It enforces identity, destination, and policy decisions at the ingress and egress
points, and it can invoke Model Armor for content screening. That is a meaningful reduction
in blast radius, but content screening has documented coverage limits, and a gateway cannot
stop an injection that arrives through a surface it does not inspect. Treat the gateway as
the enforcement point and the coverage map as the control.

### Is Gemini Enterprise Agent Platform secure by default?

The gateway's default is deny, and agent identities are stronger than shared service
accounts. But "secure by default" is not uniform across runtimes, models, and service tiers.
Self-managed gateway support is still rolling out, preview models are excluded from the
security controls, and some AI Protection detection depends on the Security Command Center
tier. Verify each control in your actual request path.

### What was the Google ADK agent-to-agent incident?

In August 2026, Pillar Security showed that a public issue-triage agent in Google's ADK
repository could be prompt-injected into posting a command-shaped comment that a
maintainer-only workflow treated as an authenticated trigger. The privileged workflow held a
personal access token and a Google Cloud service account key, and a `git`/`gh` allowlist was
bypassed with `git` configuration mechanisms. Google deleted the affected workflows. The
structural lesson is that agent-to-agent handoffs need provenance checks, not just
format checks.

### Do I need Model Armor if I already have an Agent Gateway?

They solve different problems. The gateway decides whether a call is allowed and to where;
Model Armor decides whether the content inside the call looks malicious. You want both, and
you want to test both separately. A gateway policy that allows a tool and a Model Armor
filter that misses a tool description are independent failures.

### Is indirect prompt injection actually being exploited, or is this theoretical?

Google's April 2026 measurement found real injection content on the public web, mostly at
low sophistication, with a 32% relative increase in the malicious category over a
three-month window. That is not the same as a mature criminal market. It is enough to
justify treating untrusted content as an instruction channel, especially because targeted
attacks against a specific organization would not show up in a Common Crawl sample.

## Further reading

- [AI threats in the wild: The current state of prompt injections on the web](https://blog.google/security/prompt-injections-web/) — Google Security Blog, April 2026
- [Google Workspace's continuous approach to mitigating indirect prompt injections](https://blog.google/security/google-workspaces-continuous-approach-to-mitigating-indirect-prompt-injections/) — Google, April 2026
- [Integrate Model Armor with Google and Google Cloud MCP servers](https://docs.cloud.google.com/model-armor/model-armor-mcp-google-cloud-integration) — Google Cloud documentation, October 2026
- [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview) — Google Cloud documentation, October 2026
- [AI Protection overview](https://docs.cloud.google.com/security-command-center/docs/ai-protection-overview) — Google Cloud documentation, October 2026
- [Google Deletes ADK Workflows After Agent-to-Agent Injection](https://labs.cloudsecurityalliance.org/research/csa-research-note-google-adk-trustissues-agent-injection-202/) — Cloud Security Alliance, August 2026
- [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) — OWASP, December 2025
- [Defeating Prompt Injections by Design (CaMeL)](https://arxiv.org/abs/2503.18813) — Google DeepMind, 2025; IEEE SaTML 2026

More field notes on agent authority, identity, and retrieval are in the
[insights archive](/insights).

## The short version

Google's 2026 agent security model moved the hard part from authentication to coverage. The
identity layer is better than most enterprises' own applications: SPIFFE principals, runtime-bound
credentials, default-deny gateways, per-tool policy. The threats that remain are
structural. Untrusted content enters above the screening layer. Tool descriptions carry
instructions the scanner does not read. Agent-to-agent triggers authorize on format instead
of provenance. And the controls you read about may not be in your runtime's path yet.

The audit that follows from this is not a product checklist. It is a boundary map: every
content path, every handoff, every MCP surface, every runtime. Then test the boundary rather
than trusting the label.

If you are working through that for a regulated deployment, [Agent Authority & Integration](/services/agent-authority)
is where we usually start: an authority model per agent, a scoped identity, and action logging
that reaches your SIEM. The same authority-boundary thinking applies to a SOC agent
[inserted into an existing security stack](/insights/ai-powered-security-agents), and to the
retrieval layer underneath, where [permission and freshness tests](/insights/enterprise-rag-solutions)
decide whether the agent is reading what it is allowed to read.

