import type { Metadata } from 'next'
import { BlogView } from '@/components/views/blog-view'

export const metadata: Metadata = { title: 'Blog' }

export default function Page() {
  return <BlogView />
}
