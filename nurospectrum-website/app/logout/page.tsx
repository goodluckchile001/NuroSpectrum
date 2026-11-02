import type { Metadata } from 'next'
import { LogoutView } from '@/components/views/logout-view'

export const metadata: Metadata = { title: 'Sign out', robots: { index: false } }

export default function Page() {
  return <LogoutView />
}
