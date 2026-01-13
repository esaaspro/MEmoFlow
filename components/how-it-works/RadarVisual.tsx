"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

export function RadarVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center">
      {/* Radar Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 rounded-full border-2 border-purple-500/20" />
        <div className="absolute h-32 w-32 rounded-full border-2 border-purple-500/30" />
        <div className="absolute h-16 w-16 rounded-full border-2 border-purple-500/40" />
      </div>

      {/* Central Core */}
      <motion.div
        className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.6)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.6)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Target className="h-6 w-6 text-white" />
      </motion.div>

      {/* Rotating Sweep */}
      <motion.div
        className="absolute h-48 w-1 origin-bottom bg-gradient-to-t from-purple-500/80 to-transparent"
        style={{ bottom: "50%", transformOrigin: "bottom center" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Target 1 - High Probability */}
      <motion.div
        className="absolute right-16 top-12"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        <div className="relative flex flex-col items-center">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <div className="absolute inset-0 h-4 w-4 rounded-full bg-red-500 blur-md" />
          <motion.div
            className="mt-1 whitespace-nowrap rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-300 backdrop-blur-sm"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Prob: 90%
          </motion.div>
        </div>
      </motion.div>

      {/* Target 2 - Medium */}
      <motion.div
        className="absolute bottom-16 left-12"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      >
        <div className="relative flex flex-col items-center">
          <div className="h-3 w-3 rounded-full bg-orange-500" />
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-orange-500 blur-md" />
        </div>
      </motion.div>

      {/* Target 3 - High Probability */}
      <motion.div
        className="absolute left-16 top-16"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
      >
        <div className="relative">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <div className="absolute inset-0 h-4 w-4 rounded-full bg-red-500 blur-md" />
        </div>
      </motion.div>

      {/* Detection Label */}
      <motion.div
        className="absolute bottom-8 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          2 concepts à haute probabilité détectés
        </span>
      </motion.div>

      {/* Scan Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "inset 0 0 20px rgba(168, 85, 247, 0)",
            "inset 0 0 40px rgba(168, 85, 247, 0.3)",
            "inset 0 0 20px rgba(168, 85, 247, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

