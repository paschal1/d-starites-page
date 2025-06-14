/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['i.imgur.com'],
      unoptimized: false, // Ensures Next.js handles optimization
    },
  };
  
  module.exports = nextConfig;
  