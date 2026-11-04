import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants";
import { defaultOgImage } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const homeTitle =
  "Lexpertz AI — proof-first AI systems for RAG, agents, and audit";

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    creator: `@${siteConfig.xHandle}`,
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Icons come from the app/ file conventions:
  //   src/app/favicon.ico, src/app/icon.svg, src/app/apple-icon.png
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <ThemeProvider>
          <MotionProvider>
            <TooltipProvider delayDuration={200}>
                <div className="relative flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1 pt-16">{children}</main>
                  <Footer />
                </div>
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
