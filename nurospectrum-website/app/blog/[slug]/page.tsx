import type { Metadata } from 'next'
import { PostView } from '@/components/views/post-view'
import { getApiOrigin } from '@/lib/api-origin'

type Props = { params: Promise<{ slug: string }> }

function englishText(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const translations = value as Record<string, unknown>
  if (typeof translations.en === 'string') return translations.en
  return Object.values(translations).find((text): text is string => typeof text === 'string')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const apiOrigin = getApiOrigin()

  try {
    const response = await fetch(`${apiOrigin}/api/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (!response.ok) {
      if (response.status !== 404) console.error(`Article metadata request failed (HTTP ${response.status}).`)
      return { title: response.status === 404 ? 'Article not found' : 'Article' }
    }

    const data: unknown = await response.json()
    if (!data || typeof data !== 'object') return { title: 'Article' }
    const post = data as { slug?: unknown; title?: unknown; summary?: unknown; cover_image?: unknown; published_at?: unknown }
    const title = englishText(post.title) || 'Article'
    const description = englishText(post.summary)
    const canonical = `/blog/${encodeURIComponent(slug)}`
    const image = typeof post.cover_image === 'string' && post.cover_image ? post.cover_image : undefined
    const publishedTime = typeof post.published_at === 'string' && !Number.isNaN(Date.parse(post.published_at))
      ? post.published_at
      : undefined

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        type: 'article',
        title,
        description,
        url: canonical,
        publishedTime,
        images: image ? [{ url: image }] : undefined,
      },
      twitter: {
        card: image ? 'summary_large_image' : 'summary',
        title,
        description,
        images: image ? [image] : undefined,
      },
    }
  } catch (error) {
    console.error('Could not load article metadata.', error)
    return { title: 'Article' }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <PostView slug={slug} />
}
