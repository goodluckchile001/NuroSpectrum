import type { Metadata } from 'next'
import { CommunityView } from '@/components/views/community-view'

export const metadata: Metadata = { title: 'Community' }

export default function Page() {
  return <CommunityView />
}
