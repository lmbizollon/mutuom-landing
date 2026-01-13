# MUTUOM - Landing Page

Landing page pour MUTUOM, le groupement d'achat dédié aux entreprises de nettoyage en Auvergne-Rhône-Alpes.

## 🎯 Objectif

Recruter 50 ambassadeurs (premiers adhérents) pour bénéficier de conditions d'achat similaires aux grands groupes nationaux.

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Validation** : Zod + React Hook Form
- **Base de données** : Supabase (PostgreSQL)
- **Déploiement** : Vercel
- **Automation** : Make.com (webhooks)
- **Fonts** : Sora (headings) + Inter (body)
- **Icons** : Lucide React

## 📚 Documentation

Ce projet contient 3 guides complets pour le setup et le déploiement :

- **[SUPABASE-SETUP.md](./SUPABASE-SETUP.md)** - Configuration Supabase étape par étape
- **[DEPLOIEMENT-VERCEL.md](./DEPLOIEMENT-VERCEL.md)** - Déploiement Vercel + DNS OVH
- **[GITHUB-SETUP.md](./GITHUB-SETUP.md)** - Configuration Git/GitHub

## 📦 Installation Locale

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Éditer .env.local avec vos clés Supabase
nano .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Configuration Supabase

### 1. Créer un projet Supabase

