"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CardProps {
  front: string;
  back: string;
  delay: number;
  position: { x: number; y: number };
}

function FloatingCard({ front, back, delay, position }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: 0 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
        rotateY: isFlipped ? 180 : 0
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        rotateY: {
          duration: 0.6,
          ease: "easeInOut",
        }
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative h-48 w-64 rounded-xl shadow-2xl">
        {/* Front */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-6 backdrop-blur-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <p className="text-center text-lg font-semibold text-zinc-100">{front}</p>
        </div>
        
        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-pink-500/30 bg-gradient-to-br from-pink-900/40 to-purple-900/40 p-6 backdrop-blur-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-center text-sm text-zinc-300">{back}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function FlashcardsFloat3D() {
  const cards = [
    {
      front: "Qu'est-ce que la mitochondrie ?",
      back: "Organite responsable de la production d'énergie (ATP) dans la cellule.",
      position: { x: 10, y: 20 },
      delay: 0,
    },
    {
      front: "Rôle du cycle de Krebs ?",
      back: "Oxydation du glucose pour produire de l'énergie et des cofacteurs (NADH, FADH2).",
      position: { x: 40, y: 50 },
      delay: 0.5,
    },
    {
      front: "Définir la photosynthèse",
      back: "Processus par lequel les plantes convertissent la lumière en énergie chimique (glucose).",
      position: { x: 70, y: 15 },
      delay: 1,
    },
  ];

  return (
    <div className="relative h-[500px] w-full">
      {cards.map((card, index) => (
        <FloatingCard key={index} {...card} />
      ))}
      
      {/* Hint text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-sm text-zinc-500">Cliquez sur les cartes pour les retourner</p>
      </div>
    </div>
  );
}

