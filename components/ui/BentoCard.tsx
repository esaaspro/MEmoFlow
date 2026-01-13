"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export function BentoCard({ children, className, title, description, icon }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-xl transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:shadow-purple-500/20",
        className
      )}
    >
      {/* Bordure animée au hover */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-[1px] -z-10 rounded-2xl bg-zinc-900/90 backdrop-blur-xl" />
      
      {/* Contenu */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
        
        <h3 className="mb-2 text-2xl font-bold text-zinc-100">{title}</h3>
        <p className="mb-4 text-zinc-400">{description}</p>
        
        {children}
      </div>
    </motion.div>
  );
}

