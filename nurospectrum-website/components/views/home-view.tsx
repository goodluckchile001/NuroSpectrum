'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Weave } from '@/components/weave'
import { useSite } from '@/context/site-context'
import { apiErrorMessage, apiRequest, localized, type ApiEvent } from '@/lib/api'
import { cv, LANGUAGES } from '@/lib/site'

const PATHS = [
  { n: 1, href: '/community', tone: 'green' as const },
  { n: 2, href: '/blog', tone: 'indigo' as const },
  { n: 3, href: '/partners', tone: 'gold' as const },
]

export function HomeView() {
  const { t, lang } = useSite()
  const [events, setEvents] = useState<ApiEvent[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [eventsError, setEventsError] = useState('')

  useEffect(() => {
    apiRequest<ApiEvent[]>('/events')
      .then(setEvents)
      .catch((error) => setEventsError(apiErrorMessage(error)))
      .finally(() => setLoadingEvents(false))
  }, [])

  const language = LANGUAGES[lang].code
  return (
    <>
      <div className="wrap">
        <section className="sec hero">
          <h1>{t('h1')}</h1>
          <p className="lede">{t('lede')}</p>
          <div className="cta">
            <Link className="btn" href="/community">{t('joinb')}</Link>
            <Link className="btn alt" href="/blog">{t('learnb')}</Link>
            <Link className="btn alt" href="/community#share-story">{t('sth')}</Link>
          </div>
          <Weave />
        </section>

        <section className="paths">
          {PATHS.map(({ n, href, tone }) => (
            <div className="path" style={cv(tone)} key={n}>
              <h3>{t(`a${n}t`)}</h3>
              <p>{t(`a${n}d`)}</p>
              <Link href={href}>{t(`a${n}l`)}</Link>
            </div>
          ))}
        </section>

        <section className="sec two" id="about">
          <div><h2>{t('about')}</h2><p>{t('ab1')}</p></div>
          <div><p>{t('ab2')}</p></div>
        </section>
      </div>

      <section className="statement">
        <div className="wrap sec">
          <p><b>{t('ml')}</b><br />{t('mt')}</p>
          <p><b>{t('vl')}</b><br />{t('vt')}</p>
        </div>
      </section>

      <div className="wrap">
        <section className="sec">
          <h2>{t('evh')}</h2>
          {loadingEvents && <p role="status">{t('eventLoading')}</p>}
          {eventsError && <p className="note" role="alert">{eventsError}</p>}
          {!loadingEvents && !eventsError && events.length === 0 && <p className="empty">{t('eventEmpty')}</p>}
          {events.map((event) => (
            <div className="ev" style={cv(event.tone)} key={event.id}>
              <div className="date">
                {new Intl.DateTimeFormat(language, { day: '2-digit', timeZone: 'UTC' }).format(new Date(`${event.date}T00:00:00Z`))}
                <small>{new Intl.DateTimeFormat(language, { month: 'short', timeZone: 'UTC' }).format(new Date(`${event.date}T00:00:00Z`))}</small>
              </div>
              <div>
                <h3>{localized(event.title, language)}</h3>
                <p>{localized(event.description, language)}</p>
                {(event.location || event.is_online) && <p>{event.is_online ? t('online') : event.location}</p>}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
