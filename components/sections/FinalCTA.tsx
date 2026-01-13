'use client'

import { Button } from '@/components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ambassadorSchema, type AmbassadorFormData } from '@/lib/validations'
import { useState } from 'react'
import { Zap, CheckCircle } from 'lucide-react'
import { useAmbassadeurCount, getPricingTier } from '@/hooks/useAmbassadeurCount'

export function FinalCTA() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { count, loading } = useAmbassadeurCount()
  const pricing = getPricingTier(count)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AmbassadorFormData>({
    resolver: zodResolver(ambassadorSchema),
  })

  const onSubmit = async (data: AmbassadorFormData) => {
    setIsSubmitting(true)

    try {
      // Envoi vers API Route Next.js qui appellera Supabase + Make.com
      const response = await fetch('/api/ambassadors', {
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
    <section id="formulaire-ambassadeur" className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            {!loading && (
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-terracotta/20 mb-6 lg:mb-8">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="font-semibold text-sm lg:text-base">{pricing.badge}</span>
              </div>
            )}

            <h2 className="mb-4 lg:mb-6 text-3xl sm:text-4xl lg:text-5xl">
              {count < 15
                ? 'Devenez ambassadeur MUTUOM'
                : count < 50
                  ? 'Rejoignez le groupement MUTUOM'
                  : 'Adhérez au groupement MUTUOM'}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              {pricing.subtitle}
            </p>
          </div>

          {isSuccess && (
            <div className="bg-forest/10 border border-forest rounded-lg p-6 lg:p-8 mb-8 lg:mb-10 flex items-center gap-3 lg:gap-4">
              <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-forest flex-shrink-0" />
              <p className="text-forest font-semibold text-base lg:text-lg">
                Merci ! Votre candidature a été envoyée. Nous vous recontactons sous 48h.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Nom *
                </label>
                <input
                  {...register('nom')}
                  type="text"
                  id="nom"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
                {errors.nom && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.nom.message}</p>
                )}
              </div>

              {/* Prénom */}
              <div>
                <label htmlFor="prenom" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Prénom *
                </label>
                <input
                  {...register('prenom')}
                  type="text"
                  id="prenom"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
                {errors.prenom && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.prenom.message}</p>
                )}
              </div>

              {/* Entreprise */}
              <div>
                <label htmlFor="entreprise" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Entreprise *
                </label>
                <input
                  {...register('entreprise')}
                  type="text"
                  id="entreprise"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
                {errors.entreprise && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.entreprise.message}</p>
                )}
              </div>

              {/* Volume Mensuel */}
              <div>
                <label htmlFor="volume_mensuel" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Volume d'achats mensuel estimé *
                </label>
                <select
                  {...register('volume_mensuel')}
                  id="volume_mensuel"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                >
                  <option value="">Sélectionnez</option>
                  <option value="<1k">Moins de 1 000€/mois</option>
                  <option value="1k-3k">1 000€ - 3 000€/mois</option>
                  <option value="3k-5k">3 000€ - 5 000€/mois</option>
                  <option value="5k-10k">5 000€ - 10 000€/mois</option>
                  <option value=">10k">Plus de 10 000€/mois</option>
                </select>
                {errors.volume_mensuel && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.volume_mensuel.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Email professionnel *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Téléphone *
                </label>
                <input
                  {...register('telephone')}
                  type="tel"
                  id="telephone"
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
                {errors.telephone && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.telephone.message}</p>
                )}
              </div>

              {/* Ville */}
              <div className="sm:col-span-2">
                <label htmlFor="ville" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Ville *
                </label>
                <input
                  {...register('ville')}
                  type="text"
                  id="ville"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
                {errors.ville && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.ville.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                  Message (optionnel)
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent text-base lg:text-lg"
                />
              </div>

              {/* RGPD */}
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 lg:gap-4">
                  <input
                    {...register('rgpd')}
                    type="checkbox"
                    className="mt-1 w-5 h-5 lg:w-6 lg:h-6 text-forest border-gray-300 rounded focus:ring-forest flex-shrink-0"
                  />
                  <span className="text-sm lg:text-base text-gray-600">
                    J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma
                    candidature ambassadeur MUTUOM *
                  </span>
                </label>
                {errors.rgpd && (
                  <p className="text-red-600 text-sm lg:text-base mt-1">{errors.rgpd.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-10 text-center">
              <Button type="submit" disabled={isSubmitting} className="px-10 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl w-full sm:w-auto">
                {isSubmitting ? 'Envoi en cours...' : pricing.ctaText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
