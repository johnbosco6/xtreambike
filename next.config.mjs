

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: false,
    forceSwcTransforms: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['v0.blob.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/livraison',
        destination: '/shipping-returns',
        permanent: true,
      },
      {
        source: '/garantie',
        destination: '/shipping-returns',
        permanent: true,
      },
      {
        source: '/confidentialite',
        destination: '/privacy',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
