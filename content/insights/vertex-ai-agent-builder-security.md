---
title: "Vertex AI Agent Builder Security Posture: What Changed, and What to Lock Down"
summary: "Vertex AI Agent Builder is now Gemini Enterprise Agent Platform, and the security model moved with it. Default-deny gateways, per-agent SPIFFE identity, and the three gaps the docs keep in separate pages."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-10-30"
category: "Architecture"
coverImage: "/insights/vertex-ai-agent-builder-security.png"
tags: ["google-cloud", "vertex-ai", "agents", "security"]
---

If your architecture document still says "Vertex AI Agent Builder", the page you land
on today is **Gemini Enterprise Agent Platform**. That is not a re-skin. The security
model moved with the name, and the controls you would have written into an assessment
two years ago no longer describe how an agent is actually constrained.

The old mental model was a project, a service account, and a set of IAM roles. The new
one is a per-agent cryptographic identity, a default-deny gateway that sits in front of
every tool call, and a registry that decides which destinations exist at all. Those are
different primitives, and they fail in different ways.

This is a posture review of that stack: what is enforced, what is not, and where I would
push back on a vendor claim before signing an architecture.

## Key Takeaways

- The control plane is **four components** — Agent Identity, Agent Registry, Policies,
  and Agent Gateway — and **the default is deny**, not allow.
- Each agent gets a **SPIFFE principal** rather than a shared service account, bound to
  mTLS and DPoP through a default Context-Aware Access policy. This is the load-bearing
  control; everything else keys off it.
- **Redeploying creates a new principal.** IAM bindings are not inherited. Blue-green
  and Terraform rollouts lose access silently unless you re-bind after deploy.
- Security controls are **not uniform**: RAG Engine supports VPC-SC but not CMEK or data
  residency, and Vector Search supports residency but not CMEK.
- **Preview models are excluded from the security controls entirely.** That single line
  can invalidate an otherwise compliant architecture.

## The name changed, and so did the control plane

The docs describe Gemini Enterprise Agent Platform as an evolution of Vertex AI,
covering four pillars: build, scale, govern, and optimize. The parts that matter for
security are all in the "govern" pillar, and most of them did not exist as first-class
concepts under the old Agent Builder framing:

| Capability | What it gives you | Why it matters for posture |
|---|---|---|
| Agent Identity | Per-agent SPIFFE principal, tied to the agent lifecycle | Replaces shared service accounts as the unit of permission |
| Agent Registry | Central directory of approved agents, tools, MCP servers | Defines what a destination even is |
| Agent Gateway | Ingress and egress policy enforcement point | Where allow/deny is actually applied |
| Policies | IAM unified access, Model Armor, semantic governance | What "allowed" means per call |
| Agent anomalies | Behavioral detection on agent activity | Detection, not prevention |

The important consequence: **you cannot assess this product by reading IAM alone.** A
project can have perfectly scoped roles and still let an agent call an unregistered MCP
server if the gateway is not in the path. The posture is the composition, not any single
control.

![Four components decide whether a call is allowed: Agent Identity, Agent Registry, and Policies feed the Agent Gateway, which sits between the caller and the runtime](/diagrams/vertex-agent-control-plane.svg "Figure 1 — The gateway is the enforcement point, but it is only as good as the three inputs it checks.")

## Default deny is the architecture

The single most useful sentence in the documentation is this: by default, all
connections are blocked unless an explicit IAM policy grants access.

That is a materially different starting position from most cloud services, where the
hard part is remembering to deny. Here the hard part is remembering to allow, and an
agent that appears broken in production is more often missing a binding than
misconfigured.

![Four sequential gates: identity, registry, policy, and content. Any failure short-circuits to deny and is written to audit logs](/diagrams/vertex-agent-default-deny.svg "Figure 2 — Every call is evaluated in order. A failure at any gate stops execution before the tool runs.")

The order matters for incident response. Identity failures and policy failures look
identical to the user ("the agent stopped working") but produce different audit entries.
If you are on call for an agent, the first question is which gate closed.

Two practical notes:

- **Ingress and egress are both governed.** Client-to-agent traffic is authenticated and
  screened; agent-to-anywhere traffic is checked against the registry and IAM before it
  leaves. A compromised agent cannot simply call out to an unregistered endpoint.
- **MCP traffic is inspected at the JSON-RPC layer.** The gateway extracts tool names and
  method attributes, which is what makes per-tool policy possible rather than per-server.

## Agent Identity is the load-bearing control

An agent identity is a principal with a very specific shape:

```text
principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID
```

It is SPIFFE-based, tied to the agent's resource ID, and independent of the framework you
used to build the agent. Google auto-provisions an x509 certificate with the same
identity.

