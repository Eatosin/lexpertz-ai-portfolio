---
title: "Enterprise RAG Pricing: What You Are Actually Buying"
summary: "RAG pricing is a stack of meters, not a licence. What 2026 quotes charge for, the hidden line items, and the unit economics to compare before you sign."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-11-25"
category: "Strategy"
coverImage: "/insights/enterprise-rag-pricing.png"
tags: ["rag", "pricing", "procurement", "enterprise-search", "ai-costs"]
---

Ask three vendors for an enterprise RAG quote and you will get three documents
that look nothing alike. One is a seat price. One is a consumption schedule. One
is a platform fee, a connector list, and a services estimate stapled together.

Comparing the top-line numbers is like comparing a train ticket to a fuel bill.
The units are different, the risk is different, and the cheapest-looking option
can be the most expensive system in production.

This is a guide to the five meters that make up the bill, the 2026 public price
anchors worth knowing, and the unit economics that let you compare a seat-priced
assistant with a consumption-priced retrieval platform without guessing.

## Key Takeaways

- **Enterprise RAG has five cost meters:** access, ingestion, retrieval,
  generation, and delivery. A quote that shows only one of them is incomplete.
- **Public list prices are anchors, not quotes.** Microsoft, Google, AWS, Glean,
  Vectara, and Onyx all price differently, and enterprise discounts change the
  shape as much as the total.
- **Cost per seat is the wrong denominator.** A $30 seat that answers 40 questions
  a month is expensive; a consumption bill that answers 400,000 is not. Compare
  cost per verified answer.
- **The biggest first-year line is often delivery,** not the platform: identity,
  connectors, permissions, evaluation, security review, and content cleanup.
- **Ask for three quotes at three volumes and two seat counts.** A pilot price is
  not a production price, and an overage example is worth more than a discount.
- **A permission failure is a cost event.** The cheapest system that leaks a
  document is not cheap. Run the [permission test](/resources/rag-permission-test-kit)
  before you negotiate.

## Why RAG pricing is hard to compare

The enterprise RAG market is really three markets: assistants, retrieval
platforms, and frameworks. Each one prices a different thing.

An assistant sells a seat. A retrieval platform sells queries, storage, and
compute. A framework sells nothing and costs you engineers. Add model tokens,
connectors, implementation, and support, and the invoice becomes a stack of
meters with different renewal dates.

The same word also means different things across vendors:

- A **query** can be a user message, a retrieval request, a model call, or an
  agent run.
- A **connector** can be a source system, a sync, a user, or a document feed.
- **Storage** can mean raw files, extracted text, vector indexes, or "context
  storage" that includes metadata and traces.
- **Unlimited** usually has a fair-use ceiling, a model tier, or a per-user weekly
  cap.

That ambiguity is not accidental. It makes the top-line quote hard to compare and
the overage easy to miss. The fix is to price the stack, not the logo.

McKinsey's [2026 State of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
found that about one in five organizations say AI operating costs, including
tokens, have constrained their use. The constraint is not only the model bill. It
is the cost of running the whole retrieval and delivery layer.

## The five meters

Every RAG quote is some combination of these five. Ask which ones are included,
which are metered, and which are somebody else's budget.

| Meter | Typical unit | Who usually charges | What to ask |
|---|---|---|---|
| **Access** | User, seat, or agent per month | Platform or assistant | Minimum seats, included usage, what an agent costs versus a user, what happens when a seat is idle |
| **Ingestion** | Document, page, GB, or connector | Platform or infrastructure | Reprocessing, OCR, storage, connector count, deletion, retention, and whether a re-index is billable |
| **Retrieval** | Query, request, compute-hour, or credit | Platform or cloud | What counts as a query, included volume, burst pricing, semantic reranking, agentic retrieval, filters |
| **Generation** | Input and output tokens, or model credits | Model provider, passed through | Rate card, model routing, premium models, caching, output limits, and who absorbs a price change |
| **Delivery** | Project, retainer, or support tier | Vendor, systems integrator, or your team | Implementation scope, identity and ACL work, evaluation, security review, observability, training, and exit |

There is a sixth, usually invisible meter: **change**. Connectors break, schemas
move, permissions drift, and content goes stale. That work lands on an owner, even
when it does not appear on an invoice.

## What the 2026 public prices actually look like

The table below uses published list prices and public pricing mechanics checked on
25 November 2026. It is not a quote, and it is not a ranking. It is a map of the
meters.

