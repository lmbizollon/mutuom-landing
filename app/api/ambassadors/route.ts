import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ambassadorSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Request body received:', body)

    // Vérifier les variables d'environnement
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing env vars:', {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      })
      return NextResponse.json(
        { error: 'Configuration serveur incorrecte' },
        { status: 500 }
      )
    }

    // Validation avec Zod
    const validatedData = ambassadorSchema.parse(body)
    console.log('Validation successful')

    // Insertion dans Supabase avec service_role key (sécurisé côté serveur)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    const { data, error } = await supabase
      .from('ambassadeurs')
      .insert([
        {
          nom: validatedData.nom,
          prenom: validatedData.prenom,
          entreprise: validatedData.entreprise,
          volume_mensuel: validatedData.volume_mensuel,
          email: validatedData.email,
          telephone: validatedData.telephone,
          ville: validatedData.ville,
          message: validatedData.message || null,
          statut: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 })
    }

    // Envoi vers Make.com
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Erreur API complète:', error)

    // Si c'est une erreur Zod, donner plus de détails
    if (error && typeof error === 'object' && 'issues' in error) {
      console.error('Erreur de validation Zod:', JSON.stringify(error))
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

// GET pour récupérer le nombre de places restantes
export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { count, error } = await supabase
      .from('ambassadeurs')
      .select('*', { count: 'exact', head: true })
      .neq('statut', 'rejected')

    if (error) {
      return NextResponse.json({ remaining: 37 }, { status: 200 })
    }

    const remaining = Math.max(0, 50 - (count || 0))

    return NextResponse.json({ remaining }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ remaining: 37 }, { status: 200 })
  }
}
