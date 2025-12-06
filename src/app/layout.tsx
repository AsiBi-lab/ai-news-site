import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './providers'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AI News - Latest in Artificial Intelligence',
    template: '%s | AI News',
  },
  description:
    'Your trusted source for AI news, breakthroughs, tutorials, and tool reviews. Stay ahead with daily updates on artificial intelligence, machine learning, and emerging tech.',
  keywords: [
    'AI news',
    'artificial intelligence',
    'machine learning',
    'deep learning',
    'AI tools',
    'AI tutorials',
    'ChatGPT',
    'GPT',
    'LLM',
    'generative AI',
    'AI industry',
    'tech news',
  ],
  authors: [{ name: 'AI News Team' }],
  creator: 'AI News',
  publisher: 'AI News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'AI News',
    title: 'AI News - Latest in Artificial Intelligence',
    description:
      'Your trusted source for AI news, breakthroughs, tutorials, and tool reviews. Stay ahead with daily updates on artificial intelligence and emerging tech.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AI News - Your Source for Artificial Intelligence News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI News - Latest in Artificial Intelligence',
    description:
      'Your trusted source for AI news, breakthroughs, tutorials, and tool reviews.',
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
  name: 'AI News',
  url: BASE_URL,
  description:
    'Your trusted source for AI news, breakthroughs, tutorials, and tool reviews.',
  publisher: {
    '@type': 'Organization',
    name: 'AI News',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
    },
  },
}

// NewsMediaOrganization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: 'AI News',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://twitter.com/ainews',
    'https://github.com/ainews',
    'https://linkedin.com/company/ainews',
  ],
  masthead: `${BASE_URL}/about`,
  foundingDate: '2025',
  description:
    'AI News is a leading publication covering artificial intelligence news, tutorials, and tool reviews.',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
