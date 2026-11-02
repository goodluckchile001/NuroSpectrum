'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { apiErrorMessage, apiRequest, localized, type ApiPost } from '@/lib/api'
import { useSite } from '@/context/site-context'
import { cv, LANGUAGES } from '@/lib/site'

export function BlogView() {
  const { t, lang } = useSite()
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest<ApiPost[]>('/posts')
      .then(setPosts)
      .catch((requestError) => setError(apiErrorMessage(requestError)))
      .finally(() => setLoading(false))
  }, [])

  const language = LANGUAGES[lang].code
  return (
    <div className="wrap">
      <section className="sec">
        <h1>{t('bh')}</h1>
        <p className="lede">{t('bl')}</p>
      </section>
      {loading && <p role="status">{t('blogLoading')}</p>}
      {error && <p className="note" role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && <p className="empty">{t('blogEmpty')}</p>}
      <div className="blog-grid">
        {posts.map((post) => (
          <Link className="post blog-card" style={cv(post.tone)} href={`/blog/${post.slug}`} key={post.slug}>
            {post.cover_image && (
              <img className="blog-card-image" src={post.cover_image} alt={post.cover_alt} loading="lazy" />
            )}
            <div className="blog-card-copy">
              <span className="tag">{localized(post.tag, language)}</span>
              <h2>{localized(post.title, language)}</h2>
              <p>{localized(post.summary, language)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="sec" />
    </div>
  )
}
