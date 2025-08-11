import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gitJamoo.github.io",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
