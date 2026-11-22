"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trackCTA } from "@/lib/analytics";
import { siteConfig } from "@/lib/constants";

type InlineCaptureProps = {
  variant: "rag" | "newsletter";
};

/**
 * Article-level capture. RAG posts point at the permission test kit; every
 * other post offers the newsletter. One ask, placed after the value.
 */
export function InlineCapture({ variant }: InlineCaptureProps) {
  const isRag = variant === "rag";
  const href = isRag ? "/resources/rag-permission-test-kit" : siteConfig.substackUrl;

  return (
    <aside className="mt-12 rounded-xl border border-border bg-card p-6 sm:p-7">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-cyan">
        {isRag ? "Free resource" : "Field notes"}
      </p>
      <h2 className="heading-card mt-2">
        {isRag ? "The RAG Permission Test Kit" : "One note when a new piece ships."}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        {isRag
          ? "Four personas, five documents, twelve probes, and a scoring sheet. Run it before the next vendor demo."
          : "Technical notes on AI systems that have to prove what they did. No drip sequence, no AI slop."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          asChild
          variant="brand"
          size="lg"
          onClick={() =>
            trackCTA(isRag ? "article_capture_rag" : "article_capture_newsletter", href)
          }
        >
          {isRag ? (
            <Link href={href}>Get the kit</Link>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer">
              Subscribe on Substack
            </a>
          )}
        </Button>
        {isRag ? (
          <Button asChild variant="outline" size="lg">
            <Link href="/services/ai-proof-audit">See the audit</Link>
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
