"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TimelineCardProps {
  number: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  index: number;
}

export function TimelineCard({
  number,
  title,
  description,
  visual,
  index,
}: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      className="relative mb-20"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all hover:border-purple-500/30 md:p-10"
      >
        {/* Glow effect on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            {/* Number Badge */}
            <motion.div
              className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-bold text-white"
              style={{ transform: "translateZ(30px)" }}
            >
              {number}
            </motion.div>

            {/* Title */}
            <h3 className="mb-4 font-[var(--font-space-grotesk)] text-3xl font-bold leading-tight text-white md:text-4xl">
              {title}
            </h3>

            {/* Description */}
            <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
              {description}
            </p>
          </div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center">
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              className="w-full"
            >
              {visual}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

