'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAmbassadeurCount() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Fonction pour récupérer le count
    const fetchCount = async () => {
      try {
        const { data, error } = await supabase
          .from('ambassadeurs')
          .select('id', { count: 'exact', head: true })
        
        if (error) {
          console.error('Erreur lors de la récupération du count:', error)
          return
        }

        if (data !== null) {
          setCount(data as unknown as number)
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    // Récupération initiale
    fetchCount()

    // Abonnement temps réel aux changements
    const channel = supabase
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

    // Cleanup
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { count, loading, remainingSpots: Math.max(0, 50 - count) }
}
