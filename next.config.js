/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    appDir: true,
  },
  // Configure for Netlify deployment
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
}

module.exports = nextConfig