'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useSite } from '@/context/site-context'
import { LANGUAGES } from '@/lib/site'

export const NAV = [
  { href: '/', section: '' },
  { href: '/blog', section: 'blog' },
  { href: '/community', section: 'community' },
  { href: '/library', section: 'library' },
  { href: '/partners', section: 'partners' },
]

const icon = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
}
const MoonIcon = () => <svg {...icon}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
const SunIcon = () => (
  <svg {...icon}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export function SiteHeader() {
  const { t, list, lang, setLang, resolvedTheme, toggleTheme } = useSite()
  const { profile, loading, error } = useAuth()
  const pathname = usePathname() || '/'
  const current = pathname.split('/')[1] ?? ''
  const labels = list('nav')
  const [open, setOpen] = useState(false)
  const changeLanguage = (value: string) => {
    const index = Number(value)
    if (Number.isInteger(index) && index >= 0 && index < LANGUAGES.length) setLang(index)
  }

  // Close the mobile menu after navigating, and when Escape is pressed.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a className="skip" href="#app">{t('skip')}</a>
      <header>
        <div className="wrap bar">
          <Link className="logo" href="/">Nurospectrum</Link>
          <div className="header-controls">
            <select className="lang" aria-label={t('language')} value={lang} onChange={(e) => changeLanguage(e.target.value)}>
              {LANGUAGES.map((l, i) => <option key={l.code} value={i}>{l.label}</option>)}
            </select>
            <button
              className="calm theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={resolvedTheme === 'dark' ? t('themeLight') : t('themeDark')}
              title={resolvedTheme === 'dark' ? t('themeLight') : t('themeDark')}
            >
              {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <span className="theme-label">{resolvedTheme === 'dark' ? t('themeLight') : t('themeDark')}</span>
            </button>
          </div>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen(!open)}
          >
            <span className="menu-label">{t('menu')}</span>
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
          <div id="site-nav" className="site-nav" data-open={open}>
            <nav aria-label={t('mainNav')}>
              {NAV.map((item, i) => (
                <Link key={item.href} href={item.href} aria-current={current === item.section ? 'page' : undefined}>
                  {labels[i]}
                </Link>
              ))}
            </nav>
            <div className="tools">
              {profile ? (
                <Link className="calm" href="/logout">{t('signout')}</Link>
              ) : !loading ? (
                <Link className="signin" href="/login">{t('signin')}</Link>
              ) : null}
            </div>
          </div>
        </div>
        {error && <p className="wrap note-sm" role="status">{error}</p>}
      </header>
    </>
  )
}
