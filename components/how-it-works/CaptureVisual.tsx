"use client";

import { motion } from "framer-motion";
import { Mic, FileText, Link as LinkIcon } from "lucide-react";

export function CaptureVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center">
      {/* Central Point */}
      <motion.div
        className="absolute z-10 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.6)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.6)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Mic Icon (Top) */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: -80, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-8 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 backdrop-blur-sm"
      >
        <Mic className="h-6 w-6 text-purple-400" />
        <motion.div
          className="absolute h-1 w-1 rounded-full bg-purple-400"
          animate={{
            y: [0, 32],
            opacity: [1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
        />
      </motion.div>

      {/* File Icon (Left) */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: -80, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute left-8 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 backdrop-blur-sm"
      >
        <FileText className="h-6 w-6 text-pink-400" />
        <motion.div
          className="absolute h-1 w-1 rounded-full bg-pink-400"
          animate={{
            x: [0, 32],
            opacity: [1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.5 }}
        />
      </motion.div>

      {/* Link Icon (Right) */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 80, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute right-8 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 backdrop-blur-sm"
      >
        <LinkIcon className="h-6 w-6 text-purple-400" />
        <motion.div
          className="absolute h-1 w-1 rounded-full bg-purple-400"
          animate={{
            x: [0, -32],
            opacity: [1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 1 }}
        />
      </motion.div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: "none" }}>
        <motion.line
          x1="50%"
          y1="20%"
          x2="50%"
          y2="50%"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.line
          x1="20%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.line
          x1="80%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <defs>
          <linearGradient id="gradient1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="gradient2">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="gradient3">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

