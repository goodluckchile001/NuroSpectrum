'use client'

import Link from 'next/link'
import { NAV } from '@/components/site-header'
import { useSite } from '@/context/site-context'

export function SiteFooter() {
  const { t, list } = useSite()
  const labels = list('nav')
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <p className="foot-name">Nurospectrum</p>
          <p className="foot-note">{t('ft')}</p>
        </div>
        <nav aria-label="Footer">
          {NAV.map((item, i) => <Link key={item.href} href={item.href}>{labels[i]}</Link>)}
          <Link href="/community#share-story">{t('sth')}</Link>
        </nav>
      </div>
    </footer>
  )
}
