'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '@/components/auth-provider'
import { csrfToken, responseErrorMessage } from '@/lib/api'
import { useSite } from '@/context/site-context'
import { googleSignInEnabled } from '@/lib/site'

/** Only allow same-site paths, and never bounce back to the auth pages. */
function safePath(path: string | null) {
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.startsWith('/login') || path.startsWith('/logout')) return '/'
  return path
}

function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

type AuthMode = 'login' | 'signup'

export function LoginView() {
  const { t } = useSite()
  const { profile, refresh } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const next = safePath(params.get('callbackUrl'))
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (profile) router.replace(next)
  }, [profile, next, router])

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode)
    setError('')
    setSuccess('')
  }

  async function submitCredentials(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (mode === 'signup' && password !== passwordConfirm) {
      setError(t('passwordMismatch'))
      return
    }

    setBusy(true)
    try {
      const csrf = await csrfToken()
      const response = await fetch(`/_allauth/browser/v1/auth/${mode}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        body: JSON.stringify({ email, password }),
      })

      if (mode === 'signup' && response.status === 401) {
        setSuccess(t('signupCheckEmail'))
        setMode('login')
        setPassword('')
        setPasswordConfirm('')
        return
      }

      if (!response.ok) {
        if (mode === 'login' && response.status === 401) {
          setError(t('verifyBeforeLogin'))
        } else {
          setError(await responseErrorMessage(response))
        }
        return
      }

      await refresh()
      router.replace(next)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : t('liErr'))
    } finally {
      setBusy(false)
    }
  }

  async function signInWithGoogle() {
    setBusy(true)
    setError('')
    try {
      const csrf = await csrfToken()
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = '/_allauth/browser/v1/auth/provider/redirect'
      for (const [name, value] of Object.entries({
        provider: 'google',
        process: 'login',
        callback_url: next,
        csrfmiddlewaretoken: csrf,
      })) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      }
      document.body.appendChild(form)
      form.submit()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : t('liErr'))
      setBusy(false)
    }
  }

  return (
    <div className="wrap">
      <section className="sec">
        <h1>{mode === 'signup' ? t('createAccount') : t('signin')}</h1>
        <p className="lede">{t('liP')}</p>
        {(params.get('error') || error) && <div className="note" role="alert">{error || t('liErr')}</div>}
        {success && <div className="note" role="status">{success}</div>}

        <div className="panel auth-panel">
          <div className="auth-modes" role="group" aria-label={t('signin')}>
            <button type="button" className={mode === 'login' ? 'auth-mode active' : 'auth-mode'} aria-pressed={mode === 'login'} onClick={() => changeMode('login')}>
              {t('loginSubmit')}
            </button>
            <button type="button" className={mode === 'signup' ? 'auth-mode active' : 'auth-mode'} aria-pressed={mode === 'signup'} onClick={() => changeMode('signup')}>
              {t('createAccount')}
            </button>
          </div>

          <form onSubmit={submitCredentials}>
            <label>
              {t('emailLabel')}
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              {t('passwordLabel')}
              <input
                type="password"
                name="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {mode === 'signup' && (
              <label>
                {t('confirmPassword')}
                <input
                  type="password"
                  name="password-confirm"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                />
              </label>
            )}
            <button className="btn auth-submit" type="submit" disabled={busy}>
              {busy ? t('authWorking') : mode === 'signup' ? t('signupSubmit') : t('loginSubmit')}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'signup' ? t('haveAccount') : t('needAccount')}
            {' '}
            <button type="button" onClick={() => changeMode(mode === 'signup' ? 'login' : 'signup')}>
              {mode === 'signup' ? t('loginSubmit') : t('createAccount')}
            </button>
          </p>

          {googleSignInEnabled && (
            <>
              <div className="auth-divider"><span>{t('orContinueWith')}</span></div>
              <button className="btn gbtn auth-google" type="button" disabled={busy} onClick={signInWithGoogle}>
                <GoogleG />
                {busy ? t('liBusy') : t('liBtn')}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
