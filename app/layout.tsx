import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-sora',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'MUTUOM - Groupement d\'achat pour entreprises de nettoyage',
  description: 'Rendre aux entreprises de terrain le pouvoir d\'achat que leur taille leur refuse. 15 à 25% d\'économies sur vos achats professionnels.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
