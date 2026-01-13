'use client'

import { Button } from '@/components/Button'
import { useState } from 'react'
import { useAmbassadeurCount, getPricingTier } from '@/hooks/useAmbassadeurCount'

interface SimulatorProps {
  onCTAClick: () => void
}

export function Simulator({ onCTAClick }: SimulatorProps) {
  const [ca, setCA] = useState<number>(50000)
  const { count } = useAmbassadeurCount()
  const pricing = getPricingTier(count)

  const economies = Math.round(ca * 0.15)
  const economiesMonthly = Math.round(economies / 12)

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-6 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl">Combien pouvez-vous économiser ?</h2>
          <p className="text-center text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 sm:mb-12 lg:mb-16 leading-relaxed">
            Estimez vos économies avec MUTUOM (base 15%)
          </p>

          <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <label htmlFor="ca-slider" className="block text-white font-semibold mb-2 lg:mb-3 text-base lg:text-lg">
                Vos achats annuels :
              </label>
              <p className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6">
                <span id="ca-value">{ca.toLocaleString('fr-FR')}</span>€
              </p>

              <input
                type="range"
                id="ca-slider"
                min="10000"
                max="200000"
                step="5000"
                defaultValue="50000"
                className="w-full h-3 lg:h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-6 lg:mb-8"
                style={{
                  accentColor: '#C1663A'
                }}
                onInput={(e) => {
                  const value = parseInt((e.target as HTMLInputElement).value)
                  document.getElementById('ca-value')!.textContent = value.toLocaleString('fr-FR')
                  const savings = Math.round(value * 0.15)
                  document.getElementById('savings-annual')!.textContent = savings.toLocaleString('fr-FR')
                  document.getElementById('savings-monthly')!.textContent = Math.round(savings / 12).toLocaleString('fr-FR')
                }}
              />
              <div className="flex justify-between text-sm lg:text-base text-gray-300 px-1">
                <span>10k€</span>
                <span>100k€</span>
                <span>200k€</span>
              </div>
            </div>

            {/* Résultats */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10">
              <div className="bg-white/10 rounded-lg p-5 sm:p-6 lg:p-8 border border-white/20">
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-2 lg:mb-3">Vous économisez par an</p>
                <p id="savings-annual" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{economies.toLocaleString('fr-FR')}€</p>
              </div>

              <div className="bg-terracotta/20 rounded-lg p-5 sm:p-6 lg:p-8 border border-terracotta/30">
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-1 lg:mb-2">Soit par mois</p>
                <p id="savings-monthly" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-terracotta">{economiesMonthly.toLocaleString('fr-FR')}€</p>
              </div>
            </div>

            <div className="text-center mt-6 sm:mt-8 lg:mt-10">
              <Button onClick={onCTAClick} className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl w-full sm:w-auto">
                {pricing.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
