/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      appDir: true,
   },
   images: {
      domains: ['source.unsplash.com', 'lh3.googleusercontent.com'],
      minimumCacheTTL: 60,
   },
};

module.exports = nextConfig;
