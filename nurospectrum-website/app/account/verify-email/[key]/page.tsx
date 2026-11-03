import type { Metadata } from 'next'
import { VerifyEmailView } from '@/components/views/verify-email-view'

type Props = { params: Promise<{ key: string }> }

export const metadata: Metadata = {
  title: 'Verify your email',
  robots: { index: false, follow: false },
}

export default async function Page({ params }: Props) {
  const { key } = await params
  return <VerifyEmailView verificationKey={key} />
}
