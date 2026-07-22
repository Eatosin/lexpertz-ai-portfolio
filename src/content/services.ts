import type { ServiceSurface } from "./types";

export const services: ServiceSurface[] = [
  {
    slug: "enterprise-rag",
    title: "Enterprise RAG & AI Auditing",
    tagline: "Evidence-gated retrieval with zero-hallucination guarantees.",
    summary:
      "Multi-agent LangGraph pipelines that cross-reference documents line-by-line. Our adversarial prosecutor node forces cyclical retries if faithfulness drops below 90% — delivering 99.9% verifiable output.",
    icon: "Search",
    deliverables: [
      "Hybrid retrieval architecture (pgvector + semantic)",
      "Adversarial verification node with RAGAS telemetry",
      "CI regression hook for eval-first deployment",
    ],
    durationWeeks: 8,
  },
  {
    slug: "agentic-workflows",
    title: "Agentic Workflows",
    tagline: "Autonomous multi-agent systems with self-correction loops.",
    summary:
      "From research agents that write and design content in under 60 seconds to structured extraction agents that parse raw text into validated JSON — we build LangGraph-orchestrated systems with critic-agent feedback loops.",
    icon: "Workflow",
    deliverables: [
      "Agent orchestration design with tool registry",
      "Critic-agent feedback loop for self-correction",
      "Observability dashboard with trace-based monitoring",
    ],
    durationWeeks: 8,
  },
  {
    slug: "mlops-infrastructure",
    title: "MLOps & Self-Healing Infra",
    tagline: "Physics-informed monitoring that detects drift before it breaks.",
    summary:
      "Z-score thresholds (>2.5σ) for anomaly detection, automated RAG-powered root cause analysis, and containerized FastAPI microservices with lazy-loaded ML singletons — sub-second cold boots, 2.5GB container savings.",
    icon: "Server",
    deliverables: [
      "Drift detection with physics-informed thresholds",
      "Automated RAG investigation agent for root cause analysis",
      "Optimized container orchestration + deployment topology",
    ],
    durationWeeks: 6,
  },
  {
    slug: "ai-evaluation",
    title: "AI Evaluation & Testing",
    tagline: "Risk-aware automated QA that finds edge cases humans miss.",
    summary:
      "Gemini 2.5-powered test generation using Z-Score and Isolation Forest for risk prioritization. We build frameworks that evaluate chain-of-thought reasoning and validate model outputs against golden benchmarks.",
    icon: "Activity",
    deliverables: [
      "Automated test generation with risk-aware prioritization",
      "Model evaluation rubric with golden dataset curation",
      "CI/CD integration for pre-deploy regression testing",
    ],
    durationWeeks: 5,
  },
  {
    slug: "specialized-ai",
    title: "Specialized AI Systems",
    tagline: "From deepfake detection to quant arbitrage — purpose-built AI.",
    summary:
      "Physics-informed CNNs for audio forensics, XGBoost models for prediction market arbitrage, and unbiased LLM-powered recruitment screening. We architect niche AI that solves problems general-purpose models can't touch.",
    icon: "Brain",
    deliverables: [
      "Domain-specific model architecture",
      "Training pipeline with evaluation benchmarks",
      "API wrapping for production deployment",
    ],
    durationWeeks: 10,
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);