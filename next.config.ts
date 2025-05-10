import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: Configuration) => {
    if (!config.module) config.module = {};
    if (!config.module.rules) config.module.rules = [];
    config.module.rules.push({
      test: /\.mjs$/,
      type: "javascript/auto",
    });
    return config;
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
        },
      ],
    },
  ],
};

export default nextConfig;
