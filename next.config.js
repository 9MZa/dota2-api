/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.cloudflare.steamstatic.com"]
  }
}

module.exports = nextConfig
