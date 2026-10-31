# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-31

> Drafted from the repo (`README.md`, `src/content/services.ts`, `src/content/case-studies.ts`, `src/lib/constants.ts`). Items marked **confirm** are inferred or missing — correct them before any campaign work.

## Product Overview

**One-liner:** Precision AI and logic assurance: evidence-gated RAG and agentic systems that survive production.

**What it does:** Lexpertz AI designs and ships AI systems for document-heavy, regulated workflows — retrieval pipelines that cite their sources, agent workflows with self-correction loops, model evaluation gates, and drift monitoring. Engagements are fixed-scope builds of roughly 5–10 weeks, each ending in a deployed system rather than a prototype.

**Product category:** Applied AI engineering / AI systems consultancy. Customers search for "enterprise RAG consultant," "AI agent development," "LLM evaluation," "AI systems audit."

**Product type:** Professional services (project-based), plus one productized audit tool (Axiom Verify).

**Business model:** Fixed-scope project fees; pricing not published — **confirm** typical range and whether retainers exist.

## Target Audience

**Target companies:** Mid-market to enterprise organizations where a wrong answer costs money or compliance — legal, fintech, security, insurance, industrial operations. **Confirm** the real ICP from closed deals; current evidence is case-study industries, not client logos.

**Decision-makers:** CTO / VP Engineering (economic buyer), Head of AI or Data (technical champion), CISO or compliance lead (risk gatekeeper for security-adjacent work).

**Primary use case:** Make LLM output verifiable enough to put inside a regulated or audited workflow.

**Jobs to be done:**
- Get a stalled AI pilot into production with evidence it can be trusted.
- Replace a demo-grade RAG stack with one that cites and self-checks.
- Add evaluation and drift detection before a model failure becomes an incident.

**Use cases:**
- Document auditing over SEC filings, legal MSAs, policy sets.
- Extraction agents turning unstructured text into validated JSON.
- Pre-deploy model evaluation with golden datasets and risk-prioritized test generation.

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Head of AI / Data (champion) | Shipping something that stays shipped | Pilot works in demos, fails on edge cases | Eval-first build with CI regression gates |
| CTO / VP Engineering (buyer) | Risk, timeline, cost of another failed build | Previous vendor delivered a prototype | Fixed 5–10 week scope, deployed system, cited accuracy |
| CISO / compliance (gatekeeper) | Data handling, auditability, vendor lock-in | "The model said so" is not an audit trail | Line-level citations, adversarial verification, self-hosted options |

## Problems & Pain Points

**Core problem:** Teams can build an impressive AI demo but cannot prove its output is correct, so the project never clears the bar for production.

**Why alternatives fall short:**
- Off-the-shelf RAG platforms return plausible text without line-level evidence.
- Generalist dev shops ship the happy path and leave evaluation to the client.
- In-house teams lack the eval and monitoring practice, not the model access.

**What it costs them:** A stalled pilot burns a quarter of engineering time; a shipped hallucination in a regulated workflow costs far more.

**Emotional tension:** The sponsor has already promised the board an AI capability. Another failed build is a career cost, not just a budget line.

## Competitive Landscape

*All entries inferred — **confirm** the deals actually lost and to whom.*

**Direct:** Boutique AI engineering firms — fall short because they demo well and hand over without eval or monitoring.
**Secondary:** Platform vendors (Azure AI Search, Glean, managed RAG products) — fall short when the workflow needs custom verification logic and auditable citations.
**Indirect:** Big-4 / systems integrators — fall short on speed and on hands-on model engineering; in-house teams — fall short on eval discipline and time.

## Differentiation

**Key differentiators:**
- Adversarial verification: a prosecutor node cross-references every claim and forces retries when faithfulness drops, targeting 99.9% citation accuracy.
- Evaluation as a build artifact: golden datasets, risk-prioritized test generation, CI regression hooks.
- Monitoring with physical thresholds: drift detection at >2.5σ with automated root-cause analysis.
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

**Business goal:** Convert inbound technical interest into scoped engagements.
**Conversion action:** Contact form / booked call on `/contact` (secondary: newsletter signup).
**Current metrics:** Unknown — **confirm** traffic, form submissions, and newsletter conversion before setting targets.

## Learnings

*Decisions and tested lessons. Newest first. Keep it to about 20 active entries.*

| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| | | | | |

## Changelog

*Newest first. One line per revision: what changed and why.*

- v1 (2026-10-31) — Initial context drafted from the repo; proof points, voice and differentiation sourced from `README.md`, `src/content/services.ts`, `src/content/case-studies.ts` and `src/lib/constants.ts`. ICP, objections, competitors and customer language are inferred and marked **confirm**.
