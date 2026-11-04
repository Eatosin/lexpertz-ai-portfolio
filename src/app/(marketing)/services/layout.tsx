import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "RAG pipelines, agentic workflows, model evaluation, MLOps, and AI strategy — shipped by engineers who know on-call.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}