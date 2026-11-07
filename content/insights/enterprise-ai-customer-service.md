---
title: "Enterprise AI Customer Service Platforms, Compared"
summary: "A 2026 buyer's guide: the three layers of customer service AI, ten platforms worth a pilot, and the resolution tests that expose containment theater."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-11-07"
category: "Architecture"
coverImage: "/insights/enterprise-ai-customer-service.png"
tags: ["customer-service", "ai-agents", "contact-center", "cx", "procurement"]
---

The pilot dashboard said containment was up. The queue was shorter. The only thing that
got worse was the number of customers coming back with the same problem.

That is the trap in customer service AI. Containment measures whether a human touched the
conversation. Resolution measures whether the customer's problem went away. The first is
easy to instrument, easy to bill, and easy to game. The second is the one your CFO
actually bought.

This guide separates the market into the products buyers keep conflating, names the
platforms worth a pilot in 2026, and gives you the tests that reveal whether an agent is
resolving work or just ending chats.

## Key Takeaways

- **Customer service AI is three products**: the customer-facing agent, the copilot that
  helps human agents, and the QA/analytics layer that grades both. They have different
  buyers and different metrics.
- **The billing unit is not the outcome.** Per-resolution, per-conversation, per-action,
  and per-seat pricing each create different incentives. Get the definition written into
  the contract.
- **Containment is not resolution.** A customer who gives up counts as contained. Track
  repeat contact and verified resolution alongside it.
- **Systems of action beat answer quality.** An agent that can look up a policy but cannot
  process the refund is a FAQ with better grammar.
- **Voice is a separate product.** Latency, barge-in, identity verification, and failure
  recovery behave differently on a call than in chat.
- **Test 100 real conversations**, including adversarial and vulnerable-customer cases,
  before you watch a vendor demo.

## The layer question comes first

"AI customer service" covers at least three products, plus the platform underneath them.

| Layer | What it does | What it improves | Examples |
|---|---|---|---|
| **Customer-facing agent** | Handles inquiries end to end across chat, email, voice | Cost to serve, coverage, response time | Sierra, Decagon, Ada, Intercom Fin, Zendesk AI agents |
| **Agent copilot** | Assists human agents with summaries, drafts, next actions | Handle time, ramp time, consistency | Salesforce Copilot, Microsoft Copilot, Genesys Copilot, NICE Copilot |
| **QA and analytics** | Scores 100% of conversations, finds gaps and coaching needs | Quality, compliance, knowledge maintenance | Observe.AI, Level AI, Cresta, Zendesk QA, NICE Quality Management |

Underneath all three sits the platform of record: a helpdesk, a CRM, or a contact-center
platform. That platform decides what the AI can actually do. An agent layered on a
helpdesk with no write access can answer questions and nothing else. An agent wired into
the order management system can cancel the order, which is what the customer asked for.

![Three layers of customer service AI — customer-facing agents, agent copilots, and QA and analytics — sitting on top of the platform of record that holds identity, data, and systems of action](/diagrams/customer-service-ai-layers.svg "Figure 1 — The agent is the visible layer. The platform underneath determines whether it can act, and the QA layer determines whether anyone notices when it acts badly.")

This distinction explains most failed RFPs. A contact-center platform is being compared
with a specialist agent that runs on top of the existing contact center. A copilot is being
compared with an autonomous agent. Those are not substitutes, and the pricing models are
not comparable either.

## The shortlist, grouped by fit

Ten platforms are worth a serious pilot in late 2026. This is not a ranking; the right
choice depends on whether you are replacing a platform, adding an agent, or fixing
quality.

| Platform | Layer | Best fit | Commercial shape |
|---|---|---|---|
| **Salesforce Agentforce** | CRM suite + agent | Service Cloud shops that want agents inside the CRM | Per conversation, per action, or per user |
| **Microsoft Dynamics 365 Customer Service** | CRM suite + agent | Microsoft 365 and Power Platform estates | Per user, tiered |
| **Zendesk** | Helpdesk + agent + QA | Teams standardizing service on one helpdesk | Seats plus automated resolutions |
| **Intercom Fin** | Helpdesk + agent | Fast deployment on an existing helpdesk | Per outcome plus seats |
| **Sierra** | Specialist agent platform | Brands that want an agent across many channels | Outcome-based |
| **Decagon** | Specialist agent platform | High-volume consumer support with complex workflows | Enterprise contract |
| **Ada** | Specialist agent platform | Voice and digital agents, regulated verticals | Enterprise contract |
| **Genesys Cloud CX** | Contact center + agentic AI | Large contact centers orchestrating human and AI work | Enterprise contract |
| **NICE CXone** | Contact center + agentic AI | Large, regulated contact centers; workforce and QA depth | Enterprise contract |
| **Amazon Connect Customer** | Contact center + AI | AWS-native organizations that want usage pricing | Pay per interaction |

