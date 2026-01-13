# Configuration GitHub - MUTUOM

## 📦 Initialiser le repository Git

### Étape 1 : Initialiser Git localement

```bash
cd mutuom-landing

# Initialiser le repository
git init

# Vérifier le .gitignore
cat .gitignore

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - MUTUOM landing page"
```

---

## 🔐 Configuration GitHub

### Identifiants GitHub
- **Username:** `lmbizollon`
- **Password:** `LPoT6hhYXXk3ey@M`

⚠️ **IMPORTANT SÉCURITÉ** : Changer le mot de passe GitHub après le projet pour un mot de passe unique et fort.

### Étape 2 : Créer le repository sur GitHub

1. **Aller sur GitHub** : https://github.com
2. **Se connecter** avec les identifiants ci-dessus
3. Cliquer sur **"+"** en haut à droite > **"New repository"**
4. Remplir les informations :
   - **Repository name:** `mutuom-website`
   - **Description:** Landing page MUTUOM - Groupement d'achat pour entreprises de nettoyage
   - **Visibility:** ✅ **Private** (recommandé au début)
   - ❌ **Ne PAS cocher** "Add a README file"
   - ❌ **Ne PAS cocher** "Add .gitignore"
   - ❌ **Ne PAS cocher** "Choose a license"
5. Cliquer sur **"Create repository"**

---

## 🔗 Lier le projet au repository

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/lmbizollon/mutuom-website.git

# Vérifier le remote
git remote -v

# Renommer la branche en main (si besoin)
git branch -M main

# Pousser le code
git push -u origin main
```

Si demande de mot de passe :
- Username: `lmbizollon`
- Password: `LPoT6hhYXXk3ey@M`

---

## 🔄 Workflow quotidien

### Après chaque modification

```bash
# Voir les fichiers modifiés
git status

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit avec un message descriptif
git commit -m "Description des modifications"

# Pousser vers GitHub
git push
```

### Exemples de messages de commit

```bash
git commit -m "Fix: Correction bug formulaire ambassadeur"
git commit -m "Add: Nouvelle section témoignages"
git commit -m "Update: Modification couleurs logo"
git commit -m "Refactor: Amélioration performances Hero"
```

---

## 🚀 Connexion avec Vercel

### Option 1 : Import depuis GitHub (Recommandé)

1. Aller sur https://vercel.com/dashboard
2. Cliquer sur **"Add New..."** > **"Project"**
3. Cliquer sur **"Import Git Repository"**
4. Autoriser Vercel à accéder à GitHub
5. Sélectionner `mutuom-website`
6. Cliquer sur **"Import"**
7. Configurer les variables d'environnement
8. Cliquer sur **"Deploy"**

✅ **Auto-deployment activé** : Chaque `git push` déclenchera un déploiement automatique !

### Option 2 : Lier un projet existant

```bash
# Dans le dossier du projet
vercel link

# Sélectionner "Link to existing project"
# Sélectionner le projet mutuom-landing
```

---

## 📋 Fichiers à ne JAMAIS commiter

Ces fichiers sont déjà dans `.gitignore` :

- ✅ `.env.local` - Variables d'environnement locales
- ✅ `.env` - Toutes variables d'environnement
- ✅ `node_modules/` - Dépendances npm
- ✅ `.next/` - Build Next.js
- ✅ `.vercel/` - Configuration Vercel

### Vérifier qu'aucun secret n'est committé

```bash
# Rechercher des secrets potentiels
git log --all -p | grep -i "password\|secret\|key" | head -20

# Si trouvé : NE PAS POUSSER et contacter un dev
```

---

## 🔐 Sécurité GitHub

### Activer l'authentification à 2 facteurs (Recommandé)

1. GitHub > Settings > Password and authentication
2. Cliquer sur **"Enable two-factor authentication"**
3. Suivre les instructions (app Authenticator recommandée)

### Créer un Personal Access Token (PAT)

Au lieu d'utiliser le mot de passe GitHub, utiliser un token :

1. GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Cliquer sur **"Generate new token"** > **"Generate new token (classic)"**
3. Note : `MUTUOM deployment`
4. Expiration : `90 days` (ou plus)
5. Scopes :
   - ✅ `repo` (Full control of private repositories)
6. Cliquer sur **"Generate token"**
7. **COPIER LE TOKEN** (ne sera plus visible)

Utiliser ce token au lieu du mot de passe lors du `git push`.

---

## 🌿 Branches (Optionnel - pour développement avancé)

### Workflow avec branches

```bash
# Créer une branche pour une nouvelle fonctionnalité
git checkout -b feature/nouvelle-section

# Faire des modifications...
git add .
git commit -m "Add: Nouvelle section partenaires"

# Pousser la branche
git push -u origin feature/nouvelle-section

# Sur GitHub : créer une Pull Request
# Merger dans main après validation
```

### Protéger la branche main

Sur GitHub :
1. Repository > Settings > Branches
2. Cliquer sur **"Add rule"**
3. Branch name pattern : `main`
4. ✅ **Require a pull request before merging**
5. Cliquer sur **"Create"**

Maintenant impossible de pousser directement sur `main`, obligation de passer par une Pull Request.

---

## 📊 Voir l'historique

```bash
# Voir tous les commits
git log

# Voir l'historique graphique
git log --graph --oneline --all

# Voir les différences depuis le dernier commit
git diff
```

---

## 🔄 Annuler des modifications

### Avant le commit

```bash
# Annuler toutes les modifications non commitées
git reset --hard

# Annuler les modifications d'un fichier spécifique
git checkout -- fichier.tsx
```

### Après le commit (local uniquement)

```bash
# Annuler le dernier commit (garde les modifications)
git reset --soft HEAD~1

# Annuler le dernier commit (supprime les modifications)
git reset --hard HEAD~1
```

⚠️ **ATTENTION** : Ne JAMAIS utiliser `reset --hard` après un `git push` !

---

## 🆘 En cas de problème

### Conflit lors du push

```bash
# Récupérer les modifications distantes
git pull --rebase

# Résoudre les conflits dans les fichiers
# Puis :
git add .
git rebase --continue

# Pousser
git push
```

### Tout casser et repartir de GitHub

```bash
# ⚠️ ATTENTION : Supprime TOUTES les modifications locales
git fetch origin
git reset --hard origin/main
```

---

## 📝 Checklist GitHub

- [ ] Repository créé sur GitHub
- [ ] Code poussé sur `main`
- [ ] `.env.local` bien dans `.gitignore` (jamais commité)
- [ ] Vercel connecté au repository GitHub
- [ ] Auto-deployment activé
- [ ] 2FA activé sur GitHub (recommandé)
- [ ] Personal Access Token créé (recommandé)

---

## 🎯 Commandes essentielles à retenir

```bash
# Statut du repo
git status

# Sauvegarder et pousser
git add .
git commit -m "Message"
git push

# Récupérer les mises à jour
git pull

# Voir l'historique
git log --oneline

# Annuler des modifications
git reset --hard
```

---

## 🔗 Liens utiles

- Repository : https://github.com/lmbizollon/mutuom-website
- GitHub Docs : https://docs.github.com
- Git Cheat Sheet : https://education.github.com/git-cheat-sheet-education.pdf
