"use client";

import { Sparkles, Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-[var(--font-space-grotesk)] text-xl font-bold">
                MemoFlow
              </span>
            </div>
            <p className="mb-6 max-w-md text-sm text-zinc-400">
              L&apos;IA qui transforme l&apos;audio de l&apos;amphi en fiches structurées,
              flashcards et quiz. Optimise ta réussite académique.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Produit */}
          <div>
            <h3 className="mb-4 font-semibold text-zinc-100">Produit</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="#features" className="transition-colors hover:text-zinc-100">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-zinc-100">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-100">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-100">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="mb-4 font-semibold text-zinc-100">Ressources</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="#" className="transition-colors hover:text-zinc-100">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-100">
                  Guide de démarrage
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-100">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-100">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Copyright et liens légaux */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 MemoFlow. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-zinc-100">
              Mentions légales
            </a>
            <a href="#" className="transition-colors hover:text-zinc-100">
              Confidentialité
            </a>
            <a href="#" className="transition-colors hover:text-zinc-100">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

