import localFont from "next/font/local";
import { JetBrains_Mono, Chakra_Petch } from "next/font/google";

// Display headlines: Clash Display (distinctive, premium grotesque).
export const display = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
  weight: "200 700",
});

// Body / UI: General Sans (clean, modern, not a training-data default).
export const sans = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general",
  display: "swap",
  weight: "200 700",
});

// Technical data / specs: JetBrains Mono.
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

// Technical labels / eyebrows / taglines: Chakra Petch — engineered, legible
// in caps, distinct from the display + body families.
export const label = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});
