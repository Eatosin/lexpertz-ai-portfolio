"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { services } from "@/content/services";
import { trackCTA } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * ServicesGrid — 3-column Bento grid showcasing the five core services plus
 * one CTA tile. The CTA breaks the rank visually by taking a `col-span-2`
 * slot on `lg` to anchor the eye.
 */
export function ServicesGrid() {
  return (
    <Section id="services" variant="muted">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            What we ship
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Five practices. One engineering culture.
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Pick a single engagement or compose them into a quarterly program —
            every effort ends with your team owning the system.
          </p>
        </div>

        <StaggerContainer className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                onClick={() =>
                  trackCTA("service_card", `/services/${service.slug}`)
                }
                className={cn(
                  "block h-full",
                  i === services.length - 1 && "md:col-span-2 lg:col-span-1"
                )}
              >
                <BentoCard className="h-full">
                  <div className="flex h-full flex-col gap-3">
                    <div className="text-xs font-medium uppercase tracking-wider text-brand-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.summary}
                    </p>
                    <div className="mt-auto pt-3 text-sm font-medium text-brand-cyan">
                      Read the spec →
                    </div>
                  </div>
                </BentoCard>
              </Link>
            </StaggerItem>
          ))}

          {/* CTA tile */}
          <StaggerItem>
            <Link
              href="/contact"
              onClick={() => trackCTA("services_cta", "/contact")}
              className="block h-full"
            >
              <BentoCard className="h-full bg-brand-gradient">
                <div className="flex h-full flex-col gap-3 text-brand-cyan-foreground">
                  <div className="text-xs font-medium uppercase tracking-wider opacity-80">
                    Next step
                  </div>
                  <h3 className="text-xl font-semibold">
                    Build a 90-day plan together
                  </h3>
                  <p className="text-sm opacity-90">
                    Tell us your stack, your stack of tickets, and your goals —
                    we’ll come back with a build-vs-buy matrix.
                  </p>
                  <div className="mt-auto pt-3 text-sm font-medium">
                    Book a call →
                  </div>
                </div>
              </BentoCard>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </Section>
  );
}
