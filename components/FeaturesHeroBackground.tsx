"use client";

import { motion } from "framer-motion";

/**
 * Features Hero Background - "Liquid Light Nebula"
 * 
 * Animated background avec orbes lumineux et mesh gradients
 * Couleurs : Deep Blue, Neon Purple, Hot Pink
 * Effet : Nébuleuse en mouvement lent
 */
export function FeaturesHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient (Deep Blue to Black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#050510] to-black" />

      {/* Animated Glowing Orbs */}
      
      {/* Orb 1 - Large Purple (Top Left) */}
      <motion.div
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #bd24df 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 - Medium Pink (Top Right) */}
      <motion.div
        className="absolute -right-20 top-20 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff2b8f 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Orb 3 - Small Purple (Center Bottom) */}
      <motion.div
        className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #bd24df 0%, transparent 70%)",
        }}
        animate={{
          x: [-50, 50, -50],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Orb 4 - Large Pink (Bottom Left) */}
      <motion.div
        className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff2b8f 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Orb 5 - Medium Blue-Purple (Center Right) */}
      <motion.div
        className="absolute right-40 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0a0a2e 0%, #bd24df 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Mesh Gradient Overlay (Subtle) */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(189, 36, 223, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 43, 143, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(10, 10, 46, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Noise Texture Overlay (for depth) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette (Dark edges) */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}

