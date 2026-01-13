"use client";

import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export function QuizVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center">
      {/* Flashcard 1 (Flipping) */}
      <motion.div
        className="absolute left-8 h-32 w-24 rounded-lg"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 180, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-xs font-medium text-purple-300 backdrop-blur-sm"
            style={{ backfaceVisibility: "hidden" }}
          >
            Q
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg border border-pink-500/30 bg-pink-500/10 text-xs font-medium text-pink-300 backdrop-blur-sm"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            R
          </div>
        </motion.div>
      </motion.div>

      {/* Central Quiz Card */}
      <motion.div
        className="relative z-10 w-48 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Question */}
        <div className="mb-3 text-xs font-medium text-white">
          2 + 2 = ?
        </div>

        {/* Options */}
        <div className="space-y-2">
          {/* Correct Answer */}
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-300"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>4</span>
          </motion.div>

          {/* Wrong Answer */}
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 opacity-40"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 0.4 }}
            transition={{ delay: 0.8 }}
          >
            <X className="h-4 w-4" />
            <span>5</span>
          </motion.div>
        </div>

        {/* Score */}
        <motion.div
          className="mt-3 flex items-center justify-between text-xs text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Score:</span>
          <span className="font-semibold text-green-400">8/10</span>
        </motion.div>
      </motion.div>

      {/* Flashcard 2 (Static) */}
      <motion.div
        className="absolute right-8 flex h-32 w-24 items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-xs font-medium text-purple-300 backdrop-blur-sm"
        initial={{ opacity: 0, rotate: -5 }}
        animate={{ opacity: 1, rotate: 5 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Q
      </motion.div>

      {/* Success Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-green-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, -40],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  );
}

