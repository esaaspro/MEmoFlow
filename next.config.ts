import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. On garde tes règles pour ignorer les erreurs TS/Lint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },

  // 2. LA SOLUTION MAGIQUE pour pdf-parse
  // Cela empêche Vercel de planter s'il ne trouve pas "canvas" (qu'on n'utilise pas vraiment)
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  
  // 3. On active le mode expérimental pour les paquets externes si besoin
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'mammoth'],
  },
};

export default nextConfig;