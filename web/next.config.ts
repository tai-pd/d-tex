import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // Disable source maps in development to avoid warnings
  productionBrowserSourceMaps: false,
  // Turbopack config (required when using custom webpack in Next.js 16)
  turbopack: {},
  // Suppress source map warnings and disable devtool
  webpack: (config, { dev }) => {
    // Disable source maps in development
    if (dev) {
      config.devtool = false;
    }
    
    // Suppress all source map warnings
    if (!config.ignoreWarnings) {
      config.ignoreWarnings = [];
    }
    config.ignoreWarnings.push(
      /Failed to parse source map/,
      /sourceMapURL could not be parsed/,
      { module: /node_modules/ }
    );
    
    return config;
  },
};

export default nextConfig;
