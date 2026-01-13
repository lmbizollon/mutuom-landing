# Guide de Déploiement - MUTUOM

## 🚀 Déploiement sur Vercel

### Étape 1 : Installation Vercel CLI

```bash
# Installer Vercel CLI globalement
npm i -g vercel
```

### Étape 2 : Connexion à Vercel

```bash
# Se connecter à Vercel
vercel login
```

Une page web va s'ouvrir pour vous connecter :
- Utiliser votre compte GitHub, GitLab, Bitbucket ou email

### Étape 3 : Lier le projet

```bash
# Se positionner dans le dossier du projet
cd mutuom-landing

# Lier le projet à Vercel
vercel link
```

Répondre aux questions :
- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → Sélectionner votre compte
- **Link to existing project?** → `N` (No) - pour créer un nouveau projet
- **What's your project's name?** → `mutuom-landing`
- **In which directory is your code located?** → `.` (current directory)

### Étape 4 : Configurer les variables d'environnement

#### Option A : Via le Dashboard Vercel (Recommandé)

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet `mutuom-landing`
3. Aller dans **Settings** > **Environment Variables**
4. Ajouter les variables suivantes (une par une) :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJxxx...` | Production |
| `NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR` | `https://hook.eu2.make.com/xxx` | Production |
| `NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR` | `https://hook.eu2.make.com/yyy` | Production |

**Important :** Cocher **Production** pour chaque variable.

#### Option B : Via CLI

```bash
# Ajouter les variables une par une
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR production
vercel env add NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR production
```

### Étape 5 : Premier déploiement

```bash
# Déployer en production
vercel --prod
```

Attendez quelques minutes... Vous obtiendrez une URL du type :
```
https://mutuom-landing-xxxx.vercel.app
```

✅ Votre site est maintenant en ligne !

---

## 🌐 Configuration DNS avec OVH

### Étape 1 : Récupérer les informations Vercel

1. Aller sur **Vercel Dashboard** > Votre projet
2. Cliquer sur **Settings** > **Domains**
3. Cliquer sur **Add Domain**
4. Entrer `mutuom.com`
5. Vercel va vous donner les enregistrements DNS à configurer :
   - IP pour l'enregistrement A : `76.76.21.21`
   - CNAME pour www : `cname.vercel-dns.com.`

### Étape 2 : Configurer la Zone DNS sur OVH

1. **Se connecter à OVH Manager**
   - Aller sur https://www.ovh.com/manager/
   - Se connecter avec vos identifiants OVH

2. **Accéder à la Zone DNS**
   - Dans le menu de gauche : **Noms de domaine**
   - Cliquer sur `mutuom.com`
   - Onglet **Zone DNS**

3. **Supprimer les enregistrements existants**
   - ⚠️ **IMPORTANT** : Supprimer tous les enregistrements A et CNAME sur `@` et `www`
   - Cliquer sur l'icône de suppression (poubelle) pour chaque enregistrement

4. **Ajouter les nouveaux enregistrements**

#### Enregistrement A (pour mutuom.com)

```
Type: A
Sous-domaine: @ (ou laisser vide)
Cible: 76.76.21.21
TTL: 300 (ou Auto)
```

Cliquer sur **Ajouter** puis **Valider**

#### Enregistrement CNAME (pour www.mutuom.com)

```
Type: CNAME
Sous-domaine: www
Cible: cname.vercel-dns.com.
TTL: 300 (ou Auto)
```

⚠️ **IMPORTANT** : Ne pas oublier le point final `.` après `com`

Cliquer sur **Ajouter** puis **Valider**

5. **Appliquer la configuration**
   - Un bouton **"Appliquer la configuration"** apparaît en haut
   - Cliquer dessus pour valider les changements

### Étape 3 : Vérifier dans Vercel

1. Retourner sur **Vercel Dashboard** > **Domains**
2. Vercel va automatiquement détecter la configuration DNS
3. Attendre la validation (5 minutes à 48h maximum)
4. Statut passe de ⏳ "Pending" à ✅ "Valid"
5. Un certificat SSL est automatiquement généré par Vercel

