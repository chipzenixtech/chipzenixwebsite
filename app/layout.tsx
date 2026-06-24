import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/visual/GrainOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chip Zenix — Engineering Tomorrow's Silicon",
    template: "%s — Chip Zenix",
  },
  description:
    "Chip Zenix is a semiconductor engineering services company delivering VLSI & ASIC design, embedded systems, and AI hardware acceleration.",
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
