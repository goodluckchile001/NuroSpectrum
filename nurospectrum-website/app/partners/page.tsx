import type { Metadata } from 'next'
import { PartnersView } from '@/components/views/partners-view'

export const metadata: Metadata = { title: 'Partner with us' }

export default function Page() {
  return <PartnersView />
}
