import type { InsightSurface } from "./types";

export const insights: InsightSurface[] = [
  {
    slug: "architecture-of-axiom-engine",
    title: "The Architecture of Axiom Engine: Building a Zero-Hallucination RAG Pipeline",
    summary:
      "A deep dive into the 4-node LangGraph circuit powering Axiom Engine V4 — how the Librarian, Editor, Architect, and Prosecutor nodes collaborate to achieve 99.9% verifiable output with adversarial self-correction.",
    author: "Owadokun Tosin Tobi",
    publishedAt: "2026-06-10",
    category: "Engineering",
    readingTimeMinutes: 12,
  },
  {
    slug: "physics-informed-mlops",
    title: "Physics-Informed MLOps: Using Z-Scores to Detect Drift Before It Breaks Prod",
    summary:
      "Why I use 2.5σ thresholds instead of arbitrary alert rules. A practical guide to building self-healing monitoring with physics-grounded anomaly detection and automated RAG-powered root cause analysis.",
    author: "Owadokun Tosin Tobi",
    publishedAt: "2026-03-18",
    category: "Engineering",
    readingTimeMinutes: 8,
  },
  {
    slug: "mcp-protocol-ides",
    title: "Bridging IDEs to Cloud AI with the Model Context Protocol",
    summary:
      "How MCP lets Claude and Cursor talk directly to a FastAPI cloud backend — enabling secure, context-aware AI architectures without fragile prompt engineering or manual context stuffing.",
    author: "Owadokun Tosin Tobi",
    publishedAt: "2026-02-05",
    category: "Research",
    readingTimeMinutes: 9,
  },
  {
    slug: "agentic-self-correction",
    title: "Why Your AI Agent Needs a Critic: Self-Correction Loops in Production",
    summary:
      "Practical patterns for building agentic workflows that don't silently fail. From NewsAgent Pro's 5-node pipeline to Axiom's adversarial prosecutor — how to bake verification into your LangGraph architecture.",
    author: "Owadokun Tosin Tobi",
    publishedAt: "2026-01-22",
    category: "Architecture",
    readingTimeMinutes: 10,
  },
];

export const getInsightBySlug = (slug: string) =>
  insights.find((i) => i.slug === slug);