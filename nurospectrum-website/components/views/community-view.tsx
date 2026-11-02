'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StoryForm } from '@/components/forms/story-form'
import { useAuth } from '@/components/auth-provider'
import { useSite } from '@/context/site-context'
import { nearestState } from '@/lib/geo'
import { ApiError, apiErrorMessage, apiRequest, type ApiCommunity, type ApiPage, type ApiStory } from '@/lib/api'

export function CommunityView() {
  const { t, fmt, list, state, setState } = useSite()
  const [query, setQuery] = useState('')
  const [geo, setGeo] = useState<'' | 'busy' | 'ok' | 'denied' | 'out'>('')
  const [communities, setCommunities] = useState<ApiCommunity[]>([])
  const [stories, setStories] = useState<ApiStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [role, setRole] = useState('')
  const [joinBusy, setJoinBusy] = useState(false)
  const [joinError, setJoinError] = useState('')
  const [inviteUrl, setInviteUrl] = useState('')
  const { profile } = useAuth()
  const router = useRouter()
  const joinRef = useRef<HTMLDivElement>(null)
  const states = communities.map((community) => community.state)
  const shown = states.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    Promise.all([
      apiRequest<ApiCommunity[]>('/communities'),
      apiRequest<ApiPage<ApiStory>>('/stories'),
    ])
      .then(([communityList, storyPage]) => {
        setCommunities(communityList)
        setStories(storyPage.results)
      })
      .catch((requestError) => setError(apiErrorMessage(requestError)))
      .finally(() => setLoading(false))
  }, [])

  const scrollToJoin = () => requestAnimationFrame(() => joinRef.current?.scrollIntoView({ block: 'nearest' }))

  async function joinCommunity() {
    if (!profile) {
      router.push('/login?callbackUrl=%2Fcommunity')
      return
    }
    setJoinBusy(true)
    setJoinError('')
    setInviteUrl('')
    try {
      const result = await apiRequest<{ joined: boolean; whatsapp_invite_url: string }>('/join', {
        method: 'POST',
        body: JSON.stringify({ state, role }),
      })
      setInviteUrl(result.whatsapp_invite_url)
    } catch (requestError) {
      if (requestError instanceof ApiError && [401, 403].includes(requestError.status)) {
        router.push('/login?callbackUrl=%2Fcommunity')
      } else {
        setJoinError(apiErrorMessage(requestError))
      }
    } finally {
      setJoinBusy(false)
    }
  }

  // Asks the browser for the device location (the visitor must allow it), then
  // suggests the nearest state. Coordinates are not sent anywhere.
  const locate = () => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) { setGeo('denied'); return }
    setGeo('busy')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const match = nearestState(pos.coords.latitude, pos.coords.longitude)
        if (!match) { setGeo('out'); return }
        setState(match)
        setGeo('ok')
        scrollToJoin()
      },
      () => setGeo('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    )
  }

  return (
    <div className="wrap">
      <section className="sec">
        <h1>{t('ch')}</h1>
        <p className="lede">{t('cl')}</p>
        <div className="stack">
          <button className="btn alt" type="button" onClick={locate} disabled={geo === 'busy'}>{t('loc')}</button>
          <span className="note-sm" role="status">
            {geo === 'busy' && t('locBusy')}
            {geo === 'ok' && state && fmt('locOk', { s: state })}
            {geo === 'denied' && t('locDenied')}
            {geo === 'out' && t('locOut')}
          </span>
        </div>
        <p className="note-sm">{t('locNote')}</p>
        <input
          className="search"
          type="search"
          aria-label={t('sf')}
          placeholder={t('sf')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="states" role="group" aria-label={t('ch')}>
          {loading && <p role="status">{t('communityLoading')}</p>}
          {error && <p className="note" role="alert">{error}</p>}
          {!loading && !error && shown.length === 0 && <p className="note-sm">{query.trim() ? t('sn') : t('communityEmpty')}</p>}
          {shown.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              aria-pressed={s === state}
              onClick={() => {
                setState(s)
                setGeo('')
                setInviteUrl('')
                setJoinError('')
                scrollToJoin()
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div ref={joinRef} aria-live="polite">
          {state ? (
            <div className="panel">
              <h2>{state} {t('cx')}</h2>
              <p>{t('cp')}</p>
              <label>
                {t('communityRole')}
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="">{t('roleChoose')}</option>
                  {list('roles').map((label, index) => {
                    const value = ['neurodivergent', 'family', 'professional', 'ally'][index]
                    return value ? <option key={value} value={value}>{label}</option> : null
                  })}
                </select>
              </label>
              <button className="btn" type="button" disabled={joinBusy} onClick={joinCommunity}>
                {joinBusy ? t('joining') : t('jb')}
              </button>
              {!profile && <p className="note-sm">{t('signInJoin')}</p>}
              {inviteUrl && <p><a className="btn wa" href={inviteUrl} target="_blank" rel="noopener noreferrer">{t('wa')}: {state}</a></p>}
              {inviteUrl === '' && !joinBusy && joinError === '' && profile && <p className="note-sm">{t('waNote')}</p>}
              {joinError && <p className="note" role="alert">{joinError}</p>}
            </div>
          ) : (
            <p className="lede">{t('cs')}</p>
          )}
        </div>
      </section>

      <section className="sec" id="share-story">
        <h2>{t('sth')}</h2>
        <p className="lede">{t('storyLead')}</p>
        <div className="two">
          <div>
            <h3>{t('storyPromise')}</h3>
            <ul className="g">
              <li>{t('storyPromise1')}</li>
              <li>{t('storyPromise2')}</li>
              <li>{t('storyPromise3')}</li>
              <li>{t('storyPromise4')}</li>
              <li>{t('storyPromise5')}</li>
            </ul>
          </div>
          <div className="panel">
            <h3>{t('storyReady')}</h3>
            <p>{t('storyReadyText')}</p>
            <StoryForm states={states} selectedState={state} />
          </div>
        </div>
        <h3 style={{ marginTop: '2.5rem' }}>{t('storiesTitle')}</h3>
        {loading && <p role="status">{t('storiesLoading')}</p>}
        {!loading && !error && stories.length === 0 && <p className="empty">{t('storiesEmpty')}</p>}
        {stories.map((story) => (
          <article className="panel" key={story.id}>
            <p>{story.text}</p>
            <p className="note-sm">{story.author_name}{story.state ? ` · ${story.state}` : ''}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
