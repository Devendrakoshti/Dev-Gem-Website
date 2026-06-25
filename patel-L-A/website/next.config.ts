import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  // basePath: '/patel-legal-advisors',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

export default nextConfig;
