import type { Metadata } from 'next'
import { PartnersView } from '@/components/views/partners-view'

export const metadata: Metadata = {
  title: 'Partner with Nurospectrum',
  description: 'Partner, fund, or contribute your skills to inclusive neurodiversity education and community work in Nigeria.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Build this with us · Nurospectrum',
    description: 'Work with Nurospectrum to build inclusive neurodiversity education and community programmes across Nigeria.',
    url: '/partners',
  },
}

export default function Page() {
  return <PartnersView />
}
