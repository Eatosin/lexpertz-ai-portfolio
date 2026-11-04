import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description:
    "What Lexpertz AI collects when you send a brief, why it is collected, who processes it, and how to have it deleted.",
  path: "/privacy",
});

const LAST_UPDATED = "4 November 2026";

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-4 w-fit">
          Legal
        </Badge>
        <h1 className="heading-page">Privacy</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Short version: this site collects the brief you choose to send, and
          nothing that identifies you beyond it.
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Last updated {LAST_UPDATED}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-base leading-7 text-muted-foreground">
          <section>
            <h2 className="heading-card mb-3 text-foreground">
              What is collected
            </h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <span className="text-foreground">Contact form:</span> name,
                work email, company (optional), project type, and the message
                you write.
              </li>
              <li>
                <span className="text-foreground">Attribution:</span> the page
                path and any <code className="text-foreground">utm_*</code>{" "}
                parameters on the link that brought you here.
              </li>
              <li>
                <span className="text-foreground">Analytics:</span> aggregate
                page views through Vercel Analytics. It is cookieless and does
                not build a profile of you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-card mb-3 text-foreground">
              Why it is collected
            </h2>
            <p>
              To reply to your inquiry, to understand which pages are useful,
              and to keep a record of work agreed. It is not sold, rented, or
              used for advertising, and there are no third-party ad trackers on
              this site.
            </p>
          </section>

          <section>
            <h2 className="heading-card mb-3 text-foreground">
              Who processes it
            </h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <span className="text-foreground">Vercel</span> hosts the site
                and records aggregate analytics.
              </li>
              <li>
                <span className="text-foreground">Resend</span> delivers
                contact-form email to {siteConfig.contactEmail}.
              </li>
              <li>
                <span className="text-foreground">Substack</span> powers the
                newsletter embed in the footer. When that box loads, Substack
                may set its own cookies under its privacy policy. The embed is
                the only third-party frame on the site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-card mb-3 text-foreground">How long</h2>
            <p>
              Inquiries are kept while the conversation or engagement is active,
              and for up to 24 months afterwards so a returning client has
              continuity. Attribution data is held for the same period.
            </p>
          </section>

          <section>
            <h2 className="heading-card mb-3 text-foreground">
              Your choices
            </h2>
            <p>
              Email{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-brand-cyan underline underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>{" "}
              to ask what is held about you, to correct it, or to have it
              deleted. Requests are answered within one business day. The
              newsletter is separate from this site&rsquo;s contact form and is
              unsubscribed from the link in every issue.
            </p>
          </section>

          <section>
            <h2 className="heading-card mb-3 text-foreground">Contact</h2>
            <p>
              {siteConfig.name} is operated by {siteConfig.founderName}. Reach
              the founder directly at{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-brand-cyan underline underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
              , or use the{" "}
              <Link
                href="/contact"
                className="text-brand-cyan underline underline-offset-4"
              >
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
