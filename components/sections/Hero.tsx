'use client'

import { Button } from '@/components/Button'
import { AmbassadeurBadge } from '@/components/AmbassadeurBadge'
import Image from 'next/image'

interface HeroProps {
  onCTAClick: () => void
}

export function Hero({ onCTAClick }: HeroProps) {

  return (
    <section className="relative bg-white border-b border-gray-100">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="MUTUOM" width={48} height={48} className="h-12 md:h-16 xl:h-20 w-auto" />
        </div>
        <a href="/fournisseur">
          <Button variant="secondary" className="text-sm lg:text-base hidden sm:inline-flex">
            Espace Fournisseur
          </Button>
        </a>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-24 lg:py-32 xl:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy mb-6 lg:mb-8 leading-tight">
            Achetez comme les grands.
            <br />
            <span className="text-forest">Restez indépendant.</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 lg:mb-12 leading-relaxed px-4 sm:px-0 max-w-3xl mx-auto">
            Le groupement d'achat qui rend aux entreprises de nettoyage
            <br className="hidden sm:block" />
            le pouvoir d'achat que leur taille leur refuse.
          </p>

          <div className="inline-block bg-forest/10 border border-forest/20 rounded-lg px-6 sm:px-8 lg:px-10 py-4 lg:py-5 mb-10 lg:mb-12">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-sora font-bold text-navy">
              15 à 25% d'économies
            </p>
            <p className="text-sm lg:text-base text-gray-600 mt-1">en moyenne sur vos achats</p>
          </div>

          <div className="mb-8 lg:mb-10 max-w-md mx-auto">
            <AmbassadeurBadge />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onCTAClick} className="text-base lg:text-lg px-10 lg:px-12 py-4 lg:py-5">
              Réserver ma place
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
