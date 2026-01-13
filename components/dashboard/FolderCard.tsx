"use client";

import { motion } from "framer-motion";
import { FolderOpen, MoreVertical } from "lucide-react";
import type { Folder } from "@/types";

interface FolderCardProps {
  folder: Folder;
  noteCount?: number;
  onClick: () => void;
}

export function FolderCard({ folder, noteCount = 0, onClick }: FolderCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6 backdrop-blur-xl transition-all hover:border-purple-500/50 hover:bg-purple-500/10"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Folder Icon */}
      <div className="mb-4 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl" />
          <FolderOpen className="relative h-12 w-12 text-purple-400" />
        </div>
      </div>

      {/* Folder Name */}
      <h3 className="mb-2 text-center font-semibold text-white">{folder.name}</h3>

      {/* Note Count */}
      <p className="text-center text-sm text-zinc-400">
        {noteCount} note{noteCount !== 1 ? "s" : ""}
      </p>

      {/* Hover Indicator */}
      <motion.div
        className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <MoreVertical className="h-4 w-4 text-zinc-500" />
      </motion.div>
    </motion.div>
  );
}

