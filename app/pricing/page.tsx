"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const pricingPlans = [
  {
    id: "decouverte",
    name: "Découverte",
    price: "0",
    period: "gratuit",
    description: "Parfait pour tester MemoFlow",
    features: [
      "3 documents par mois",
      "Résumés basiques",
      "Accès standard",
      "Support communautaire",
    ],
    buttonText: "Commencer gratuitement",
    buttonStyle: "border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800",
    highlighted: false,
  },
  {
    id: "etudiant",
    name: "Étudiant",
    price: "9,90",
    period: "/mois",
    description: "L'offre idéale pour réussir tes partiels",
    badge: "Le plus populaire",
    features: [
      "Documents illimités",
      "Génération de Flashcards IA",
      "Mode Quiz interactif",
      "Support prioritaire",
      "Export de tes notes",
    ],
    buttonText: "Choisir l'offre Étudiant",
    buttonStyle: "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50",
    highlighted: true,
  },
  {
    id: "major",
    name: "Major",
    price: "16,90",
    period: "/mois",
    description: "Pour ceux qui visent l'excellence",
    features: [
      "Tout du plan Étudiant",
      "Upload de fichiers > 50Mo",
      "IA Modèle Supérieur (Plus précis)",
      "Export PDF professionnel",
      "Accès aux nouvelles fonctionnalités en avant-première",
      "Support dédié 24/7",
    ],
    buttonText: "Devenir Major",
    buttonStyle: "border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20",
    highlighted: false,
  },
];

const faqItems = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, tu peux upgrader ou downgrader ton plan à tout moment. Les changements prennent effet immédiatement.",
  },
  {
    question: "Y a-t-il un engagement ?",
    answer: "Non, tu peux annuler ton abonnement à tout moment sans frais supplémentaires.",
  },
  {
    question: "Les documents sont-ils sécurisés ?",
    answer: "Absolument. Tous tes documents sont chiffrés et stockés de manière sécurisée. Nous respectons le RGPD.",
  },
  {
    question: "Puis-je utiliser MemoFlow sur plusieurs appareils ?",
    answer: "Oui, ton compte est accessible depuis n'importe quel appareil avec une connexion internet.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-zinc-950 to-zinc-950" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-32">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300"
          >
            <Sparkles className="h-4 w-4" />
            Tarifs transparents
          </motion.div>

          <h1 className="mb-4 font-[var(--font-space-grotesk)] text-5xl font-bold text-white lg:text-6xl">
            Investis dans ta réussite
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Des tarifs étudiants, rentabilisés dès le premier partiel. Choisis le plan qui correspond à tes besoins.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              className={`relative rounded-2xl border bg-zinc-900/30 p-8 backdrop-blur-xl transition-all ${
                plan.highlighted
                  ? "scale-105 border-purple-500/50 shadow-2xl shadow-purple-500/20 lg:scale-110"
                  : "border-zinc-800/50 hover:border-zinc-700/50"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="mb-2 font-[var(--font-space-grotesk)] text-2xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mb-4 text-sm text-zinc-400">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}€</span>
                  {plan.period && (
                    <span className="text-zinc-400">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/auth"
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all ${
                  plan.highlighted
                    ? `${plan.buttonStyle} hover:scale-105`
                    : `${plan.buttonStyle} hover:scale-[1.02]`
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto max-w-3xl"
        >
          <h2 className="mb-8 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-zinc-800/30"
                >
                  <span className="font-semibold text-white">{item.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5 text-zinc-400" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-zinc-400">{item.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
