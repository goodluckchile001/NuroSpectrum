'use client'

import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { apiErrorMessage, apiRequest, localized, type ApiPost } from '@/lib/api'
import { useSite } from '@/context/site-context'
import { LANGUAGES, cv } from '@/lib/site'

export function PostView({ slug }: { slug: string }) {
  const { t, lang } = useSite()
  const [post, setPost] = useState<ApiPost | null>(null)
  const [related, setRelated] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const language = LANGUAGES[lang].code

  useEffect(() => {
    Promise.all([
      apiRequest<ApiPost>(`/posts/${encodeURIComponent(slug)}`),
      apiRequest<ApiPost[]>('/posts'),
    ])
      .then(([detail, posts]) => {
        setPost(detail)
        setRelated(posts.filter((item) => item.slug !== slug))
      })
      .catch((requestError) => setError(apiErrorMessage(requestError)))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="wrap sec" role="status">{t('articleLoading')}</div>
  if (error || !post) {
    return <div className="wrap sec"><p className="note" role="alert">{error || t('articleNotFound')}</p></div>
  }

  return (
    <div className="wrap">
      <article className="read sec" style={cv(post.tone)}>
        <Link className="back" href="/blog">{t('back')}</Link>
        <span style={{ font: '600 .9rem var(--head)', color: 'var(--c)' }}>{localized(post.tag, language)}</span>
        <h1>{localized(post.title, language)}</h1>
        {post.cover_image && (
          <figure className="article-cover">
            <img src={post.cover_image} alt={post.cover_alt} />
          </figure>
        )}
        {lang > 0 && <div className="note" lang={LANGUAGES[lang].code}>{t('note')}</div>}
        <div lang="en">
          {(post.paragraphs || []).map((para, j) => (
            <Fragment key={j}>
              {(post.images || []).filter((image) => image.position === j).map((image) => (
                <figure className="article-image" key={image.id}>
                  <img src={image.image} alt={image.alt_text} loading="lazy" />
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
              <p>{para}</p>
              {j === 1 && post.note && <div className="note">{post.note}</div>}
            </Fragment>
          ))}
          {(post.images || []).filter((image) => image.position >= (post.paragraphs || []).length).map((image) => (
            <figure className="article-image" key={image.id}>
              <img src={image.image} alt={image.alt_text} loading="lazy" />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
        {post.source && <div className="src"><b>{t('src')}:</b> {post.source}</div>}
      </article>
      <section className="more" aria-labelledby="more-h">
        <h2 id="more-h">{t('more')}</h2>
        {related.map((item) => (
          <Link className="post" style={cv(item.tone)} href={`/blog/${item.slug}`} key={item.slug}>
            <span className="tag">{localized(item.tag, language)}</span>
            <h3>{localized(item.title, language)}</h3>
          </Link>
        ))}
        <div className="sec" />
      </section>
    </div>
  )
}
