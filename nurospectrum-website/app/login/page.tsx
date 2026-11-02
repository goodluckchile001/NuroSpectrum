import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginView } from '@/components/views/login-view'

export const metadata: Metadata = { title: 'Sign in', robots: { index: false } }

export default function Page() {
  // useSearchParams (inside LoginView) needs a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <LoginView />
    </Suspense>
  )
}
