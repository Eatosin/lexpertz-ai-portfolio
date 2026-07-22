import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Services", template: "%s | Lexpertz Services" },
  description:
    "RAG Pipelines, Agentic Workflows, Model Evaluation, MLOps, and AI Strategy — shipped by engineers who know on-call.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}