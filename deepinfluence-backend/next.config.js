/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Personnalisation de la configuration Webpack.
  webpack: (config, { dev }) => {
    if (dev) {
      // Lorsque Next.js fonctionne en mode développement, on ignore les fichiers système Windows
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/C:/**',
          '**/DumpStack.log.tmp',
          '**/hiberfil.sys',
          '**/pagefile.sys',
          '**/swapfile.sys'
        ]
      };
    }
    return config;
  }
};

module.exports = nextConfig;
