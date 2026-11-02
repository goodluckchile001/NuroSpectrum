'use client'

import { useState, type FormEvent } from 'react'
import { TurnstileWidget } from '@/components/turnstile-widget'
import { useSite } from '@/context/site-context'
import { apiErrorMessage, apiRequest } from '@/lib/api'

const turnstileRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

export function PartnerInquiryForm() {
  const { t, list } = useSite()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileVersion, setTurnstileVersion] = useState(0)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    setBusy(true)
    setMessage('')
    setError('')
    if (turnstileRequired && !turnstileToken) {
      setError(t('humanVerify'))
      setBusy(false)
      return
    }
    const form = new FormData(formElement)
    try {
      await apiRequest<{ received: boolean }>('/partner-inquiries', {
        method: 'POST',
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          organisation: form.get('organisation'),
          kind: form.get('kind'),
          message: form.get('message'),
          website: form.get('website') || '',
          turnstile_token: turnstileToken,
        }),
      })
      formElement.reset()
      setTurnstileToken('')
      setTurnstileVersion((version) => version + 1)
      setMessage(t('partnerThanks'))
    } catch (requestError) {
      setError(apiErrorMessage(requestError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <label>
        {t('partnerName')}
        <input name="name" required maxLength={120} />
      </label>
      <label>
        {t('fe')}
        <input name="email" type="email" required />
      </label>
      <label>
        {t('partnerOrgOptional')}
        <input name="organisation" maxLength={160} />
      </label>
      <label>
        {t('partnerHow')}
        <select name="kind" required defaultValue="partner">
          {list('io').map((label, index) => {
            const value = ['partner', 'invest', 'contribute'][index]
            return value ? <option key={value} value={value}>{label}</option> : null
          })}
        </select>
      </label>
      <label>
        {t('fm')}
        <textarea name="message" required maxLength={5000} />
      </label>
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px' }}
      />
      <TurnstileWidget key={turnstileVersion} onToken={setTurnstileToken} />
      <button className="btn" type="submit" disabled={busy}>
        {busy ? t('partnerSending') : t('partnerSubmit')}
      </button>
      {message && <p className="out" role="status">{message}</p>}
      {error && <p className="out" role="alert">{error}</p>}
    </form>
  )
}
