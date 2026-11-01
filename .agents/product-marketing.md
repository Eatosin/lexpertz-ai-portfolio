# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-11-01

> v2 applies the November market research (`marketing/strategy/2026-11-positioning.md`): narrower ICP, three offers plus an audit wedge, and a proof-first position. Items marked **confirm** are inferred or missing.

## Product Overview

**One-liner:** AI systems that can prove what they did: evidence-gated retrieval, agent authority, and audit-ready evaluation for regulated, document-heavy work.

**What it does:** Lexpertz AI designs and ships AI systems for document-heavy, regulated workflows — retrieval pipelines that cite their sources, agents with a defined authority model, and evaluation that produces audit evidence rather than a dashboard. Engagements start with a two-week proof audit and continue into fixed-scope builds or an assurance retainer.

**Product category:** Applied AI assurance and engineering. Customers search for "AI governance audit," "AI audit readiness," "enterprise RAG consultant," "AI agent security."

**Product type:** Professional services (audit, fixed-scope build, retainer).

**Business model:** Productized audit ($8k–$15k), fixed-scope build ($45k–$120k), assurance retainer ($4k–$12k/mo). Scope flexes with budget; the rate does not. First three audits are founding-client priced in exchange for a case study and testimonial. **Confirm** against closed work.

## Target Audience

**Target companies:** Mid-market insurers, asset managers, and financial-administration firms (200–2,000 employees) that already run AI on documents and cannot prove the output. Secondary: legal operations and fintech compliance. **Geography:** global and English-first, priced in USD; the regulatory angle covers multiple jurisdictions rather than one.

**Decision-makers:** Head of AI or Data (technical champion), COO or Head of Operations (owns the failure, and is 2.7× more worried about agent regulation than the CTO), CISO or compliance lead (audit evidence), CTO (signs).

**Primary use case:** Produce evidence that an AI system's output is correct and its actions are attributable, before an audit or incident forces the question.

**Jobs to be done:**
- Pass an independent AI governance audit without a scramble.
- Turn a pilot that demos well into a system with eval coverage and an authority model.
- Replace a demo-grade RAG stack with one that cites and self-checks.

**Use cases:**
- Document auditing over SEC filings, legal MSAs, policy sets.
- Extraction agents turning unstructured text into validated JSON.
- Pre-deploy model evaluation with golden datasets and risk-prioritized test generation.

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Head of AI / Data (champion) | Shipping something that stays shipped | Pilot works in demos, fails on edge cases | Eval-first build with CI regression gates |
| COO / Head of Operations (buyer) | The failure landing on their desk | Cannot show what the system did or who owned it | Audit-ready evidence and a ranked gap list |
| CISO / compliance (gatekeeper) | Data handling, auditability, vendor lock-in | "The model said so" is not an audit trail | Line-level citations, identity, action logs |
| CTO / VP Engineering (sign-off) | Risk, timeline, cost of another failed build | Previous vendor delivered a prototype | Fixed scope, deployed system, cited accuracy |

## Problems & Pain Points

**Core problem:** The organization is scaling AI it cannot explain, measure, or defend. Grant Thornton's 2026 survey calls this the **AI proof gap**: 78% of executives lack strong confidence they could pass an independent AI governance audit within 90 days, and only 20% have a practiced response plan for AI failure.

**Why alternatives fall short:**
- Off-the-shelf RAG platforms return plausible text without line-level evidence.
- Generalist dev shops ship the happy path and leave evaluation to the client.
- Vertical AI vendors sell software, not proof; the client still has to defend the output.
- Big Four firms will run a governance assessment, at a price and pace a mid-market firm cannot absorb.

**What it costs them:** A stalled pilot burns a quarter of engineering time; a shipped hallucination in a regulated workflow costs far more.

**Emotional tension:** The sponsor has already promised the board an AI capability. Another failed build is a career cost, not just a budget line.

## Competitive Landscape

*All entries inferred — **confirm** the deals actually lost and to whom.*

**Direct:** Boutique AI engineering firms — fall short because they demo well and hand over without eval or monitoring.
**Secondary:** Vertical AI vendors (legal, insurance, security platforms) — fall short when the workflow needs custom verification logic and auditable citations; the buyer inherits a black box.
**Indirect:** Big-4 / systems integrators — fall short on speed and price for mid-market; in-house teams — fall short on eval discipline and time.

## Differentiation

**Key differentiators:**
- Adversarial verification: a prosecutor node cross-references every claim and forces retries when faithfulness drops, targeting 99.9% citation accuracy.
- Evaluation as a build artifact: golden datasets, risk-prioritized test generation, CI regression hooks.
- Monitoring with physical thresholds: drift detection at >2.5σ with automated root-cause analysis.
- The audit is the first deliverable: a ranked gap list in two weeks, before any build commitment.
- Founder-led delivery: a physicist who ships, not a sales team that subcontracts.

**How we do it differently:** Verification and evaluation are designed into the pipeline from week one, instead of being a QA phase bolted on at the end.

**Why that's better:** The client can show evidence — citations, faithfulness scores, test coverage — rather than a demo.

**Why customers choose us:** Small senior team, fixed scope, and a public body of technical work they can inspect before buying.

## Objections

| Objection | Response |
|-----------|----------|
| "You're a small team — what if you disappear?" | Fixed-scope delivery with the system, tests and docs handed over; no proprietary runtime required to operate it. |
| "We can do this in-house." | Then the gap is eval and monitoring practice, not model access; scope the engagement to that. |
| "Why not just use Azure/OpenAI RAG?" | Do that for the retrieval layer; the difference is verification, evaluation and audit trail on top. |
| "Why not a vertical vendor?" | They sell software; you still need someone to prove the output against your corpus and your controls. |
| "Why not Big Four?" | They will produce a framework deck. The audit ends with a ranked gap list and a working system, at mid-market pace. |
| "How do we know 99.9% is real?" | The claim is scoped to the audited corpus and reproducible with the RAGAS harness delivered with the system. |

