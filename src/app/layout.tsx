import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/constants";

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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/logo-icon.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@TosinOwadokun",
    images: [{ url: "/logo-icon.png", width: 512, height: 512 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/logo-icon.png", type: "image/png" }],
    apple: [{ url: "/logo-icon.png" }],
  },
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
        <ThemeProvider>
          <MotionProvider>
            <SmoothScrollProvider>
              <TooltipProvider delayDuration={200}>
                <div className="relative flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1 pt-16">{children}</main>
                  <Footer />
                </div>
              </TooltipProvider>
            </SmoothScrollProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}