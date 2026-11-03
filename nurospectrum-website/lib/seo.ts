const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
const vercelUrl = process.env.VERCEL_URL

export const SITE_URL = new URL(
  configuredSiteUrl || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000'),
)

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL)
}

