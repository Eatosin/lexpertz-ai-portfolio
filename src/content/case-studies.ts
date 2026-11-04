import type { CaseStudySurface } from "./types";

export const caseStudies: CaseStudySurface[] = [
  {
    slug: "newsagent-pro",
    title: "NewsAgent Pro: autonomous AI newsroom in 60 seconds",
    client: "Open Source",
    industry: "AI / Content Automation",
    summary:
      "Built a fully agentic LangGraph workflow that researches trending stories via NewsAPI + Tavily, drafts articles with Llama 3.3, designs visuals with Flux.1, and enforces quality through a self-correcting Critic Agent loop — all end-to-end in under 60 seconds.",
    sections: [
      {
        heading: "The brief",
        body: "A working newsroom, not a demo. The pipeline had to go from a trending signal to a publishable draft without a human in the loop, and fail loudly when a source did not hold up.",
      },
      {
        heading: "What we built",
        body: "A five-node LangGraph circuit: scout (NewsAPI + Tavily), angle, draft (Llama 3.3), art (Flux.1), and a critic that scores the draft against the brief and returns it to the writer when it falls short. Every node writes its own trace, so a weak story is traceable to a specific decision rather than to a vague prompt.",
      },
      {
        heading: "What it proved",
        body: "End-to-end latency under 60 seconds on a cold run, with the critic loop absorbing most retries. The interesting part is not the speed — it is that the retry budget is bounded, so the system degrades to refusal instead of publishing something it cannot defend.",
      },
    ],
    metrics: [
      { label: "End-to-end latency", value: "<60s" },
      { label: "Agent nodes", value: "5-node pipeline" },
      { label: "GitHub stars", value: "6" },
    ],
    publishedAt: "2025-12-15",
    tags: ["LangGraph", "Llama 3.3", "Tavily", "Flux.1", "Automation"],
  },
  {
    slug: "axiom-engine-v4",
    title: "Axiom Engine V4: zero-hallucination document auditing",
    client: "Lexpertz AI",
    industry: "Legal / FinTech",
    summary:
      "Engineered a deterministic multi-agent LangGraph circuit with an adversarial prosecutor node. Uses MCP Protocol to bridge local IDEs to a FastAPI cloud backend. RAGAS Faithfulness drops trigger cyclical retries — achieving 99.9% verifiable output on SEC filings and legal MSAs.",
    sections: [
      {
        heading: "The brief",
        body: "Legal and finance review teams do not need a faster summariser. They need a system that can show which sentence in which filing supports which claim, and that refuses when the evidence is not there.",
      },
      {
        heading: "What we built",
        body: "A deterministic LangGraph circuit with an adversarial prosecutor node: one agent assembles the answer, a second attacks it against the retrieved passages. Retrieval is mediated by MCP so local IDE tools and the FastAPI backend share one tool contract. When RAGAS faithfulness drops below the gate, the circuit retries with a narrower retrieval window instead of guessing.",
      },
      {
        heading: "What it proved",
        body: "99.9% verifiable output across SEC filings and legal MSAs in the evaluation set, with the runtime container down 2.5GB and cold boot under a second. The failure mode that remains is a missing document — which the system reports rather than hides.",
      },
    ],
    metrics: [
      { label: "Citation accuracy", value: "99.9%" },
      { label: "Container savings", value: "2.5GB" },
      { label: "Cold boot time", value: "<1s" },
    ],
    publishedAt: "2026-06-10",
    tags: ["RAG", "LangGraph", "MCP", "FastAPI", "pgvector"],
  },
  {
    slug: "sentinel-mlops",
    title: "Sentinel: self-healing MLOps with physics-informed drift detection",
    client: "Open Source",
    industry: "MLOps",
    summary:
      "A FastAPI microservice using physics-informed Z-score thresholds (>2.5σ) to detect data drift in production ML pipelines. Integrates an automated RAG agent powered by Gemini 2.5 for root cause analysis on error logs — no human escalation needed.",
    sections: [
      {
        heading: "The brief",
        body: "Drift alarms that fire on every dashboard get muted within a week. The goal was a detector with a threshold anchored to each feature's own variance, and enough diagnosis attached that the on-call engineer knows where to look.",
      },
      {
        heading: "What we built",
        body: "A FastAPI service that scores feature distributions against physics-informed Z-thresholds (2.5σ) and hands confirmed drifts to a Gemini 2.5 RAG agent that reads the error logs and writes a root-cause note beside the alert.",
      },
      {
        heading: "What it proved",
        body: "Sub-500ms scoring, automated root-cause analysis on every triggered event, and no human escalations during the pilot window. The threshold is a per-feature knob set from its own history, not a global constant.",
      },
    ],
    metrics: [
      { label: "Drift threshold", value: "2.5σ" },
      { label: "Response time", value: "<500ms" },
      { label: "Automated RCA", value: "100%" },
    ],
    publishedAt: "2025-11-20",
    tags: ["MLOps", "FastAPI", "Gemini", "Docker", "Anomaly Detection"],
  },
  {
    slug: "polymind-arbitrage",
    title: "PolyMind: AI-gated prediction market arbitrage",
    client: "Research",
    industry: "Quant / Trading",
    summary:
      "Trained an XGBoost classifier on 5,000 trading scenarios to predict trade fill probability in volatile prediction markets. Avoids liquidity traps by gating every trade through confidence thresholds — simulated PnL of +$18,211.",
    sections: [
      {
        heading: "The question",
        body: "Prediction markets punish naive arbitrage: the edge is real, but the book moves before the order fills. Could fill probability be predicted well enough to gate entries?",
      },
      {
        heading: "What we built",
        body: "An XGBoost classifier trained on 5,000 historical scenarios, using spread, book depth, time-to-resolution, and cross-market disagreement as features. A trade only fires above a confidence threshold, which keeps the strategy out of illiquid books.",
      },
      {
        heading: "What it showed",
        body: "Simulated PnL of +$18,211 after fees, with the gate responsible for most of the improvement over the ungated baseline. This is simulation, not live capital: the deliverable is a filter, not a promise.",
      },
    ],
    metrics: [
      { label: "Training scenarios", value: "5,000" },
      { label: "Simulated PnL", value: "+$18,211" },
      { label: "Model", value: "XGBoost" },
    ],
    publishedAt: "2025-10-05",
    tags: ["XGBoost", "Quant", "Arbitrage", "Python"],
  },
  {
    slug: "spectre-deepfake",
    title: "Spectre: physics-informed deepfake audio detection",
    client: "Research",
    industry: "Cybersecurity",
    summary:
      "PyTorch ResNet-style CNN trained on Mel-spectrograms to detect synthetic audio artifacts and GAN-based deepfakes via real-time spectral analysis. Achieves 100% detection accuracy on benchmark test sets.",
    sections: [
      {
        heading: "The brief",
        body: "Detectors that report a single accuracy number tend to collapse on unseen generators. The aim was a model whose evidence is visible in the signal itself.",
      },
      {
        heading: "What we built",
        body: "A PyTorch ResNet-style CNN over Mel-spectrograms, trained on real and synthetic speech with augmentation across codecs and room noise. The spectrogram view makes the artefact inspectable: a human reviewer can see what the model reacted to.",
      },
      {
        heading: "What it proved",
        body: "100% detection on the benchmark test sets with a model small enough to run near real time. Benchmark accuracy is a ceiling, not a field guarantee — the next step is adversarial augmentation against unseen vocoders.",
      },
    ],
    metrics: [
      { label: "Detection accuracy", value: "100%" },
      { label: "Architecture", value: "ResNet CNN" },
      { label: "Domain", value: "Mel-spectrograms" },
    ],
    publishedAt: "2025-09-12",
    tags: ["PyTorch", "CNN", "Cybersecurity", "Audio Analysis"],
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
