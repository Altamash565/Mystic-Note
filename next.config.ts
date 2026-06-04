import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      'proxy-from-env': './src/lib/proxy-from-env-compat.js',
    },
  },
};


export default nextConfig;
