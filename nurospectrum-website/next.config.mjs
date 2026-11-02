/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    // "About us" now lives on the home page, as in the original design.
    return [{ source: '/about', destination: '/#about', permanent: false }]
  },
  async rewrites() {
    const api = process.env.API_ORIGIN || 'http://localhost:8000'
    return [
      { source: '/api/:path*', destination: `${api}/api/:path*` },
      { source: '/media/:path*', destination: `${api}/media/:path*` },
      { source: '/_allauth/:path*', destination: `${api}/_allauth/:path*` },
      { source: '/accounts/:path*', destination: `${api}/accounts/:path*` },
    ]
  },
}

export default nextConfig
