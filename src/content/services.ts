import type { ServiceSurface } from "./types";

/**
 * Four ways in. The audit is the wedge; the build and the retainer are what
 * it leads to. Prices stay off the page until three engagements have closed —
 * the shape and the fixed-scope promise do the qualifying instead.
 */
export const services: ServiceSurface[] = [
  {
    slug: "ai-proof-audit",
    title: "AI Proof Audit",
    tagline: "Two weeks to find out what your AI cannot prove.",
    summary:
      "A fixed-scope audit of one AI system: what it does, what it may act on, what evidence exists, and where an independent review would fail. You get a ranked gap list, not a framework deck.",
    icon: "ShieldCheck",
    durationWeeks: 2,
    engagement: "2 weeks, fixed price",
    forWhom:
      "Teams with a pilot heading into review, or a system already in production that nobody can fully explain.",
    investment:
      "Fixed price agreed before work starts. Credited toward a build if you continue within 90 days.",
    deliverables: [
      "System and data-flow inventory with an authority model for each agent",
      "Eval coverage mapped to the decisions that actually matter",
      "Evidence walkthrough: citations, action logs, access paths",
      "Ranked gap list with an owner, an effort estimate, and the risk it carries",
      "30-day remediation plan and a board-ready one-pager",
    ],
    body: `Most AI programmes fail review for the same reasons. The system cannot show what it retrieved, which identity acted, or which test would catch a regression. The model is rarely the weak point.

We audit one system at a time. Interviews, a read of the code and configuration, and a run against your own corpus. No generic maturity questionnaire, no scorecard that could describe any company.

The output is deliberately boring: a ranked list, each item with an owner and a test that proves it is fixed. If the gaps are small, the audit says so and you keep the difference.`,
  },
  {
    slug: "evidence-gated-rag",
    title: "Evidence-Gated RAG",
    tagline: "Retrieval that cites, and refuses when it cannot.",
    summary:
      "A retrieval pipeline built around verification rather than vibes: hybrid search, line-level citations, and a faithfulness gate that blocks answers below threshold. Ships with the harness that keeps it honest.",
    icon: "Search",
    durationWeeks: 8,
    engagement: "6–10 weeks, fixed scope",
    forWhom:
      "Document-heavy teams where a plausible answer is not good enough: policy, claims, filings, contracts, KYC.",
    investment:
      "Fixed scope and price after the audit. No open-ended discovery phase.",
    deliverables: [
      "Hybrid retrieval architecture over your corpus",
      "Citation enforcement and a faithfulness gate with a stated threshold",
      "Golden set and evaluation harness wired into CI",
      "Observability, runbook, and a handover session with your engineers",
    ],
    body: `A demo-grade retrieval stack answers every question. A production one has to know when it does not know.

We build the verification path first: what counts as evidence, how a citation is checked, and what the system does when faithfulness drops. The retriever and the model are chosen after that decision, not before it.

You keep the harness. The system is handed over with the tests that prove it still works after your team changes something.`,
  },
  {
    slug: "agent-authority",
    title: "Agent Authority & Integration",
    tagline: "An agent that can act is an identity, not a prompt.",
    summary:
      "Multi-agent systems with a defined authority model: what each agent may observe, recommend, and change; a scoped identity per agent; and every action logged as a security event.",
    icon: "Workflow",
    durationWeeks: 8,
    engagement: "6–10 weeks, fixed scope",
    forWhom:
      "Teams putting an agent near money, tickets, infrastructure, or customer data.",
    investment:
      "Fixed scope after the audit. The audit decides which actions are safe to automate first.",
    deliverables: [
      "Authority model and autonomy ladder for every agent action",
      "Per-agent identity, scoped credentials, and a tool registry",
      "Action logging into your existing SIEM or SOAR path",
      "Failure-mode tests and one incident response rehearsal",
    ],
    body: `A read-only agent that can call a ticketing API is not read-only. Authority is decided by the tools you grant and the identity you issue.

We design the authority model before the workflow: what the agent may observe, what it may recommend, what it may change, and which actions must page a human every time.

Then we wire the identity, the tool surface, and the audit trail, so an incident is explainable afterwards rather than reconstructed from memory.`,
  },
  {
    slug: "assurance-retainer",
    title: "Assurance Retainer",
    tagline: "Keep the evidence current, not just the model.",
    summary:
      "Ongoing evaluation, drift monitoring, and quarterly audit packs for systems already in production. The deliverable is a standing answer to “how do you know it still works”.",
    icon: "Activity",
    engagement: "Monthly",
    forWhom:
      "Teams that shipped a system and need to keep proving it, without hiring a full evaluation team.",
    investment:
      "Monthly, cancel with 30 days notice. Priced on system count and review cadence.",
    deliverables: [
      "Evaluation regression runs on every release",
      "Drift monitoring with thresholds tied to your data",
      "Quarterly audit pack: coverage, incidents, changes, open gaps",
      "Incident rehearsal and a named escalation path",
    ],
    body: `The first audit is a snapshot. Models, data, and prompts change; the evidence has to change with them.

We run the evaluations, watch drift, and keep the audit pack current. You get a monthly review and a quarterly pack you can hand to a board or an external auditor.

The retainer is deliberately narrow. If a release needs new architecture, that is a build, scoped separately.`,
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
