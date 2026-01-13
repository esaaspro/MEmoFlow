"use client";

import { motion } from "framer-motion";

export function WaveformAnimation() {
  const bars = Array.from({ length: 20 });

  return (
    <div className="flex h-16 items-center justify-center gap-1">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-purple-500 to-pink-500"
          animate={{
            height: [
              "20%",
              `${Math.random() * 80 + 20}%`,
              `${Math.random() * 60 + 40}%`,
              `${Math.random() * 80 + 20}%`,
              "20%",
            ],
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

