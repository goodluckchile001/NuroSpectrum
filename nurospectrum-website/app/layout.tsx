import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from 'next/font/google'
import type { ReactNode } from 'react'
import { AuthProvider } from '@/components/auth-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SiteProvider } from '@/context/site-context'
import './globals.css'

const bodyFont = Atkinson_Hyperlegible({ subsets: ['latin', 'latin-ext'], weight: ['400', '700'], variable: '--font-body', display: 'swap' })
const headFont = Bricolage_Grotesque({ subsets: ['latin', 'latin-ext'], variable: '--font-head', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Nurospectrum: a Nigeria that works with and for neurodivergent minds',
    template: '%s · Nurospectrum',
  },
  description: 'Nurospectrum is an education and community platform raising awareness of neurodiversity across Nigeria. Every mind is welcome here.',
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
