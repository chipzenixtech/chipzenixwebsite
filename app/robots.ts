import type { MetadataRoute } from "next";

const BASE = "https://chipzenix.com"; // update to the real production domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
