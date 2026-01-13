import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! ATTENTION !!
    // Ceci permet de déployer même s'il y a des erreurs TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ceci permet de déployer même s'il y a des erreurs de style (Lint)
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'], // Pour afficher les avatars Google/Github
  }
};

export default nextConfig;