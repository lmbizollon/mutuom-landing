export function Combat() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-sora text-3xl font-bold text-navy sm:text-4xl">
            Le problème
          </h2>

          {/* Fait brut principal */}
          <div className="mb-12 rounded-lg border-l-4 border-terracotta bg-gray-50 p-8">
            <p className="mb-4 text-2xl font-bold leading-tight text-navy sm:text-3xl">
              78% des TPE françaises subissent des conditions d'achat
              moins favorables que les grandes entreprises.
            </p>
            <p className="text-sm font-medium text-terracotta">
              * BPI France, Observatoire des TPE-PME 2024
            </p>
          </div>

          {/* Mécanisme expliqué */}
          <div className="space-y-8 text-lg text-gray-700">

            <div>
              <h3 className="mb-3 font-sora text-xl font-semibold text-navy">
                Pourquoi cette différence existe
              </h3>
              <p className="mb-4">
                Les distributeurs segmentent leurs tarifs selon le volume.
                Prix catalogue pour les petits, remises négociées pour les gros.
              </p>
              <div className="rounded-lg bg-navy/5 p-4 text-base">
                <p className="font-medium text-navy">
                  Vos coûts fixes (recherche fournisseurs, négociation, suivi) pèsent
                  20 à 25% plus lourd que ceux d'un grand compte.*
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  * INSEE, Analyse des structures de coûts PME-TPE, novembre 2024
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-sora text-xl font-semibold text-navy">
                Le poids du volume
              </h3>
              <p className="mb-4">
                Un fournisseur qui double ses quantités vendues réduit ses coûts
                de production de 15 à 20%. Il répercute ces gains sur les gros acheteurs.*
              </p>
              <p className="text-base text-gray-600">
                * Stratégie-Achats, Théorie du coût d'expérience, avril 2025
              </p>
            </div>

            {/* Comparaison visuelle */}
            <div className="grid gap-6 sm:grid-cols-2">

              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Vous seul
                </div>
                <div className="mb-3 font-sora text-2xl font-bold text-gray-900">
                  Prix catalogue
                </div>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-gray-400">→</span>
                    <span>Pas de levier de négociation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-gray-400">→</span>
                    <span>Coûts fixes non dilués</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-gray-400">→</span>
                    <span>Aucun gain d'échelle</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-forest bg-forest/5 p-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-forest">
                  Avec MUTUOM
                </div>
                <div className="mb-3 font-sora text-2xl font-bold text-navy">
                  Conditions négociées
                </div>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-forest">✓</span>
                    <span>Volume cumulé du groupement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-forest">✓</span>
                    <span>Poids face aux fournisseurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-forest">✓</span>
                    <span>Économies d'échelle partagées</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Preuves chiffrées groupements */}
            <div className="rounded-lg bg-terracotta/5 p-6">
              <h3 className="mb-3 font-sora text-xl font-semibold text-navy">
                Ce que les groupements d'achat obtiennent
              </h3>
              <div className="space-y-3">
                <p className="font-medium text-gray-900">
                  • 15 à 20% d'économies minimum pour les TPE qui mutualisent leurs achats*
                </p>
                <p className="font-medium text-gray-900">
                  • Certains secteurs atteignent 30 à 50% de réduction sur gros volumes**
                </p>
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p>* BuyMadeEasy, Étude achats groupés TPE-PME, 2025</p>
                  <p>** Popee Pro, Analyse marchés hygiène professionnelle, août 2023</p>
                </div>
              </div>
            </div>

            {/* Objectif MUTUOM */}
            <div className="rounded-lg border-2 border-navy bg-white p-6 text-center">
              <p className="text-xl font-semibold text-navy">
                Objectif MUTUOM : 15% d'économies minimum
              </p>
              <p className="mt-3 text-gray-700">
                Sur 15 000€/mois d'achats, vous récupérez 2 250€/an.
                Soit 188€ de trésorerie supplémentaire chaque mois.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
