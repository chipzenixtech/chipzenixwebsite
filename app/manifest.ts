import type { MetadataRoute } from "next";
import { pageSeo, site } from "@/lib/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: ${site.tagline}`,
    short_name: site.name,
    description: pageSeo.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070c17",
    theme_color: "#070c17",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
