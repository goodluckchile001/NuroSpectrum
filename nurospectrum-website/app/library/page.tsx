import type { Metadata } from 'next'
import { LibraryView } from '@/components/views/library-view'

export const metadata: Metadata = {
  title: 'Neurodiversity library',
  description: 'Explore trusted neurodiversity articles, research, books, videos and creative resources.',
  alternates: { canonical: '/library' },
  openGraph: {
    title: 'Neurodiversity library · Nurospectrum',
    description: 'Trusted articles, research, books, videos and creative resources about neurodiversity.',
    url: '/library',
  },
}

export default function Page() {
  return <LibraryView />
}
