import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase admin configuration is missing')
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Retirer le champ rgpd (validation front uniquement)
    const { rgpd, ...dataToInsert } = data

    // Insert dans Supabase
    const supabase = getSupabaseAdmin()
    const { error: supabaseError } = await supabase
      .from('fournisseurs')
      .insert([
        {
          ...dataToInsert,
          statut: 'pending',
        },
      ])

    if (supabaseError) {
      console.error('Erreur Supabase:', supabaseError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      )
    }

    // Webhook Make.com pour notification email
    if (process.env.NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR) {
      try {
        await fetch(process.env.NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            type: 'fournisseur',
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (webhookError) {
        console.error('Erreur webhook:', webhookError)
        // Ne pas bloquer si le webhook échoue
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
