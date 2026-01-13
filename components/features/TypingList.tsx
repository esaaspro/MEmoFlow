"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const summaryPoints = [
  "Introduction aux principes de la comptabilité générale",
  "Distinction entre Actif et Passif au bilan",
  "Les comptes de charges et de produits",
  "Le mécanisme de la partie double",
  "Les journaux auxiliaires et le grand livre",
];

export function TypingList() {
  const [visiblePoints, setVisiblePoints] = useState<number[]>([]);
  const [currentTyping, setCurrentTyping] = useState<number>(-1);

  useEffect(() => {
    // Start animation sequence
    const timeouts: NodeJS.Timeout[] = [];

    summaryPoints.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setCurrentTyping(index);
        // After typing animation (1.5s), mark as complete
        setTimeout(() => {
          setVisiblePoints((prev) => [...prev, index]);
          setCurrentTyping(-1);
        }, 1500);
      }, index * 2000); // Stagger by 2s

      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      {/* Mock UI Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-lg font-semibold text-white">
            📄 Résumé du Cours
          </h3>
          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
            Comptabilité G1
          </span>
        </div>

        {/* Summary Points */}
        <div className="space-y-4">
          <AnimatePresence>
            {summaryPoints.map((point, index) => {
              const isVisible = visiblePoints.includes(index);
              const isTyping = currentTyping === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 2 }}
                  className="flex items-start gap-3"
                >
                  {/* Bullet/Check Icon */}
                  <div className="mt-1 flex-shrink-0">
                    {isVisible ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <div
                        className={`h-5 w-5 rounded-full border-2 ${
                          isTyping
                            ? "border-purple-400"
                            : "border-zinc-600"
                        }`}
                      >
                        {isTyping && (
                          <motion.div
                            className="h-full w-full rounded-full bg-purple-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    {isTyping ? (
                      <TypingText text={point} />
                    ) : isVisible ? (
                      <p className="text-zinc-300">{point}</p>
                    ) : (
                      <p className="text-zinc-600">•••</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {visiblePoints.length === summaryPoints.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-zinc-400"
          >
            ✨ Résumé généré en 3 secondes par GPT-4o
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Typing Animation Component
function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); // 30ms per character

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-zinc-300">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block h-5 w-0.5 bg-purple-400"
      />
    </p>
  );
}

