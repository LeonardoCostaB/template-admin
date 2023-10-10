/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      appDir: true,
   },
   images: {
      domains: ['source.unsplash.com'],
      minimumCacheTTL: 60,
   },
};

module.exports = nextConfig;
