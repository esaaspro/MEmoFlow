"use client";

import { AudioRecorder } from "@/components/dashboard/AudioRecorder";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TestRecorderPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au Dashboard
            </Link>
            <h1 className="mb-2 font-[var(--font-space-grotesk)] text-4xl font-bold text-white">
              🎤 Test de l'Enregistreur Audio
            </h1>
            <p className="text-zinc-400">
              Enregistre ta voix et obtiens une transcription automatique.
            </p>
          </div>

          {/* Audio Recorder Component */}
          <AudioRecorder />

          {/* Info Section */}
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
              <h3 className="mb-2 font-semibold text-purple-300">
                🚀 Propulsé par Groq Whisper Large V3
              </h3>
              <p className="text-sm text-zinc-400">
                Transcription ultra-rapide et précise, même avec des accents ou du bruit de fond.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4">
              <h3 className="mb-2 font-semibold text-white">✓ Fonctionnalités</h3>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>✓ Enregistrement en arrière-plan (safe pour changement d'onglet)</li>
                <li>✓ Timer précis (résistant au tab switching)</li>
                <li>✓ Pause/Resume</li>
                <li>✓ Upload automatique vers Supabase Storage</li>
                <li>✓ Transcription automatique</li>
                <li>✓ Sauvegarde en base de données</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