**Anti-persona:** Teams wanting staff augmentation or sub-$10k template builds; consumer apps; organizations that cannot grant access to a representative document corpus.

## Switching Dynamics

**Push:** A pilot that demos well and fails in review; a model incident; an auditor asking for evidence the team cannot produce.
**Pull:** A verifiable output, a fixed timeline, and a public technical track record.
**Habit:** The in-house team already owns the pipeline and the roadmap.
**Anxiety:** Vendor lock-in, another integration the team has to maintain, and handing sensitive documents to an outside firm.

## Customer Language

**How they describe the problem:**
- Unknown — **confirm**. Collect verbatim lines from sales calls; do not invent them.

**How they describe us:**
- Unknown — **confirm**.

**Words to use:** evidence-gated, verifiable, citation accuracy, eval-first, drift, adversarial verification, self-correcting, auditable.
**Words to avoid:** revolutionary, cutting-edge, next-generation, synergy, "AI-powered" as a bare claim, "10x".
**Glossary:**

| Term | Meaning |
|------|---------|
| Evidence-gated retrieval | Answers are only returned when cross-referenced evidence passes a faithfulness threshold. |
| Adversarial prosecutor node | A verification agent that tries to falsify each claim and triggers retries on failure. |
| RAGAS faithfulness | Retrieval-augmented generation evaluation score used as the retry gate. |
| Eval-first | Evaluation harness and golden data built before the feature is considered done. |
| Physics-informed monitoring | Drift thresholds derived from the data's statistical behaviour (e.g. >2.5σ), not arbitrary cutoffs. |

## Brand Voice

| Attribute | Means | Doesn't mean | Example line |
|-----------|-------|--------------|--------------|
| Technical | Names the mechanism (RAGAS, z-score, LangGraph) | Jargon for its own sake | "Z-score thresholds (>2.5σ) for anomaly detection" |
| Evidence-first | Every claim has a number or a citation | Hedging everything | "99.9% verifiable output on SEC filings and legal MSAs" |
| Direct | Short sentences, no throat-clearing | Blunt or dismissive | "Most security agent projects fail at the authority boundary, not the model." |
| Unhyped | Confidence from specificity | Boring | "We architect AI systems that reason, act, and self-correct." |
| Builder | Speaks as the person who shipped it | Credential-dropping | "engineered by a physicist who ships" |

**Tone by context:**
- Support: precise, no blame, name the failing component.
- Launch: one concrete capability plus the measurable result.
- Errors: state what broke, what it affects, what changed.
- Sales: scope and evidence, not vision.
- Social: one idea per post, a mechanism or a number, no thread-broetry.

**Terms we own:** evidence-gated, adversarial verification, logic assurance, physics-informed MLOps.
**Never use (and why):** "revolutionary" / "cutting-edge" (unsupported and everywhere), "AI-powered" alone (says nothing), "10x" (no measured baseline).

## Proof Points

**Metrics:**
- 99.9% citation accuracy on SEC filings and legal MSAs (Axiom Engine V4).
- <60s end-to-end agentic newsroom pipeline; 5-node LangGraph.
- Drift detection at >2.5σ with automated root cause; <500ms response.
- 100% detection on benchmark deepfake-audio test sets.
- 2.5GB container savings, <1s cold boot.

**Market evidence (external, cite with source):**
- 78% of executives lack strong confidence they could pass an independent AI governance audit in 90 days (Grant Thornton, 2026 AI Impact Survey, n=950).
- 46% cite governance and compliance failures as a leading cause of AI underperformance.
- 73% give agentic AI access to data and processes; 20% have a practiced failure response.
- Fully integrated AI organizations are 4× more likely to report revenue growth (58% vs 15%).

**Customers:** No public client logos yet — case studies are open-source, research and internal builds. **Confirm** which client names, if any, can be cited; do not imply enterprise logos that do not exist.

**Testimonials:**
> None on file. **Confirm** whether any client quote is cleared for use.

**Value themes:**

| Theme | Proof |
|-------|-------|
| Verifiable output | 99.9% citation accuracy, RAGAS gate, line-level citations |
| Production readiness | Eval-first CI, drift monitoring, container/cold-boot numbers |
| Range across domains | Legal, fintech, MLOps, cybersecurity, quant research |
| Founder credibility | Public GitHub, open-source builds, technical essays |

## Goals

**Business goal:** Sell the AI Proof Audit as the entry engagement, then convert to a build or retainer.
**Conversion action:** Contact form / booked call on `/contact`, with the audit as the named next step.
**Current metrics:** Unknown — **confirm** traffic, form submissions, and newsletter conversion before setting targets.

## Learnings

*Decisions and tested lessons. Newest first. Keep it to about 20 active entries.*

| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| | | | | |

## Changelog

*Newest first. One line per revision: what changed and why.*

- v2 (2026-11-01) — Narrowed ICP to mid-market regulated firms (insurance, asset management, financial admin); replaced the flat services model with audit → build → retainer; added the proof-gap position and market evidence from Grant Thornton 2026; banned "transformation" language.
- v1 (2026-10-31) — Initial context drafted from the repo; proof points, voice and differentiation sourced from `README.md`, `src/content/services.ts`, `src/content/case-studies.ts` and `src/lib/constants.ts`. ICP, objections, competitors and customer language are inferred and marked **confirm**.
