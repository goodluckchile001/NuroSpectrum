'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { apiErrorMessage, csrfToken } from '@/lib/api'
import { useSite } from '@/context/site-context'

export function LogoutView() {
  const { t, fmt } = useSite()
  const { profile, loading, refresh } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const name = profile?.name || profile?.email || ''

  return (
    <div className="wrap">
      <section className="sec">
        <h1>{t('signout')}</h1>
        {loading ? null : profile ? (
          <>
            <p className="lede">{fmt('loP', { n: name })}</p>
            {error && <p className="note" role="alert">{error}</p>}
            <div className="cta">
              <button
                className="btn"
                type="button"
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  setError('')
                  try {
                    const csrf = await csrfToken()
                    const response = await fetch('/_allauth/browser/v1/auth/session', {
                      method: 'DELETE',
                      credentials: 'same-origin',
                      headers: { 'X-CSRFToken': csrf },
                    })
                    if (!response.ok) throw new Error(`Could not sign out (HTTP ${response.status}).`)
                    await refresh()
                    router.replace('/')
                  } catch (requestError) {
                    setError(apiErrorMessage(requestError))
                    setBusy(false)
                  }
                }}
              >
                {t('signout')}
              </button>
              <Link className="btn alt" href="/">{t('loStay')}</Link>
            </div>
          </>
        ) : (
          <>
            <p className="lede">{t('loNone')}</p>
            <div className="cta"><Link className="btn" href="/login">{t('signin')}</Link></div>
          </>
        )}
      </section>
    </div>
  )
}
