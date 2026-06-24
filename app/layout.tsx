import type { Metadata } from "next";
import { sans, mono } from "@/lib/fonts";
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
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
