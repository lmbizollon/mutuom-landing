import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import { StructuredData } from '@/components/StructuredData'
import { Analytics } from '@vercel/analytics/react'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mutuom.com'),
  title: {
    default: 'MUTUOM — Groupement d\'achat pour entreprises de nettoyage',
    template: '%s | MUTUOM'
  },
  description: 'Groupement d\'achat professionnel pour entreprises de nettoyage en Auvergne-Rhône-Alpes. Économisez 15 à 25% sur vos achats de consommables. Les 15 premiers adhérents gratuits à vie.',
  keywords: [
    'groupement achat',
    'centrale achat nettoyage',
    'économies achats TPE',
    'fournitures nettoyage',
    'consommables professionnels',
    'Auvergne-Rhône-Alpes',
    'Lyon',
    'réduction achats professionnels',
    'mutualisation achats',
    'GPO France'
  ],
  authors: [{ name: 'MUTUOM' }],
  creator: 'MUTUOM',
  publisher: 'MUTUOM',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mutuom.com',
    siteName: 'MUTUOM',
    title: 'MUTUOM — Groupement d\'achat pour entreprises de nettoyage',
    description: 'Économisez 15 à 25% sur vos achats de consommables. Rejoignez le groupement d\'achat professionnel en Auvergne-Rhône-Alpes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MUTUOM - Groupement d\'achat professionnel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUTUOM — Groupement d\'achat pour entreprises de nettoyage',
    description: 'Économisez 15 à 25% sur vos achats de consommables professionnels.',
    images: ['/og-image.png'],
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
    canonical: 'https://mutuom.com',
  },
  verification: {
    google: 'google-site-verification=62LPmFNdmacnDZQNySlpyT_Uz-PEFs3ZTVpPeEzFciY', // À remplacer lors de la configuration Google Search Console
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <meta name="google-site-verification" content="62LPmFNdmacnDZQNySlpyT_Uz-PEFs3ZTVpPeEzFciY" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A2E4D" />
      </head>
      <body className={inter.className}>
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
