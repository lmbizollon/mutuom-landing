export function Combat() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-sora text-3xl font-bold text-navy sm:text-4xl">
          Pourquoi MUTUOM existe
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          {/* Stat BPI France EN PREMIER */}
          <div className="rounded-lg border-l-4 border-terracotta bg-white p-6">
            <p className="mb-3 text-xl font-semibold text-navy">
              78% des TPE françaises déclarent subir des conditions d'achat
              moins favorables que les grandes entreprises pour les mêmes produits.
            </p>
            <p className="text-sm font-medium text-terracotta">
              Source : BPI France, Étude sur les relations interentreprises, 2023
            </p>
          </div>

          {/* Exemple SANS prix */}
          <p>
            Un gérant de société de nettoyage à Lyon, 8 salariés, appelle son
            fournisseur de consommables. Prix catalogue. Son concurrent, groupe national
            de 500 salariés, même fournisseur : conditions négociées, remises volume.
          </p>

          <p className="text-xl font-medium text-navy">
            Ce n'est pas qu'il négocie mal. C'est qu'il n'a pas le volume.
          </p>

          <p>
            Les distributeurs segmentent leurs tarifs : prix catalogue pour les petits,
            remises progressives pour les moyens, conditions grand compte pour les gros.
            C'est la réalité du B2B depuis toujours.
          </p>

          {/* Solution */}
          <div className="rounded-lg bg-navy/5 p-6">
            <p className="mb-3 font-medium text-navy">
              MUTUOM agrège vos volumes. Nous négocions une seule fois pour tous.
              Vous commandez comme d'habitude avec les nouvelles conditions.
            </p>
            <p>
              Pas de stock à gérer. Pas de catalogue imposé. Pas de contrainte sur vos fournisseurs.
              Juste le rapport de force qui s'inverse.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
