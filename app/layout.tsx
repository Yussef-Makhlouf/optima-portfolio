import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { LogoLoader } from '@/components/ui/LogoLoader'

export const metadata: Metadata = {
  metadataBase: new URL('https://optima.dev'),
  title: {
    default: 'OPTIMA Digital Transformations | Yussef Makhlouf Ali',
    template: '%s | OPTIMA',
  },
  description:
    '54 production-grade projects across UAE, Kuwait, Saudi Arabia, Jordan & Egypt — Full-Stack Development, UX Design, AI Solutions for Gulf-market enterprises. نُبنى معك، لا لك فقط.',
  keywords: [
    'OPTIMA', 'Digital Transformations', 'Full Stack Development', 'UX Design',
    'Gulf Market', 'UAE', 'Saudi Arabia', 'Kuwait', 'Jordan', 'Egypt',
    'Next.js', 'React', 'TypeScript', 'E-Commerce', 'Enterprise Portals',
    'AI Solutions', 'Arabic RTL', 'Bilingual Websites', 'Yussef Makhlouf',
  ],
  authors: [{ name: 'Yussef Makhlouf Ali', url: 'https://optima.dev' }],
  creator: 'Yussef Makhlouf Ali',
  publisher: 'OPTIMA Digital Transformations',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: 'OPTIMA Digital Transformations',
    description: '54 production projects. Gulf-market expertise across UAE, KSA, Kuwait & Jordan.',
    type: 'website',
    locale: 'en_US',
    siteName: 'OPTIMA Digital Transformations',
    url: 'https://optima.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPTIMA Digital Transformations',
    description: 'Full-stack development & UX design for Gulf-market enterprises. 54 production projects.',
    creator: '@YussefMakhlouf',
  },
  alternates: { canonical: 'https://optima.dev' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0E1A" />
      </head>
      <body className="bg-off-white text-navy antialiased dark:bg-navy dark:text-off-white">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          <LogoLoader />
          <Navbar />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
