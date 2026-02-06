# CORRECTION FORMULAIRE AMBASSADEURS

**Date**: 6 février 2026
**Problème**: 41 clics sur le lien d'inscription, 0 inscriptions enregistrées

---

## DIAGNOSTIC

### Problème principal
Les **policies Row Level Security (RLS)** de Supabase bloquaient les insertions publiques.

**Erreur technique**:
```
new row violates row-level security policy for table "ambassadeurs"
```

### Problème secondaire
Le formulaire ne gérait PAS les erreurs :
- Aucun message d'erreur affiché à l'utilisateur
- Aucun feedback en cas d'échec
- L'utilisateur cliquait sur "Envoyer" et... rien ne se passait

---

## CORRECTIONS APPORTÉES

### 1. API Route (`app/api/ambassadors/route.ts`)

**Avant**:
```typescript
const supabase = getSupabaseClient() // Utilisait anon_key
```

**Après**:
```typescript
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Utilise service_role_key
)
```

**Pourquoi c'est sécurisé**:
- Le code s'exécute UNIQUEMENT côté serveur (API route Next.js)
- La clé service_role n'est JAMAIS exposée au client
- Bypass des RLS car c'est une opération autorisée par le serveur

### 2. Formulaire (`components/sections/FinalCTA.tsx`)

**Ajouts**:
1. État `errorMessage` pour stocker les erreurs
2. Gestion du cas `else` quand l'API échoue
3. Affichage d'un message d'erreur rouge visible
4. Email de contact en cas de problème persistant

**Code ajouté**:
```typescript
} else {
  const errorData = await response.json().catch(() => ({}))
  setErrorMessage(
    errorData.error ||
    'Une erreur est survenue. Contactez-nous à contact@mutuom.com'
  )
}
```

---

## INSTRUCTIONS DE DÉPLOIEMENT

### Étape 1: Vérifier les variables d'environnement sur Vercel

**CRITIQUE**: La variable `SUPABASE_SERVICE_ROLE_KEY` doit être configurée sur Vercel.

1. Va sur https://vercel.com
2. Sélectionne le projet `mutuom-landing`
3. Va dans **Settings → Environment Variables**
4. Vérifie que ces 3 variables existent :

```
NEXT_PUBLIC_SUPABASE_URL=https://mtkngdicwbykabmccene.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (différent de anon_key)
```

**Si `SUPABASE_SERVICE_ROLE_KEY` n'existe pas**:
- Clique sur **Add Another**
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: Copie la valeur depuis `.env.local` ligne 4
- Environment: **Production, Preview, Development** (coche les 3)
- Clique sur **Save**

### Étape 2: Pusher le code sur GitHub

```bash
cd /Users/louis-mariebizollon/Desktop/MUTUOM/mutuom-landing
git push origin preprod
```

**Si tu veux déployer directement en production** (branche main):
```bash
git checkout main
git merge preprod
git push origin main
```

### Étape 3: Vercel déploiera automatiquement

Vercel détecte automatiquement les nouveaux commits et redéploie.

**Suivre le déploiement**:
1. Va sur https://vercel.com/lmbizollon/mutuom-landing
2. Tu verras le déploiement en cours dans l'onglet **Deployments**
3. Attends que le statut passe à **Ready** (environ 1-2 minutes)

---

## CHECKLIST DE VALIDATION POST-DÉPLOIEMENT

Une fois déployé sur Vercel, teste le formulaire :

### Test 1: Inscription réussie
- [ ] Va sur https://mutuom.com (ou ton URL de production)
- [ ] Scroll jusqu'au formulaire d'inscription ambassadeur
- [ ] Remplis tous les champs avec de VRAIES données de test
- [ ] Clique sur "Devenir Ambassadeur Fondateur"
- [ ] **RÉSULTAT ATTENDU**: Message vert "Merci ! Votre candidature a été envoyée"

### Test 2: Vérification Supabase
- [ ] Va sur https://supabase.com
- [ ] Ouvre le projet `mutuom-landing`
- [ ] Va dans **Table Editor → ambassadeurs**
- [ ] **RÉSULTAT ATTENDU**: Tu vois l'inscription test que tu viens de faire

### Test 3: Gestion d'erreur (optionnel)
Pour tester que les erreurs s'affichent bien :
- [ ] Remplis le formulaire avec le MÊME email qu'au Test 1
- [ ] Clique sur "Devenir Ambassadeur Fondateur"
- [ ] **RÉSULTAT ATTENDU**: Message d'erreur rouge (car email déjà existant)

### Test 4: Mobile
- [ ] Ouvre le site sur mobile
- [ ] Remplis et envoie le formulaire
- [ ] **RÉSULTAT ATTENDU**: Fonctionne aussi bien que sur desktop

---

## RÉSULTATS DES TESTS EN LOCAL

Tous les tests ont été effectués et validés :

✅ **Connexion Supabase**: OK (0 ambassadeurs initialement)
✅ **Insertion données**: OK (Status Code 201)
✅ **Données enregistrées**: OK (vérifiées dans Supabase)
✅ **API Route**: OK (fonctionne avec service_role_key)
✅ **Messages d'erreur**: OK (affichage frontend)

**Log du test d'insertion**:
```json
{
  "success": true,
  "data": [{
    "id": "74897d25-ce7b-403e-ab5a-f6c149f8b942",
    "nom": "Test",
    "prenom": "Claude",
    "entreprise": "Test SAS",
    "statut": "pending",
    "created_at": "2026-02-06T16:20:27.698258"
  }]
}
```

---

## SOLUTION ALTERNATIVE (SI ÇA NE MARCHE TOUJOURS PAS)

Si après le déploiement ça ne fonctionne toujours pas, voici un plan B :

### Option A: Corriger les RLS dans Supabase
1. Va sur https://supabase.com
2. Ouvre le projet `mutuom-landing`
3. Va dans **SQL Editor**
4. Exécute ce script :

```sql
-- Supprimer les anciennes policies
DROP POLICY IF EXISTS "Public insert ambassadeurs" ON ambassadeurs;
DROP POLICY IF EXISTS "Admin read ambassadeurs" ON ambassadeurs;

-- Recréer la policy d'insertion publique
CREATE POLICY "Allow public insert"
ON ambassadeurs FOR INSERT
WITH CHECK (true);

-- Policy de lecture pour tous (sinon le compteur ne marche pas)
CREATE POLICY "Allow public read count"
ON ambassadeurs FOR SELECT
USING (true);
```

### Option B: Formulaire externe (derniers recours)
Si vraiment rien ne marche, utilise Tally ou Typeform :
- Tally.so (gratuit, joli, facile)
- Typeform (payant mais très professionnel)

Mais normalement, avec les corrections apportées, **tout devrait fonctionner**.

---

## FICHIERS MODIFIÉS

1. `app/api/ambassadors/route.ts` (33 lignes modifiées)
2. `components/sections/FinalCTA.tsx` (33 lignes modifiées)

**Commit ID**: `7770fcb`
**Branche**: `preprod`

---

## CONTACT EN CAS DE PROBLÈME

Si après le déploiement tu rencontres encore des problèmes :

1. Vérifie les logs Vercel : https://vercel.com/lmbizollon/mutuom-landing/deployments
2. Vérifie les variables d'environnement Vercel
3. Teste l'API directement : https://mutuom.com/api/ambassadors (doit retourner un nombre)
4. Ouvre la console navigateur (F12) et regarde les erreurs

---

**Dernière mise à jour**: 6 février 2026 par Claude Code
