import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ResourceRequestForm } from "@/components/forms/resource-request-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The RAG Permission Test Kit",
  description:
    "Four personas, one corpus, twelve probes, and a scoring sheet to expose RAG permission leaks before a vendor pilot does.",
  path: "/resources/rag-permission-test-kit",
  image: {
    url: "/insights/rag-permission-test.png",
    width: 1200,
    height: 630,
    alt: "One leak is enough: the RAG permission test",
  },
});

const personas = [
  {
    persona: "Executive",
    sees: "Executive memo, team runbook, handbook",
    never: "Nothing in the test set",
  },
  {
    persona: "Engineer",
    sees: "Team runbook, handbook",
    never: "Executive memo",
  },
  {
    persona: "Contractor",
    sees: "One shared folder",
    never: "Runbook, memo, or handbook if not shared",
  },
  {
    persona: "Departed employee",
    sees: "Nothing",
    never: "Everything",
  },
];

export default function RagPermissionTestKitPage() {
  return (
    <Container className="py-16 md:py-24">
      <Link
        href="/insights/enterprise-rag-solutions"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to the enterprise RAG guide
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <Badge variant="outline" className="mb-4 w-fit">
            Free resource
          </Badge>
          <h1 className="heading-page">The RAG Permission Test Kit</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            A demo passes because it runs as an admin. This kit runs your RAG
            system as the four people most likely to expose a permission leak:
            an executive, an engineer, a contractor, and someone who no longer
            works there.
          </p>
          <a
            href="#get-the-kit"
            className="mt-4 inline-flex text-sm font-medium text-brand-cyan underline underline-offset-4 lg:hidden"
          >
            Get the kit ↓
          </a>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="heading-card">What&apos;s inside</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
              <li>• A five-document test corpus with known ACLs</li>
              <li>• Four persona accounts and the expected answer for each</li>
              <li>• Twelve permission probes, including the revocation test</li>
              <li>• A scoring sheet that turns leaks into a pass/fail decision</li>
              <li>• The five failure modes that explain most demo-to-production gaps</li>
            </ul>
          </div>

          <h2 className="heading-section mt-12">The test starts with a known corpus</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Do not test with production documents on the first pass. Build a
            small corpus where you know the answer, the owner, and the ACL for
            every file. Five documents are enough to expose the common
            failures: a handbook, a team runbook, an executive memo, a
            contractor folder, and one document you will revoke mid-test.
          </p>

          <figure className="mt-8">
            <Image
              src="/diagrams/rag-permission-matrix.svg"
              alt="A four-by-five permission matrix showing what executives, engineers, contractors, and departed employees should and should not see"
              width={1200}
              height={620}
              className="w-full rounded-lg border border-border bg-[#070709]"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              One admin account proves nothing. Any unexpected checkmark in the
              contractor or departed-employee row is a failed pilot.
            </figcaption>
          </figure>

          <h2 className="heading-section mt-12">The four-persona matrix</h2>
          <div className="mt-5 max-w-full overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Persona</th>
                  <th className="py-3 pr-4 font-medium">Should see</th>
                  <th className="py-3 font-medium">Should never see</th>
                </tr>
              </thead>
              <tbody>
                {personas.map((row) => (
                  <tr key={row.persona} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium">{row.persona}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.sees}</td>
                    <td className="py-3 text-muted-foreground">{row.never}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="heading-section mt-12">What the kit adds beyond the article</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The article explains the method. The kit gives you the runnable
            version: the corpus definition, twelve probes with expected
            answers, a revocation timeline, and a scoring sheet you can send to
            a vendor or an internal platform team. It is designed for a
            two-week pilot, not a six-month evaluation.
          </p>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Read the method first in{" "}
            <Link
              href="/insights/rag-permission-test"
              className="text-brand-cyan underline underline-offset-4"
            >
              The RAG Permission Test: Four Personas, One Leak
            </Link>
            .
          </p>

          <h2 className="heading-section mt-12">How to use it</h2>
          <ol className="mt-4 grid gap-3 text-base leading-7 text-muted-foreground">
            <li>1. Build the five-document corpus. Record the ACLs.</li>
            <li>2. Create the four persona accounts. Do not reuse an admin session.</li>
            <li>3. Run the twelve probes. Capture the answer and the citation.</li>
            <li>4. Revoke one document and one user mid-test. Record the time to change.</li>
            <li>5. Score the leaks. One unexpected answer fails the pilot.</li>
          </ol>

          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h2 className="heading-card">Want the gap list for your deployment?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The two-week AI Proof Audit runs this test against your corpus,
              your connectors, and your identity model, then gives you a ranked
              list with owners and evidence.
            </p>
            <Link
              href="/services/ai-proof-audit"
              className="mt-4 inline-flex text-sm font-medium text-brand-cyan underline underline-offset-4"
            >
              See the AI Proof Audit
            </Link>
          </div>
        </div>

        <aside id="get-the-kit" className="h-fit min-w-0 scroll-mt-24 lg:sticky lg:top-24">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-cyan">
              Get the kit
            </p>
            <h2 className="heading-card mt-3">Run it before the next demo.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter your work email and I&apos;ll send the PDF. No sequence
              unless you ask for one.
            </p>
            <div className="mt-6">
              <ResourceRequestForm />
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Built from the same four-persona test used in the enterprise RAG
            guide. Your email is handled under the{" "}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </aside>
      </div>
    </Container>
  );
}
