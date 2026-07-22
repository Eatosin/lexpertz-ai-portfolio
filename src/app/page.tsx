import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsBar } from "@/components/sections/stats-bar";
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
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <ProcessTimeline />
      <CaseStudiesPreview />
      <InsightsPreview />
      <TeamSection />
      <CTASection />
    </>
  );
}