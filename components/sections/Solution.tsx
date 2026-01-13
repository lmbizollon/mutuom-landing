export function Solution() {
  return (
    <section className="bg-navy py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center font-sora text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Comment ça marche, concrètement
        </h2>
        <p className="mb-12 text-center text-lg text-gray-300 sm:text-xl lg:mb-16">
          3 étapes. Aucune contrainte.
        </p>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          <div className="rounded-lg bg-white p-6 shadow-lg lg:p-8">
            <div className="mb-4 inline-block rounded-full bg-forest/10 px-4 py-2">
              <span className="text-2xl font-bold text-forest">1</span>
            </div>
            <h3 className="mb-3 font-sora text-xl font-semibold text-navy lg:text-2xl">
              Vous rejoignez le groupement
            </h3>
            <p className="text-gray-700 leading-relaxed">
              On récupère vos volumes d'achats actuels. Vous ne changez rien à vos habitudes.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg lg:p-8">
            <div className="mb-4 inline-block rounded-full bg-forest/10 px-4 py-2">
              <span className="text-2xl font-bold text-forest">2</span>
            </div>
            <h3 className="mb-3 font-sora text-xl font-semibold text-navy lg:text-2xl">
              On négocie pour tous
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Votre volume + les 49 autres = pouvoir d'achat d'un groupe national.
              On obtient leurs conditions.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg lg:p-8">
            <div className="mb-4 inline-block rounded-full bg-forest/10 px-4 py-2">
              <span className="text-2xl font-bold text-forest">3</span>
            </div>
            <h3 className="mb-3 font-sora text-xl font-semibold text-navy lg:text-2xl">
              Vous économisez
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Vous commandez chez vos fournisseurs habituels.
              Ils vous facturent aux nouvelles conditions. Vous gardez la différence.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-lg bg-white/10 p-6 text-center lg:mt-16 lg:p-8">
          <p className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
            Seul, vous subissez les prix. Ensemble, vous les négociez.
          </p>
          <p className="mt-3 text-lg text-forest lg:text-xl">
            C'est l'unique différence entre vous et les grands groupes.
          </p>
        </div>
      </div>
    </section>
  )
}
