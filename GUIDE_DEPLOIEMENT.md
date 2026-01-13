# Guide de Déploiement MUTUOM

## Checklist Avant Déploiement

- [ ] Créer projet Supabase
- [ ] Exécuter supabase-setup.sql
- [ ] Configurer .env.local avec les clés Supabase
- [ ] Créer scénario Make.com
- [ ] Tester formulaire en local
- [ ] Déployer sur Vercel
- [ ] Configurer DNS OVH

---

## 1. Configuration Supabase (10 minutes)

### Étape 1.1 : Créer le projet

1. Aller sur https://supabase.com/dashboard
2. Cliquer sur **New Project**
3. Paramètres :
   - **Name** : `mutuom-production`
   - **Database Password** : Générer un mot de passe fort et le sauvegarder
   - **Region** : Europe (West) - eu-west-1
   - **Pricing Plan** : Free (suffisant pour démarrer)
4. Cliquer sur **Create new project**
5. Attendre 2-3 minutes que le projet soit provisionné

### Étape 1.2 : Exécuter le script SQL

1. Dans votre projet Supabase, aller dans **SQL Editor** (icône dans la sidebar gauche)
2. Cliquer sur **New Query**
3. Ouvrir le fichier `supabase-setup.sql` du projet
4. Copier tout le contenu et le coller dans l'éditeur SQL
5. Cliquer sur **Run** (ou Cmd/Ctrl + Enter)
6. Vérifier qu'il n'y a pas d'erreurs (vous devriez voir "Success. No rows returned")

### Étape 1.3 : Récupérer les clés API

1. Aller dans **Settings** (icône engrenage en bas de la sidebar)
2. Cliquer sur **API**
3. Copier les valeurs suivantes :

```
Project URL : https://xxxxxxxxxxxxx.supabase.co
anon/public key : eyJhbGc...très longue clé...
```

### Étape 1.4 : Configurer .env.local

Dans votre projet `/mutuom-landing/.env.local`, remplacer :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...votre_clé...
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/xxxxx
```

---

## 2. Configuration Make.com (15 minutes)

### Étape 2.1 : Créer le scénario

1. Aller sur https://www.make.com
2. Se connecter (créer un compte si nécessaire - plan gratuit OK)
3. Cliquer sur **Create a new scenario**
4. Nom du scénario : `MUTUOM - Nouvel Ambassadeur`

### Étape 2.2 : Ajouter le Webhook (trigger)

1. Rechercher **Webhooks** dans les modules
2. Sélectionner **Custom Webhook**
3. Cliquer sur **Add** pour créer un nouveau webhook
4. Nom : `mutuom-ambassadeur`
5. Cliquer sur **Save**
6. **Copier l'URL du webhook** (https://hook.eu2.make.com/xxxxx)
7. La coller dans `.env.local` → `MAKE_WEBHOOK_URL=`

### Étape 2.3 : Ajouter Gmail (notification Louis-Marie)

1. Cliquer sur le **+** après le webhook
2. Rechercher **Gmail**
3. Sélectionner **Send an Email**
4. Se connecter à votre compte Gmail
5. Paramètres :
   - **To** : `louis-marie@mutuom.com` (ou votre email)
   - **Subject** : `Nouvel ambassadeur MUTUOM`
   - **Content** : Utiliser le template ci-dessous

**Template Gmail :**

```
Bonjour Louis-Marie,

Un nouveau candidat ambassadeur vient de s'inscrire :

👤 Nom : {{nom}} {{prenom}}
🏢 Entreprise : {{entreprise}}
💰 CA achats : {{ca_annuel}}
📧 Email : {{email}}
📱 Téléphone : {{telephone}}
📍 Ville : {{ville}}

💬 Message :
{{message}}

---

Voir tous les ambassadeurs : https://supabase.com/dashboard/project/[VOTRE_PROJECT_ID]/editor

