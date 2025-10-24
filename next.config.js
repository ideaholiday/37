/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'cdn.ideaholiday.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL || '',
  },
}

module.exports = nextConfig