| Vendor | Public anchor | Pricing shape | What it tells you |
|---|---|---|---|
| [Microsoft 365 Copilot](https://www.microsoft.com/en-us/microsoft-365/copilot/enterprise) | $30/user/month, paid annually, on top of a qualifying Microsoft 365 plan | Seat | Broad deployment is a seat decision before it is a retrieval decision |
| [Microsoft Copilot Studio](https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio) | $200 per 25,000 Copilot Credits/month, or $0.01/credit pay-as-you-go | Consumption | Agent grounding burns credits: a tenant-graph-grounded generative answer can use 12 credits, about $0.12 at pay-as-you-go rates |
| [Gemini Enterprise](https://cloud.google.com/gemini-enterprise/business) | Business edition from $21/seat/month; Standard and Plus are custom | Seat plus consumption | The seat gets you in; agent runs and model usage are separate |
| [Gemini Agent Platform](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing) | $0.085/vCPU-hour, $0.009/GiB-hour, storage around $0.30/GiB-month | Compute, memory, storage | Agentic retrieval adds infrastructure meters that a seat quote will not show |
| [Amazon Quick](https://aws.amazon.com/quick/pricing/) | Plus $20/user/month annual ($25 monthly); Pro $20/user/month plus $250/account/month; Enterprise $40/user/month plus $250/account/month | Seat plus agent hours and storage | Agent hours over quota are $3/hour; index storage is $5/GB-month |
| [Azure AI Search](https://azure.microsoft.com/en-us/pricing/details/search/) | Serverless $0.2712/compute-unit-hour plus $0.246/GB-month; dedicated tiers are committed capacity | Consumption or committed capacity | Semantic ranking, agentic retrieval, and document cracking are separate add-ons |
| [Glean Enterprise Flex](https://docs.glean.com/glean-enterprise-flex-pricing) | Per-user seat plus pooled FlexCredits; 100 thinking-mode queries/user/week on standard models included | Seat plus credits | "Unlimited" fast mode and metered thinking mode are different products |
| [Vectara](https://vectara.com/pricing) | SaaS from $100K/year; VPC from $250K/year; on-prem from $500K/year | Annual licence plus context storage | The published floor is an enterprise deployment, not a mid-market starter plan |
| [Onyx](https://docs.onyx.app/admins/billing/overview) | Free open-source Community edition; paid Business and Enterprise | Subscription or self-hosted | The software can be free; the engineering, security, and operations are not |

Two patterns matter more than any single number.

**Seat-priced assistants are trying to become platforms.** Microsoft and Google
both sell a seat that includes a set of agent and retrieval capabilities, then
meter the usage that goes beyond the included allowance. The seat is predictable;
the usage is not.

**Retrieval platforms are trying to become infrastructure.** Azure, Vectara, and
Onyx price storage, queries, and compute because that is what they operate. The
platform fee is only the beginning of the bill; the data and the delivery work are
the rest.

## Why cost per seat fails

A seat price is easy to budget and easy to misread. Consider a 250-seat deployment
at $30 per seat. That is $7,500 a month before a single retrieval, token, or
implementation hour. If each user asks 20 questions a month, the seat-only cost is
$1.50 per question. Add retrieval, generation, support, and implementation, and
the real cost per answer is higher.

Now consider a 100-seat deployment with heavy usage. The seat line is smaller, but
the consumption line can be larger. The number of seats tells you how many people
have access, not how much value the system produced.

The better denominator is **cost per verified answer**.

A verified answer is one that:

1. answers the question that was asked;
2. cites a passage that actually supports the claim;
3. respects the asker's permissions;
4. is accepted by the user or a quality reviewer.

An answer that is refused because the evidence is missing is correct behavior, but
it is not a verified answer in the value calculation. An answer that is fluent,
uncited, and wrong is a cost.

The formula is deliberately plain:

```
Cost per verified answer =
  (access + ingestion + retrieval + generation + delivery + change)
  ÷ verified answers
```

Use the same formula for every vendor. If a vendor cannot give you the inputs,
that is a finding.

## The hidden line items

The platform quote is the part procurement can see. The rest of the bill lives in
the gaps between teams.

**Implementation and integration.** Connectors, identity, ACL mapping, chunking,
retrieval tuning, and the evaluation harness. On a messy estate, this is often
the largest first-year line. Ask for a fixed scope and a named owner, not a
discovery phase with a daily rate.

**Permissions and identity.** Query-time checks, group sync, deprovisioning, and
revocation. This is not a one-time configuration. It is a test you have to run
whenever the connector, identity model, or index changes. The
[four-persona permission test](/insights/rag-permission-test) is the cheapest way
to find out what the quote did not include.

**Content cleanup.** RAG does not reconcile contradictory policies. It retrieves
them faster. If the corpus has three versions of the returns policy, the project
needs an owner for the corpus before it needs a bigger model.

**Evaluation.** A golden set, labeling, regression tests, red teaming, and a
review process. Evaluation is not a one-time pilot artifact; it is how you keep
the system honest after go-live.

**Observability.** Retrieval traces, citation checks, abstention rates, latency,
and cost dashboards. Without them, you cannot tell a quality regression from a
pricing change.

**Security and compliance.** Penetration testing, data residency, DLP, audit
evidence, and incident response. These costs are real, and they do not disappear
because the vendor says "SOC 2."

**Connector maintenance.** Every connector has an API, a rate limit, a schema,
and an owner. Count the owners before you count the connectors.

**Exit.** Data export, index rebuild, contract termination, and the cost of moving
to another system. Ask for the exit plan before you sign the entry plan.

## A three-year model you can fill in

The table below is an illustrative model, not a quote. It assumes a 1,000-person
company with 250 knowledge workers, 2 million documents, 300,000 queries a month,
and 60% of queries producing a verified answer (180,000). Implementation is
amortized over 36 months for the monthly view.

| Line | Low | High | Assumption |
|---|---:|---:|---|
| Seats | $5,250/mo | $7,500/mo | 250 seats at $21–$30 |
| Platform and retrieval | $1,000/mo | $5,000/mo | Managed platform or cloud retrieval |
| Ingestion and connectors | $500/mo | $2,000/mo | 2M documents, multiple sources |
| Generation | $600/mo | $6,000/mo | 300k queries, model-dependent |
| Support and operations | $2,000/mo | $8,000/mo | Internal owner plus vendor support |
| **Monthly subtotal** | **$9,350** | **$28,500** | Before implementation |
| Implementation amortized | $1,389/mo | $4,167/mo | $50K–$150K over 36 months |
| **Total monthly** | **$10,739** | **$32,667** | Illustrative |
| **Cost per verified answer** | **~$0.06** | **~$0.18** | 180,000 verified answers/month |

Year one is cash-heavier because implementation is not amortized in the bank
account:

| Year-one view | Low | High |
|---|---:|---:|
| 12 months of subtotal | $112,200 | $342,000 |
| Implementation | $50,000 | $150,000 |
| **Year-one cash** | **$162,200** | **$492,000** |
| **Cost per verified answer** | **~$0.08** | **~$0.23** |

The model is more useful than a vendor total because you can change the
assumptions. Double the queries and the seat line may not move; double the seats
and the usage may not. A cheap seat price at 100 users can become expensive at
1,000 if the included usage does not scale. A consumption price at 300,000 queries
can beat a seat price at 50,000.

Run the model at three volumes before you negotiate.

## The three quotes to request

Ask every vendor for the same three scenarios, with the same scope. Do not accept
a quote that only covers the pilot.

| Scenario | Seats | Queries/month | Documents | Why |
|---|---:|---:|---:|---|
| A | 100 | 50,000 | 500,000 | Departmental pilot that might become production |
| B | 250 | 300,000 | 2,000,000 | Mid-size production deployment |
| C | 1,000 | 1,000,000 | 10,000,000 | Enterprise-wide, high-variance usage |

For each scenario, require:

- a three-year total, not just year one;
- the rate card, not only the discounted total;
- an overage example at 120% of the quoted volume;
- the cost of 100 connectors, or a clear per-connector schedule;
- identity, permission sync, and revocation in scope;
- deletion, retention, and data export terms;
- support tier and response times;
- model pass-through terms and notice of price changes;
- implementation scope with named deliverables and acceptance criteria;
- the exit plan and data export format.

If a vendor cannot quote Scenario C, ask why. If the price only works at Scenario
A, you are looking at a pilot promotion, not a production price.

## Contract traps

**Seat plus usage double dip.** A seat includes some usage, then charges again for
the usage that makes the product useful. Ask what is included at the seat tier and
what the overage rate is.

**Minimums and true-ups.** A three-year commitment with an annual true-up can
convert a small pilot into a large liability. Ask what happens if you deploy 60%
of the committed seats.

**Auto-renewal and escalation.** A multi-year discount can be eaten by an annual
uplift. Get the renewal cap and the notice window in writing.

**"Unlimited" with a fair-use ceiling.** Unlimited fast search is not unlimited
premium reasoning. Ask which model tier, which user, and which weekly cap.

**Connector counting.** Per connector, per source, per instance, or per user? A
"connector" can be a production integration or a folder.

**Storage definitions.** Raw documents, extracted text, vectors, metadata, and
traces may be metered differently. Ask what is excluded and what is replicated.

**Model pass-through.** If the vendor routes to third-party models, who absorbs a
price increase? Ask for notice, a cap, or the right to switch models.

**Pilot credits.** A generous pilot can convert into a production bill with no
carryover. Ask how credits convert and when they expire.

**Exit.** Ask for the data export format, the per-document metadata, and the
deletion certificate. A system you cannot leave is a system you do not control.

## How to compare without a spreadsheet food fight

Normalize every quote to the same three numbers:

1. **Three-year total cost of ownership** at Scenario B.
2. **Cost per verified answer** at your real volume.
3. **Cost per business outcome** for the use case: resolved ticket, document
   reviewed, audit finding closed, or cycle-time reduction.

Then score the non-cost dimensions separately:

- permission fidelity and revocation;
- citation support and abstention;
- connector coverage and freshness;
- evaluation and observability;
- support and exit terms;
- security and compliance evidence.

Do not let a 10% price difference override a permission failure. The
[enterprise RAG guide](/insights/enterprise-rag-solutions) covers the platform
selection; the [permission test](/resources/rag-permission-test-kit) covers the
failure that ends pilots.

## What to do before you sign

- Build the cost-per-verified-answer model with your own volume.
- Run the four-persona permission test on the shortlist.
- Get three quotes at Scenarios A, B, and C.
- Ask for a sample invoice at 120% of Scenario B.
- Put implementation, evaluation, and connector maintenance in the same budget.
- Check references at your size, not logo count.
- Negotiate the overage cap, the renewal cap, and the exit.
- Have counsel review the data, deletion, and liability terms.

The [enterprise AI benefits](/insights/enterprise-ai-benefits) piece covers the
other side of the equation: how to prove the capacity and cycle-time gains that
justify the bill. A cost model without an outcome model is just a cheaper way to
lose money.

## Frequently Asked Questions

### Is RAG cheaper than fine-tuning?

It depends on the task. RAG avoids retraining the model for every content change,
but it adds retrieval, storage, connector, and evaluation costs. Compare cost per
verified answer, not the price of a model call.

### Why does Vectara start at $100K a year?

That is the published floor for a managed enterprise deployment, not a mid-market
starter plan. VPC and on-prem deployments are higher. If the floor is above your
budget, the right comparison is a cloud retrieval service plus your own
engineering, not a discounted Vectara contract.

### Is open-source RAG free?

The software can be. The engineering, security, connector maintenance,
observability, and on-call rotation are not. Onyx's Community edition is free;
the paid plans and the internal owner are the rest of the bill.

### Should we buy seats or consumption?

Buy seats for broad, low-frequency access where predictability matters. Buy
consumption for high-variance or agent-heavy workloads where usage is the cost
driver. Most enterprises end up with a hybrid: a seat for the interface, a
consumption meter for retrieval and generation.

### What is a good cost per verified answer?

There is no universal number. Compare it with the fully loaded cost of the human
task, the cost of the alternative system, and the value of the outcome. A $0.10
answer that closes a $50 ticket is cheap; a $0.02 answer that creates a compliance
incident is not.

### How do we avoid overage surprises?

Set per-user and per-agent budgets, route routine queries to cheaper models, cache
repeat questions, monitor usage weekly, and negotiate a cap or an alert threshold.
Ask for the overage rate before the pilot, not after.

## Further reading

- [Enterprise RAG solutions for knowledge management](/insights/enterprise-rag-solutions)
- [The RAG Permission Test: Four Personas, One Leak](/insights/rag-permission-test)
- [The RAG Permission Test Kit](/resources/rag-permission-test-kit)
- [Enterprise AI benefits](/insights/enterprise-ai-benefits)
- [Microsoft 365 Copilot pricing](https://www.microsoft.com/en-us/microsoft-365/copilot/enterprise)
- [Microsoft Copilot Studio pricing](https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio)
- [Gemini Enterprise pricing](https://cloud.google.com/gemini-enterprise/business)
- [Amazon Quick pricing](https://aws.amazon.com/quick/pricing/)
- [Azure AI Search pricing](https://azure.microsoft.com/en-us/pricing/details/search/)
- [Glean Enterprise Flex](https://docs.glean.com/glean-enterprise-flex-pricing)
- [Vectara pricing](https://vectara.com/pricing)
- [Onyx billing](https://docs.onyx.app/admins/billing/overview)

## The short version

RAG pricing is five meters: access, ingestion, retrieval, generation, and delivery.
Public list prices are anchors, not quotes. The seat is not the cost, and the query
is not the value. Compare three-year total cost per verified answer, ask for three
quotes at three volumes, and put permissions, implementation, and exit in the same
budget.

If you want the cost model and the permission test applied to your own deployment,
the [AI Proof Audit](/services/ai-proof-audit) is the two-week version. If you
already know the gap and want the build, [Evidence-Gated RAG](/services/evidence-gated-rag)
is the delivery model.
