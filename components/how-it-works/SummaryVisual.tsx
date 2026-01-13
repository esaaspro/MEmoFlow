"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

export function SummaryVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center">
      {/* Long Document (Before) */}
      <motion.div
        className="absolute left-8 flex flex-col gap-2"
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: [1, 0.5, 0],
          scale: [1, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="h-2 rounded-full bg-zinc-700"
            style={{
              width: `${Math.random() * 40 + 60}px`,
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
          <FileText className="h-3 w-3" />
          <span>2h de cours</span>
        </div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        className="absolute"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          width="60"
          height="24"
          viewBox="0 0 60 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M2 12H58M58 12L50 4M58 12L50 20"
            stroke="url(#arrowGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 2 }}
          />
          <defs>
            <linearGradient id="arrowGradient">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Summary Card (After) */}
      <motion.div
        className="absolute right-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{
          width: "140px",
        }}
      >
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-xs font-medium text-purple-300">Fiche</span>
        </div>

        {/* Content Lines */}
        <div className="space-y-1.5">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full bg-purple-400/40"
              style={{
                width: `${Math.random() * 30 + 70}%`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2 + i * 0.1, duration: 0.3 }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 text-xs text-zinc-400">✓ Structuré</div>

        {/* Glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