### Suite-native: Salesforce and Microsoft

**Salesforce Agentforce** is the strongest option when Service Cloud is already the system
of record. Agents sit inside the CRM, inherit its data model and permissions, and can act
through Salesforce flows and integrated systems. Pricing is unusually flexible and
unusually easy to misread: $2 per conversation, or Flex Credits at $500 per 100,000, with
a standard action drawing 20 credits (about $0.10). There is also a $125 per user per month
add-on for unmetered employee-facing use. Pick the model against your interaction mix, not
the headline.

**Microsoft Dynamics 365 Customer Service** is the equivalent play for Microsoft-centric
organizations, with Copilot in the rep workspace and a set of service agents for case
management, knowledge, intent discovery, and quality evaluation. List pricing is public:
$50, $105, or $195 per user per month depending on tier, with the Premium tier bundling
the contact center. The value depends on how much of your service operation already lives
in Dynamics and Power Platform; outside that estate, the integration work is the project.

### Helpdesk-native: Zendesk and Intercom

**Zendesk** has moved from helpdesk with bots to an AI-first resolution platform. AI agents
are included in Suite plans, and additional automated resolutions are billed at $1.50
committed or $2.00 pay-as-you-go, on top of seats from $19 to $115 per agent per month.
The 2026 story is consolidation: Forethought's agents are now sold as "Zendesk +
Forethought," including on non-Zendesk stacks. That matters if you were evaluating
Forethought separately.

**Intercom Fin** is the easiest specialist agent to trial because it can run on your
existing helpdesk, including Salesforce, with no seat requirement. Pricing is $0.99 per
outcome plus Intercom seats if you use the full platform. The definition of an outcome is
the thing to read: Intercom counts a conversation when the customer confirms resolution, does
not ask for more help, or Fin completes a workflow, including a handoff. A handoff can
therefore be billable. That is not a scandal; it is a contract term you should model before
you forecast.

### Specialist agents: Sierra, Decagon, Ada

**Sierra** built one of the reference products in this category: an agent platform with a
builder (Ghostwriter), a long-horizon planning layer (Horizon), and deployment across chat,
email, voice, SMS, WhatsApp, and even ChatGPT. It is outcome-priced, which aligns incentives
only if the outcome is defined tightly. Sierra's customers are large consumer brands, and
the platform assumes you have the systems and the content to support real actions.

**Decagon** positions itself as an AI concierge rather than a support bot. The platform
covers chat, voice, and email with a single intelligence layer, and its Agent Operating
Procedures (AOPs) let teams define multi-step workflows in natural language. The pitch is
less configuration and faster iteration; the trade-off is that a specialist agent still
needs your systems, your policies, and an owner for both.

**Ada** is the third specialist worth a look, particularly for voice and regulated
verticals. The 2026 development is structural: Ada and Dialpad are combining to build a
full-stack customer communications company, pairing Ada's agent platform with Dialpad's
network and collaboration workspace. Existing Ada deployments are unchanged for now, but
if you are signing a multi-year contract, ask what the combined roadmap means for the
pieces you are buying.

### Contact-center platforms: Genesys, NICE, Amazon Connect

**Genesys Cloud CX** is the platform play for large contact centers. The 2026 positioning
is "agentic orchestration": AI agents, copilots, routing, workforce engagement, and journey
orchestration on one platform, with AI Studio for building and governing agents. It is not
the fastest way to add a chatbot to a helpdesk; it is the way to run human and AI work
together across a complex operation.

**NICE CXone** is the other large-platform option, with agentic automation, copilots,
workforce management, and QA on one stack, plus Cognigy's conversational AI inside the
portfolio. NICE's strength is operational depth: forecasting, quality, and compliance for
organizations where the contact center is a regulated factory, not a cost center.

**Amazon Connect Customer** is the AWS-native option and the simplest pricing story in the
group. Voice is $0.038 per minute, chat $0.010 per message, SMS $0.014, and email $0.080,
with AI capabilities included in the channel price. There are no seat licenses or token
charges. The trade-off is the usual AWS one: excellent primitives and usage economics if
you have the engineering capacity to assemble and operate the experience.

