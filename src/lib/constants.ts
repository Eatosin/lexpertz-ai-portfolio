/**
 * Site-wide constants: navigation, services, pricing, and SEO defaults.
 * Source of truth for both marketing (Next.js) and app/agents config.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/** Primary navigation for Navbar. The "Services" group powers the dropdown. */
export const primaryNav: NavGroup[] = [
  {
    label: "Services",
    items: [
      {
        label: "Enterprise RAG & Auditing",
        href: "/services/enterprise-rag",
        description: "Evidence-gated retrieval with zero-hallucination guarantees.",
      },
      {
        label: "Agentic Workflows",
        href: "/services/agentic-workflows",
        description: "Autonomous multi-agent systems with self-correction loops.",
      },
      {
        label: "MLOps & Self-Healing Infra",
        href: "/services/mlops-infrastructure",
        description: "Physics-informed monitoring that detects drift before it breaks.",
      },
      {
        label: "AI Evaluation & Testing",
        href: "/services/ai-evaluation",
        description: "Risk-aware automated QA that finds edge cases humans miss.",
      },
      {
        label: "Specialized AI Systems",
        href: "/services/specialized-ai",
        description: "Purpose-built AI for deepfake detection, quant arbitrage, and more.",
      },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Case Studies", href: "/case-studies", description: "Real client engagements and outcomes." },
      { label: "Insights", href: "/insights", description: "Technical blog and engineering notes." },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", description: "Founder, mission, and the Lexpertz story." },
      { label: "Contact", href: "/contact", description: "Start a conversation or book a call." },
    ],
  },
];

/** Flat list of top-level links for Footer and MobileMenu. */
export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Axiom Verify", href: "/products/axiom-verify" },
];

/** Pricing config placeholder — replace with real tiers when product launches. */
export const pricing = {
  currency: "USD" as const,
  tiers: [
    { name: "Starter", price: 0, description: "For solo developers kicking the tires." },
    { name: "Growth", price: 499, description: "For teams shipping AI features to production." },
    { name: "Enterprise", price: null, description: "Custom deployments and SLAs." },
  ],
};

export const siteConfig = {
  name: "Lexpertz AI",
  shortName: "Lexpertz",
  url: "https://lexpertz-ai.vercel.app",
  description:
    "Precision AI & Logic Assurance. Enterprise RAG pipelines, agentic workflows, MLOps, and physics-informed AI auditing — engineered by a physicist who ships.",
  tagline: "Architecting Intelligence Through Physics-Based MLOps and LLMs.",
  founderName: "Owadokun Tosin Tobi",
  founderImage: "/founder.jpg",
  logoFull: "/logo-full.png",
  logoIcon: "/logo-icon.png",
  founder: {
    github: "https://github.com/Eatosin",
    linkedin: "https://www.linkedin.com/in/owadokun-tosin-tobi-6159091a3",
    x: "https://x.com/TosinOwadokun",
    email: "tosinowadokun11@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
