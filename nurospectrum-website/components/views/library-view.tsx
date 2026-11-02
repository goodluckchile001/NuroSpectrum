'use client'

import { useEffect, useState } from 'react'
import { useSite } from '@/context/site-context'
import {
  CREATIVE_DRIVE_URL, cv, LANGUAGES,
  type Resource,
} from '@/lib/site'
import { apiErrorMessage, apiRequest, type ApiResource, type Tone } from '@/lib/api'

function ResourceItem({ r, tone }: { r: Resource; tone: Tone }) {
  const { t } = useSite()
  const search = tone === 'green'
    ? `https://openlibrary.org/search?q=${encodeURIComponent(r.t)}`
    : tone === 'rose'
      ? `https://www.ted.com/search?q=${encodeURIComponent(r.t)}`
      : `https://scholar.google.com/scholar?q=${encodeURIComponent(`${r.t} ${r.by.split(',')[0]}`)}`
  const href = r.u || search
  const label = r.u ? t('resourceOpen') : t(tone === 'green'
    ? 'resourceSearchBooks'
    : tone === 'rose'
      ? 'resourceSearchVideo'
      : 'resourceSearchScholar')
  return (
    <div className="res" style={cv(tone)}>
      <div>
        <h3>{r.t}</h3>
        <p className="by">{r.by}</p>
        <p>{r.n}</p>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${r.t} (${t('newTab')})`}>{label} ↗</a>
    </div>
  )
}

const jump = (id: string) => document.getElementById(id)?.scrollIntoView()
const SECTION_STYLE = { paddingTop: '2rem' }

export function LibraryView() {
  const { t } = useSite()
  const [resources, setResources] = useState<ApiResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest<ApiResource[]>('/resources')
      .then(setResources)
      .catch((requestError) => setError(apiErrorMessage(requestError)))
      .finally(() => setLoading(false))
  }, [])

  const resource = (item: ApiResource): Resource => ({ t: item.title, by: item.by, n: item.note, u: item.url || undefined })
  const articles = resources.filter((item) => item.kind === 'article')
  const books = resources.filter((item) => item.kind === 'book' || item.kind === 'magazine')
  const videos = resources.filter((item) => item.kind === 'video')
  return (
    <div className="wrap">
      <section className="sec">
        <h1>{t('libh')}</h1>
        <p className="lede">{t('libraryIntro')}</p>
        <div className="chips">
          <button className="chip" type="button" onClick={() => jump('lib-art')}>{t('libArticles')}</button>
          <button className="chip" type="button" onClick={() => jump('lib-bk')}>{t('libBooks')}</button>
          <button className="chip" type="button" onClick={() => jump('lib-vd')}>{t('libVideos')}</button>
          <button className="chip" type="button" onClick={() => jump('creative')}>{t('libCreative')}</button>
        </div>
      </section>

      <section className="sec" id="lib-art" style={SECTION_STYLE}>
        <h2>{t('libArticles')}</h2>
        {loading && <p role="status">{t('libLoading')}</p>}
        {error && <p className="note" role="alert">{error}</p>}
        {articles.map((item) => <ResourceItem key={item.id} r={resource(item)} tone="indigo" />)}
        {!loading && !error && articles.length === 0 && <p className="empty">{t('libEmptyArticles')}</p>}
      </section>

      <section className="sec" id="lib-bk" style={SECTION_STYLE}>
        <h2>{t('libBooks')}</h2>
        {books.map((item) => <ResourceItem key={item.id} r={resource(item)} tone="green" />)}
        {!loading && !error && books.length === 0 && <p className="empty">{t('libEmptyBooks')}</p>}
      </section>

      <section className="sec" id="lib-vd" style={SECTION_STYLE}>
        <h2>{t('libVideos')}</h2>
        <div className="vid">
          <iframe
            src="https://www.youtube-nocookie.com/embed/A1AUdaH-EPM"
            title="Why everything you know about autism is wrong, Jac den Houting, TEDxMacquarieUniversity"
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <h3>{t('libVideoTitle')}</h3>
        <p className="by">Jac den Houting, TEDxMacquarieUniversity (2019)</p>
        <p style={{ color: 'var(--muted)', maxWidth: '40rem' }}>
          {t('libVideoDescription')}{' '}
          <a href="https://www.youtube.com/watch?v=A1AUdaH-EPM" target="_blank" rel="noopener noreferrer">{t('libWatch')}</a>
        </p>
        <h3 style={{ marginTop: '2rem' }}>{t('libMoreVideos')}</h3>
        {videos.map((item) => <ResourceItem key={item.id} r={resource(item)} tone="rose" />)}
        {!loading && !error && videos.length === 0 && <p className="empty">{t('libEmptyVideos')}</p>}
      </section>

      <section className="sec" id="creative">
        <h2>{t('libCreative')}</h2>
        <p className="lede">{t('libCreativeIntro')}</p>
        <div className="two" style={{ marginTop: '2rem' }}>
          <div>
            <h3>{t('libIllustrations')}</h3>
            <svg className="art" viewBox="0 0 240 150" role="img" aria-label={t('libArtAlt')}>
              <circle cx="80" cy="70" r="46" style={{ fill: 'var(--green)' }} opacity=".8" />
              <circle cx="125" cy="70" r="46" style={{ fill: 'var(--indigo)' }} opacity=".8" />
              <circle cx="102" cy="40" r="46" style={{ fill: 'var(--gold)' }} opacity=".8" />
              <circle cx="102" cy="100" r="46" style={{ fill: 'var(--rose)' }} opacity=".7" />
            </svg>
            <p style={{ color: 'var(--muted)' }}>{t('libArtCaption')}</p>
          </div>
          <div>
            <h3>{t('libSongs')}</h3>
            <p className="rhyme">
              <b>{t('libPoemTitle')}</b><br />
              {t('libPoem1')}<br />
              {t('libPoem2')}<br />
              {t('libPoem3')}<br />
              {t('libPoem4')}
            </p>
          </div>
        </div>
        <p style={{ marginTop: '2rem' }}>
          {t('libContribute')}{' '}
          <a href={CREATIVE_DRIVE_URL} target="_blank" rel="noopener noreferrer"><b>{t('libContributeLink')}</b></a>.
        </p>
      </section>
    </div>
  )
}
