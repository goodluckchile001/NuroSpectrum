'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LISTS, STATES, TEXT } from '@/lib/content'
import { LANGUAGES } from '@/lib/site'

type SiteContextValue = {
  lang: number
  setLang: (index: number) => void
  /** 'light' or 'dark' when the visitor chose one; null means follow the device setting. */
  theme: 'light' | 'dark' | null
  /** The theme actually showing right now. */
  resolvedTheme: 'light' | 'dark'
  toggleTheme: () => void
  state: string
  setState: (name: string) => void
  /** Translated string, falling back to English. */
  t: (key: string) => string
  /** Translated string with {placeholders} filled in. */
  fmt: (key: string, values: Record<string, string>) => string
  /** Translated list (e.g. nav labels), falling back to English. */
  list: (key: string) => string[]
}

const SiteContext = createContext<SiteContextValue | undefined>(undefined)
const STORAGE_KEY = 'nurospectrum:prefs'

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)
  const [systemDark, setSystemDark] = useState(false)
  const [state, setState] = useState('')
  const [ready, setReady] = useState(false)

  // Restore saved preferences once, then start saving.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
      if (Number.isInteger(saved.lang) && saved.lang >= 0 && saved.lang < LANGUAGES.length) setLang(saved.lang)
      if (saved.theme === 'light' || saved.theme === 'dark') setTheme(saved.theme)
      if (typeof saved.state === 'string' && STATES.includes(saved.state)) setState(saved.state)
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, theme, state }))
    } catch {}
  }, [ready, lang, theme, state])

  useEffect(() => {
    document.documentElement.lang = LANGUAGES[lang].code
  }, [lang])

  // Follow the device's light/dark setting until the visitor picks one.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemDark(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  // Apply the chosen theme. (An inline script in layout.tsx sets it before first paint.)
  useEffect(() => {
    if (!ready) return
    if (theme) document.documentElement.setAttribute('data-theme', theme)
    else document.documentElement.removeAttribute('data-theme')
  }, [ready, theme])

  const resolvedTheme: 'light' | 'dark' = theme ?? (systemDark ? 'dark' : 'light')
  const toggleTheme = useCallback(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'), [resolvedTheme])

  const t = useCallback((key: string) => TEXT[key]?.[lang] || TEXT[key]?.[0] || '', [lang])
  const fmt = useCallback(
    (key: string, values: Record<string, string>) =>
      Object.entries(values).reduce((out, [k, v]) => out.replace(`{${k}}`, v), t(key)),
    [t],
  )
  const list = useCallback((key: string) => LISTS[key]?.[lang] || LISTS[key]?.[0] || [], [lang])

  const value = useMemo(
    () => ({ lang, setLang, theme, resolvedTheme, toggleTheme, state, setState, t, fmt, list }),
    [lang, theme, resolvedTheme, toggleTheme, state, t, fmt, list],
  )
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) throw new Error('useSite must be used within a SiteProvider')
  return context
}
