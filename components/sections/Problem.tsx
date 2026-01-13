import { TrendingDown, TrendingUp, Users } from 'lucide-react'

export function Problem() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-6 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl">Pourquoi vous payez plus cher ?</h2>

          <p className="text-center text-lg sm:text-xl lg:text-2xl text-gray-600 mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto leading-relaxed">
            Une société de 8 salariés paie{' '}
            <span className="font-semibold text-terracotta">40% plus cher</span> qu'un groupe national.{' '}
            <span className="block mt-2">Même fournisseur, même produit.</span>
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Vous (TPE) */}
            <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 border-2 border-terracotta/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <TrendingDown className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-terracotta" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl">Vous (TPE)</h3>
              </div>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">Prix catalogue</p>
              <div className="bg-terracotta/10 rounded-lg p-4 lg:p-6">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-terracotta">100€</p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">le carton de 250 sacs</p>
              </div>
            </div>

            {/* Eux (Grands groupes) */}
            <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 border-2 border-forest/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-forest" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl">Eux (Grands groupes)</h3>
              </div>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">Conditions négociées</p>
              <div className="bg-forest/10 rounded-lg p-4 lg:p-6">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-forest">60€</p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">le carton de 250 sacs</p>
              </div>
            </div>

            {/* MUTUOM */}
            <div className="bg-navy rounded-lg p-6 sm:p-8 lg:p-10 border-2 border-navy shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl text-white">MUTUOM</h3>
              </div>
              <p className="text-gray-300 mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">Conditions grand compte accessibles</p>
              <div className="bg-white/10 rounded-lg p-4 lg:p-6 border border-white/20">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">65€</p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 mt-1">le carton de 250 sacs</p>
              </div>
              <p className="text-forest font-semibold mt-4 lg:mt-6 text-center text-base lg:text-lg">35€ d'économies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
