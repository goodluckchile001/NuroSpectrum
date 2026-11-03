import type { Metadata } from 'next'
import { CommunityView } from '@/components/views/community-view'

export const metadata: Metadata = {
  title: 'Neurodiversity community',
  description: 'Find state-based neurodiversity communities across Nigeria, connect with others and share your story.',
  alternates: { canonical: '/community' },
  openGraph: {
    title: 'Find your people, in your state · Nurospectrum',
    description: 'Connect with neurodivergent people, families and allies in communities across Nigeria.',
    url: '/community',
  },
}

export default function Page() {
  return <CommunityView />
}
