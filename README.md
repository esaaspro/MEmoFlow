# 🎓 MemoFlow - Landing Page

> **N'écris plus jamais tes cours.**  
> L'IA transforme l'audio de l'amphi en fiches structurées, flashcards et quiz.

---

📚 **Documentation Complète** : Consultez **[_documentation/](./_documentation/)** pour tous les guides, changelogs et documentation technique.

⚡ **Quick Start** : Le serveur est déjà lancé sur **http://localhost:3000** - Ouvrez simplement cette URL !

---

## ✨ Fonctionnalités

Cette landing page showcase premium intègre :

- 🎨 **Design Cyber-Productivity** - Direction artistique futuriste avec dégradés Violet (#A855F7) et Rose (#EC4899)
- 🌌 **Background 3D React Three Fiber** - Champ de particules animées et sphère géométrique wireframe
- 💎 **Bento Grid avec Glassmorphism** - Cartes de fonctionnalités avec effets 3D au hover
- ⚡ **Animations Framer Motion** - Transitions fluides et effets de parallaxe
- 🎯 **Effets visuels haut de gamme** - Glow effects, bordures animées, pulse effects

## 🚀 Stack Technique

- **Next.js 16.1** - Framework React avec App Router
- **React Three Fiber** - Rendu 3D avec Three.js
- **Framer Motion** - Animations et interactions fluides
- **Tailwind CSS 4** - Styling moderne et responsive
- **TypeScript** - Type safety
- **Lucide React** - Icônes SVG

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

## 🎯 Sections de la Landing Page

### 1. Hero Section
- Background 3D animé avec particules et mesh géométrique
- Titre géant avec mot clé en dégradé
- CTA principal avec effet glow pulsant
- Social proof avec logos d'universités

### 2. Bento Grid - Fonctionnalités
- **Enregistrement Live** - Transcription temps réel
- **Synthèse Magique** - Condensation IA des cours
- **Exam Radar** - Détection des points clés
- **Mode Chat GPT-4o** - Discussion interactive avec les notes
- **Flashcards Auto** - Génération automatique de cartes
- **Quiz Intelligents** - Tests adaptatifs

### 3. Pricing Section
- Plan Gratuit (Starter)
- Plan Premium (Major) - Mis en avant avec bordure dégradée animée

### 4. Footer CTA
- Appel à l'action final avec effet glow

## 🎨 Palette de Couleurs

- **Background** : #09090b (Zinc 950)
- **Foreground** : #fafafa (Zinc 100)
- **Accent Violet** : #A855F7 (Purple 500)
- **Accent Rose** : #EC4899 (Pink 500)

## 🔤 Typographie

- **Titres** : Space Grotesk (Google Fonts)
- **Corps de texte** : Inter (Google Fonts)

## 🌐 Navigation

- Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📝 Structure des Composants

```
components/
├── HeroBackground3D.tsx     # Scène 3D React Three Fiber
└── ui/
    └── BentoCard.tsx         # Carte avec effets glassmorphism et tilt 3D

app/
├── layout.tsx                # Configuration globale, fonts
├── page.tsx                  # Landing page principale
└── globals.css               # Styles globaux et utilitaires

lib/
└── utils.ts                  # Fonctions utilitaires (cn pour Tailwind)
```

## 🎯 Effets Visuels Implémentés

### Background 3D
- 5000 particules flottantes avec rotation lente
- Sphère icosaèdre wireframe émissive
- Éclairages colorés (Violet et Rose)

### BentoCard
- Effet de tilt 3D au survol de la souris
- Bordure dégradée animée qui s'illumine au hover
- Glassmorphism avec backdrop-blur
- Animations d'échelle et de transformation

### Boutons CTA
- Effet glow pulsant
- Dégradés animés
- Transformations au hover

## 🏆 Best Practices

- ✅ SEO optimisé (meta tags, semantic HTML)
- ✅ Performance (animations GPU, lazy loading)
- ✅ Responsive design (mobile-first)
- ✅ Accessibilité (contraste, navigation clavier)
- ✅ Type safety avec TypeScript

## 📄 License

Projet personnel - MemoFlow Landing Page

---

**Fait avec 💜 et ⚡ pour impressionner**
