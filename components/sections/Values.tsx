import { CheckCircle, DollarSign, FileText, Users, Unlock, Leaf } from 'lucide-react'

export function Values() {
  const values = [
    {
      icon: CheckCircle,
      title: 'Temps récupéré',
      description: 'On négocie avec vos fournisseurs. Vous vous concentrez sur vos chantiers.',
    },
    {
      icon: DollarSign,
      title: 'Faites des économies',
      description: '20% d\'économies en moyenne sur vos achats',
    },
    {
      icon: FileText,
      title: 'Expertise négociation',
      description: 'Grilles tarifaires, marges fournisseurs, leviers de remise. On connaît les mécaniques de la distribution BtoB.',
    },
    {
      icon: Unlock,
      title: 'Restez libre & autonome',
      description: 'Choisissez vos fournisseurs & vos produits',
    },
    {
      icon: Leaf,
      title: 'Engagés RSE',
      description: 'Sélection rigoureuse de nos fournisseurs partenaires. Produits responsables, traçabilité garantie, impact mesuré.',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Des pairs qui font face aux mêmes défis. Retours d\'expérience, alertes fournisseurs, opportunités partagées.',
    },
  ]

  return (
    <section className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-6 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl">Ce qui ne change pas</h2>
          <p className="text-center text-lg sm:text-xl lg:text-2xl text-gray-600 mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto leading-relaxed">
            Mutualiser sans perdre votre indépendance
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 border-l-4 lg:border-l-[6px] border-forest shadow-sm hover:shadow-md transition-shadow"
              >
                <value.icon className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-forest mb-4 lg:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-navy">{value.title}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
