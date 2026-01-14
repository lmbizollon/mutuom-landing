# Configuration Google Search Console - MUTUOM

## ✅ Étape 1 : Validation avec balise HTML meta (RECOMMANDÉ)

La balise meta a été ajoutée dans `app/layout.tsx`. Suivez ces étapes :

### Dans Google Search Console :

1. Allez sur https://search.google.com/search-console
2. Cliquez sur "Ajouter une propriété"
3. Choisissez **"Préfixe d'URL"** : `https://mutuom.com`
4. Sélectionnez la méthode **"Balise HTML"**
5. Vérifiez que le code correspond à celui dans le `<head>` :
   ```html
   <meta name="google-site-verification" content="62LPmFNdmacnDZQNySlpyT_Uz-PEFs3ZTVpPeEzFciY" />
   ```
6. Déployez le site sur Vercel avec cette balise
7. Une fois déployé, retournez dans Search Console et cliquez sur **"Valider"**

**Note** : La validation peut prendre quelques minutes. Google va vérifier que la balise est présente sur la page d'accueil de mutuom.com.

---

## 🔄 Étape 2 : Configuration mutuom.fr (2 OPTIONS)

### Option A : Redirection mutuom.fr → mutuom.com (RECOMMANDÉ)

**Pourquoi ?**
- Évite le contenu dupliqué
- Concentre le SEO sur un seul domaine
- Plus simple à gérer

**Comment faire ?**

#### Sur OVH (votre registrar actuel) :

1. Connectez-vous à votre compte OVH
2. Allez dans **"Domaines"** → **mutuom.fr**
3. Cliquez sur **"Redirection"** ou **"Redirection web"**
4. Configurez :
   - Type : **Redirection permanente (301)**
   - Source : `mutuom.fr` et `www.mutuom.fr`
   - Cible : `https://mutuom.com`
   - Avec ou sans www : **Avec www**
   - Protocole : **HTTPS**

#### Vérification :

```bash
# Test après configuration (attendre 1-2h pour propagation DNS)
curl -I https://mutuom.fr
# Devrait afficher : HTTP/1.1 301 Moved Permanently
# Location: https://mutuom.com
```

#### Dans Google Search Console :

Une fois la redirection active, ajoutez les deux propriétés :
1. `https://mutuom.com` (domaine principal - déjà configuré)
2. `https://mutuom.fr` (avec la même balise meta)

Google comprendra automatiquement que mutuom.fr redirige vers mutuom.com.

---

### Option B : Deux sites séparés (NON RECOMMANDÉ)

Si vous voulez vraiment avoir deux sites distincts :

#### 1. Modifier le sitemap pour inclure les deux domaines

Créez `app/sitemap-multi.ts` :

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const domains = ['https://mutuom.com', 'https://mutuom.fr']
  const currentDate = new Date()

  const urls: MetadataRoute.Sitemap = []

  domains.forEach(domain => {
    urls.push(
      {
        url: domain,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${domain}/fournisseur`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    )
  })

  return urls
}
```

#### 2. Configurer les domaines alternés dans `app/layout.tsx`

```typescript
alternates: {
  canonical: 'https://mutuom.com',
  languages: {
    'fr-FR': 'https://mutuom.fr',
  },
},
```

#### 3. Ajouter hreflang pour indiquer les versions

Dans le `<head>` :
```html
<link rel="alternate" hreflang="fr" href="https://mutuom.fr" />
<link rel="alternate" hreflang="fr" href="https://mutuom.com" />
<link rel="alternate" hreflang="x-default" href="https://mutuom.com" />
```

**ATTENTION** : Cette option crée du contenu dupliqué et peut nuire à votre SEO.

---

## 📊 Étape 3 : Après validation

### Soumettre le sitemap :

1. Dans Google Search Console → **"Sitemaps"**
2. Ajouter : `https://mutuom.com/sitemap.xml`
3. Cliquer sur **"Envoyer"**

### Demander l'indexation :

1. Dans Search Console → **"Inspection d'URL"**
2. Entrer : `https://mutuom.com`
3. Cliquer sur **"Demander une indexation"**

### Vérifier les pages indexées :

Après 24-48h, vérifier dans Google :
```
site:mutuom.com
```

---

## 🔧 Configuration DNS actuelle (OVH)

D'après l'erreur, vos enregistrements DNS actuels :

```
Type   Nom                 Valeur
TXT    www.mutuom.com      v=spf1 include:mx.ovh.com -all
```

### Si vous voulez utiliser la méthode DNS TXT (alternative) :

1. Allez dans OVH → DNS de mutuom.com
2. Ajoutez un enregistrement TXT :
   - Sous-domaine : `@` (ou vide)
   - Valeur : `google-site-verification=62LPmFNdmacnDZQNySlpyT_Uz-PEFs3ZTVpPeEzFciY`
   - TTL : 3600

3. Attendez 2-4 heures pour propagation DNS
4. Validez dans Search Console

**Note** : La méthode balise HTML meta est plus rapide (immédiate après déploiement).

---

## ✅ Checklist finale

- [ ] Balise meta ajoutée dans `app/layout.tsx`
- [ ] Site déployé sur Vercel
- [ ] Validation réussie dans Google Search Console pour mutuom.com
- [ ] Redirection mutuom.fr → mutuom.com configurée sur OVH
- [ ] Validation réussie dans Google Search Console pour mutuom.fr
- [ ] Sitemap soumis (https://mutuom.com/sitemap.xml)
- [ ] Première page indexée demandée
- [ ] Vérification après 24-48h : `site:mutuom.com` dans Google

---

## 🆘 Problèmes courants

### "Impossible de valider"
- Vérifiez que le site est bien déployé et accessible publiquement
- Vérifiez que la balise meta est dans le `<head>` (View Source sur le site)
- Attendez 5-10 minutes et réessayez

### "Redirection ne fonctionne pas"
- Attendez 1-2h pour propagation DNS
- Testez avec `curl -I https://mutuom.fr`
- Videz le cache de votre navigateur

### "Contenu dupliqué"
- Utilisez TOUJOURS la redirection 301 pour mutuom.fr → mutuom.com
- Ne créez PAS deux sites identiques

---

**Recommandation finale** : Utilisez la redirection 301 de mutuom.fr vers mutuom.com. C'est la meilleure pratique SEO.