À très vite !
```

### Étape 2.4 : Ajouter Brevo/Sendinblue (email adhérent)

1. Cliquer sur le **+** après Gmail
2. Rechercher **Brevo** (anciennement Sendinblue)
3. Sélectionner **Send a Transactional Email**
4. Se connecter à Brevo (créer un compte gratuit si nécessaire)
5. Paramètres :
   - **To** : `{{email}}`
   - **From Email** : `contact@mutuom.com` (configurer dans Brevo)
   - **From Name** : `MUTUOM`
   - **Subject** : `Bienvenue parmi les ambassadeurs MUTUOM`
   - **Html Content** : Template ci-dessous

**Template Brevo :**

```html
<p>Bonjour {{prenom}},</p>

<p>Merci pour votre intérêt pour MUTUOM !</p>

<p>Nous avons bien reçu votre candidature et nous vous recontacterons sous 48h pour valider votre adhésion en tant qu'<strong>ambassadeur</strong>.</p>

<p>Pour rappel, les <strong>50 premiers ambassadeurs</strong> bénéficient de l'adhésion <strong>gratuite à vie</strong>.</p>

<p>À très bientôt,<br>L'équipe MUTUOM</p>

<hr>

<p style="font-size:12px;color:#6c757d;">Questions ? Répondez directement à cet email.</p>
```

### Étape 2.5 : Activer et tester

1. Cliquer sur le bouton **ON** en bas à gauche pour activer le scénario
2. **Tester** :
   - Lancer `npm run dev` localement
   - Remplir le formulaire sur http://localhost:3000
   - Vérifier que vous recevez bien les 2 emails

---

## 3. Déploiement Vercel (10 minutes)

### Étape 3.1 : Installer Vercel CLI

```bash
npm install -g vercel
```

### Étape 3.2 : Se connecter

```bash
vercel login
```

Suivre les instructions (email + clic de validation)

### Étape 3.3 : Déployer

```bash
cd mutuom-landing
vercel
```

Répondre aux questions :
- **Set up and deploy** : Y
- **Which scope** : Votre compte personnel
- **Link to existing project** : N
- **Project name** : mutuom-landing
- **Directory** : ./
- **Override settings** : N

Vercel va build et déployer. Vous obtiendrez une URL de preview.

### Étape 3.4 : Configurer les variables d'environnement

Option A : Via le dashboard

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet `mutuom-landing`
3. Aller dans **Settings → Environment Variables**
4. Ajouter chacune des 3 variables :

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbG...

Name: MAKE_WEBHOOK_URL
Value: https://hook.eu2.make.com/xxxxx
```

5. Scope : **Production, Preview, and Development**

Option B : Via CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Coller la valeur quand demandé

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Coller la valeur

vercel env add MAKE_WEBHOOK_URL
# Coller la valeur
```

### Étape 3.5 : Redéployer en production

```bash
vercel --prod
```

Vous obtiendrez l'URL de production (ex: mutuom-landing.vercel.app)

---

## 4. Configuration DNS OVH → Vercel (15 minutes + délai propagation)

### Étape 4.1 : Ajouter le domaine dans Vercel

1. Dans Vercel Dashboard, aller dans **Settings → Domains**
2. Cliquer sur **Add**
3. Entrer `mutuom.com`
4. Cliquer sur **Add**
5. Vercel affiche les enregistrements DNS à configurer

**Exemple d'enregistrements fournis par Vercel :**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Étape 4.2 : Configurer OVH

1. Se connecter à l'**espace client OVH** : https://www.ovh.com/auth/
2. Aller dans **Web Cloud → Noms de domaine**
3. Cliquer sur `mutuom.com`
4. Onglet **Zone DNS**
5. Cliquer sur **Ajouter une entrée**

**Pour le domaine principal (@) :**

- Type : **A**
- Sous-domaine : `@` (laisser vide ou mettre @)
- Cible : `76.76.21.21` (l'IP fournie par Vercel)
- TTL : Laisser par défaut

Cliquer sur **Suivant** puis **Valider**

**Pour www :**

- Type : **CNAME**
- Sous-domaine : `www`
- Cible : `cname.vercel-dns.com.` (ne pas oublier le point final)
- TTL : Laisser par défaut

Cliquer sur **Suivant** puis **Valider**

### Étape 4.3 : Supprimer les anciens enregistrements (si nécessaire)

Si vous aviez déjà des enregistrements A ou CNAME pour @ ou www pointant vers autre chose :

1. Les trouver dans la liste de la Zone DNS
2. Cliquer sur l'icône **poubelle** pour les supprimer
3. Confirmer

### Étape 4.4 : Attendre la propagation DNS

- **Temps moyen** : 15 minutes à 1 heure
- **Maximum** : 48 heures

Vérifier la propagation :

```bash
# Vérifier le domaine principal
dig mutuom.com

