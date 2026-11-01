# Market positioning and target audience — November 2026

Research date: 2026-11-01. Status: proposal for review, not yet applied to the site.

## The finding that should drive everything

Grant Thornton's 2026 AI Impact Survey (n=950 C-suite and senior leaders, fielded Feb 23 to Mar 18 2026) names the buyer's actual problem:

> "Seventy-eight percent of business executives ... lack strong confidence that they could pass an independent AI governance audit within 90 days. Organizations that are deploying AI can't show how decisions are made and who is accountable for the outcome. This is the AI proof gap."

Supporting numbers from the same survey:

| Claim | Figure |
|---|---|
| Lack confidence they could pass an independent AI governance audit in 90 days | 78% |
| Cite governance and compliance failures as a leading cause of underperformance | 46% |
| Very confident they could pass an audit, among orgs still piloting | 7% |
| Very confident, among orgs with fully integrated AI | 74% |
| Give agentic AI access to data and processes | ~73% |
| Have a practiced response plan for AI failure | 20% |
| Allow agents to execute high-stakes decisions without human review | 5% |
| COOs concerned about agentic AI regulatory uncertainty (vs 20% of CIOs/CTOs) | 54% |
| Revenue growth reported, fully integrated vs piloting | 58% vs 15% |

Source: <https://www.grantthornton.com/services/advisory-services/artificial-intelligence/2026-ai-impact-survey>

**What it means:** the market is not asking for more models or more agents. It is asking for evidence. That is the one thing your existing work already produces: citation accuracy, RAGAS gates, eval coverage, drift thresholds, audit trails.

## Market context

- **AI consulting is crowded and growing.** Reported 2026 market size ranges from $9B to $14B depending on definition, with 21–26% CAGR. Treat the absolute number as low confidence; the direction is not in dispute. (Research and Markets; Fortune Business Insights.)
- **Agent scaling is concentrated in large firms.** McKinsey's State of AI 2026 reports 40% of organizations above $1B revenue scaling agents, up from 27%; smaller organizations flat at 22%. (Secondary read of McKinsey; verify against the PDF before quoting.)
- **Eval and observability are becoming features, not services.** The eval market is estimated at $1.97B (2025) heading to $6.8B (2029), with LangSmith, Braintrust, Arize, Galileo, Langfuse, and PromptFoo consolidating rapidly (Langfuse acquired by ClickHouse, PromptFoo by OpenAI, per secondary reports). Selling "we do evals" as a standalone offer is a losing position.
- **EU AI Act deadlines moved, and most content has not caught up.** The Council gave final approval to the Digital Omnibus on AI on 29 June 2026; it entered into force 27 July 2026. Standalone high-risk obligations now apply 2 December 2027, embedded high-risk 2 August 2028. Transparency obligations still start 2 August 2026. Sources: Council press release (29 Jun 2026), European Commission digital-strategy news (27 Jul 2026).
- **Rate benchmarks.** Published 2026 estimates cluster at $150–$350/hr for boutique firms, $5k–$50k for fixed-scope projects, $3k–$15k/mo retainers, and $40k–$80k+ for enterprise engagements. These are secondary compilations, not rate cards; use them as bands, not facts.

## Target audience decision

### Options scored

Scored 1–5 on the criteria that decide whether a small firm can win the work.

| Option | Budget | Access | Urgency | Fit with proof | Competition | Total |
|---|---|---|---|---|---|---|
| **A. Mid-market, regulated, document-heavy (200–2,000 staff)** | 4 | 4 | 5 | 5 | 4 | **22** |
| B. Enterprise (>$1B revenue) | 5 | 2 | 4 | 4 | 2 | 17 |
| C. SMB / startup (<50 staff) | 2 | 5 | 3 | 2 | 2 | 14 |
| D. Developer / open-source audience | 1 | 5 | 2 | 3 | 3 | 14 |

### Recommendation: Option A, with a narrow beachhead

**Primary ICP:** risk, compliance, and AI/ops leaders at mid-market insurers, asset managers, and financial-administration firms (200–2,000 employees) that already run AI on documents and cannot prove the output.

**Geography: global, English-first.** Per your call, the offer is location-agnostic and reached through content and social rather than local selling. That changes two things: prices stay in USD, and the regulatory pillar must cover more than the EU (see below). It also means the case for "audit-ready" is made on business risk, not on a single jurisdiction's deadline.