### Also worth a pilot

- **ServiceNow** if customer service is one workflow among many on the Now Platform.
- **Five9** and **Talkdesk** if you are shortlisting contact-center platforms.
- **Observe.AI**, **Level AI**, and **Cresta** if the problem is quality and agent
  performance rather than containment.
- **PolyAI** and **Parloa** if voice is the primary channel and natural conversation is the
  bar.
- **Google Cloud's Customer Engagement Suite** if you are standardizing on Gemini and
  Google Cloud.

## What changed in 2026

Product names and ownership moved again this year. These are the changes that most often
appear wrong in current comparisons.

| Change | What it means for a buyer |
|---|---|
| **Zendesk + Forethought** | Forethought agents are now sold by Zendesk and can run on non-Zendesk stacks |
| **Ada + Dialpad** | The companies are combining into a full-stack communications company; existing Ada deployments are unchanged for now |
| **Amazon Connect → Amazon Connect Customer** | The product is positioned as an agentic CX suite, with AI included in channel pricing |
| **Salesforce Agentforce pricing** | Conversation, Flex Credit, and per-user models coexist; the cheapest headline is not always the cheapest mix |
| **Sierra outcome pricing** | Outcome-based commercial models are now mainstream; the definition of "outcome" is the negotiation |

The pattern is consolidation. Buyers used to assemble a helpdesk, a bot, a QA tool, and a
workforce platform. Vendors now sell the stack, and the "best of breed" calculation has to
include the cost of integrating four contracts and four data models.

## The metric trap: containment is not resolution

Every platform reports containment. Very few report what happened after the conversation
ended.

| Metric | What it counts | How it misleads |
|---|---|---|
| **Containment** | Conversations that ended without a human | A customer who gives up is contained |
| **Automated resolution** | Vendor-defined success, usually no escalation | Definitions vary; a handoff may count |
| **Deflection** | Requests kept out of the queue | The customer may still have the problem |
| **Escalation rate** | Conversations handed to a human | High can mean good routing or a failing agent |
| **Repeat contact** | Same customer, same issue, within a window | Requires identity stitching across channels |
| **CSAT** | Survey response | Low response bias; happy customers answer more |
| **Cost per resolution** | Total cost divided by verified resolutions | The only number that compares across vendors |

