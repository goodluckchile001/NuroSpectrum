'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { TurnstileWidget } from '@/components/turnstile-widget'
import { useSite } from '@/context/site-context'
import { apiErrorMessage, apiRequest } from '@/lib/api'

type Props = { states: string[]; selectedState: string }
const turnstileRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

export function StoryForm({ states, selectedState }: Props) {
  const { t } = useSite()
  const [storyState, setStoryState] = useState(selectedState)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileVersion, setTurnstileVersion] = useState(0)

  useEffect(() => setStoryState(selectedState), [selectedState])

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
      await apiRequest<{ received: boolean }>('/stories', {
        method: 'POST',
        body: JSON.stringify({
          display_name: form.get('display_name'),
          is_anonymous: form.get('is_anonymous') === 'on',
          state: form.get('state') || '',
          text: form.get('text'),
          consent: form.get('consent') === 'on',
          website: form.get('website') || '',
          turnstile_token: turnstileToken,
        }),
      })
      formElement.reset()
      setTurnstileToken('')
      setTurnstileVersion((version) => version + 1)
      setMessage(t('storyThanks'))
    } catch (requestError) {
      setError(apiErrorMessage(requestError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form key={turnstileVersion} onSubmit={submit}>
      <label>
        {t('storyText')}
        <textarea name="text" required minLength={50} maxLength={5000} />
      </label>
      <label>
        {t('storyName')}
        <input name="display_name" maxLength={80} />
      </label>
      <label>
        {t('storyState')}
        <select
          name="state"
          value={states.includes(storyState) ? storyState : ''}
          onChange={(event) => setStoryState(event.target.value)}
        >
          <option value="">{t('storyPrefer')}</option>
          {states.map((state) => <option key={state} value={state}>{state}</option>)}
        </select>
      </label>
      <label className="chk">
        <input name="is_anonymous" type="checkbox" />
        {t('storyAnonymous')}
      </label>
      <label className="chk">
        <input name="consent" type="checkbox" required />
        {t('storyConsent')}
      </label>
      <TurnstileWidget key={turnstileVersion} onToken={setTurnstileToken} />
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px' }}
      />
      <button className="btn" type="submit" disabled={busy}>
        {busy ? t('storySending') : t('storySubmit')}
      </button>
      {message && <p className="out" role="status">{message}</p>}
      {error && <p className="out" role="alert">{error}</p>}
    </form>
  )
}