# Vérifier www
dig www.mutuom.com

# Ou utiliser un outil en ligne
# https://dnschecker.org
```

Quand vous voyez l'IP de Vercel, c'est bon !

### Étape 4.5 : Vérifier dans Vercel

Retourner dans Vercel Dashboard → Domains

Vous devriez voir :
- ✅ `mutuom.com` - Valid Configuration
- ✅ `www.mutuom.com` - Valid Configuration

---

## 5. Tests Post-Déploiement

### Checklist

- [ ] Le site s'affiche sur https://mutuom.com
- [ ] Le logo apparaît correctement
- [ ] Les couleurs correspondent à la charte graphique
- [ ] Le compteur "X/50 places restantes" s'affiche
- [ ] Le simulateur calcule correctement les économies
- [ ] Le formulaire valide les champs (tester avec données invalides)
- [ ] L'envoi du formulaire fonctionne
- [ ] Email reçu sur louis-marie@mutuom.com
- [ ] Email de confirmation reçu par l'adhérent
- [ ] Les données apparaissent dans Supabase
- [ ] Le site est responsive (tester mobile/tablette)

### Test du formulaire

Données de test :

```
Nom : Dupont
Prénom : Jean
Entreprise : Net & Propre SARL
CA annuel : 50-100k
Email : test@example.com
Téléphone : 06 12 34 56 78
Ville : Lyon
Message : Test de validation
☑ RGPD
```

---

## 6. Maintenance & Monitoring

### Vérifier les métriques Vercel

Dashboard Vercel → Analytics :
- Nombre de visiteurs
- Pages vues
- Temps de chargement

### Vérifier les inscriptions Supabase

1. Aller sur Supabase Dashboard
2. **Table Editor** → `ambassadeurs`
3. Voir tous les ambassadeurs inscrits

**Requête SQL utile :**

```sql
-- Compter les ambassadeurs
SELECT COUNT(*) as total FROM ambassadeurs WHERE statut != 'rejected';

-- Voir les derniers inscrits
SELECT * FROM ambassadeurs ORDER BY created_at DESC LIMIT 10;

-- Places restantes
SELECT get_remaining_spots();
```

### Logs Make.com

Dashboard Make.com → **History** :
- Voir tous les scénarios exécutés
- Débugger les erreurs éventuelles

---

## 7. Troubleshooting

### Le formulaire ne s'envoie pas

1. Ouvrir la Console du navigateur (F12)
2. Onglet **Network**
3. Envoyer le formulaire
4. Vérifier la requête POST vers `/api/ambassadors`
5. Si erreur 500 : vérifier les logs Vercel
6. Si erreur 400 : problème de validation Zod

### Les emails ne partent pas

1. Aller sur Make.com → History
2. Vérifier si le scénario a été déclenché
3. Vérifier les paramètres Gmail/Brevo
4. S'assurer que `MAKE_WEBHOOK_URL` est bien configuré dans Vercel

### Le compteur reste bloqué à 37

1. Vérifier que Supabase est accessible
2. Vérifier que la fonction `get_remaining_spots()` existe
3. Tester l'API : https://mutuom.com/api/ambassadors (GET)

### DNS ne se propage pas

1. Vérifier que les enregistrements OVH sont corrects
2. Attendre 2-3 heures
3. Vider le cache DNS local : `sudo dscacheutil -flushcache` (Mac)

---

## Support

Questions ? louis-marie@mutuom.com

**Documentation utile :**
- Next.js : https://nextjs.org/docs
- Vercel : https://vercel.com/docs
- Supabase : https://supabase.com/docs
- Make.com : https://www.make.com/en/help

---

Bon déploiement ! 🚀
