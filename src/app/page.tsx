import { Metadata } from "next";
import { HeroCinematic } from "@/components/sections/hero-cinematic";
import { FeaturedStatsSection } from "@/components/sections/featured-stats-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProcessSection } from "@/components/sections/process-section";
import { TeamSection } from "@/components/sections/team-section";
import { CaseStudiesPreview } from "@/components/sections/case-study-card";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CTASection } from "@/components/sections/cta-section";
import { getPublishedInsights } from "@/content/insights";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Read here (server component) and pass down — `InsightsPreview` is a
  // client component and cannot touch the filesystem-backed content loader.
  const insights = (await getPublishedInsights()).slice(0, 3);

  return (
    <>
      <HeroCinematic />
      <FeaturedStatsSection />
      <ServicesGrid />
      <ProcessSection />
      <CaseStudiesPreview />
      <InsightsPreview insights={insights} />
      <TeamSection />
      <CTASection />
    </>
  );
}
