import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getApiOrigin } from '@/lib/api-origin'

type SitemapPost = { slug?: unknown; published_at?: unknown }

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: new URL('/', SITE_URL).href, changeFrequency: 'weekly', priority: 1 },
    { url: new URL('/blog', SITE_URL).href, changeFrequency: 'weekly', priority: 0.9 },
    { url: new URL('/community', SITE_URL).href, changeFrequency: 'monthly', priority: 0.8 },
    { url: new URL('/library', SITE_URL).href, changeFrequency: 'monthly', priority: 0.8 },
    { url: new URL('/partners', SITE_URL).href, changeFrequency: 'monthly', priority: 0.7 },
  ]
  const apiOrigin = getApiOrigin()

  try {
    const response = await fetch(`${apiOrigin}/api/posts`, { cache: 'no-store' })
    if (!response.ok) throw new Error(`Article sitemap request failed (HTTP ${response.status}).`)

    const posts: unknown = await response.json()
    if (!Array.isArray(posts)) throw new Error('Article sitemap response was not a list.')

    for (const item of posts as SitemapPost[]) {
      if (typeof item.slug !== 'string' || !item.slug.trim()) continue
      const lastModified = typeof item.published_at === 'string' && !Number.isNaN(Date.parse(item.published_at))
        ? new Date(item.published_at)
        : undefined
      pages.push({
        url: new URL(`/blog/${encodeURIComponent(item.slug)}`, SITE_URL).href,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.6,
      })
    }
  } catch (error) {
    console.error('Could not include articles in the sitemap.', error)
  }

  return pages
}
