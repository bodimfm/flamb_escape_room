/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: !isProd,
  },
  typescript: {
    ignoreBuildErrors: !isProd,
  },
  images: {
    unoptimized: true,
  },
}
export default nextConfig
