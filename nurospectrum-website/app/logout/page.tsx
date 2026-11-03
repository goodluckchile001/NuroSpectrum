import type { Metadata } from 'next'
import { LogoutView } from '@/components/views/logout-view'

export const metadata: Metadata = {
  title: 'Sign out',
  description: 'Sign out of your Nurospectrum account.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <LogoutView />
}
