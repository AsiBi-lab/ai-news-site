import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './providers'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { GradientSpheres } from '@/components/layout/GradientSpheres'
import { CookieConsent } from '@/components/CookieConsent'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AI Deck - Find the Perfect AI Tool',
    template: '%s | AI Deck',
  },
  description:
    'Discover thousands of AI tools organized by purpose, profession, and use case. Stop endless searching - find the right AI tool in seconds.',
  keywords: [
    'AI tools',
    'AI directory',
    'artificial intelligence tools',
    'AI tool finder',
    'best AI tools',
    'AI software',
    'ChatGPT alternatives',
    'AI for productivity',
    'AI for marketing',
    'AI for developers',
    'AI tool comparison',
    'find AI tools',
  ],
  authors: [{ name: 'AI Deck Team' }],
  creator: 'AI Deck',
  publisher: 'AI Deck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'AI Deck',
    title: 'AI Deck - Find the Perfect AI Tool',
    description:
      'Discover thousands of AI tools organized by purpose, profession, and use case. Stop endless searching - find the right AI tool in seconds.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AI Deck - Your AI Tools Discovery Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Deck - Find the Perfect AI Tool',
    description:
      'Discover thousands of AI tools organized by purpose, profession, and use case.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': `${BASE_URL}/feed.xml`,
    },
  },
}

// WebSite Schema for Google Sitelinks Search Box
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Deck',
  url: BASE_URL,
  description:
    'Discover thousands of AI tools organized by purpose, profession, and use case.',
  publisher: {
    '@type': 'Organization',
    name: 'AI Deck',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Deck',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://twitter.com/aideck',
    'https://youtube.com/@aideck',
    'https://linkedin.com/company/aideck',
  ],
  foundingDate: '2025',
  description:
    'AI Deck is an AI tools discovery platform helping you find the perfect AI solution for any task.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <Providers>
          {/* Skip to main content link for keyboard/screen reader users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <GradientSpheres />
          <Header />
          <main id="main-content" className="flex-1 relative z-10" tabIndex={-1}>{children}</main>
          <Footer />
          <CookieConsent />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
