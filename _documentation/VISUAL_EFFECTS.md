# 🎨 Guide des Effets Visuels - MemoFlow Landing Page

## Vue d'ensemble

Cette landing page utilise une stack technique premium pour créer une expérience visuelle de niveau Awwwards.

## 🌟 Effets Principaux

### 1. Background 3D Hero (React Three Fiber)

**Fichier** : `components/HeroBackground3D.tsx`

**Effets** :
- ✨ **Champ de particules** : 5000 particules flottantes avec rotation lente
- 🔮 **Sphère géométrique** : Icosaèdre en wireframe avec émission lumineuse
- 💡 **Éclairages dynamiques** : 
  - Lumière violette (#A855F7) à 10,10,10
  - Lumière rose (#EC4899) à -10,-10,-10

**Performance** :
- Utilise `AdditiveBlending` pour les particules
- `frustumCulled={false}` pour performance optimale
- Rotation à 0.05 et 0.075 rad/s pour effet hypnotisant

### 2. BentoCard avec Tilt 3D

**Fichier** : `components/ui/BentoCard.tsx`

**Effets au hover** :
- 🎯 **Tilt 3D** : La carte s'incline vers la position de la souris
  - `rotateX` : -10° à 10° 
  - `rotateY` : -10° à 10°
  - Spring physics : stiffness 300, damping 30

- 💎 **Glassmorphism** :
  - `backdrop-blur-xl`
  - `bg-zinc-900/50` avec transparence
  - Bordure `border-zinc-800/50`

- ✨ **Bordure animée** :
  - Dégradé violet-rose en arrière-plan
  - Opacité 0 → 100% au hover
  - Effet de blur intense (`blur-xl`)

### 3. Animations Framer Motion

**Variants utilisées** :

```typescript
fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}
```

**Déclenchement** :
- `initial="hidden"` : État initial
- `animate="visible"` : Pour la hero
- `whileInView="visible"` : Pour les sections au scroll
- `viewport={{ once: true, margin: "-100px" }}` : Optimisation

### 4. WaveformAnimation

**Fichier** : `components/WaveformAnimation.tsx`

**Effet** :
- 20 barres verticales animées
- Hauteur variable : 20% à 100%
- Dégradé `from-purple-500 to-pink-500`
- Délai décalé de 0.05s entre chaque barre
- Loop infini avec `ease: "easeInOut"`

### 5. GridBackground Cyberpunk

**Fichier** : `components/GridBackground.tsx`

**Composition** :
- Grille CSS avec `linear-gradient`
- Cellules de 4rem × 4rem
- Couleur violette à 10% d'opacité
- Vignette radiale pour fondu sur les bords

### 6. Navbar avec Scroll Effect

**Fichier** : `components/Navbar.tsx`

**Effets dynamiques** :
- `backgroundColor` : transparent → `rgba(9,9,11,0.8)` (0-100px scroll)
- `backdropFilter` : `blur(0px)` → `blur(12px)`
- Transition fluide avec `useTransform` de Framer Motion

### 7. Boutons CTA avec Glow

**Classes CSS** : `app/globals.css`

```css
.glow-purple {
  box-shadow: 
    0 0 40px rgba(168, 85, 247, 0.5),
    0 0 80px rgba(168, 85, 247, 0.3);
}

.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

**Utilisation** :
```tsx
<button className="bg-gradient-to-r from-purple-500 to-pink-500">
  <span className="glow-purple pulse-glow" />
  Lancer l'enregistrement
</button>
```

### 8. Gradient Text

**Classe utilitaire** :
```css
.gradient-text {
  @apply bg-gradient-to-r from-purple-500 to-pink-500 
         bg-clip-text text-transparent;
}
```

**Usage** :
```tsx
<span className="gradient-text">jamais</span>
```

## 🎯 Optimisations Performance

### GPU Acceleration
- Utilisation de `transform` au lieu de `top/left`
- `will-change` implicite via Framer Motion
- `transform: translate3d()` pour forcer le GPU

### Lazy Loading
- `whileInView` pour animer uniquement au scroll
- `viewport={{ once: true }}` pour ne pas re-animer

### Code Splitting
- Composants client isolés avec `"use client"`
- React Three Fiber chargé uniquement pour Hero

## 🎨 Palette de Couleurs Exacte

| Élément | Couleur | Hex |
|---------|---------|-----|
| Violet Accent | Purple 500 | #A855F7 |
| Rose Accent | Pink 500 | #EC4899 |
| Background | Zinc 950 | #09090B |
| Foreground | Zinc 100 | #FAFAFA |
| Borders | Zinc 800 | #27272A |
| Muted Text | Zinc 400 | #A1A1AA |

## 📐 Spacing & Sizing

- **Hero Height** : `min-h-screen` (100vh)
- **Section Padding** : `py-32` (8rem)
- **Container Max Width** : `max-w-7xl` (80rem)
- **Border Radius Cards** : `rounded-2xl` à `rounded-3xl`

## 🔄 Animations Timing

| Animation | Duration | Easing | Repeat |
|-----------|----------|--------|--------|
| Particules 3D | Rotation continue | Linear | ∞ |
| Tilt Card | 300ms | Spring | - |
| Fade In Up | 600ms | Default | - |
| Waveform Bars | 1-1.5s | easeInOut | ∞ |
| Pulse Glow | 2s | ease-in-out | ∞ |
| Progress Bar | 2s | Default | - |

## 🎬 Séquence d'Apparition Hero

1. **Badge GPT-4o** : Apparaît en premier
2. **Titre H1** : 100ms après
3. **Sous-titre H2** : 200ms après
4. **CTA Buttons** : 300ms après
5. **Social Proof** : 400ms après

Tous avec `fadeInUp` variant.

## 🌊 Effets de Scroll

- **Navbar** : Change de style à 100px de scroll
- **Sections** : Apparaissent avec margin de -100px avant viewport
- **Smooth Scroll** : Activé via CSS (`scroll-behavior: smooth`)

## 💡 Tips pour Modifications

### Changer les couleurs
Modifier dans `app/globals.css` :
```css
:root {
  --purple: #A855F7; /* Votre violet */
  --pink: #EC4899;   /* Votre rose */
}
```

### Accélérer/ralentir les animations
Dans `components/HeroBackground3D.tsx` :
```typescript
// Plus lent = nombres plus petits
ref.current.rotation.x = time * 0.05; // ← Modifier ici
```

### Modifier l'intensité du glow
Dans `app/globals.css` :
```css
.glow-purple {
  box-shadow: 
    0 0 60px rgba(168, 85, 247, 0.8), /* ← Plus intense */
    0 0 120px rgba(168, 85, 247, 0.5);
}
```

## 🚀 Build pour Production

```bash
npm run build
```

**Optimisations automatiques** :
- Tree-shaking de Three.js
- Minification des animations
- Compression des assets
- Image optimization

---

**Fait avec 💜 pour créer du wow**

