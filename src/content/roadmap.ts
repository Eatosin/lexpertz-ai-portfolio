/**
 * Roadmap section content — the milestone map backing the closing CTA on the
 * homepage. Milestones mirror the process phases (`src/content/process.ts`);
 * statuses are editorial and updated as engagements progress.
 */

export type RoadmapMilestoneStatus = "complete" | "in-progress" | "pending";

export type RoadmapMilestone = {
  id: number;
  name: string;
  status: RoadmapMilestoneStatus;
  /** Desktop-only anchor on the map (percentages). Ignored below `md`. */
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
};

export const roadmap = {
  /** Locally rendered dot-map backdrop (no third-party image host). */
  mapImage: "/roadmap-map.png",
  milestones: [
    {
      id: 1,
      name: "Discovery & Eval Audit",
      status: "complete",
      position: { top: "70%", left: "5%" },
    },
    {
      id: 2,
      name: "Reference Implementation",
      status: "in-progress",
      position: { top: "15%", left: "20%" },
    },
    {
      id: 3,
      name: "Production Handoff",
      status: "pending",
      position: { top: "45%", left: "55%" },
    },
    {
      id: 4,
      name: "Open Knowledge Transfer",
      status: "pending",
      position: { top: "10%", right: "10%" },
    },
  ] satisfies RoadmapMilestone[],
} as const;
