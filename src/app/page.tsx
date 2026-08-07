import { Metadata } from "next";
import { HeroScrollMorph } from "@/components/sections/hero-scroll-morph";
import { FeaturedStatsSection } from "@/components/sections/featured-stats-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TeamSection } from "@/components/sections/team-section";
import { CaseStudiesPreview } from "@/components/sections/case-study-card";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroScrollMorph />
      <FeaturedStatsSection />
      <ServicesGrid />
      <ProcessTimeline />
      <CaseStudiesPreview />
      <InsightsPreview />
      <TeamSection />
      <CTASection />
    </>
  );
}
