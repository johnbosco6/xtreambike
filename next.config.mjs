

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
