/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure proper routing
  trailingSlash: false,
  // Disable static optimization for dynamic content
  staticPageGenerationTimeout: 120,
}

export default nextConfig