1. Aller sur [https://supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter le **Project URL** et l'**anon/public key**

### 2. Exécuter le script SQL

1. Dans votre projet Supabase, aller dans **SQL Editor**
2. Créer une nouvelle query
3. Copier-coller le contenu de `supabase-setup.sql`
4. Exécuter le script

Cela va créer :
- Table `ambassadeurs` avec tous les champs
- Index pour performances
- Row Level Security (RLS)
- Fonction `get_remaining_spots()` pour le compteur

### 3. Configurer les variables d'environnement

Copier `.env.local.example` en `.env.local` et compléter :

```env
# Supabase (Obligatoire)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Make.com Webhooks (Optionnel)
NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR=https://hook.eu2.make.com/xxx
NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR=https://hook.eu2.make.com/yyy
```

## Configuration Make.com (Optionnel)

### Scénarios à créer

Créer **2 scénarios** distincts :

#### 1. Scénario Ambassadeurs
1. Créer un nouveau scénario
2. Ajouter un **Webhook** comme trigger
3. Copier l'URL du webhook → `NEXT_PUBLIC_MAKE_WEBHOOK_AMBASSADEUR`
4. Ajouter les modules suivants :

```
Webhook → Gmail (envoi à louis-marie@mutuom.com)
       → Brevo/Sendinblue (email de confirmation à l'ambassadeur)
```

#### 2. Scénario Fournisseurs
1. Créer un nouveau scénario
2. Ajouter un **Webhook** comme trigger
3. Copier l'URL du webhook → `NEXT_PUBLIC_MAKE_WEBHOOK_FOURNISSEUR`
4. Ajouter les modules suivants :

```
Webhook → Gmail (envoi à louis-marie@mutuom.com)
       → Email (confirmation au fournisseur)
```

### Template email Louis-Marie (Gmail)

```
Sujet : Nouvel ambassadeur MUTUOM

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
Inscrit le : {{created_at}}

Accéder à Supabase : https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]
```

### Template email adhérent (Brevo)

```
Sujet : Bienvenue parmi les ambassadeurs MUTUOM

Bonjour {{prenom}},

Merci pour votre intérêt pour MUTUOM !

Nous avons bien reçu votre candidature et nous vous recontacterons sous 48h pour valider votre adhésion en tant qu'ambassadeur.

Pour rappel, les 50 premiers ambassadeurs bénéficient de l'adhésion gratuite à vie.

À très bientôt,
L'équipe MUTUOM

---
Questions ? Répondez directement à cet email.
```

## Déploiement Vercel

### 1. Déployer sur Vercel

```bash
# Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### 2. Configurer les variables d'environnement

Dans le dashboard Vercel :
1. Aller dans **Settings → Environment Variables**
2. Ajouter les 3 variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `MAKE_WEBHOOK_URL`

### 3. Redéployer pour prendre en compte les variables

```bash
vercel --prod
```

## Configuration DNS OVH → Vercel

### 1. Ajouter le domaine dans Vercel

1. Dans Vercel Dashboard → **Settings → Domains**
2. Cliquer sur **Add**
3. Entrer `mutuom.com` et `www.mutuom.com`
4. Vercel affichera les enregistrements DNS à ajouter

### 2. Configurer OVH

1. Se connecter à l'**espace client OVH**
2. Aller dans **Noms de domaine → mutuom.com → Zone DNS**
3. Ajouter les enregistrements fournis par Vercel :

**Type A** (pour le domaine principal)
```
Sous-domaine : @
Cible : 76.76.21.21 (IP fournie par Vercel)
TTL : Auto
```

**Type CNAME** (pour www)
```
Sous-domaine : www
Cible : cname.vercel-dns.com
TTL : Auto
```

4. **Sauvegarder** et attendre la propagation (5 min à 48h, généralement <1h)

### 3. Vérifier la propagation

```bash
# Vérifier le domaine principal
dig mutuom.com

# Vérifier www
dig www.mutuom.com
```

## 📁 Structure du Projet

```
mutuom-landing/
├── app/
│   ├── api/
│   │   ├── ambassadors/
│   │   │   └── route.ts          # API ambassadeurs (POST + GET compteur)
│   │   └── fournisseurs/
│   │       └── route.ts          # API fournisseurs (POST)
│   ├── fournisseur/
│   │   └── page.tsx              # Page formulaire fournisseurs
│   ├── layout.tsx                # Layout avec fonts
│   ├── page.tsx                  # Page principale (accueil)
│   └── globals.css               # Styles globaux
├── components/
│   ├── Button.tsx                # Bouton réutilisable
│   └── sections/
│       ├── Hero.tsx              # Section Hero + Nav + Logo M
│       ├── Problem.tsx           # Problème pricing (40% plus cher)
│       ├── Solution.tsx          # Comment ça marche (fond Navy)
│       ├── Combat.tsx            # Pourquoi MUTUOM existe (manifeste)
│       ├── Values.tsx            # 5 valeurs (temps, €, experts, liberté, RSE)
│       ├── Simulator.tsx         # Calculateur économies (15%)
│       ├── Transparency.tsx      # L'union fait la force (fond Navy)
│       └── FinalCTA.tsx          # Formulaire ambassadeur
├── lib/
│   ├── supabase.ts               # Client Supabase
│   └── validations.ts            # Schémas Zod (ambassadeur + fournisseur)
├── public/
│   └── logo.svg                  # Logo M de MUTUOM (seul)
├── supabase-setup-complet.sql    # Script SQL complet (tables + RLS + fonction)
├── .env.local.example            # Template variables d'environnement
├── SUPABASE-SETUP.md             # Guide configuration Supabase
├── DEPLOIEMENT-VERCEL.md         # Guide déploiement Vercel + DNS
├── GITHUB-SETUP.md               # Guide configuration Git/GitHub
└── README.md                     # Ce fichier
```

## ✨ Fonctionnalités

### Page d'accueil (/)
✅ Hero avec compteur places restantes (dynamique via API Supabase)
✅ Logo M seul (sans texte MUTUOM)
✅ Section problème : comparaison prix TPE vs Grands groupes (100€ vs 60€)
✅ Solution en 3 étapes (fond Navy, numéros verts)
✅ Section "Pourquoi MUTUOM existe" (manifeste + exemple gérant Lyon)
✅ 5 valeurs (temps, économies, experts, liberté, RSE)
✅ Simulateur économies interactif (base 15%, couleurs Navy/Terracotta)
✅ Section "L'union fait la force" (fond Navy)
✅ Formulaire ambassadeur complet avec validation Zod
✅ Envoi Supabase table `ambassadeurs` + webhook Make.com

### Page fournisseur (/fournisseur)
✅ Formulaire dédié fournisseurs
✅ Validation complète (catégorie, volume, zone livraison)
✅ Envoi Supabase table `fournisseurs` + webhook Make.com
✅ Lien depuis bouton "Espace Fournisseur" dans Hero

### Technique
✅ Responsive mobile-first (375px → 1440px+)
✅ Optimisations desktop (lg: et xl: breakpoints)
✅ Charte graphique MUTUOM respectée (Navy, Forest, Terracotta)
✅ RLS Supabase activé (sécurité)
✅ Fonction SQL `get_ambassador_count()` pour compteur dynamique
✅ TypeScript strict mode
✅ ESLint configuré

## Charte Graphique

### Couleurs

- **Navy** `#0A2E4D` : CTA primaires, titres
- **Forest** `#1E8A6F` : Accents, success
- **Terracotta** `#C1663A` : Highlights
- **Gray-50** `#F8F9FA` : Backgrounds sections
- **Gray-600** `#6C757D` : Textes secondaires

### Typographie

- **Titres** : Sora (300, 400, 600, 700)
- **Corps** : Inter (400, 500, 600)

## Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer production localement
npm run start

# Linter
npm run lint
```

## Performances

Target Lighthouse :
- Performance : >90
- Accessibilité : >95
- Best Practices : >95
- SEO : >95

## Support

Questions ? → louis-marie@mutuom.com

---

**Version** : 1.0
**Date** : Janvier 2026
