"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

export function GlassCardTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-md rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-8 backdrop-blur-xl"
      >
        {/* Glow effect subtil */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 blur-xl" />
        
        {/* Contenu structuré */}
        <div className="space-y-6">
          <h3 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-zinc-100">
            Cours de Biologie Cellulaire
          </h3>
          
          {/* Structure hiérarchique */}
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="font-semibold text-purple-400">I.</span>
                <span>La Mitochondrie</span>
              </div>
              <div className="ml-6 space-y-1 text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-purple-400" />
                  <span>Structure double membrane</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-purple-400" />
                  <span>Production d'ATP</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="font-semibold text-purple-400">II.</span>
                <span>Le Cycle de Krebs</span>
              </div>
              <div className="ml-6 space-y-1 text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-purple-400" />
                  <span>Oxydation du glucose</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-purple-400" />
                  <span>Production de NADH</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="font-semibold text-purple-400">III.</span>
                <span>Chaîne Respiratoire</span>
              </div>
              <div className="ml-6 space-y-1 text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-purple-400" />
                  <span>Transfert d'électrons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