Three properties are worth writing into a design review:

**1. Credentials are bound to the runtime.** The default Context-Aware Access policy
enforces mTLS binding, so certificate-bound tokens can only be used from the intended
runtime environment. The docs describe stolen credentials as un-replayable. That is a
real improvement over a bearer token in an environment variable, and it is the argument
for agent identity over service accounts, not developer convenience.

**2. Default roles are deliberately small.** Agents get
`roles/aiplatform.agentContextEditor` and `roles/aiplatform.agentDefaultAccess`, which
cover inference, sessions, and memory. The documentation explicitly warns against granting
project-level roles such as `roles/aiplatform.user` or `roles/aiplatform.expressUser` to
an agent identity, because that would let the agent modify or delete other agents. If you
see a broad role on an agent principal, that is the finding.

**3. Agent-to-agent calls need a narrower role than the default advice.** For A2A
delegation, the docs recommend a custom role containing only
`aiplatform.reasoningEngines.query` and `aiplatform.reasoningEngines.get`, bound to the
target agent's resource — not a project-wide grant. They also recommend an IAM deny
policy for `reasoningEngines.create`, `.delete`, and `.update` across all agent
principals, so a compromised agent cannot manage its peers.

That deny policy is the control most teams skip. It costs one policy and closes the
lateral-movement path that matters most in a multi-agent system.

## The CI/CD trap nobody mentions in the overview

Here is the failure mode that will bite a mature team, not a prototype.

Every deployment creates a new `reasoningEngines` resource with a new ID, which means a
**new principal**. IAM bindings attached to the previous principal are not inherited.
The docs say this directly, and then describe the consequence: automated pipelines that
delete and recreate agents — blue-green deploys, ephemeral test environments, Terraform
workflows — can experience silent runtime access loss.

Silent is the operative word. The deploy succeeds. The agent starts. The first tool call
returns a permission error, or worse, the agent reports success while quietly failing to
retrieve anything.

![Before a redeploy, agent v1 has principal A with IAM bindings. After, agent v2 has principal B with no inherited bindings](/diagrams/vertex-agent-identity-churn.svg "Figure 3 — Bindings follow the principal, not the agent. A redeploy is a new principal with an empty permission set.")

The fix is to treat identity binding as a post-deploy step:

1. Deploy the agent.
2. Read `spec.effectiveIdentity` from the deployment response.
3. Apply the IAM bindings to **that** principal.
4. Fail the pipeline if the identity is missing or unexpected.

If your Terraform module hard-codes the principal string, it is wrong after the first
redeploy. The docs show the pattern: derive the principal from the deployed resource ID
rather than constructing it from assumptions.

## Data-plane controls are not uniform

This is the part I would put in front of a security reviewer before any architecture
diagram. The controls differ by component, and the differences are not cosmetic.

![Coverage matrix: Agent Platform supports all four controls; RAG Engine supports only VPC-SC; Vector Search supports residency and VPC-SC](/diagrams/vertex-agent-controls-matrix.svg "Figure 4 — Security control coverage by component. A blank cell is a gap you have to design around, not a documentation omission.")

| Component | Data residency (at rest) | CMEK | VPC-SC | Access Transparency |
|---|---|---|---|---|
| Agent Platform | Yes | Yes | Yes | Yes |
| RAG Engine | No | No | Yes | No |
| Vector Search | Yes | No | Yes | No |

Read that carefully:

- **If you need CMEK, RAG Engine is not the answer.** Its corpus and retrieval path do
  not support customer-managed keys in that table. You either accept Google-managed keys
  for that component or move retrieval to a store that does support them.
- **If you need data residency, RAG Engine and Vector Search diverge.** Vector Search
  meets the at-rest commitment; RAG Engine does not, per the same table.
- **VPC-SC is the one control that holds across all three.** That makes it the floor of
  the posture, not the ceiling.

And the caveat that overrides everything: **security controls are not supported for
preview models.** A preview model in the path moves that workload out of the guarantees
above. For a regulated deployment, pin to generally available models and treat a preview
dependency as an architectural exception that needs sign-off.

## What the gateway actually covers today

The Agent Gateway documentation is unusually honest about maturity, which makes it easy
to plan around:

| Environment | Status | Proxy infrastructure |
|---|---|---|
| Agent Runtime, Gemini Enterprise | Available, Google-managed | None to run |
| GKE | Early preview | You run it (GKE Gateway, Secure Web Proxy) |
| Cloud Run | Early preview | You run it (ALB, Secure Web Proxy) |
| Cross-cloud (EKS, AKS, on-prem) | Early preview | Envoy in your cluster |

