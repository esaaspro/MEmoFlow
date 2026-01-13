# 🛠️ Guide de Développement - MemoFlow Landing Page

## 🚀 Démarrage Rapide

```bash
# Cloner le projet
git clone <votre-repo>
cd memoflow

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 📁 Structure du Projet

```
memoflow/
├── app/
│   ├── layout.tsx          # Layout global, fonts, metadata
│   ├── page.tsx            # Landing page principale
│   └── globals.css         # Styles globaux + utilitaires
│
├── components/
│   ├── ui/
│   │   └── BentoCard.tsx   # Carte avec effets 3D
│   ├── HeroBackground3D.tsx  # Scene React Three Fiber
│   ├── Navbar.tsx          # Navigation sticky
│   ├── Footer.tsx          # Pied de page
│   ├── WaveformAnimation.tsx # Ondes sonores
│   ├── GridBackground.tsx  # Grille cyberpunk
│   └── FloatingParticles.tsx # Particules 2D
│
├── lib/
│   └── utils.ts            # Fonction cn() pour Tailwind
│
├── public/                 # Assets statiques
├── node_modules/           # Dépendances
├── package.json            # Configuration npm
├── tsconfig.json           # Configuration TypeScript
├── tailwind.config.ts      # Configuration Tailwind
├── next.config.ts          # Configuration Next.js
├── postcss.config.mjs      # Configuration PostCSS
└── README.md              # Documentation principale
```

## 🎨 Comment Modifier...

### Les Couleurs

**Fichier** : `app/globals.css`

```css
:root {
  --purple: #A855F7;  /* ← Changer ici */
  --pink: #EC4899;    /* ← Changer ici */
}
```

**Utilisation dans le code** :
```tsx
className="from-purple-500 to-pink-500"  // Tailwind
color="#A855F7"                          // Three.js
```

### Les Fonts

**Fichier** : `app/layout.tsx`

```tsx
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
```

**Changer la font** :
1. Importer depuis `next/font/google`
2. Créer une instance avec configuration
3. Ajouter la variable au `<body>`
4. Utiliser avec `font-[var(--font-name)]`

### Le Background 3D

**Fichier** : `components/HeroBackground3D.tsx`

**Modifier le nombre de particules** :
```tsx
const particlesPosition = useMemo(() => {
  const positions = new Float32Array(5000 * 3); // ← Changer ici
  // ...
}, []);
```

**Modifier la vitesse de rotation** :
```tsx
useFrame((state) => {
  const time = state.clock.getElapsedTime();
  ref.current.rotation.x = time * 0.05;  // ← Plus petit = plus lent
  ref.current.rotation.y = time * 0.075;
});
```

**Modifier les couleurs** :
```tsx
<PointMaterial
  color="#A855F7"  // ← Couleur des particules
  size={0.15}      // ← Taille des particules
  opacity={0.6}    // ← Transparence
/>
```

### Les Animations

**Fichier** : `app/page.tsx`

**Modifier les variants** :
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },      // État initial
  visible: { opacity: 1, y: 0 },      // État final
};
```

**Modifier le timing** :
```tsx
<motion.div
  variants={fadeInUp}
  transition={{ duration: 0.8 }}  // ← Durée de l'animation
/>
```

**Modifier le stagger** :
```tsx
const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,  // ← Délai entre enfants
    },
  },
};
```

### Le Contenu Textuel

**Fichier** : `app/page.tsx`

Tous les textes sont en dur dans le composant. Chercher et remplacer :

```tsx
// Hero
<h1>N'écris plus jamais tes cours.</h1>
<h2>L'IA transforme l'audio...</h2>

// Features
<BentoCard
  title="Titre de la feature"
  description="Description..."
/>

// Pricing
<span className="text-5xl font-bold">9,90€</span>
```

### Ajouter une Nouvelle Section

1. **Créer la structure** :
```tsx
<section className="relative px-6 py-32">
  <GridBackground /> {/* Optionnel */}
  <div className="mx-auto max-w-7xl">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {/* Votre contenu */}
    </motion.div>
  </div>
</section>
```

2. **Ajouter un ID pour navigation** :
```tsx
<section id="ma-section" className="...">
```

3. **Ajouter dans la Navbar** :
```tsx
<a href="#ma-section">Ma Section</a>
```

### Ajouter une Nouvelle Card Bento

```tsx
<motion.div variants={fadeInUp} className="lg:col-span-1">
  <BentoCard
    title="Nouvelle Feature"
    description="Description de la feature"
    icon={<MonIcone className="h-6 w-6" />}
    className="h-full"
  >
    {/* Contenu personnalisé */}
  </BentoCard>
</motion.div>
```

**Layouts possibles** :
- `lg:col-span-1` : Carte carrée
- `lg:col-span-2` : Carte rectangulaire
- `lg:col-span-3` : Carte pleine largeur

## 🎭 Créer de Nouveaux Composants

