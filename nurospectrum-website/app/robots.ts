import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/logout', '/profile', '/api/', '/admin/', '/accounts/', '/_allauth/'],
    },
    sitemap: new URL('/sitemap.xml', SITE_URL).href,
  }
}
