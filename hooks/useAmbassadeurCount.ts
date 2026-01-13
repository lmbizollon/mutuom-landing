'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'

export function useAmbassadeurCount() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let channel: any = null

    // Fonction pour récupérer le count
    const fetchCount = async () => {
      try {
        const supabase = getSupabaseClient()
        const { count: dbCount, error: dbError } = await supabase
          .from('ambassadeurs')
          .select('*', { count: 'exact', head: true })

        if (dbError) {
          console.error('Erreur lors de la récupération du count:', dbError)
          setError(true)
          setLoading(false)
          return
        }

        setCount(dbCount || 0)
        setError(false)
      } catch (err) {
        console.error('Erreur Supabase:', err)
        setError(true)
        // Fallback: afficher 0 par défaut
        setCount(0)
      } finally {
        setLoading(false)
      }
    }

    // Setup realtime subscription
    const setupRealtimeSubscription = () => {
      try {
        const supabase = getSupabaseClient()
        channel = supabase
          .channel('ambassadeurs-changes')
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
        console.error('Erreur subscription realtime:', err)
      }
    }

    // Récupération initiale
    fetchCount()

    // Setup realtime après fetch initial
    setupRealtimeSubscription()

    // Cleanup
    return () => {
      if (channel) {
        try {
          const supabase = getSupabaseClient()
          supabase.removeChannel(channel)
        } catch (err) {
          console.error('Erreur cleanup:', err)
        }
      }
    }
  }, [])

  return { count, loading, error, remainingSpots: Math.max(0, 50 - count) }
}
