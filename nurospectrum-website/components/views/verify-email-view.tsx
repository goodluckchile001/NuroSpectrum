'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { csrfToken, responseErrorMessage } from '@/lib/api'
import { useSite } from '@/context/site-context'

type Props = { verificationKey: string }

export function VerifyEmailView({ verificationKey }: Props) {
  const { t } = useSite()
  const { refresh } = useAuth()
  const [busy, setBusy] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  async function verifyEmail() {
    setBusy(true)
    setError('')
    try {
      const csrf = await csrfToken()
      const response = await fetch('/_allauth/browser/v1/auth/email/verify', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        body: JSON.stringify({ key: verificationKey }),
      })
      if (!response.ok) throw new Error(await responseErrorMessage(response))
      await refresh()
      setVerified(true)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : t('verifyEmailError'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="wrap">
      <section className="sec">
        <h1>{t('verifyEmail')}</h1>
        <div className="panel auth-panel">
          {verified ? (
            <>
              <p role="status">{t('verifyEmailSuccess')}</p>
              <Link className="btn" href="/login">{t('loginSubmit')}</Link>
            </>
          ) : (
            <>
              <p>{t('verifyEmailPrompt')}</p>
              {error && <p className="note" role="alert">{error}</p>}
              <button className="btn" type="button" disabled={busy} onClick={verifyEmail}>
                {busy ? t('verifyEmailWorking') : t('verifyEmail')}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
