import type { TeamMemberSurface } from "./types";

export const team: TeamMemberSurface[] = [
  {
    slug: "owadokun-tosin-tobi",
    name: "Owadokun Tosin Tobi",
    role: "Founder & Lead AI Engineer",
    bio: "Physics undergraduate turned AI Architect. I bridge theoretical physics and production MLOps — building deterministic multi-agent LangGraph systems, physics-informed anomaly detection, and enterprise RAG pipelines that don't hallucinate. My work spans autonomous content agents (NewsAgent Pro), deepfake audio detection (Spectre), quant arbitrage engines (PolyMind), and self-healing MLOps (Sentinel). I don't just use AI — I architect the intelligence behind it.",
    avatar: "/founder.jpg",
    socials: {
      github: "https://github.com/Eatosin",
      linkedin: "https://www.linkedin.com/in/owadokun-tosin-tobi-6159091a3",
      x: "https://x.com/TosinOwadokun",
      email: "tosinowadokun11@gmail.com",
    },
  },
];

export const getTeamMemberBySlug = (slug: string) =>
  team.find((m) => m.slug === slug);
