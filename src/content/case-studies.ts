import type { CaseStudySurface } from "./types";

export const caseStudies: CaseStudySurface[] = [
  {
    slug: "newsagent-pro",
    title: "NewsAgent Pro: autonomous AI newsroom in 60 seconds",
    client: "Open Source",
    industry: "AI / Content Automation",
    summary:
      "Built a fully agentic LangGraph workflow that researches trending stories via NewsAPI + Tavily, drafts articles with Llama 3.3, designs visuals with Flux.1, and enforces quality through a self-correcting Critic Agent loop — all end-to-end in under 60 seconds.",
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