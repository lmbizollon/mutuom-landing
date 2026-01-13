'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'

export type PricingTier = {
  badge: string
  title: string
  subtitle: string
  ctaText: string
  isPrimary: boolean
}

export function useAmbassadeurCount() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let channel: any = null

    async function fetchCount() {
      try {
        const supabase = getSupabaseClient()
        const { count: total, error } = await supabase
          .from('ambassadeurs')
          .select('*', { count: 'exact', head: true })
          .neq('statut', 'rejected')

        if (error) throw error
        setCount(total || 0)
      } catch (error) {
        console.error('Error fetching count:', error)
        setCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()

    try {
      const supabase = getSupabaseClient()
      channel = supabase
        .channel('ambassadeurs-count')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'ambassadeurs',
          },
          () => {
            fetchCount()
          }
        )
        .subscribe()
    } catch (err) {
      console.error('Error setting up realtime:', err)
    }

    return () => {
      if (channel) {
        try {
          const supabase = getSupabaseClient()
          supabase.removeChannel(channel)
        } catch (err) {
          console.error('Error cleanup:', err)
        }
      }
    }
  }, [])

  return { count, loading }
}

export function getPricingTier(count: number): PricingTier {
  if (count < 15) {
    const remaining = 15 - count
    return {
      badge: "⭐ GRATUIT À VIE",
      title: `${remaining} ${remaining > 1 ? 'places restantes' : 'place restante'}`,
      subtitle: "Adhésion gratuite à vie pour les 15 premiers",
      ctaText: "Réserver ma place gratuite",
      isPrimary: true
    }
  } else if (count < 50) {
    const remaining = 50 - count
    return {
      badge: "🎯 GRATUIT 1ÈRE ANNÉE",
      title: `${remaining} ${remaining > 1 ? 'places restantes' : 'place restante'}`,
      subtitle: "Première année offerte, puis 399€/an",
      ctaText: "Rejoindre le groupement",
      isPrimary: true
    }
  } else {
    return {
      badge: "📋 ADHÉSION STANDARD",
      title: "399€/an",
      subtitle: "Rejoignez le groupement d'achat",
      ctaText: "Demander mon adhésion",
      isPrimary: false
    }
  }
}
