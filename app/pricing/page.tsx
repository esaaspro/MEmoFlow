"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Brain, Target, MessageSquare, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import PricingBackground3D from "@/components/PricingBackground3D";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
  badge?: string;
}

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  buttonText, 
  buttonLink,
  highlighted = false,
  badge
}: PricingCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-xl ${
        highlighted
          ? "border-transparent bg-zinc-900/60 shadow-2xl shadow-purple-500/20 lg:scale-105"
          : "border-zinc-800 bg-zinc-900/40"
      }`}
    >
      {/* Badge si highlighted */}
      {highlighted && badge && (
        <div className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </div>
      )}

      {/* Bordure dégradée animée si highlighted */}
      {highlighted && (
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 opacity-100 blur-xl" />
      )}

      <div className="relative">
        {/* Nom du plan */}
        <h3 className="mb-2 font-[var(--font-space-grotesk)] text-2xl font-bold text-zinc-100">
          {name}
        </h3>

        {/* Prix */}
        <div className="mb-2 flex items-baseline gap-2">
          <span className="font-[var(--font-space-grotesk)] text-5xl font-bold text-zinc-100">
            {price}
          </span>
          <span className="text-zinc-400">{period}</span>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm text-zinc-400">{description}</p>

        {/* Features */}
        <ul className="mb-8 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-zinc-300">
              <span className={highlighted ? "text-purple-400" : "text-zinc-500"}>
                {feature.icon}
              </span>
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href={buttonLink} className="block">
          {highlighted ? (
            <button className="group w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white transition-all hover:scale-105 glow-purple">
              {buttonText}
            </button>
          ) : (
            <button className="w-full rounded-full border border-zinc-700 py-3 font-semibold text-zinc-100 transition-all hover:border-zinc-600 hover:bg-zinc-800/50">
              {buttonText}
            </button>
          )}
        </Link>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  const boursierFeatures = [
    { icon: <Check className="h-5 w-5" />, text: "30 min d'enregistrement / mois" },
    { icon: <Check className="h-5 w-5" />, text: "Résumé structuré simple" },
    { icon: <Check className="h-5 w-5" />, text: "Export texte basique" },
    { icon: <Check className="h-5 w-5" />, text: "Support communautaire" },
  ];

  const majorFeatures = [
    { icon: <Zap className="h-5 w-5" />, text: "Enregistrement Illimité" },
    { icon: <Brain className="h-5 w-5" />, text: "Synthèse GPT-4o détaillée" },
    { icon: <Target className="h-5 w-5" />, text: "Flashcards & Quiz auto" },
    { icon: <MessageSquare className="h-5 w-5" />, text: "Mode Chat avec le cours" },
    { icon: <FileText className="h-5 w-5" />, text: "Export PDF propre" },
    { icon: <Sparkles className="h-5 w-5" />, text: "Exam Radar activé" },
    { icon: <Check className="h-5 w-5" />, text: "Export Notion/Anki" },
    { icon: <Check className="h-5 w-5" />, text: "Support prioritaire" },
  ];

  const faqs = [
    {
      question: "Puis-je annuler quand je veux ?",
      answer: "Oui, tu peux annuler ton abonnement à tout moment. Pas d'engagement, pas de frais cachés."
    },
    {
      question: "Est-ce que ça marche pour toutes les matières ?",
      answer: "Absolument ! MemoFlow fonctionne pour tous les cours : sciences, langues, droit, médecine, etc."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "100%. Tes enregistrements sont chiffrés et stockés de manière sécurisée. Tu peux les supprimer à tout moment."
    },
  ];

  return (
    <>
      <Navbar />
      
      <main className="relative min-h-screen bg-zinc-950 text-zinc-100">
        {/* Background 3D Tunnel */}
        <div className="fixed inset-0 -z-10">
          <PricingBackground3D />
        </div>

        {/* Header */}
        <section className="relative flex min-h-[60vh] items-center justify-center px-6 pt-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 font-[var(--font-space-grotesk)] text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Investis dans ta{" "}
              <span className="gradient-text">réussite</span>.
            </h1>
            <h2 className="mx-auto max-w-3xl text-xl text-zinc-400 md:text-2xl">
              Des tarifs étudiants, rentabilisés dès le premier partiel.
            </h2>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="relative px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"
          >
            {/* Carte Boursier */}
            <PricingCard
              name="Boursier"
              price="0€"
              period="/ mois"
              description="Pour découvrir la puissance de l'IA."
              features={boursierFeatures}
              buttonText="Commencer gratuitement"
              buttonLink="/"
            />

            {/* Carte Major (Highlighted) */}
            <PricingCard
              name="Major"
              price="9,99€"
              period="/ mois"
              description="La suite complète pour exploser tes résultats."
              features={majorFeatures}
              buttonText="Devenir Major"
              buttonLink="/"
              highlighted
              badge="Recommandé"
            />
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="relative px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-12 text-center font-[var(--font-space-grotesk)] text-4xl font-bold">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl"
                >
                  <h3 className="mb-3 font-[var(--font-space-grotesk)] text-lg font-semibold text-zinc-100">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Final */}
        <section className="relative px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-6 font-[var(--font-space-grotesk)] text-3xl font-bold md:text-4xl">
              Prêt à transformer tes notes en{" "}
              <span className="gradient-text">mention</span> ?
            </h2>
            <p className="mb-8 text-lg text-zinc-400">
              Rejoins les milliers d'étudiants qui ont déjà fait le choix de l'excellence.
            </p>
            <Link href="/">
              <button className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 text-lg font-semibold text-white transition-all hover:scale-105 glow-purple">
                Commencer maintenant
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}

