"use client";

import { motion } from "framer-motion";

export function ExamRadar() {
  return (
    <div className="relative flex h-96 items-center justify-center">
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full border border-purple-500/20" />
        <div className="absolute h-48 w-48 rounded-full border border-purple-500/30" />
        <div className="absolute h-32 w-32 rounded-full border border-purple-500/40" />
      </div>

      {/* Central glowing core */}
      <motion.div
        className="absolute z-10 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.6)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.6)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Rotating scanning line */}
      <motion.div
        className="absolute h-64 w-1 origin-bottom bg-gradient-to-t from-purple-500/80 to-transparent"
        style={{ bottom: "50%", transformOrigin: "bottom center" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Hotspot 1 */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-4 w-4 rounded-full bg-pink-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full bg-pink-500 blur-md" />
      </motion.div>

      {/* Hotspot 2 */}
      <motion.div
        className="absolute right-1/3 top-1/3 h-4 w-4 rounded-full bg-purple-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      >
        <div className="absolute inset-0 rounded-full bg-purple-500 blur-md" />
      </motion.div>

      {/* Hotspot 3 */}
      <motion.div
        className="absolute bottom-1/3 left-1/3 h-4 w-4 rounded-full bg-pink-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
      >
        <div className="absolute inset-0 rounded-full bg-pink-500 blur-md" />
      </motion.div>

      {/* Hotspot 4 */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-4 w-4 rounded-full bg-purple-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 3 }}
      >
        <div className="absolute inset-0 rounded-full bg-purple-500 blur-md" />
      </motion.div>

      {/* Detection labels */}
      <motion.div
        className="absolute right-8 top-16 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300 backdrop-blur-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        📍 Concept détecté
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-8 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs text-pink-300 backdrop-blur-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        🎯 Question probable
      </motion.div>
    </div>
  );
}
