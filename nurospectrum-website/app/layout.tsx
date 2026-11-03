import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from 'next/font/google'
import type { ReactNode } from 'react'
import { AuthProvider } from '@/components/auth-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SiteProvider } from '@/context/site-context'
import { SITE_URL } from '@/lib/seo'
import './globals.css'

const bodyFont = Atkinson_Hyperlegible({ subsets: ['latin', 'latin-ext'], weight: ['400', '700'], variable: '--font-body', display: 'swap' })
const headFont = Bricolage_Grotesque({ subsets: ['latin', 'latin-ext'], variable: '--font-head', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: 'Nurospectrum: a Nigeria that works with and for neurodivergent minds',
    template: '%s · Nurospectrum',
  },
  description: 'Nurospectrum is an education and community platform raising awareness of neurodiversity across Nigeria. Every mind is welcome here.',
  applicationName: 'Nurospectrum',
  category: 'education',
  creator: 'Nurospectrum',
  publisher: 'Nurospectrum',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Nurospectrum',
    title: 'Nurospectrum: a Nigeria that works with and for neurodivergent minds',
    description: 'Education, community and practical support for neurodivergent people and allies across Nigeria.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nurospectrum: a Nigeria that works with and for neurodivergent minds',
    description: 'Education, community and practical support for neurodivergent people and allies across Nigeria.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6F5' },
    { media: '(prefers-color-scheme: dark)', color: '#12111F' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': new URL('/#organization', SITE_URL).href,
        name: 'Nurospectrum',
        url: SITE_URL.href,
        description: 'An education and community platform raising awareness of neurodiversity across Nigeria.',
        areaServed: { '@type': 'Country', name: 'Nigeria' },
      },
      {
        '@type': 'WebSite',
        '@id': new URL('/#website', SITE_URL).href,
        name: 'Nurospectrum',
        url: SITE_URL.href,
        inLanguage: ['en', 'ha', 'yo', 'ig'],
        publisher: { '@id': new URL('/#organization', SITE_URL).href },
      },
    ],
  }

  return (
    <html lang="en" className={`${bodyFont.variable} ${headFont.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply a saved light/dark choice before the first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{var p=JSON.parse(localStorage.getItem('nurospectrum:prefs')||'{}');if(p.theme==='light'||p.theme==='dark')document.documentElement.setAttribute('data-theme',p.theme)}catch(e){}",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <AuthProvider>
          <SiteProvider>
            <SiteHeader />
            <main id="app" tabIndex={-1}>{children}</main>
            <SiteFooter />
          </SiteProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
