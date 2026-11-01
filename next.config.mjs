/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unsplash is the stock source for the hero card field
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // premium_photo host used by the profile-card primitive default image
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  async redirects() {
    // Old service slugs, kept alive for inbound links and search results.
    return [
      {
        source: "/services/enterprise-rag",
        destination: "/services/evidence-gated-rag",
        permanent: true,
      },
      {
        source: "/services/agentic-workflows",
        destination: "/services/agent-authority",
        permanent: true,
      },
      {
        source: "/services/mlops-infrastructure",
        destination: "/services/assurance-retainer",
        permanent: true,
      },
      {
        source: "/services/ai-evaluation",
        destination: "/services/ai-proof-audit",
        permanent: true,
      },
      {
        source: "/services/specialized-ai",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