### Template de Base

```tsx
"use client";  // Si utilise hooks ou animations

import { motion } from "framer-motion";
import { MonIcone } from "lucide-react";

interface MesProps {
  title: string;
  description?: string;
}

export function MonComposant({ title, description }: MesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="..."
    >
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
```

### Règles à Suivre

1. **"use client"** si :
   - Utilisation de hooks (useState, useEffect, etc.)
   - Animations Framer Motion
   - Event handlers (onClick, onMouseMove, etc.)
   - React Three Fiber

2. **TypeScript** :
   - Toujours typer les props
   - Utiliser interfaces pour les objets complexes
   - Exporter les types si réutilisés

3. **Tailwind** :
   - Utiliser `cn()` pour merger les classes conditionnelles
   - Préférer les utilitaires aux styles custom
   - Responsive : mobile-first (`sm:`, `md:`, `lg:`)

## 🧪 Testing en Développement

### Vérifier les Animations

1. Ouvrir Chrome DevTools
2. Aller dans Performance
3. Enregistrer pendant le scroll
4. Vérifier que FPS > 60

### Vérifier le Responsive

```bash
# Tester sur différentes tailles
- Mobile : 375px (iPhone SE)
- Tablet : 768px (iPad)
- Desktop : 1440px (MacBook)
```

### Vérifier l'Accessibilité

1. DevTools > Lighthouse
2. Lancer audit Accessibility
3. Corriger les warnings

## 📦 Ajouter de Nouvelles Dépendances

### Animation / 3D
```bash
npm install @react-spring/web        # Animations physiques
npm install gsap                     # Timeline animations
npm install leva                     # Controls 3D debugging
```

### UI
```bash
npm install @radix-ui/react-dialog   # Modals
npm install react-hot-toast          # Notifications
npm install sonner                   # Toasts modernes
```

### Forms
```bash
npm install react-hook-form          # Gestion de formulaires
npm install zod                      # Validation (déjà installé)
npm install @hookform/resolvers      # Resolver Zod
```

## 🐛 Debugging

### Problème : Les animations ne fonctionnent pas

**Solution** :
1. Vérifier que `"use client"` est présent
2. Vérifier les imports Framer Motion
3. Check console pour erreurs

### Problème : Le 3D ne s'affiche pas

**Solution** :
1. Vérifier que Canvas a une taille définie
2. Vérifier la position de la caméra
3. Ajouter `<ambientLight />` pour débugger
4. Console : erreurs Three.js ?

### Problème : Les classes Tailwind ne s'appliquent pas

**Solution** :
1. Vérifier `tailwind.config.ts` content paths
2. Restart dev server
3. Clear `.next` cache : `rm -rf .next`
4. Vérifier la syntaxe des classes

## 🔧 Scripts Utiles

```bash
# Développement
npm run dev              # Server hot-reload

# Production
npm run build            # Build optimisé
npm run start            # Serveur production

# Qualité
npm run lint             # ESLint check
npm run lint -- --fix    # Auto-fix

# Nettoyage
rm -rf .next             # Clear cache
rm -rf node_modules      # Clear deps
npm install              # Réinstaller
```

## 📊 Variables d'Environnement

Créer `.env.local` :

```env
# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API (si ajouté futur)
NEXT_PUBLIC_API_URL=http://localhost:3001
API_SECRET_KEY=secret

# Features flags
NEXT_PUBLIC_ENABLE_ANIMATIONS=true
```

**Usage** :
```tsx
const gaId = process.env.NEXT_PUBLIC_GA_ID;
```

## 🎯 Best Practices

### Performance
- ✅ Utiliser `next/image` pour les images
- ✅ Lazy load les composants lourds
- ✅ Memoize les calculs coûteux
- ✅ Éviter les re-renders inutiles

### Code Quality
- ✅ Composants < 200 lignes
- ✅ Extraire la logique complexe
- ✅ Nommer clairement variables/fonctions
- ✅ Commenter le code non-évident

### Git
- ✅ Commits atomiques
- ✅ Messages descriptifs
- ✅ Branches feature/nom
- ✅ Pull requests pour review

## 🚨 Common Pitfalls

### ❌ Oublier "use client"
```tsx
// ❌ Erreur
import { useState } from "react";

export function MonComposant() {
  const [count, setCount] = useState(0);
  // ...
}

// ✅ Correct
"use client";
import { useState } from "react";
```

### ❌ Imports depuis "react-dom/server"
```tsx
// ❌ Ne pas faire côté client
import { renderToString } from "react-dom/server";

// ✅ Seulement côté serveur (Server Components)
```

### ❌ Window/Document avant montage
```tsx
// ❌ Erreur SSR
const width = window.innerWidth;

// ✅ Correct
const [width, setWidth] = useState(0);
useEffect(() => {
  setWidth(window.innerWidth);
}, []);
```

---

**Happy Coding! 🚀**

Des questions ? Consultez :
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

