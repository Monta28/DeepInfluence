import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppression de "output: export" qui est incompatible avec les API routes et routes dynamiques
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  // Configuration pour le développement
  experimental: {
    appDir: true,
  },
};

export default nextConfig;

