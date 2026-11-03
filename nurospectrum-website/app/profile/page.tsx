import type { Metadata } from 'next'
import { ProfileView } from '@/components/views/profile-view'

export const metadata: Metadata = {
  title: 'Your profile',
  description: 'View and update your Nurospectrum profile.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProfileView />
}
