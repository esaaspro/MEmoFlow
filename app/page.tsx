"use client";

import { motion } from "framer-motion";
import { 
  Mic, 
  Sparkles, 
  Target, 
  MessageSquare, 
  FileText, 
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import HeroBackground3D from "@/components/HeroBackground3D";
import { BentoCard } from "@/components/ui/BentoCard";
import { Navbar } from "@/components/Navbar";
import { WaveformAnimation } from "@/components/WaveformAnimation";
import { GridBackground } from "@/components/GridBackground";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        {/* Hero Section - Perfect Vertical Centering */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <HeroBackground3D />
        
        {/* Vignette sombre subtile sur les bords */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-zinc-950/30 to-zinc-950" />
        
        <motion.div
          className="relative z-10 mx-auto w-full max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            variants={fadeInUp}
            className="fluid-title mb-8 font-[var(--font-space-grotesk)] font-bold tracking-tight"
          >
            N&apos;écris plus{" "}
            <span className="gradient-text">jamais</span>
            <br />
            tes cours.
          </motion.h1>

          {/* Badge AI Model - Entre le titre et le sous-titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <span className="fluid-badge inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 font-medium text-zinc-400 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Propulsé par GPT-5.2
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="fluid-subtitle mx-auto mb-12 max-w-3xl text-zinc-400"
          >
            L&apos;IA transforme tes cours audio en fiches structurées,
            flashcards et quiz.{" "}
            <span className="text-zinc-300">
              Dors pendant le cours, majore tes partiels.
            </span>
          </motion.h2>

          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="fluid-button group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all hover:scale-105 glow-purple">
              <Mic className="h-5 w-5" />
              Lancer l&apos;enregistrement
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="fluid-button rounded-full border border-zinc-700 px-8 py-4 font-semibold text-zinc-100 backdrop-blur-xl transition-all hover:border-zinc-600 hover:bg-zinc-800/50">
              Voir la démo
            </button>
          </motion.div>

          {/* Social Proof - Proper spacing */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 text-center text-sm text-zinc-500"
          >
            Compatible avec tous vos formats : Amphi, TD, Visio &amp; Réunions.
          </motion.div>
        </motion.div>

        {/* Masque de dégradé pour transition fluide vers la section suivante */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </section>

      {/* Bento Grid Section */}
      <motion.section
        id="features"
        className="relative px-6 py-32"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GridBackground />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-[var(--font-space-grotesk)] text-5xl font-bold md:text-6xl">
              Ton nouveau{" "}
              <span className="gradient-text">cerveau externe</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Toute la puissance de l&apos;IA au service de ta réussite
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Carte large - Enregistrement Live */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <BentoCard
                title="Enregistrement Live"
                description="Capte chaque mot du prof. Transcription en temps réel avec détection des moments clés."
                icon={<Mic className="h-6 w-6" />}
                className="h-full"
              >
                <div className="mt-6 space-y-4">
                  <WaveformAnimation />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "67%" }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        1h 23min d&apos;enregistrement
                      </div>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            {/* Carte carrée - Synthèse Magique */}
            <motion.div variants={fadeInUp}>
              <BentoCard
                title="Synthèse Magique"
                description="3h de cours condensées en 2 pages de notes parfaites."
                icon={<Sparkles className="h-6 w-6" />}
                className="h-full"
              >
                <div className="mt-4 space-y-2">
                  {["Plan structuré", "Concepts clés", "Définitions"].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="flex items-center gap-2 text-sm text-zinc-400"
                    >
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </BentoCard>
            </motion.div>

            {/* Carte carrée - Exam Radar */}
            <motion.div variants={fadeInUp}>
              <BentoCard
                title="Exam Radar"
                description="Détecte ce que le prof souligne vraiment. Focus sur ce qui tombe."
                icon={<Target className="h-6 w-6" />}
                className="h-full"
              >
                <div className="mt-6 flex items-center justify-center">
                  <div className="relative h-24 w-24">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-purple-500/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Target className="h-8 w-8 text-purple-400" />
                    </motion.div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            {/* Carte large - Mode Chat */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <BentoCard
                title="Mode Chat GPT-4o"
                description="Discute avec tes notes. Pose des questions, obtiens des explications instantanées."
                icon={<MessageSquare className="h-6 w-6" />}
                className="h-full"
              >
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-xs">
                      Tu
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-none bg-zinc-800/50 px-4 py-2 text-sm">
                      Explique-moi le théorème de Pythagore simplement
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs">
                      AI
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-none bg-gradient-to-br from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm">
                      Dans un triangle rectangle, le carré de l&apos;hypoténuse...
                    </div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            {/* Carte - Flashcards */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <BentoCard
                title="Flashcards Auto"
                description="Génération automatique de cartes de révision. Mémorisation optimale."
                icon={<FileText className="h-6 w-6" />}
                className="h-full"
              >
                <div className="mt-6 flex items-center justify-center">
                  <motion.div
                    className="relative h-32 w-32"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 text-center text-xs">
                      Qu&apos;est-ce que la mitochondrie ?
                    </div>
                  </motion.div>
                </div>
              </BentoCard>
            </motion.div>

            {/* Carte large - Quiz Intelligents */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <BentoCard
                title="Quiz Intelligents"
                description="Quiz adaptatifs générés automatiquement. Entraîne-toi sur les vrais enjeux de l'exam."
                icon={<Zap className="h-6 w-6" />}
              >
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {[
                    "Question 1: Quelle est la différence entre mitose et méiose ?",
                    "Question 2: Expliquez le cycle de Krebs en 3 étapes",
                  ].map((q, i) => (
                    <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                      <p className="mb-3 text-sm text-zinc-300">{q}</p>
                      <div className="space-y-2 text-xs">
                        {["A", "B", "C"].map((opt) => (
                          <div
                            key={opt}
                            className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 transition-all hover:border-purple-500/50 hover:bg-purple-500/10"
                          >
                            {opt}. Réponse exemple
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="relative px-6 py-32"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GridBackground />
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-[var(--font-space-grotesk)] text-5xl font-bold md:text-6xl">
              Choisis ton{" "}
              <span className="gradient-text">plan de bataille</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Investis dans ta réussite
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {/* Plan Découverte - Gratuit */}
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl"
            >
              <h3 className="mb-2 text-2xl font-bold">Découverte</h3>
              <p className="mb-6 text-zinc-400">Parfait pour tester MemoFlow</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">0€</span>
                <span className="text-zinc-400"> gratuit</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "3 documents par mois",
                  "Résumés basiques",
                  "Accès standard",
                  "Support communautaire",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-zinc-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full rounded-full border border-zinc-700 py-3 font-semibold text-zinc-100 transition-all hover:border-zinc-600 hover:bg-zinc-800/50">
                Commencer gratuitement
              </button>
            </motion.div>

            {/* Plan Étudiant - Mis en avant */}
            <motion.div
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-3xl p-8"
            >
              {/* Badge Best Value */}
              <div className="absolute right-8 top-8 z-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-sm font-semibold">
                Le plus populaire
              </div>

              {/* Bordure animée */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 opacity-100 blur-xl" />
              <div className="absolute inset-[2px] -z-10 rounded-3xl bg-zinc-900" />

              <h3 className="mb-2 text-2xl font-bold">
                <span className="gradient-text">Étudiant</span>
              </h3>
              <p className="mb-6 text-zinc-400">L&apos;offre idéale pour réussir tes partiels</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">9,90€</span>
                <span className="text-zinc-400">/mois</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Documents illimités",
                  "Génération de Flashcards IA",
                  "Mode Quiz interactif",
                  "Support prioritaire",
                  "Export de tes notes",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-100">
                    <CheckCircle2 className="h-5 w-5 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-purple-500/50">
                Choisir l&apos;offre Étudiant
              </button>
            </motion.div>

            {/* Plan Major */}
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-zinc-900/50 p-8 backdrop-blur-xl"
            >
              <h3 className="mb-2 text-2xl font-bold">
                <span className="gradient-text">Major</span>
              </h3>
              <p className="mb-6 text-zinc-400">Pour ceux qui visent l&apos;excellence</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">16,90€</span>
                <span className="text-zinc-400">/mois</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Tout du plan Étudiant",
                  "Upload de fichiers > 50Mo",
                  "IA Modèle Supérieur (Plus précis)",
                  "Export PDF professionnel",
                  "Accès aux nouvelles fonctionnalités en avant-première",
                  "Support dédié 24/7",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-100">
                    <CheckCircle2 className="h-5 w-5 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full rounded-full border border-purple-500/50 bg-purple-500/10 py-3 font-semibold text-white transition-all hover:bg-purple-500/20 hover:scale-[1.02]">
                Devenir Major
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        className="relative px-6 py-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 font-[var(--font-space-grotesk)] text-4xl font-bold md:text-5xl">
            Prêt à transformer{" "}
            <span className="gradient-text">tes résultats</span> ?
          </h2>
          <p className="mb-8 text-xl text-zinc-400">
            Rejoins les milliers d&apos;étudiants qui ont déjà pris de l&apos;avance
          </p>
          <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-5 text-xl font-semibold text-white transition-all hover:scale-105 glow-purple">
            Commencer maintenant
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </motion.section>
      </main>
      <Footer />
    </>
  );
}
