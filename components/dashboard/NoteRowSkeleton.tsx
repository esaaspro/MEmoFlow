"use client";

import { motion } from "framer-motion";

export function NoteRowSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 backdrop-blur-xl"
    >
      {/* Icon Skeleton */}
      <div className="h-10 w-10 animate-pulse rounded-lg bg-zinc-800/50" />

      {/* Content Skeleton */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800/50" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-800/50" />
      </div>

      {/* Menu Skeleton */}
      <div className="h-8 w-8 animate-pulse rounded-lg bg-zinc-800/50" />
    </motion.div>
  );
}

