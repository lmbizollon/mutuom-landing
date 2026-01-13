import { z } from 'zod'

export const ambassadorSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  entreprise: z.string().min(2, 'Le nom de l\'entreprise est requis'),
  volume_mensuel: z.enum(['<1k', '1k-3k', '3k-5k', '5k-10k', '>10k'], {
    required_error: 'Veuillez sélectionner une tranche',
  }),
  email: z.string().email('Email invalide'),
  telephone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      'Numéro de téléphone français invalide'
    ),
  ville: z.string().min(2, 'La ville est requise'),
  message: z.string().optional(),
  rgpd: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

export type AmbassadorFormData = z.infer<typeof ambassadorSchema>
