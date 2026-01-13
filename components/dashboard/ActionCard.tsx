"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  label: string;
  onClick: () => void;
  featured?: boolean;
}

export function ActionCard({
  icon: Icon,
  title,
  label,
  onClick,
  featured = false,
}: ActionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
        featured
          ? "border-[#bd24df]/50 bg-white/10 backdrop-blur-lg"
          : "border-white/10 bg-white/5 backdrop-blur-lg"
      }`}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        boxShadow: featured 
          ? "0 20px 60px rgba(189, 36, 223, 0.3)" 
          : "0 20px 60px rgba(189, 36, 223, 0.15)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 ${
          featured
            ? "bg-gradient-to-br from-[#bd24df]/30 to-[#ff2b8f]/30"
            : "bg-gradient-to-br from-[#bd24df]/20 to-[#ff2b8f]/20"
        }`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
            featured
              ? "bg-gradient-to-br from-[#bd24df] to-[#ff2b8f]"
              : "bg-white/10"
          } transition-transform group-hover:scale-110`}
        >
          <Icon
            className={`h-6 w-6 ${
              featured ? "text-white" : "text-zinc-300 group-hover:text-white"
            }`}
          />
        </div>

        {/* Title */}
        <h3 className="mb-2 font-semibold text-white">{title}</h3>

        {/* Label */}
        <p className="text-sm text-zinc-400">{label}</p>
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-gradient-to-r from-[#bd24df] to-[#ff2b8f] px-2 py-1 text-xs font-semibold text-white">
            Recommandé
          </span>
        </div>
      )}
    </motion.button>
  );
}

