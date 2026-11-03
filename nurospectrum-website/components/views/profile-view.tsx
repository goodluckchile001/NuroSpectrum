'use client'

import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useSite } from '@/context/site-context'
import { ApiError, apiErrorMessage, apiRequest, type ApiProfile } from '@/lib/api'
import { STATES } from '@/lib/content'
import { LANGUAGES } from '@/lib/site'

const ROLES = ['neurodivergent', 'family', 'professional', 'ally']

export function ProfileView() {
  const { t, list, setLang } = useSite()
  const { profile, loading, refresh } = useAuth()
  const router = useRouter()
  const [state, setState] = useState('')
  const [language, setLanguage] = useState('en')
  const [role, setRole] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const roleLabels = list('roles')
  const initials = profile?.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toLocaleUpperCase() || '?'

  useEffect(() => {
    if (!profile) return
    setState(profile.state)
    setLanguage(profile.language)
    setRole(profile.role)
  }, [profile])

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setSaved(false)
    try {
      const updated = await apiRequest<ApiProfile>('/me', {
        method: 'PATCH',
        body: JSON.stringify({ state, language, role }),
      })
      await refresh()
      const languageIndex = LANGUAGES.findIndex((item) => item.code === updated.language)
      if (languageIndex >= 0) setLang(languageIndex)
      setSaved(true)
    } catch (requestError) {
      if (requestError instanceof ApiError && [401, 403].includes(requestError.status)) {
        router.replace('/login?callbackUrl=%2Fprofile')
        return
      }
      setError(apiErrorMessage(requestError))
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return <div className="wrap sec" role="status">{t('profileLoading')}</div>
  }

  if (!profile) {
    return (
      <div className="wrap">
        <section className="sec profile-locked">
          <div className="profile-kicker">{t('profileKicker')}</div>
          <h1>{t('profileTitle')}</h1>
          <p className="lede">{t('profileSignIn')}</p>
          <Link className="btn" href="/login?callbackUrl=%2Fprofile">{t('signin')}</Link>
        </section>
      </div>
    )
  }

  return (
    <div className="wrap">
      <section className="sec profile-page">
        <div className="profile-heading">
          <div className="profile-kicker">{t('profileKicker')}</div>
          <h1>{t('profileTitle')}</h1>
          <p className="lede">{t('profileIntro')}</p>
        </div>

        <div className="profile-layout">
          <div className="profile-sidebar">
            <section className="panel profile-summary" aria-label={t('profileTitle')}>
              <div className="profile-identity">
                <div className="profile-avatar" aria-hidden="true">{initials}</div>
                <div className="profile-identity-copy">
                  <h2>{profile.name}</h2>
                  <p>{profile.email}</p>
                </div>
              </div>
              <div className="profile-status"><span aria-hidden="true" />{t('profileSignedIn')}</div>

              <div className="profile-community">
                <div className="profile-section-heading">
                  <h3>{t('profileCommunities')}</h3>
                  <span>{profile.communities.length}</span>
                </div>
                {profile.communities.length ? (
                  <ul className="profile-community-list">
                    {profile.communities.map((community) => <li key={community}>{community}</li>)}
                  </ul>
                ) : (
                  <p className="profile-empty">{t('profileNoCommunities')}</p>
                )}
                <Link className="profile-community-link" href="/community">
                  {t('profileBrowseCommunities')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </section>
            <p className="profile-privacy">{t('profilePrivacy')}</p>
          </div>

          <section className="panel profile-edit">
            <div className="profile-edit-heading">
              <div>
                <span className="profile-kicker">{t('profilePreferences')}</span>
                <h2>{t('profileDetails')}</h2>
              </div>
              <span className="profile-edit-mark" aria-hidden="true">✦</span>
            </div>
            <p className="profile-form-intro">{t('profileFormIntro')}</p>
            {error && <p className="note" role="alert">{error}</p>}
            {saved && <p className="profile-success" role="status"><span aria-hidden="true">✓</span>{t('profileSaved')}</p>}
            <form className="profile-form" onSubmit={saveProfile}>
              <label>
                {t('profileState')}
                <select value={state} onChange={(event) => setState(event.target.value)}>
                  <option value="">{t('profileStateChoose')}</option>
                  {STATES.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              </label>
              <label>
                {t('language')}
                <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                  {LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
                </select>
              </label>
              <label className="profile-role-field">
                {t('communityRole')}
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="">{t('roleChoose')}</option>
                  {ROLES.map((value, index) => <option key={value} value={value}>{roleLabels[index]}</option>)}
                </select>
              </label>
              <div className="profile-form-actions">
                <button className="btn" type="submit" disabled={busy}>
                  {busy ? t('profileSaving') : t('profileSave')}
                </button>
                <button
                  className="profile-reset"
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setState(profile.state)
                    setLanguage(profile.language)
                    setRole(profile.role)
                    setError('')
                    setSaved(false)
                  }}
                >
                  {t('profileDiscard')}
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  )
}
