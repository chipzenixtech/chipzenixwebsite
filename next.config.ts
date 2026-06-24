import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // static export has no image optimizer
  trailingSlash: true, // clean static hosting of nested routes
};

export default nextConfig;
