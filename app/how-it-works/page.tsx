"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import FeaturesBackground3D from "@/components/FeaturesBackground3D";
import { TimelineCard } from "@/components/how-it-works/TimelineCard";
import { CaptureVisual } from "@/components/how-it-works/CaptureVisual";
import { SummaryVisual } from "@/components/how-it-works/SummaryVisual";
import { QuizVisual } from "@/components/how-it-works/QuizVisual";
import { RadarVisual } from "@/components/how-it-works/RadarVisual";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-zinc-950 text-zinc-100">
        {/* Background 3D Fixed */}
        <div className="fixed inset-0 -z-10">
          <FeaturesBackground3D />
        </div>

        {/* Header Section */}
        <section className="relative px-6 pb-20 pt-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Processus en 4 Étapes
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="mb-6 font-[var(--font-space-grotesk)] text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Comment ça{" "}
              <span className="gradient-text">marche</span> ?
            </h1>

            {/* Description */}
            <p className="text-xl text-zinc-400 md:text-2xl">
              De la capture à la réussite : un flux ultra-simple conçu pour les étudiants ambitieux.
            </p>
          </motion.div>
        </section>

        {/* Timeline Container */}
        <section className="relative px-6 pb-32">
          <div className="mx-auto max-w-6xl">
            {/* Vertical Glowing Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
              {/* Gradient Line */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 blur-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Animated Dot (travels down the line) */}
              <motion.div
                className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white"
                animate={{
                  y: ["0%", "100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-white blur-md" />
              </motion.div>
            </div>

            {/* Timeline Steps */}
            <div className="relative space-y-0">
              {/* Step 1 */}
              <TimelineCard
                number="01"
                title="Capture tout, ne rate rien."
                description="Enregistre ton cours en direct, upload un PDF/MP3, ou colle un lien YouTube. MemoFlow centralise tout."
                visual={<CaptureVisual />}
                index={0}
              />

              {/* Step 2 */}
              <TimelineCard
                number="02"
                title="Ta fiche de révision, instantanément."
                description="L'IA condense 2 heures de cours en une fiche de lecture claire et structurée, prête à être apprise."
                visual={<SummaryVisual />}
                index={1}
              />

              {/* Step 3 */}
              <TimelineCard
                number="03"
                title="Passe à la pratique."
                description="Ne lis pas passivement. Génère des Quiz pour te tester et des Flashcards pour ancrer les connaissances dans ta mémoire à long terme."
                visual={<QuizVisual />}
                index={2}
              />

              {/* Step 4 */}
              <TimelineCard
                number="04"
                title="L'Exam Radar."
                description="L'IA détecte ce que le prof répète et insiste dessus. Elle t'indique les concepts qui ont le plus de chances de tomber au partiel."
                visual={<RadarVisual />}
                index={3}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-6 py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-6 font-[var(--font-space-grotesk)] text-4xl font-bold md:text-5xl">
              Simple, rapide,{" "}
              <span className="gradient-text">efficace</span>.
            </h2>
            <p className="mb-8 text-xl text-zinc-400">
              Prêt à transformer tes cours en avantage stratégique ?
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

