import type { Metadata } from 'next'
import { PostView } from '@/components/views/post-view'

type Props = { params: Promise<{ slug: string }> }

function englishText(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const translations = value as Record<string, unknown>
  if (typeof translations.en === 'string') return translations.en
  return Object.values(translations).find((text): text is string => typeof text === 'string')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const apiOrigin = process.env.API_ORIGIN || 'http://localhost:8000'

  try {
    const response = await fetch(`${apiOrigin}/api/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (!response.ok) {
      if (response.status !== 404) console.error(`Article metadata request failed (HTTP ${response.status}).`)
      return { title: response.status === 404 ? 'Article not found' : 'Article' }
    }

    const data: unknown = await response.json()
    if (!data || typeof data !== 'object') return { title: 'Article' }
    const post = data as { title?: unknown; summary?: unknown }
    return {
      title: englishText(post.title) || 'Article',
      description: englishText(post.summary),
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
