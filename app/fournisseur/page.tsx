'use client'

import { Button } from '@/components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import * as z from 'zod'

const fournisseurSchema = z.object({
  entreprise: z.string().min(2, "Nom d'entreprise requis"),
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  fonction: z.string().min(2, 'Fonction requise'),
  email: z.string().email('Email invalide'),
  telephone: z.string().regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    'Format téléphone invalide'
  ),
  categorie_produits: z.string().min(1, 'Catégorie requise'),
  volume_annuel: z.string().min(1, 'Volume requis'),
  zone_livraison: z.string().min(1, 'Zone requise'),
  message: z.string().optional(),
  rgpd: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter',
  }),
})

type FournisseurFormData = z.infer<typeof fournisseurSchema>

export default function FournisseurPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FournisseurFormData>({
    resolver: zodResolver(fournisseurSchema),
  })

  const onSubmit = async (data: FournisseurFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/fournisseurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec retour */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-forest hover:text-navy font-medium">
            ← Retour à l'accueil
          </Link>
        </div>
      </nav>

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="mb-4 font-sora text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Devenez fournisseur partenaire
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Accédez à un réseau de 50+ entreprises de nettoyage en Auvergne-Rhône-Alpes
            </p>
          </div>

          {isSuccess && (
            <div className="bg-forest/10 border border-forest rounded-lg p-6 mb-8 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-forest flex-shrink-0" />
              <p className="text-forest font-semibold">
                Merci ! Votre demande a été envoyée. Nous vous recontactons sous 48h.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg">
            <div className="space-y-6">
              {/* Entreprise */}
              <div>
                <label htmlFor="entreprise" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                  Entreprise *
                </label>
                <input
                  {...register('entreprise')}
                  type="text"
                  id="entreprise"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                />
                {errors.entreprise && (
                  <p className="text-red-600 text-sm mt-1">{errors.entreprise.message}</p>
                )}
              </div>

              {/* Nom + Prénom */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nom" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    {...register('nom')}
                    type="text"
                    id="nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                  />
                  {errors.nom && (
                    <p className="text-red-600 text-sm mt-1">{errors.nom.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="prenom" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    {...register('prenom')}
                    type="text"
                    id="prenom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                  />
                  {errors.prenom && (
                    <p className="text-red-600 text-sm mt-1">{errors.prenom.message}</p>
                  )}
                </div>
              </div>

              {/* Fonction */}
              <div>
                <label htmlFor="fonction" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                  Fonction *
                </label>
                <input
                  {...register('fonction')}
                  type="text"
                  id="fonction"
                  placeholder="Directeur commercial, Responsable grands comptes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                />
                {errors.fonction && (
                  <p className="text-red-600 text-sm mt-1">{errors.fonction.message}</p>
                )}
              </div>

              {/* Email + Téléphone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                    Email professionnel *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    {...register('telephone')}
                    type="tel"
                    id="telephone"
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                  />
                  {errors.telephone && (
                    <p className="text-red-600 text-sm mt-1">{errors.telephone.message}</p>
                  )}
                </div>
              </div>

              {/* Catégorie produits */}
              <div>
                <label htmlFor="categorie_produits" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                  Catégorie de produits *
                </label>
                <select
                  {...register('categorie_produits')}
                  id="categorie_produits"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                >
                  <option value="">Sélectionnez</option>
                  <option value="consommables">Consommables (sacs, gants, essuyages...)</option>
                  <option value="chimie">Produits chimiques et d'entretien</option>
                  <option value="materiel">Matériel (autolaveuses, aspirateurs, chariots...)</option>
                  <option value="textile">Textile professionnel</option>
                  <option value="hygiene">Hygiène et distributeurs</option>
                  <option value="autre">Autre</option>
                </select>
                {errors.categorie_produits && (
                  <p className="text-red-600 text-sm mt-1">{errors.categorie_produits.message}</p>
                )}
              </div>

              {/* Volume annuel */}
              <div>
                <label htmlFor="volume_annuel" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                  Volume annuel d'affaires (estimation) *
                </label>
                <select
                  {...register('volume_annuel')}
                  id="volume_annuel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                >
                  <option value="">Sélectionnez</option>
                  <option value="<100k">Moins de 100 000€</option>
                  <option value="100-500k">100 000€ - 500 000€</option>
                  <option value="500k-1M">500 000€ - 1 000 000€</option>
                  <option value="1-5M">1M€ - 5M€</option>
                  <option value=">5M">Plus de 5M€</option>
                </select>
                {errors.volume_annuel && (
                  <p className="text-red-600 text-sm mt-1">{errors.volume_annuel.message}</p>
                )}
              </div>

              {/* Zone livraison */}
              <div>
                <label htmlFor="zone_livraison" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                  Zone de livraison *
                </label>
                <select
                  {...register('zone_livraison')}
                  id="zone_livraison"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                >
                  <option value="">Sélectionnez</option>
                  <option value="rhone">Rhône (69)</option>
                  <option value="ain">Ain (01)</option>
                  <option value="loire">Loire (42)</option>
                  <option value="isere">Isère (38)</option>
                  <option value="ara">Toute Auvergne-Rhône-Alpes</option>
                  <option value="national">National</option>
                </select>
                {errors.zone_livraison && (
                  <p className="text-red-600 text-sm mt-1">{errors.zone_livraison.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  placeholder="Présentez votre offre, vos atouts, vos références..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base"
                />
              </div>

              {/* RGPD */}
              <div>
                <label className="flex items-start gap-3">
                  <input
                    {...register('rgpd')}
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-forest border-gray-300 rounded focus:ring-forest flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600">
                    J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma
                    candidature fournisseur MUTUOM *
                  </span>
                </label>
                {errors.rgpd && (
                  <p className="text-red-600 text-sm mt-1">{errors.rgpd.message}</p>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 text-lg w-full sm:w-auto"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
