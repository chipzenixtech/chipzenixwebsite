import { Archivo, JetBrains_Mono } from "next/font/google";

// Display + body: Archivo (engineered grotesque, full weight range).
export const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Technical data / specs: JetBrains Mono (authentic to the domain).
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});
