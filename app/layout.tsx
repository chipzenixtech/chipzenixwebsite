import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/visual/GrainOverlay";
import { SplashScreen } from "@/components/SplashScreen";
import "./globals.css";

const DESCRIPTION =
  "Chipzenix is a semiconductor engineering services company delivering VLSI & ASIC design, embedded systems, and AI hardware acceleration.";

// NOTE: update metadataBase to the client's real production domain before launch.
export const metadata: Metadata = {
  metadataBase: new URL("https://chipzenix.com"),
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
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <SplashScreen />
        <SmoothScrollProvider>
          <GrainOverlay />
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
