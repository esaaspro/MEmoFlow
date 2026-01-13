"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { RevisionSheet } from "@/components/dashboard/RevisionSheet";

export default function TestAIPage() {
  const [input, setInput] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setMarkdown("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      setMarkdown(data.markdown);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const sampleText = `Aujourd'hui on va parler du bilan en comptabilité. Le bilan, c'est un document comptable qui représente la situation patrimoniale de l'entreprise à un instant T. Il se compose de deux parties : l'actif et le passif. L'actif, c'est ce que l'entreprise possède, c'est l'emploi des ressources. Le passif, c'est ce que l'entreprise doit, c'est l'origine des ressources. L'actif est divisé en deux grandes catégories : l'actif immobilisé qui est le long terme, et l'actif circulant qui est le court terme. L'actif immobilisé comprend les immobilisations corporelles comme les bâtiments, les machines, les immobilisations incorporelles comme les brevets, les logiciels, et les immobilisations financières comme les titres de participation. L'actif circulant comprend les stocks de marchandises, les créances clients, et les disponibilités comme le cash et la banque. Le passif est aussi divisé en deux grandes catégories : les capitaux propres qui sont les ressources internes, et les dettes qui sont les ressources externes. Les capitaux propres comprennent le capital social, les réserves, et le résultat de l'exercice. Les dettes comprennent les emprunts bancaires, les dettes fournisseurs, et les dettes fiscales et sociales. La règle d'or c'est que l'actif doit être égal au passif, c'est l'équilibre comptable. Donc pour résumer, l'actif c'est ce que l'entreprise possède, le passif c'est ce que l'entreprise doit, et les deux doivent être égaux.`;

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-6xl">
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
            Test de l'IA Groq (Llama 3.3)
          </h1>
          <p className="text-zinc-400">
            Transforme un transcript de cours en fiche de révision structurée.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div>
            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 backdrop-blur-xl">
              <h2 className="mb-4 font-[var(--font-space-grotesk)] text-2xl font-bold text-white">
                📝 Transcript de Cours
              </h2>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Colle ici le transcript de ton cours..."
                className="mb-4 h-64 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800/50 p-4 text-zinc-100 placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />

              <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
                <span>{input.length} / 10,000 caractères</span>
                <button
                  onClick={() => setInput(sampleText)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Charger exemple
                </button>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || input.length < 50}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Générer la fiche de révision
                  </>
                )}
              </button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400"
                >
                  ❌ {error}
                </motion.div>
              )}

              {markdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-400"
                >
                  ✅ Fiche générée avec succès !
                </motion.div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div>
            {markdown ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="mb-4 font-[var(--font-space-grotesk)] text-2xl font-bold text-white">
                  📚 Fiche de Révision Générée
                </h2>
                <RevisionSheet content={markdown} />
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-12 backdrop-blur-xl">
                <div className="text-center">
                  <Sparkles className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                  <p className="text-zinc-500">
                    La fiche générée apparaîtra ici
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6 backdrop-blur-xl">
          <h3 className="mb-2 font-semibold text-purple-300">
            🚀 Propulsé par Groq + Llama 3.3 70B
          </h3>
          <p className="text-sm text-zinc-400">
            Génération ultra-rapide (jusqu'à 10x plus rapide que les modèles traditionnels) grâce à l'infrastructure Groq LPU™.
          </p>
        </div>
      </div>
    </div>
  );
}

