"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-12 backdrop-blur-xl"
    >
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500/20 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50">
          <FileText className="h-12 w-12 text-zinc-600" />
        </div>
      </div>

      {/* Text */}
      <h3 className="mb-2 font-[var(--font-space-grotesk)] text-xl font-semibold text-white">
        Aucune note pour le moment
      </h3>
      <p className="mb-6 text-center text-sm text-zinc-400">
        Crée ta première fiche en enregistrant un cours,<br />
        en important un PDF ou en ajoutant un lien YouTube.
      </p>

      {/* CTA */}
      <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105">
        <Sparkles className="h-4 w-4" />
        Créer ma première note
      </button>
    </motion.div>
  );
}

