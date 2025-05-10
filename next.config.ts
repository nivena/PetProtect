import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: (config: Configuration) => {
    if (!config.module) config.module = {};
    if (!config.module.rules) config.module.rules = [];

    // ✅ Support for importing .mjs modules
    config.module.rules.push({
      test: /\.mjs$/,
      type: "javascript/auto",
    });

    return config;
  },

  // ✅ Custom security headers (can be improved for production)
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';", // 🔧 Loosened for dev
        },
      ],
    },
  ],
};

export default nextConfig;
