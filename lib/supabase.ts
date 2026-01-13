import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing')
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// Pour la compatibilité avec le code existant
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient]
  }
})

export type Ambassadeur = {
  id: string
  nom: string
  prenom: string
  entreprise: string
  volume_mensuel: string
  email: string
  telephone: string
  ville: string
  message?: string
  statut: 'pending' | 'accepted' | 'rejected'
  created_at: string
}

export type Fournisseur = {
  id: string
  nom: string
  prenom: string
  entreprise: string
  categorie: string
  email: string
  telephone: string
  site_web?: string
  message?: string
  statut: 'pending' | 'accepted' | 'rejected'
  created_at: string
}
