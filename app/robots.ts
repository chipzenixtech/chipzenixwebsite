import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://chipzenix.com"; // update to the real production domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
