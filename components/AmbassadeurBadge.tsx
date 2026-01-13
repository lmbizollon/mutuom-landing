'use client'

import { useAmbassadeurCount } from '@/hooks/useAmbassadeurCount'

export function AmbassadeurBadge() {
  const { count, loading } = useAmbassadeurCount()

  if (loading) {
    return (
      <div className="animate-pulse rounded-lg bg-gray-200 p-6">
        <div className="h-6 w-48 rounded bg-gray-300 mx-auto"></div>
      </div>
    )
  }

  // Logique pricing
  let badge = ""
  let title = ""
  let subtitle = ""
  let remaining = 0

  if (count < 15) {
    remaining = 15 - count
    badge = "⭐ GRATUIT À VIE"
    title = `Place ${count + 1}/50`
    subtitle = `Plus que ${remaining} ${remaining > 1 ? 'places gratuites' : 'place gratuite'} à vie`
  } else if (count < 50) {
    remaining = 50 - count
    badge = "🎯 GRATUIT 1ÈRE ANNÉE"
    title = `Place ${count + 1}/50`
    subtitle = `Gratuit la 1ère année, puis 399€/an`
  } else {
    badge = "📋 LISTE D'ATTENTE"
    title = "Programme ambassadeur complet"
    subtitle = "Soyez informé de la prochaine vague"
  }

  return (
    <div className="rounded-lg border-2 border-terracotta bg-terracotta/5 p-6">
      <div className="mb-2 text-center text-sm font-bold uppercase tracking-wide text-terracotta">
        {badge}
      </div>
      <div className="mb-1 text-center font-sora text-2xl font-bold text-navy">
        {title}
      </div>
      <div className="mb-4 text-center text-sm text-gray-600">
        {subtitle}
      </div>
      
      {/* Barre de progression */}
      {count < 50 && (
        <div className="mt-4">
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div 
              className="h-full bg-terracotta transition-all duration-500"
              style={{ width: `${(count / 50) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            {count}/50 places prises
          </div>
        </div>
      )}
    </div>
  )
}
