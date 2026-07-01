import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.56.1"],
  turbopack: {
    root: __dirname,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
