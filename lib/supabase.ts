import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
