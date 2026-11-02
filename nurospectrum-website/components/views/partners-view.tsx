'use client'

import { PartnerInquiryForm } from '@/components/forms/partner-inquiry-form'
import { useSite } from '@/context/site-context'
import { cv } from '@/lib/site'

const GROUPS = [
  { n: 1, tone: 'green' as const },
  { n: 2, tone: 'gold' as const },
  { n: 3, tone: 'rose' as const },
]

export function PartnersView() {
  const { t } = useSite()
  return (
    <div className="wrap">
      <section className="sec">
        <h1>{t('ph')}</h1>
        <p className="lede">{t('pl')}</p>
      </section>
      <section className="paths">
        {GROUPS.map(({ n, tone }) => (
          <div className="path" style={cv(tone)} key={n}>
            <h3>{t(`q${n}t`)}</h3>
            <p>{t(`q${n}d`)}</p>
          </div>
        ))}
      </section>
      <section className="sec">
        <h2>{t('sh')}</h2>
        <p className="lede">{t('partnerIntro')}</p>
        <PartnerInquiryForm />
      </section>
    </div>
  )
}
