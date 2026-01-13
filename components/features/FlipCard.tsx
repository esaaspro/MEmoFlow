"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card Container */}
      <div
        className="relative h-96 w-full max-w-md cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex h-full flex-col justify-center gap-6">
              {/* Question Badge */}
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                🤔 Question
              </span>

              {/* Question Text */}
              <p className="text-lg font-medium leading-relaxed text-white">
                Quelle est la différence entre l&apos;Actif et le Passif en comptabilité ?
              </p>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex h-full flex-col justify-center gap-6">
              {/* Answer Badge */}
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                ✅ Réponse
              </span>

              {/* Answer Text */}
              <div className="space-y-4">
                <p className="text-lg font-medium leading-relaxed text-white">
                  <span className="text-purple-400">L&apos;Actif</span> représente ce que l&apos;entreprise{" "}
                  <span className="font-semibold">possède</span> (emploi des ressources).
                </p>
                <p className="text-lg font-medium leading-relaxed text-white">
                  <span className="text-pink-400">Le Passif</span> représente ce que l&apos;entreprise{" "}
                  <span className="font-semibold">doit</span> (origine des ressources).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instruction Text */}
      <motion.p
        className="text-center text-sm text-zinc-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        👆 Clique sur la carte pour l&apos;interagir
      </motion.p>
    </div>
  );
}

