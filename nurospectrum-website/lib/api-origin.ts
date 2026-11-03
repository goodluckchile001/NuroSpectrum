const PRODUCTION_API_ORIGIN = 'https://nurospectrum.onrender.com'

export function getApiOrigin() {
  const configuredOrigin = process.env.API_ORIGIN?.trim().replace(/\/+$/, '')
  const isPlaceholder = configuredOrigin?.includes('YOUR-RENDER-SERVICE')
  const isLocalProductionOrigin = process.env.NODE_ENV === 'production'
    && /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(configuredOrigin || '')

  return !configuredOrigin || isPlaceholder || isLocalProductionOrigin
    ? PRODUCTION_API_ORIGIN
    : configuredOrigin
}