Two operational limits worth knowing: a gateway instance governs up to **5,000 resources**
in the registry, and token management policies plus extension bindings are listed as
coming soon. If your design depends on per-team token budgets at the gateway, that is a
roadmap item, not a current control.

The deployment surface is also declarative, which surprised me:

```bash
gcloud network-services agent-gateways import my-agent-gateway \
  --location=us-central1 \
  --source=my-agentgateway.yaml
```

The command group exposes `list`, `describe`, `export`, `import`, and `delete` — there is
no `create`. Gateway configuration is imported from YAML, which is the right shape for
version control and the wrong shape if you expected a one-liner.

## The three gaps I would write into an assessment

**1. Preview models silently opt you out.** This is the biggest one. A team can configure
CMEK, put the agent behind the gateway, scope IAM perfectly, and then route one call to a
preview model that does not carry those controls. Controls attach to models, not just to
projects, and the table is per-model.

**2. RAG Engine is the weak link in a CMEK story.** Most agent architectures have a
retrieval component. If yours is RAG Engine and your compliance requirement is CMEK, the
architecture has a hole that no amount of gateway policy fixes. Decide early whether to
accept it or route retrieval elsewhere.

**3. Identity churn breaks the audit trail assumptions.** If your detection rules key on
a stable principal per agent, redeploys will produce a stream of new principals that look
like new actors. Bind identity to the resource ID in your SIEM mapping, and expect the
principal string to change on every deploy.

## A minimum viable posture, in order

If I were standing this up from scratch, the sequence would be:

1. **Turn on Agent Identity for every deployed agent.** Do not start with service
   accounts and migrate later. The identity is the anchor for everything else.
2. **Put the gateway in the path before the first tool call.** A gateway added after
   launch is a retrofit, and retrofits miss egress paths.
3. **Register destinations, then grant per-destination access.** Default deny means the
   registry is the allowlist; do not grant project-wide `aiplatform.user` to make errors
   go away.
4. **Add the deny policy for agent management operations.** `reasoningEngines.create`,
   `.delete`, and `.update` denied for all agent principals.
5. **Enable Model Armor on the gateway.** Prompt injection and sensitive-data screening
   belong at the enforcement point, not in a system prompt.
6. **Decide the CMEK story per component, not per project.** Agent Platform yes; check
   RAG Engine and Vector Search explicitly.
7. **Automate post-deploy identity binding.** Read `effectiveIdentity`, bind, verify.
8. **Map principal → agent in your SIEM.** Treat a new principal as a deploy event, not
   a new threat actor.

That ordering is deliberate: each step depends on the previous one, and skipping to
policy before identity gives you a gateway that cannot attribute what it is allowing.

## Frequently Asked Questions

### Is Vertex AI Agent Builder still a product?

The documentation now presents the capability as **Gemini Enterprise Agent Platform**, an
evolution of Vertex AI, with an official page describing name changes from Vertex AI. If
you are scoping an assessment, scope the platform components — Agent Identity, Registry,
Gateway, Runtime, Sessions, Memory Bank — rather than the old product name.

### Does Agent Gateway replace VPC Service Controls?

No. They operate at different layers. VPC-SC defines a perimeter around Google Cloud
resources and is the control that holds across Agent Platform, RAG Engine, and Vector
Search. Agent Gateway enforces per-call authorization, content screening, and destination
registry checks. You want both; the docs describe routing gateway traffic through private
VPC attachments so perimeter rules apply.

### What is the biggest risk in a Vertex agent deployment?

Excessive agency through a shared identity. An agent running as a service account with
project-level roles, calling tools that are not in a registry, with no gateway in the
path, is the compound failure. Agent Identity plus default-deny plus a registry removes
each leg of that.

### Do I need CMEK for an agent platform?

Only if your compliance regime requires customer-managed keys. If it does, check each
component separately: the platform supports it, RAG Engine and Vector Search do not, per
the current security controls table.

## The short version

The rename is a signal, not a distraction. Gemini Enterprise Agent Platform moves the
unit of security from the project to the agent, and from allow-by-default to deny-by-
default. That is the right direction, and it changes what an assessment should look for:
principals instead of service accounts, registry entries instead of network rules, and
per-model control coverage instead of per-project assumptions.

The three things I would verify before signing anything: no preview models in the
production path, no CMEK requirement routed through RAG Engine, and a pipeline that
re-binds IAM after every deploy. Those are the places where a correct diagram and a
working system diverge.

If you are working through that for a regulated deployment, [the engagement
model](/services) is where we usually start — and the same authority-boundary thinking
applies whether the agent runs on Google Cloud or anywhere else, as I wrote about in
[bounding an agent's authority](/insights/ai-powered-security-agents).
