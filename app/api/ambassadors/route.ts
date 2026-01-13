import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ambassadorSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation avec Zod
    const validatedData = ambassadorSchema.parse(body)

    // Insertion dans Supabase
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
    console.error('Erreur API:', error)
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

// GET pour récupérer le nombre de places restantes
export async function GET() {
  try {
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
