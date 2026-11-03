import type { Metadata } from 'next'
import { BlogView } from '@/components/views/blog-view'

export const metadata: Metadata = {
  title: 'Neurodiversity blog',
  description: 'Read clear, evidence-informed articles about neurodiversity, education, work and family support in Nigeria.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Neurodiversity blog · Nurospectrum',
    description: 'Clear, evidence-informed articles about neurodiversity, education, work and family support.',
    url: '/blog',
  },
}

export default function Page() {
  return <BlogView />
}
