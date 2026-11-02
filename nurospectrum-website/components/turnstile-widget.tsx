'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { useSite } from '@/context/site-context'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
      }) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const { t } = useSite()
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef('')
  const [scriptReady, setScriptReady] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!siteKey || !scriptReady || !container.current || !window.turnstile) return
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      callback: (token) => {
        setError('')
        onToken(token)
      },
      'expired-callback': () => onToken(''),
      'error-callback': () => {
        onToken('')
        setError(t('humanLoadError'))
      },
    })
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
    }
  }, [onToken, scriptReady, t])

  if (!siteKey) return null
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setError(t('humanLoadError'))}
      />
      <div ref={container} />
      {error && <p className="out" role="alert">{error}</p>}
    </>
  )
}
