"use client";

import { motion } from "framer-motion";
import { FileText, MoreVertical } from "lucide-react";
import { RelativeTime } from "@/components/ui/RelativeTime";

interface RecentNoteRowProps {
  title: string;
  date: string | Date;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function RecentNoteRow({ title, date, icon, onClick }: RecentNoteRowProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-zinc-800/30 bg-zinc-900/20 px-4 py-3 backdrop-blur-xl transition-all hover:border-[#bd24df]/30 hover:bg-[#bd24df]/5"
      whileHover={{ x: 4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 group-hover:bg-[#bd24df]/20 group-hover:text-purple-400">
        {icon || <FileText className="h-5 w-5" />}
      </div>

      {/* Title & Date */}
      <div className="flex-1">
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-zinc-500">
          <RelativeTime date={date} />
        </p>
      </div>

      {/* Menu Button */}
      <motion.button
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 opacity-0 transition-all hover:bg-zinc-800/50 hover:text-white group-hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MoreVertical className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}

