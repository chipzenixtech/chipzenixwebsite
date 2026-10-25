import type { Metadata, Viewport } from "next";
import { display, sans, mono, label } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PillNav } from "@/components/layout/PillNav";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/visual/GrainOverlay";
import { SplashScreen } from "@/components/SplashScreen";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, site } from "@/lib/content";
import { SITE_URL, pageMetadata, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const home = pageMetadata("/", pageSeo.home, { absoluteTitle: true });

export const metadata: Metadata = {
  ...home,
  metadataBase: new URL(SITE_URL),
  // subpages pass a plain title; this frames it as "Services — Chipzenix"
  title: { default: pageSeo.home.title, template: `%s — ${site.name}` },
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070c17",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${label.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <JsonLd data={siteJsonLd} />
        <SplashScreen />
        <SmoothScrollProvider>
          <GrainOverlay />
          <ScrollProgress />
          <PillNav />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
