# 🎨 MemoFlow Logo - Guide d'Utilisation

## 📦 Assets Disponibles

### `logo.svg` (32×32 viewBox)
**Usage** : Petit logo, icônes, intégrations web  
**Taille** : Scalable (SVG vectoriel)  
**Fond** : Transparent  

**Utilisation** :
```html
<img src="/logo.svg" alt="MemoFlow" width="32" height="32" />
```

---

### `logo-512.svg` (512×512)
**Usage** : Haute résolution, prints, grande taille  
**Taille** : 512×512 pixels (viewBox 32×32)  
**Fond** : Transparent  

**Utilisation** :
```html
<img src="/logo-512.svg" alt="MemoFlow" width="512" height="512" />
```

**Idéal pour** :
- Open Graph images
- App store icons
- Prints haute qualité

---

### `logo-dark-bg.svg` (512×512 avec fond)
**Usage** : Réseaux sociaux, avatars, thumbnails  
**Taille** : 512×512 pixels  
**Fond** : Zinc-900 (#18181B) avec border-radius 128px  

**Utilisation** :
```html
<img src="/logo-dark-bg.svg" alt="MemoFlow" width="512" height="512" />
```

**Idéal pour** :
- Twitter/X avatar
- LinkedIn logo
- YouTube channel icon
- Discord server icon

---

## 🎨 Règles d'Utilisation

### Espace de Respiration

Toujours laisser un espace minimal autour du logo égal à la **hauteur d'une barre** :

```
┌─────────────────┐
│     [espace]    │
│   ┌─────────┐   │
│   │  LOGO   │   │  ← Minimum 10% de marge
│   └─────────┘   │
│     [espace]    │
└─────────────────┘
```

### Taille Minimale

**Web** : Minimum 24×24px  
**Print** : Minimum 10mm × 10mm  

**Raison** : L'étincelle devient invisible en dessous.

---

## 🚫 À NE PAS FAIRE

❌ **Déformer** le logo (stretch horizontal/vertical)  
❌ **Changer les couleurs** (gradient sacré)  
❌ **Ajouter des ombres** portées (sauf subtiles)  
❌ **Rotation** (sauf 90° multiples)  
❌ **Placer sur fond coloré** distrayant  

✅ **À FAIRE** :
- Utiliser sur fond sombre (Zinc-900/950)
- Utiliser sur fond blanc si nécessaire
- Garder le ratio 1:1 (carré)
- Laisser respirer

---

## 📐 Formats Recommandés par Usage

| Usage | Fichier | Taille |
|-------|---------|--------|
| **Navbar Web** | Composant Logo.tsx | 40×40px |
| **Favicon** | app/icon.tsx | 32×32px |
| **Footer** | logo.svg | 32×32px |
| **Open Graph** | logo-512.svg | 512×512px |
| **Twitter Avatar** | logo-dark-bg.svg | 512×512px |
| **App Store** | logo-512.svg | 1024×1024px |
| **Print A4** | logo-512.svg | Vectoriel |

---

## 🎨 Couleurs Officielles

```css
--violet-primary: #A855F7  /* Purple-500 */
--rose-primary: #EC4899    /* Pink-500 */
--background-dark: #18181B  /* Zinc-900 */
--background-darker: #09090B /* Zinc-950 */
```

**Gradient** :
```css
background: linear-gradient(135deg, #A855F7 0%, #EC4899 100%);
```

---

## 📱 Réseaux Sociaux

### Twitter/X
**Fichier** : `logo-dark-bg.svg`  
**Taille** : 400×400px minimum  
**Format** : PNG ou SVG  

### LinkedIn
**Fichier** : `logo-dark-bg.svg`  
**Taille** : 300×300px minimum  

### Instagram
**Fichier** : `logo-dark-bg.svg`  
**Taille** : 320×320px minimum  

### YouTube
**Fichier** : `logo-dark-bg.svg`  
**Taille** : 800×800px recommandé  

---

## 🖨️ Print

### Carte de Visite
**Fichier** : `logo-512.svg`  
**Taille** : 15mm × 15mm  
**Mode** : CMJN (convertir depuis RVB)  

### Affiche/Flyer
**Fichier** : `logo-512.svg`  
**Taille** : Scalable selon besoin  
**Résolution** : Vectoriel (pas de perte)  

---

## 💻 Intégration Code

### React/Next.js

```tsx
import { Logo } from "@/components/ui/Logo";

<Logo className="w-10 h-10" />
```

### HTML Statique

```html
<img src="/logo.svg" alt="MemoFlow" width="40" height="40" />
```

### CSS Background

```css
.logo-background {
  background-image: url('/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
}
```

---

## 📊 Versions du Logo

| Version | Gradient | Fond | Usage |
|---------|----------|------|-------|
| **Principale** | ✅ Oui | Transparent | Web, app |
| **Monochrome Blanc** | ❌ Non | Transparent | Print N&B |
| **Avec Fond** | ✅ Oui | Zinc-900 | Réseaux |

---

## 🔗 Liens Utiles

- **Composant** : `components/ui/Logo.tsx`
- **Favicon** : `app/icon.tsx`
- **Documentation** : `BRAND_IDENTITY.md`
- **Assets** : `public/logo*.svg`

---

**Version** : 1.0.0  
**Mise à jour** : 13 janvier 2026  
**Contact** : brand@memoflow.app

