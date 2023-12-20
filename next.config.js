/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      appDir: true,
   },
   images: {
      domains: [
         'source.unsplash.com',
         'lh3.googleusercontent.com',
         'instagram.fsdu1-1.fna.fbcdn.net',
         'scontent.fsdu1-1.fna.fbcdn.net',
      ],
      minimumCacheTTL: 60,
   },
};

module.exports = nextConfig;
