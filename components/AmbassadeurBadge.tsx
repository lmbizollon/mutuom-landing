'use client'

import { useAmbassadeurCount, getPricingTier } from '@/hooks/useAmbassadeurCount'

export function AmbassadeurBadge() {
  const { count, loading } = useAmbassadeurCount()

  if (loading) {
    return (
      <div className="animate-pulse rounded-lg bg-gray-200 p-6">
        <div className="h-6 w-48 rounded bg-gray-300 mx-auto"></div>
      </div>
    )
  }

  const pricing = getPricingTier(count)

  return (
    <div className="rounded-lg border-2 border-terracotta bg-terracotta/5 p-6">
      <div className="mb-2 text-center text-sm font-bold uppercase tracking-wide text-terracotta">
        {pricing.badge}
      </div>
      <div className="mb-1 text-center font-sora text-2xl font-bold text-navy">
        {pricing.title}
      </div>
      <div className="mb-4 text-center text-sm text-gray-600">
        {pricing.subtitle}
      </div>

      {/* Barre progression si < 50 */}
      {count < 50 && (
        <div className="mt-4">
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-terracotta transition-all duration-500"
              style={{ width: `${(count / 50) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            {count} adhérents • Phase ambassadeur jusqu'à 50
          </div>
        </div>
      )}
    </div>
  )
}
