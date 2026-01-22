import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/gh",
        destination: "https://github.com/gitJamoo",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/gitJamoo",
        permanent: false,
      },
      {
        source: "/in",
        destination: "https://www.linkedin.com/in/james-m-smith1",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/james-m-smith1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