**Why this segment:**
- Document-heavy workflows where a wrong answer is expensive (policies, claims, filings, contracts, KYC).
- An existing audit culture: they already buy assurance, so "evidence" is a familiar purchase, not a new concept.
- The governance gap is highest exactly where Grant Thornton surveyed heaviest: asset management, banking, insurance, private equity.
- They can decide without a six-month vendor review, unlike >$1B enterprises.
- They are underserved by Big Four (too small to be worth a partner's time) and by vertical AI vendors (who sell software, not proof).

**Secondary:** legal operations and fintech compliance. **Deliberately not primary:** AI startups (no compliance budget, buy tools), and large enterprises until there are two named references.

**Anti-persona:** teams that want staff augmentation, a demo for a board deck, or the cheapest build. They will not pay for evidence work.

## Business model

Three offers plus one productized wedge. The wedge is the important change: it gives a low-risk first purchase and produces the evidence needed for the larger build.

| Offer | Shape | Price band | What leaves |
|---|---|---|---|
| **1. AI Proof Audit** (wedge) | 2 weeks, fixed | $8k–$15k | System inventory, authority model, eval coverage map, audit-readiness memo with the gaps ranked |
| **2. Evidence-Gated Build** | 6–10 weeks, fixed | $45k–$120k | Deployed RAG or agent system with citations, eval harness in CI, runbook |
| **3. Assurance Retainer** | Monthly | $4k–$12k/mo | Drift monitoring, eval regression, quarterly audit pack, incident response rehearsal |
| **4. Proof Pack** (productized, later) | Async | $2k–$4k | A single-system audit report, no workshop. Only after the audit offer repeats. |

Pricing is a band to test, not a published number. The first three audits should be priced to learn, with the explicit trade: a discount for permission to publish an anonymized case study.

## Pricing approach (for a firm with no closed leads yet)

Flexible pricing is the right instinct, but "whatever the budget allows" is not a price, it is a negotiation you lose before it starts. The distinction that matters:

- **Flex the scope, not the rate.** If the budget is smaller, audit one system and one corpus, not the whole estate. The day rate stays defensible.
- **Keep one fixed entry price.** The audit is the only number a cold buyer needs. It can be modest, but it must be a number you can say out loud in the first call.
- **Never discount without a trade.** Take one of: a named or anonymized case study, a testimonial, payment upfront, a shorter timeline, or an introduction to another buyer.
- **Anchor on the cost of the failure, not on hours.** "An auditor asks for evidence you cannot produce" is a bigger number than any day rate.
- **Do not publish a price list yet.** Publish the engagement shape. After three closes, publish "from" ranges.

Concrete starting structure for the first 90 days:

| Situation | Response |
|---|---|
| Budget below the audit band | Halve the scope: one system, one decision, a one-page memo. Do not halve the rigour. |
| Budget between audit and build | Audit now, credit the fee toward a build inside 90 days. |
| Budget well above the band | Do not raise the price; widen the scope (second system, retainer months). |
| "Can you do it hourly?" | No. Fixed scope protects both sides. Offer the audit instead. |
| "We need a proposal for procurement" | Send a one-page scope with deliverables, duration, price, and what is explicitly out of scope. |

**Founding-client offer (first three):** 50–60% off the audit in exchange for a case study and a testimonial, capped at three. Say the cap out loud; scarcity you invented is fine if it is true.

The purpose of the first three is not revenue. It is three things you currently lack: a named outcome, a repeatable scope, and evidence that the audit converts to a build.

## Services: what changes

The current five service lines are technically true and commercially diffuse. They describe capabilities, not purchases.

| Current | Problem | Proposed |
|---|---|---|
| Enterprise RAG & AI Auditing | Two different purchases in one line | Split: **AI Proof Audit** (diagnostic) and **Evidence-Gated RAG** (build) |
| Agentic Workflows | Sounds like every other agency | **Agent Authority & Integration**: identity, tool surface, action logging, autonomy ladder |
| MLOps & Self-Healing Infra | Good, but sold as infrastructure | **Assurance Retainer**: monitoring, drift, incident readiness |
| AI Evaluation & Testing | Tooling is commoditizing fast | Fold into both build and retainer; do not sell as standalone |
| Specialized AI Systems | Dilutes the position (deepfake, quant) | Keep as **research credentials**, not a service line |

Net: three services and one productized audit, all pointing at the same promise.

## Positioning and voice

**Positioning statement:** Lexpertz builds AI systems for regulated, document-heavy businesses that have to prove what the system did. The deliverable is evidence, not a demo.

**One-liner options, in order of preference:**
1. "AI systems that can prove what they did."
2. "The proof layer for AI in regulated work."
3. "Evidence-gated AI for document-heavy operations."

Retire "Precision AI & Logic Assurance" as the primary line. It is accurate but abstract; keep it as a secondary descriptor.

**Voice attributes (unchanged, sharpened):**

| Attribute | Means | Never |
|---|---|---|
| Evidence-first | Every claim carries a number, a citation, or a named mechanism | Vague authority ("years of experience") |
| Specific | Names the control, the threshold, the failure mode | Trend language ("agentic transformation") |
| Calm | States the risk without alarmism | Fear-selling the regulator |
| Builder | Speaks as the person who shipped it | Credential-dropping, logo walls |

**Words to use:** proof, audit-ready, traceable, authority model, eval coverage, incident rehearsal, citation accuracy.
**Words to ban:** transformation, leverage, cutting-edge, revolutionary, "AI-powered" alone, "future-proof".

**Tone by channel:** LinkedIn is the operating manual for a control; X is one mechanism per post; the site is the reference document; email is a short brief with one ask.

## Content pillars (replaces the November set)

| Pillar | Share | Why it earns attention | Example angle |
|---|---|---|---|
| **1. The proof gap** | 40% | The buyer's own words, with a number behind it | "78% of executives could not pass an AI governance audit in 90 days" |
| **2. Authority and agent identity** | 25% | Technical, concrete, and where incidents actually happen | "Redeploying an agent creates a new principal" |
| **3. Regulatory reality** | 15% | Most content still cites the old EU date; a multi-jurisdiction roundup (EU Omnibus, US state patchwork, UK guidance, Nigeria NDPA) is instant credibility for a global audience | "The August 2026 EU deadline moved. Here is what is still due now." |
| **4. Build notes** | 15% | Proves the work is real, not advisory theatre | "Sentinel: drift at 2.5 sigma, root cause in under 500ms" |
| **5. Offer** | 5% | One CTA, once per cycle | "Two weeks, a ranked gap list, no retainer required" |

What leaves the pillar set: generic coding-harness content. It is good writing, but it attracts developers, who are not the buyer. Move it to X only, or repurpose as a build-note footnote.

## What this changes in the November campaign

- Replace L4 (coding harness plugins) with a proof-gap post built on the 78% figure and the 46% governance-failure figure.
- Change the L6 offer from "30-minute architecture review" to the **AI Proof Audit** (two weeks, fixed price, ranked gap list).
- Keep L1, L2, L3, L5: they already sit in pillars 2 and 4.
- Add one regulatory-reality post in week two if a slot opens; the Omnibus correction is the strongest information-gain asset available this month.

## Confidence and gaps

| Claim type | Confidence | Note |
|---|---|---|
| Grant Thornton figures | High | Primary, n=950, methodology published |
| EU AI Act dates | High | Council + Commission primary sources |
| McKinsey agent-scaling figures | Medium | Secondary read; verify PDF before quoting |
| Consulting market size | Low | Definitions differ wildly; use direction only |
| Rate bands | Medium | Compiled from published estimates, not rate cards |
| Eval market consolidation | Medium | Secondary; useful as a trend signal, not a citation |
| Lexpertz close rates, capacity, geography | Unknown | Must come from you |

## Decisions needed from you

1. **Price validation.** Are the three bands plausible against work you have already delivered? If you have closed anything, the real numbers beat the benchmarks.
2. **Capacity.** A 2-week audit plus a 6–10 week build is roughly one concurrent engagement for a solo founder. The model assumes you can say no.
3. **Service page rewrite.** Drafted and shipped in this change; review the copy before it goes live.
4. **First-three offer.** Approve the founding-client discount and the trade (case study + testimonial), or set a different entry price.