### Étape 4 : Tester

Une fois validé, tester les URLs suivantes :
- ✅ https://mutuom.com
- ✅ https://www.mutuom.com

Les deux doivent afficher votre site avec le cadenas HTTPS 🔒

---

## 🔄 Déploiements futurs

### Via Git (Automatique - Recommandé)

1. **Connecter GitHub à Vercel**
   ```bash
   # Créer un repo GitHub
   git init
   git add .
   git commit -m "Initial commit"

   # Créer le repo sur GitHub (via interface web)
   # Puis pusher
   git remote add origin https://github.com/lmbizollon/mutuom-website.git
   git branch -M main
   git push -u origin main
   ```

2. **Lier le repo dans Vercel**
   - Vercel Dashboard > Settings > Git
   - Connecter le repository GitHub
   - **Auto-déploiement activé** : chaque `git push` déploiera automatiquement

### Via CLI (Manuel)

```bash
# Depuis le dossier du projet
vercel --prod
```

---

## 🐛 Résolution de problèmes

### Le domaine ne se connecte pas (404 / DNS Error)

**Vérifier la configuration DNS :**
```bash
# Vérifier l'enregistrement A
dig mutuom.com A +short
# Devrait retourner: 76.76.21.21

# Vérifier l'enregistrement CNAME
dig www.mutuom.com CNAME +short
# Devrait retourner: cname.vercel-dns.com.
```

**Solutions :**
- Attendre 24-48h pour la propagation DNS complète
- Vérifier qu'il n'y a pas de double configuration (ancien + nouveau)
- Vider le cache DNS local : `sudo dscacheutil -flushcache` (Mac)

### Les variables d'environnement ne sont pas prises en compte

**Vérifier dans Vercel Dashboard :**
- Settings > Environment Variables
- Vérifier que les variables sont bien en **Production**
- Redéployer après modification : `vercel --prod`

### Le build échoue

**Vérifier les logs :**
- Vercel Dashboard > Deployments > Cliquer sur le déploiement échoué
- Lire les logs d'erreur
- Souvent : problème de dépendances ou d'import manquant

**Solution commune :**
```bash
# Nettoyer et réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
npm run build  # Tester en local
vercel --prod  # Redéployer
```

### Erreur "This domain is already in use"

Le domaine est déjà lié à un autre projet Vercel :
- Supprimer le domaine de l'ancien projet
- Ou utiliser un autre compte Vercel

---

## 📊 Monitoring

### Analytics Vercel

Vercel Dashboard > Analytics :
- Nombre de visiteurs
- Pages les plus visitées
- Temps de chargement
- Taux d'erreur

### Logs en temps réel

```bash
# Afficher les logs de production en temps réel
vercel logs --follow
```

---

## 🔐 Sécurité

### ⚠️ Ne jamais commiter les secrets

Vérifier que `.env.local` est dans `.gitignore` :
```bash
cat .gitignore | grep .env.local
```

Si absent, ajouter :
```bash
echo ".env.local" >> .gitignore
```

### Clés Supabase

- ✅ `NEXT_PUBLIC_SUPABASE_URL` : Public (OK)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Public (OK)
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` : **SECRET** - Ne jamais exposer côté client

---

## 📝 Checklist de déploiement

- [ ] Vercel CLI installé
- [ ] Projet lié à Vercel
- [ ] Variables d'environnement configurées
- [ ] Premier déploiement réussi
- [ ] DNS OVH configuré (A + CNAME)
- [ ] Domaine validé dans Vercel (certificat SSL)
- [ ] Test https://mutuom.com fonctionne
- [ ] Test https://www.mutuom.com fonctionne
- [ ] Formulaire ambassadeur fonctionne (test en prod)
- [ ] Formulaire fournisseur fonctionne (test en prod)
- [ ] Webhooks Make.com configurés et testés

---

## 🎉 C'est terminé !

Votre site MUTUOM est maintenant en ligne sur https://mutuom.com 🚀
