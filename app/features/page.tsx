"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Brain, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import FeaturesBackground3D from "@/components/FeaturesBackground3D";
import { ExamRadar } from "@/components/features/ExamRadar";
import { FlipCard } from "@/components/features/FlipCard";
import { TypingList } from "@/components/features/TypingList";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Courbe smooth satisfaisante
    }
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};


export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      
      <main className="relative min-h-screen bg-zinc-950 text-zinc-100">
        {/* Background 3D Fixed */}
        <div className="fixed inset-0 -z-10">
          <FeaturesBackground3D />
        </div>

        {/* Header Section */}
        <section className="relative px-6 pt-32 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Les Outils Qui Font la Différence
              </span>
            </motion.div>

            <h1 className="mb-6 font-[var(--font-space-grotesk)] text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Concentre-toi sur{" "}
              <span className="gradient-text">réussir tes examens</span>
            </h1>
            <p className="text-xl text-zinc-400 md:text-2xl">
              Pas sur la prise de notes. MemoFlow s'occupe du reste.
            </p>
          </motion.div>
        </section>

        {/* FEATURE 1 - L'Exam Radar (Text Left / Visual Right) */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInLeft}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider text-purple-400">
                    Prédiction Intelligente
                  </span>
                </div>

                <h2 className="mb-6 font-[var(--font-space-grotesk)] text-4xl font-bold leading-tight md:text-5xl">
                  Anticipe tes partiels.
                </h2>

                <p className="mb-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
                  L&apos;IA analyse tes cours et identifie les concepts clés qui ont{" "}
                  <span className="font-semibold text-purple-400">90% de chances</span> de tomber à l&apos;examen.
                </p>

                <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
                  Ne révise pas tout,{" "}
                  <span className="font-semibold text-white">révise ce qui compte.</span>
                </p>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInRight}
                className="flex justify-center"
              >
                <ExamRadar />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mx-auto my-20 h-px w-2/3 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* FEATURE 2 - Flashcards Intelligentes (Visual Left / Text Right) */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Visual (Left) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInLeft}
                className="flex justify-center lg:order-1"
              >
                <FlipCard />
              </motion.div>

              {/* Text (Right) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInRight}
                className="lg:order-2"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider text-pink-400">
                    Apprentissage Actif
                  </span>
                </div>

                <h2 className="mb-6 font-[var(--font-space-grotesk)] text-4xl font-bold leading-tight md:text-5xl">
                  Mémorisation Active.
                </h2>

                <p className="mb-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
                  Transforme tes notes en{" "}
                  <span className="font-semibold text-pink-400">quiz interactifs</span>.
                </p>

                <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
                  Notre algorithme de{" "}
                  <span className="font-semibold text-white">répétition espacée</span> s&apos;assure que tu n&apos;oublies rien.
                </p>

                <div className="mt-8 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 backdrop-blur-sm">
                  <p className="text-sm text-zinc-300">
                    💡 <span className="font-semibold">Astuce :</span> Clique sur la carte ci-contre pour voir l&apos;effet !
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mx-auto my-20 h-px w-2/3 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* FEATURE 3 - Résumé Structuré (Text Left / Visual Right) */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInLeft}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider text-purple-400">
                    Synthèse Instantanée
                  </span>
                </div>

                <h2 className="mb-6 font-[var(--font-space-grotesk)] text-4xl font-bold leading-tight md:text-5xl">
                  Des fiches de révision,{" "}
                  <span className="gradient-text">sans l&apos;effort.</span>
                </h2>

                <p className="mb-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
                  L&apos;IA structure tes cours en{" "}
                  <span className="font-semibold text-white">hiérarchies claires</span> : chapitres, sections, concepts clés.
                </p>

                <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
                  Des bullet points{" "}
                  <span className="font-semibold text-purple-400">parfaitement organisés</span>, générés en quelques secondes.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      ✓
                    </div>
                    Hiérarchisation automatique
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      ✓
                    </div>
                    Mots-clés surlignés
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      ✓
                    </div>
                    Export PDF propre
                  </div>
                </div>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInRight}
                className="flex justify-center"
              >
                <TypingList />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative px-6 py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-6 font-[var(--font-space-grotesk)] text-4xl font-bold md:text-5xl">
              Prêt à{" "}
              <span className="gradient-text">transformer tes résultats</span> ?
            </h2>
            <p className="mb-8 text-xl text-zinc-400">
              Rejoins les milliers d&apos;étudiants qui ont déjà pris de l&apos;avance.
            </p>
            <Link href="/dashboard">
              <button className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-5 text-xl font-semibold text-white transition-all hover:scale-105 glow-purple">
                Commencer maintenant
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}

