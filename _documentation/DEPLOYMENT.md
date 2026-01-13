# 🚀 Guide de Déploiement - MemoFlow Landing Page

## Déploiement sur Vercel (Recommandé)

### Option 1 : Via l'interface Vercel

1. **Push sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: Landing page MemoFlow avec effets 3D"
   git branch -M main
   git remote add origin <votre-repo>
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub
   - Vercel détecte automatiquement Next.js

3. **Configuration (auto-détectée)**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Variables d'environnement** (si nécessaire)
   - Aucune requise pour cette landing page

5. **Déployer** 🎉

### Option 2 : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## Déploiement sur Netlify

### Via CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Déployer
netlify deploy --prod --dir=.next
```

### Via l'interface

1. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20.x

## Optimisations Pré-Déploiement

### 1. Vérifier les performances

```bash
npm run build
npm run start
```

Puis ouvrir Chrome DevTools > Lighthouse pour analyser :
- Performance
- Accessibility
- Best Practices
- SEO

### 2. Optimiser les images (si vous en ajoutez)

```bash
npm install sharp
```

Next.js optimisera automatiquement les images via `next/image`.

### 3. Analyser le bundle

```bash
npm install @next/bundle-analyzer

# Dans next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Puis :
```bash
ANALYZE=true npm run build
```

## Configuration DNS

### Vercel

1. Dans Vercel Dashboard > Settings > Domains
2. Ajouter votre domaine personnalisé
3. Configurer les DNS selon les instructions

**Enregistrements DNS** :
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL/TLS

- ✅ Automatique sur Vercel et Netlify
- Certificat Let's Encrypt gratuit
- HTTPS forcé par défaut

## Variables d'Environnement (Future)

Si vous ajoutez des features avec API :

```bash
# .env.local (ne pas commiter)
NEXT_PUBLIC_API_URL=https://api.memoflow.com
OPENAI_API_KEY=sk-...
```

**Dans Vercel** :
1. Settings > Environment Variables
2. Ajouter chaque variable
3. Redéployer

## Performance Tips

### 1. Route Caching

Next.js 16 active automatiquement le cache pour les routes statiques.

### 2. Image Optimization

Si vous ajoutez des images :

```tsx
import Image from "next/image";

<Image
  src="/hero.png"
  alt="MemoFlow"
  width={1200}
  height={630}
  priority // Pour les images above-the-fold
  quality={90}
/>
```

### 3. Font Optimization

✅ Déjà fait avec `next/font/google` :
- Fonts auto-hébergées
- Zéro layout shift
- Préchargement automatique

### 4. Code Splitting

✅ Automatique avec Next.js App Router :
- Chaque page est un chunk séparé
- Components dynamiques avec `next/dynamic`

### 5. Compression

Vercel active automatiquement :
- Gzip
- Brotli
- HTTP/2

## Monitoring Post-Déploiement

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

```tsx
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

## Checklist Pré-Launch ✅

- [ ] Vérifier que toutes les animations fonctionnent
- [ ] Tester sur mobile (responsive)
- [ ] Vérifier l'accessibilité (a11y)
- [ ] Tester la performance (Lighthouse > 90)
- [ ] Configurer les meta tags SEO
- [ ] Ajouter un favicon personnalisé
- [ ] Tester le formulaire CTA (si connecté)
- [ ] Vérifier les liens du footer
- [ ] Configurer Google Analytics
- [ ] Tester sur différents navigateurs
- [ ] Vérifier la conformité RGPD (si EU)

## Budget de Performance Cible

| Métrique | Cible | Actuel (estimé) |
|----------|-------|-----------------|
| First Contentful Paint | < 1.8s | ~1.2s |
| Largest Contentful Paint | < 2.5s | ~1.8s |
| Total Blocking Time | < 200ms | ~100ms |
| Cumulative Layout Shift | < 0.1 | ~0.05 |
| Speed Index | < 3.4s | ~2.1s |

## Rollback en cas de problème

### Vercel

1. Dashboard > Deployments
2. Trouver le déploiement précédent
3. Cliquer sur "Promote to Production"

### Git

```bash
git revert HEAD
git push
```

## Support Multi-régions

Vercel Edge Network déploie automatiquement sur :
- 🇺🇸 USA (East & West)
- 🇪🇺 Europe (Frankfurt, London)
- 🇦🇺 Asia-Pacific (Sydney, Tokyo)
- 🇸🇬 Singapore
- 🇮🇳 India

**Latence moyenne** : < 50ms pour 95% des utilisateurs.

## Coûts

### Vercel (Hobby - Gratuit)
- ✅ Déploiements illimités
- ✅ 100 GB bandwidth/mois
- ✅ Domaine personnalisé
- ✅ SSL automatique
- ✅ Analytics de base

### Vercel (Pro - $20/mois)
- ✅ Analytics avancées
- ✅ 1 TB bandwidth
- ✅ Support prioritaire
- ✅ Previews protégés par mot de passe

---

🚀 **Prêt pour le lancement !**