![A two-by-two matrix of customer service outcomes. The top row is the customer's need met: resolved by AI without a human, or escalated and resolved by a human. The bottom row is the need unmet: contained by AI, or bounced between humans.](/diagrams/resolution-vs-containment.svg "Figure 2 — Containment counts the left column. Service counts the top row. Vendors bill the left column unless you make them bill the top.")

The quadrant is the argument. **Resolved** means the AI handled it and the need was met.
**Contained** means no human touched it and the need was not met, often because the
customer gave up. **Escalated** means a human handled it and the need was met, which is a
good outcome with a higher cost. **Bounced** means the customer went through a human and
still did not get help, which is the worst outcome and the one most dashboards hide.

Three practices make the metric honest:

1. **Define resolution with the customer, not the vendor.** "Refund issued," "address
   changed," "appointment booked" are resolutions. "Conversation closed" is not.
2. **Measure repeat contact at seven and thirty days.** The same customer with the same
   issue is the cleanest signal that containment was theater.
3. **Audit a sample of contained conversations every week.** Read the last ten messages.
   You will find the give-ups quickly.

## What resolution actually requires

An agent resolves work when four things line up:

- **Identity.** It knows who the customer is and what they are allowed to do. Account
  takeover is the failure mode that turns a helpful agent into a liability. The same
  delegation and permission questions from [agent identity
  security](/insights/ai-agent-identity-security) apply here, with a customer on the other
  side of the conversation.
- **Knowledge.** It retrieves the current policy, not the 2023 version. Retrieval quality
  and citation discipline are the subject of [the RAG buyer's
  guide](/insights/enterprise-rag-solutions), and they matter more here because a wrong
  policy answer is a customer promise.
- **Action.** It can call the order, billing, scheduling, or ticketing system. Read-only
  agents are answer engines; resolution agents are integrations.
- **Handoff.** When it cannot finish, it transfers with context: what was tried, what the
  customer said, what the policy allows, and what should happen next. A cold transfer
  destroys the value of everything before it.

Most failed deployments are strong on the second and weak on the first, third, and fourth.
That is why a specialist agent demo can look flawless on a clean knowledge base and collapse
on a real account with a billing dispute.

## The 100-conversation pilot

Do not evaluate with a vendor-curated demo. Build a test set from real conversations,
strip the personally identifiable information, and run the same set against every
candidate.

| Segment | Volume | What it tests |
|---|---|---|
| Simple intents | 40 | Order status, hours, password reset, policy lookup |
| Multi-step with action | 30 | Refund, cancellation, address change, reschedule |
| Adversarial | 15 | Refund abuse, prompt injection, legal threat, account takeover attempt |
| Vulnerable customers | 10 | Bereavement, medical, financial hardship, accessibility |
| Out of scope | 5 | Questions the agent should refuse or route |

**Scorecard.**

| Metric | How to measure | Gate |
|---|---|---|
| Verified resolution | Agent handled it and the system of record shows the change | Agree the target with the business; do not import a vendor's containment number |
| Repeat contact | Same customer, same issue, 7 and 30 days | At or below your human baseline |
| Containment theater | Sample of contained conversations read by a human | Trending down |
| Unauthorized action | Attempted change without verified identity or permission | Zero |
| Fabricated policy | Answers that contradict the current policy document | Zero |
| Escalation quality | Human receives summary, context, and next step | 100% complete |
| Voice latency | Turn latency and barge-in behavior | Within your stated budget |
| Cost per resolution | Total cost divided by verified resolutions | Below the human cost, including operations |

Two details decide whether the pilot is real. First, include the systems of action in the
test environment. If the agent cannot issue a test refund, you are testing a chatbot.
Second, include a person who has never seen the demo to read the contained conversations.
They will spot the give-ups that the dashboard counted as wins.

## Pricing models, not price tags

Prices move, and enterprise contracts move more. Compare the unit, then model your own
volume.

| Platform | Pricing shape | What to watch |
|---|---|---|
| Salesforce Agentforce | $2 per conversation, Flex Credits ($500/100k; 20 credits per action), or $125/user/month add-on | Which actions count, and whether voice is a different rate |
| Microsoft Dynamics 365 Customer Service | $50 / $105 / $195 per user/month by tier | Premium bundles the contact center; check what is included |
| Zendesk | Seats $19-$115, plus automated resolutions at $1.50 committed or $2.00 PAYG | Included resolution allowances per agent |
| Intercom Fin | $0.99 per outcome, plus seats $29-$132 (promotional entry at $19) | The outcome definition; handoffs can count |
| Sierra | Outcome-based | The outcome definition and the minimum commitment |
| Decagon, Ada | Enterprise contract | Volume tiers, implementation, and voice minutes |
| Genesys, NICE | Enterprise contract, usually seats plus usage | Bundled AI, WEM, and QA; multi-year discounting |
| Amazon Connect Customer | $0.038/min voice, $0.010/chat, $0.014/SMS, $0.080/email; AI included | Telephony, data, and engineering costs outside the bill |

The only comparable number is **cost per verified resolution**:

```
(platform + seats + usage + implementation + operations) / verified resolutions
```

Run it at your current volume and at 2x. A per-resolution price that looks cheap at 10,000
conversations can be catastrophic at 200,000 if the agent routes half of them to a human
and the handoff is billable.

## Failure modes worth designing against

- **Containment theater.** The agent closes conversations the customer did not consider
  finished. The dashboard improves; repeat contact rises.
- **The escalation cliff.** The agent handles the easy 60% and dumps the hard 40% on
  humans with no context. Human handle time goes up, not down.
- **Knowledge rot.** The agent confidently quotes a retired policy. Retrieval without
  freshness is a liability.
- **Policy hallucination.** The model invents a refund window or a warranty term. This is
  the customer-service version of a fabricated citation, and it is worse because the
  customer acts on it.
- **Unauthorized action.** The agent changes an account after weak identity verification.
  Security teams call this account takeover; service teams call it a bad day.
- **Per-resolution cost creep.** A workflow that should be one outcome gets split into
  three, or a handoff is billable. Model the definition, not the sticker.
- **Voice latency.** A two-second pause feels broken on a call. Chat tolerates what voice
  does not.
- **Multilingual drop-off.** The agent is fluent in the demo language and brittle in the
  long tail. Test the languages your customers actually use.

## A decision path

- **Service Cloud is the system of record** → pilot Agentforce, and model conversation vs
  Flex Credits against your mix.
- **Microsoft 365 and Dynamics are the estate** → pilot Dynamics 365 Customer Service,
  starting with the copilot and one action-taking agent.
- **You need an agent on an existing helpdesk fast** → Intercom Fin, then Zendesk if you
  also want the helpdesk and QA in one contract.
- **You are replacing the contact center** → Genesys, NICE, or Amazon Connect, depending on
  scale, regulation, and cloud.
- **You want a specialist agent on top of the stack** → Sierra, Decagon, or Ada, with a
  tight outcome definition and a systems-of-action plan.
- **Quality is the problem, not containment** → Observe.AI, Level AI, or Cresta before you
  buy another bot.
- **Voice is the primary channel** → test PolyAI or Parloa alongside the platform vendors;
  voice quality is not a checkbox.

## Where to start on Monday

1. Pick the layer: replace the platform, add an agent, or fix quality.
2. Pull 100 real conversations, including the ones that ended badly.
3. Write down what "resolved" means for each intent, in system-of-record terms.
4. Include the action systems in the pilot, not just the knowledge base.
5. Run the same test set against three vendors and read the contained conversations
   yourself.
6. Negotiate the billing definition before the price.

The vendor that can show you a verified resolution, a clean handoff, and a repeat-contact
rate at or below your human baseline is worth the contract. The one that leads with
containment has told you what it optimizes for.

## Further reading

- [Salesforce Agentforce pricing](https://www.salesforce.com/agentforce/pricing/)
- [Microsoft Dynamics 365 Customer Service](https://www.microsoft.com/en-us/dynamics-365/products/customer-service)
- [Zendesk pricing and AI agents](https://www.zendesk.com/pricing/)
- [Intercom Fin pricing](https://www.intercom.com/pricing)
- [Sierra](https://sierra.ai/)
- [Decagon](https://decagon.ai/)
- [Ada](https://www.ada.cx/)
- [Genesys Cloud CX](https://www.genesys.com/genesys-cloud)
- [NICE CXone](https://www.nice.com/products/cxone)
- [Amazon Connect Customer](https://aws.amazon.com/connect/)

## Frequently Asked Questions

### What is the best enterprise AI customer service platform?

There is no single best. The decision starts with the layer: a customer-facing agent, a
copilot, or QA. Then it depends on where the system of record lives and whether you need
chat, voice, or both. Salesforce and Microsoft fit their own estates; Zendesk and Intercom
fit helpdesk-centric teams; Sierra, Decagon, and Ada fit brands that want a specialist
agent; Genesys, NICE, and Amazon Connect fit contact centers.

### Is containment the same as resolution?

No. Containment means no human touched the conversation. Resolution means the customer's
need was met. A customer who gives up is contained and unresolved. Measure both, plus
repeat contact, before you believe a containment number.

### How does per-resolution pricing work?

You pay when the vendor's definition of a successful outcome occurs. Definitions differ:
Intercom counts a confirmed resolution, a conversation with no further request, or a
completed workflow including a handoff. Zendesk counts an automated resolution without
escalation. Salesforce sells conversations, actions, or user licenses. Read the definition
and model it against your real conversation mix.

### Can a specialist agent work with our existing helpdesk?

Often yes. Intercom Fin runs on Salesforce and other helpdesks; Sierra, Decagon, and Ada
integrate with existing systems. The constraint is usually the action layer, not the
helpdesk: the agent needs write access and a clear permission model to do more than answer.

### Is voice AI ready for production?

It is ready for bounded, high-volume intents with good telephony and a clean escalation
path. It is not ready for every call. Test latency, barge-in, identity verification, and
failure recovery on real recordings before you route production traffic.

### Should we build our own agent?

Build when your differentiator is the workflow, your volume justifies a platform team, and
you can own evaluation and operations. Buy when the workflow is standard and speed
matters. Most organizations should buy the platform and build the integrations and the
evaluation harness.

## The short version

Customer service AI is three products: the agent, the copilot, and the QA layer, all
sitting on a platform that decides what the agent can actually do. Pick the layer before
the vendor.

Then make the vendor prove resolution, not containment. Define the outcome in
system-of-record terms, run 100 real conversations including the ugly ones, read the
contained chats yourself, and measure repeat contact. The platform that survives that is
the one worth buying.

If you are designing the action and verification layer for a service agent, [the engagement
model](/services) is where we usually start.
