# Setup Supabase - MUTUOM

## 1. Créer le projet Supabase

### Étape 1.1 : Accéder à Supabase
- Aller sur https://supabase.com/dashboard
- Se connecter ou créer un compte

### Étape 1.2 : Créer le projet
- Cliquer sur **"New Project"**
- **Name:** `mutuom-prod`
- **Database Password:** `5XJpFBMK00MVN1Jq`
- **Region:** `Europe West (Frankfurt) - eu-central-1`
- Cliquer sur **"Create new project"**
- ⏱️ Attendre 2-3 minutes que le projet soit créé

---

## 2. Créer les tables (SQL Editor)

### Étape 2.1 : Ouvrir SQL Editor
- Dans le menu latéral gauche, cliquer sur **"SQL Editor"**
- Cliquer sur **"New query"**

### Étape 2.2 : Exécuter le script SQL
1. Copier **tout le contenu** du fichier `supabase-setup-complet.sql`
2. Le coller dans l'éditeur SQL
3. Cliquer sur **"Run"** (ou `Ctrl+Enter` / `Cmd+Enter`)
4. ✅ Vous devriez voir : "Success. No rows returned"

### Étape 2.3 : Vérifier les tables
- Dans le menu latéral gauche, cliquer sur **"Table Editor"**
- Vous devriez voir 2 tables :
  - ✅ `ambassadeurs` (0 rows)
  - ✅ `fournisseurs` (0 rows)

---

## 3. Récupérer les clés API

### Étape 3.1 : Accéder aux Settings
- Dans le menu latéral, cliquer sur **"Settings"** (icône engrenage)
- Cliquer sur **"API"**

### Étape 3.2 : Copier les clés
Vous avez besoin de 3 informations :

1. **Project URL**
   - Section "Project URL"
   - Format : `https://xxxxxxxxxxxxx.supabase.co`

2. **anon / public key**
   - Section "Project API keys"
   - Clé marquée `anon` `public`
   - Commence par `eyJ...`

3. **service_role key** (⚠️ SECRET)
   - Section "Project API keys"
   - Clé marquée `service_role` `secret`
   - Commence par `eyJ...`
   - ⚠️ **NE JAMAIS PARTAGER OU COMMITER CETTE CLÉ**

---

## 4. Configurer les variables d'environnement

### Étape 4.1 : Créer le fichier .env.local
Dans le dossier `mutuom-landing/`, créer le fichier `.env.local` :

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Make.com Webhooks (à configurer plus tard)
NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR=https://hook.eu2.make.com/...
NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR=https://hook.eu2.make.com/...
```

### Étape 4.2 : Remplacer les valeurs
- Remplacer `https://xxxxxxxxxxxxx.supabase.co` par votre **Project URL**
- Remplacer la première clé `eyJ...` par votre **anon key**
- Remplacer la seconde clé `eyJ...` par votre **service_role key**

### Étape 4.3 : Vérifier .gitignore
Vérifier que `.env.local` est bien dans `.gitignore` :

```bash
cat .gitignore | grep .env.local
```

Si rien ne s'affiche, ajouter :
```bash
echo ".env.local" >> .gitignore
```

---

## 5. Tester l'intégration

### Étape 5.1 : Redémarrer le serveur
```bash
# Arrêter le serveur (Ctrl+C)
# Relancer
npm run dev
```

### Étape 5.2 : Tester le formulaire ambassadeur
1. Aller sur http://localhost:3000
2. Cliquer sur "Devenir ambassadeur"
3. Remplir et soumettre le formulaire
4. ✅ Message de succès devrait apparaître

### Étape 5.3 : Vérifier dans Supabase
1. Retourner sur Supabase Dashboard
2. **Table Editor** > `ambassadeurs`
3. ✅ Vous devriez voir 1 ligne avec vos données de test

### Étape 5.4 : Tester le formulaire fournisseur
1. Aller sur http://localhost:3000/fournisseur
2. Remplir et soumettre le formulaire
3. Vérifier dans **Table Editor** > `fournisseurs`

---

## 6. Webhooks Make.com (optionnel)

### Étape 6.1 : Créer un compte Make.com
- Aller sur https://www.make.com
- Créer un compte gratuit

### Étape 6.2 : Créer les scénarios
Pour chaque formulaire (ambassadeur et fournisseur) :

1. Créer un nouveau scénario
2. Ajouter un module **"Webhooks" > "Custom webhook"**
3. Copier l'URL du webhook (format : `https://hook.eu2.make.com/...`)
4. Ajouter un module **"Email" > "Send an email"**
5. Configurer le contenu de l'email avec les données reçues
6. Activer le scénario

### Étape 6.3 : Ajouter les webhooks dans .env.local
```bash
NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR=https://hook.eu2.make.com/xxxxxxx
NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR=https://hook.eu2.make.com/yyyyyyy
```

---

## 7. Déploiement Vercel

### Étape 7.1 : Ajouter les variables d'environnement
Dans Vercel Dashboard > Settings > Environment Variables, ajouter :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR`
- `NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR`

### Étape 7.2 : Redéployer
```bash
git add .
git commit -m "Add Supabase integration"
git push
```

---

## Résolution de problèmes

### Erreur : "Invalid API key"
- Vérifier que les clés dans `.env.local` sont correctes
- Vérifier qu'il n'y a pas d'espaces avant/après les clés
- Redémarrer le serveur

### Erreur : "relation does not exist"
- Les tables n'ont pas été créées correctement
- Retourner dans SQL Editor et réexécuter le script

### Les données ne s'enregistrent pas
- Vérifier dans Console du navigateur (F12) s'il y a des erreurs
- Vérifier les logs Supabase : Dashboard > Logs > Database

### Webhook Make.com ne se déclenche pas
- Vérifier que l'URL du webhook est correcte dans `.env.local`
- Tester le webhook directement dans Make.com
- Les webhooks sont optionnels, le formulaire fonctionne sans

---

## Support

- Documentation Supabase : https://supabase.com/docs
- Documentation Make.com : https://www.make.com/en/help
- Documentation Next.js : https://nextjs.org/docs



 📖 Comment relancer le serveur en autonomie

  Si le serveur plante ou tu veux le redémarrer :

  # 1. Se positionner dans le BON dossier
  cd /Users/louis-mariebizollon/Desktop/MUTUOM/mutuom-landing

  # 2. Si le serveur tourne encore, l'arrêter avec Ctrl+C

  # 3. (Optionnel) Si ça bug, nettoyer et réinstaller
  rm -rf node_modules .next
  npm install

  # 4. Relancer le serveur
  npm run dev

  Raccourci rapide (si pas de bug) :

  cd /Users/louis-mariebizollon/Desktop/MUTUOM/mutuom-landing && npm run dev

  Ouvrir dans le navigateur :

  http://localhost:3000

