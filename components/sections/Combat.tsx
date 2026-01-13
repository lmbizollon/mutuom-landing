export function Combat() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-sora text-3xl font-bold text-navy sm:text-4xl">
            Le problème
          </h2>

          {/* Stat sourcée principale */}
          <div className="mb-8 rounded-lg border-l-4 border-terracotta bg-gray-50 p-6 sm:p-8">
            <p className="mb-4 text-2xl font-semibold leading-tight text-navy sm:text-3xl">
              78% des TPE françaises subissent des conditions d'achat 
              moins favorables que les grandes entreprises.
            </p>
            <p className="text-sm font-medium text-terracotta">
              Source : BPI France, Observatoire des TPE-PME 2024
            </p>
          </div>

          {/* Explication mécanisme */}
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Les distributeurs segmentent leurs tarifs selon le volume d'achat. 
              Prix catalogue pour les petites structures, remises progressives pour 
              les moyennes, conditions grand compte pour les grosses.
            </p>

            <p className="text-xl font-medium text-navy">
              Ce n'est pas une question de négociation. C'est une question de poids.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Vous aujourd'hui
                </div>
                <div className="mb-3 font-sora text-2xl font-bold text-gray-900">
                  Prix catalogue
                </div>
                <p className="text-gray-600">
                  Pas de volume individuel. Pas de levier. 
                  Vous payez le tarif affiché.
                </p>
              </div>

              <div className="rounded-lg bg-forest/10 p-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-forest">
                  Avec MUTUOM
                </div>
                <div className="mb-3 font-sora text-2xl font-bold text-navy">
                  Conditions négociées
                </div>
                <p className="text-gray-700">
                  Volume cumulé du groupement. Pouvoir de négociation. 
                  Vous accédez aux remises grand compte.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-navy/5 p-6 text-center">
              <p className="font-medium text-navy">
                Objectif conservateur : 15% d'économies sur vos achats.
                <br />
                <span className="text-gray-700">
                  Sur 15 000€/mois, vous récupérez 2 250€/an.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
