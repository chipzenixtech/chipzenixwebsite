import type { Metadata } from "next";
import { display, sans, mono, label } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PillNav } from "@/components/layout/PillNav";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/visual/GrainOverlay";
import { SplashScreen } from "@/components/SplashScreen";
import "./globals.css";

const DESCRIPTION =
  "Chipzenix is a semiconductor engineering services company delivering VLSI & ASIC design, embedded systems, and AI hardware acceleration.";

// NOTE: update SITE_URL to the client's real production domain before launch.
const SITE_URL = "https://chipzenix.com";

// Organization + WebSite structured data for rich results.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Chipzenix",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-icon.webp`,
      description: DESCRIPTION,
      email: "hello@chipzenix.com",
      foundingLocation: "Hyderabad, Telangana, India",
      areaServed: "Worldwide",
      knowsAbout: [
        "VLSI",
        "ASIC design",
        "Embedded systems",
        "RTL design",
        "Functional verification",
        "Physical design",
        "RISC-V",
        "AI hardware acceleration",
      ],
      address: [
        {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "Satupally",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Chipzenix",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
  title: {
    default: "Chipzenix — Engineering Tomorrow's Silicon",
    template: "%s — Chipzenix",
  },
  description: DESCRIPTION,
  keywords: [
    "semiconductor",
    "VLSI",
    "ASIC design",
    "embedded systems",
    "RTL design",
    "verification",
    "physical design",
    "RISC-V",
  ],
  openGraph: {
    title: "Chipzenix — Engineering Tomorrow's Silicon",
    description: DESCRIPTION,
    url: "https://chipzenix.com",
    siteName: "Chipzenix",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Chipzenix — Engineering Tomorrow's Silicon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chipzenix — Engineering Tomorrow's Silicon",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
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
