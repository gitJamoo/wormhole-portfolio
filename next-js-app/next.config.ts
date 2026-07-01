import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict Mode double-mounts components in dev, which makes react-three-fiber
  // create two WebGL contexts. On low-end GPUs (e.g. Intel HD) that exhausts
  // the context budget and the browser drops the canvas ("WebGL context lost").
  // Disabling it keeps a single context. (Production never double-mounts.)
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/gh",
        destination: "https://github.com/gitJamoo",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/gitJamoo",
        permanent: true,
      },
      {
        source: "/in",
        destination: "https://www.linkedin.com/in/james-m-smith1",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/james-m-smith1",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/james_smith_resume.pdf",
        permanent: true,
      },
      {
        source: "/lc",
        destination: "https://leetcode.com/u/Jamoo",
        permanent: true,
      },
      {
        source: "/leetcode",
        destination: "https://leetcode.com/u/Jamoo",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
