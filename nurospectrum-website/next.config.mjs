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
    const configuredApi = process.env.API_ORIGIN?.trim().replace(/\/+$/, '')
    const isPlaceholder = configuredApi?.includes('YOUR-RENDER-SERVICE')
    const isLocalProductionOrigin = process.env.NODE_ENV === 'production'
      && /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(configuredApi || '')
    const api = !configuredApi || isPlaceholder || isLocalProductionOrigin
      ? 'https://nurospectrum.onrender.com'
      : configuredApi
    return [
      { source: '/api/:path*', destination: `${api}/api/:path*` },
      { source: '/media/:path*', destination: `${api}/media/:path*` },
      { source: '/_allauth/:path*', destination: `${api}/_allauth/:path*` },
      { source: '/accounts/:path*', destination: `${api}/accounts/:path*` },
    ]
  },
}

export default nextConfig
