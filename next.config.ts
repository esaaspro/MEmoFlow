import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore - eslint config is valid but not in type definition
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image domains configuration
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },

  // Exclude heavy libraries from server components bundle
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'mammoth'],
  },

  // Webpack configuration to exclude canvas and encoding from bundle
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },

  // Turbopack configuration (empty object to silence Turbopack/webpack conflict warning)
  // @ts-ignore - turbopack config is valid but may not be in type definition
  turbopack: {},
};

export default nextConfig;