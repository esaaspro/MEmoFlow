"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.8)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/0 transition-colors"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Logo className="h-10 w-10" />
            <span className="font-[var(--font-space-grotesk)] text-xl font-bold">
              MemoFlow
            </span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="/features"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Fonctionnalités
          </a>
          <a
            href="/pricing"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Tarifs
          </a>
          <Link
            href="/how-it-works"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Comment ça marche
          </Link>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* Login Button - Ghost Style */}
          <Link href="/auth">
            <button className="rounded-full px-6 py-2 text-sm font-semibold text-zinc-100 transition-all hover:bg-zinc-800/50">
              Se connecter
            </button>
          </Link>

          {/* Get Started Button - Gradient */}
          <Link href="/auth?mode=signup">
            <button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
              Commencer
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

