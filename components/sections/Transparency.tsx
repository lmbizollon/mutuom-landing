import { Users } from 'lucide-react'

export function Transparency() {
  return (
    <section className="bg-navy py-16 sm:py-24 lg:py-32 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 lg:mb-10">
            <div className="bg-forest/20 p-4 lg:p-6 rounded-full">
              <Users className="w-12 h-12 lg:w-16 lg:h-16 text-forest" />
            </div>
          </div>

          <h2 className="text-white mb-8 lg:mb-10 text-3xl sm:text-4xl lg:text-5xl">L'union fait la force</h2>

          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed">
            Ensemble, nous obtenons les conditions que les grands groupes négocient.
            <br className="hidden sm:block" />
            Seuls, nous payons le prix fort.
            <br className="hidden sm:block" />
            <span className="block mt-4 lg:mt-6 text-white font-semibold">
              C'est aussi simple que ça.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
