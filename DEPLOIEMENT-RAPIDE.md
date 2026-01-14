# 🚀 Déploiement rapide - MUTUOM

## Étape 1 : Déployer sur Vercel (maintenant)

```bash
# Si vous n'avez pas encore poussé sur Git
git add .
git commit -m "feat: Google Search Console + multi-domain setup"
git push origin main
```

Vercel déploiera automatiquement. Attendez 2-3 minutes.

---

## Étape 2 : Valider Google Search Console (5 minutes)

### Pour mutuom.com :

1. Allez sur https://search.google.com/search-console
2. Cliquez "Ajouter une propriété" → **"Préfixe d'URL"**
3. Entrez : `https://mutuom.com`
4. Choisissez **"Balise HTML"**
5. Vérifiez que le code affiché est :
   ```
   62LPmFNdmacnDZQNySlpyT_Uz-PEFs3ZTVpPeEzFciY
   ```
6. Cliquez **"Valider"** ✅

### Pour mutuom.fr :

**Option recommandée** : Configurez d'abord la redirection (voir ci-dessous), puis ajoutez mutuom.fr dans Search Console avec la même balise.

---

## Étape 3 : Redirection mutuom.fr → mutuom.com (OVH)

### Sur votre espace client OVH :

1. **Domaines** → **mutuom.fr**
2. Onglet **"Redirection"**
3. **"Ajouter une redirection"**
4. Configurez :
   ```
   Type : Redirection permanente (301)
   Domaine source : mutuom.fr
   Cible : https://mutuom.com
   Avec www : Oui (cochez)
   ```
5. Répétez pour `www.mutuom.fr` :
   ```
   Type : Redirection permanente (301)
   Domaine source : www.mutuom.fr
   Cible : https://mutuom.com
   ```

### Vérification (après 1-2h) :

```bash
curl -I https://mutuom.fr
# Devrait afficher :
# HTTP/1.1 301 Moved Permanently
# Location: https://mutuom.com
```

---

## Étape 4 : Soumettre le sitemap (2 minutes)

Dans Google Search Console (mutuom.com) :

1. Menu **"Sitemaps"**
2. Entrez : `sitemap.xml`
3. Cliquez **"Envoyer"** ✅

---

## Étape 5 : Demander l'indexation (1 minute)

Dans Google Search Console :

1. **"Inspection d'URL"**
2. Entrez : `https://mutuom.com`
3. Cliquez **"Demander une indexation"**

---

## 📊 Vérifications après 24-48h

### 1. Pages indexées dans Google :

```
site:mutuom.com
```

Vous devriez voir au moins la page d'accueil.

### 2. Redirection mutuom.fr :

Testez que https://mutuom.fr redirige bien vers https://mutuom.com

### 3. Rich Results (données structurées) :

Testez sur : https://search.google.com/test/rich-results

Entrez : `https://mutuom.com`

Vous devriez voir :
- ✅ Organization (MUTUOM)
- ✅ Service (Groupement d'achat)
- ✅ Offer (Adhésion ambassadeur)

---

## 🎯 Résultat attendu

Après configuration complète :

- ✅ **mutuom.com** : Site principal indexé
- ✅ **mutuom.fr** : Redirige vers mutuom.com (301)
- ✅ **Search Console** : Les deux domaines validés
- ✅ **Sitemap** : Soumis et traité
- ✅ **Structured Data** : 3 schémas valides
- ✅ **Indexation** : Pages visibles dans Google sous 48h

---

## ⚡ Commandes utiles

```bash
# Tester le site en local
npm run dev

# Build de production
npm run build

# Démarrer en production (local)
npm run build && npm start

# Vérifier que la balise meta est présente
curl -s https://mutuom.com | grep "google-site-verification"
```

---

## 🆘 Aide

Si vous avez des problèmes, consultez :
- `GOOGLE-SEARCH-CONSOLE-SETUP.md` (guide détaillé)
- Documentation OVH : https://docs.ovh.com/fr/domains/redirection-nom-de-domaine/

---

**Temps total estimé** : 15-20 minutes (+ 1-2h pour propagation DNS)
