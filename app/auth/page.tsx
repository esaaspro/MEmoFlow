"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    // Update mode based on URL parameter
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup") setMode("signup");
    else setMode("login");
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        // Sign Up Flow - New User
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // New user → Redirect to onboarding to capture first name
          router.push("/onboarding");
        }
      } else {
        // Log In Flow - Returning User
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Returning user → Redirect directly to dashboard
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">
      {/* Ambient 3D Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-zinc-950 to-zinc-950" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute left-6 top-6 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <Logo className="h-8 w-8" />
        <span className="font-[var(--font-space-grotesk)] font-semibold">
          MemoFlow
        </span>
      </Link>

      {/* Auth Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300"
            >
              <Sparkles className="h-4 w-4" />
              Propulsé par GPT-5.2
            </motion.div>

            <h1 className="mb-2 font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
              {mode === "login" ? "Bon retour !" : "Rejoins MemoFlow"}
            </h1>
            <p className="text-sm text-zinc-400">
              {mode === "login"
                ? "Connecte-toi pour accéder à ton tableau de bord"
                : "Crée ton compte et commence à majorer tes partiels"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mb-6 flex rounded-xl bg-zinc-800/50 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                mode === "signup"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton.email@exemple.com"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 py-3 pl-12 pr-4 text-white placeholder-zinc-500 transition-all focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 py-3 pl-12 pr-4 text-white placeholder-zinc-500 transition-all focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              {mode === "signup" && (
                <p className="mt-1 text-xs text-zinc-500">
                  Minimum 6 caractères
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span>Chargement...</span>
              ) : (
                <>
                  <span>{mode === "login" ? "Se connecter" : "Créer mon compte"}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-zinc-500">
            {mode === "login" ? (
              <p>
                Pas encore de compte ?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Inscris-toi
                </button>
              </p>
            ) : (
              <p>
                Déjà un compte ?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Connecte-toi
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
      </motion.div>
    </div>
  );
}
