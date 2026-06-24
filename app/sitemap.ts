import type { MetadataRoute } from "next";

const BASE = "https://chipzenix.com"; // update to the real production domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/careers", "/contact"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
