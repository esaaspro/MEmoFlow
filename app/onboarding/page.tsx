"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const supabase = createClient();

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || loading) return;

    setLoading(true);

    try {
      // Update user profile in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({ first_name: firstName.trim() })
        .eq("id", user?.id);

      if (error) throw error;

      // Trigger fade out animation
      setFadeOut(true);

      // Wait for animation to complete before redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (!user) return null;

  return (
    <AnimatePresence mode="wait">
      {!fadeOut ? (
        <motion.div
          key="onboarding"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex min-h-screen items-center justify-center bg-black px-6"
        >
          <div className="w-full max-w-3xl">
            {/* Question */}
            <motion.h1
              variants={questionVariants}
              className="mb-16 text-center font-[var(--font-space-grotesk)] text-4xl font-light text-white md:text-5xl lg:text-6xl"
            >
              Enchanté.{" "}
              <span className="font-normal">
                Comment t&apos;appelles-tu ?
              </span>
            </motion.h1>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={inputVariants}
              className="space-y-12"
            >
              {/* Input Container */}
              <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                  autoFocus
                  disabled={loading}
                  className="w-full border-0 bg-transparent py-6 text-center font-[var(--font-space-grotesk)] text-5xl font-light text-white placeholder-zinc-700 outline-none transition-all duration-500 focus:placeholder-zinc-800 disabled:opacity-50 md:text-6xl lg:text-7xl"
                />

                {/* Glowing Underline */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: firstName.length > 0 ? 1 : 0,
                    opacity: firstName.length > 0 ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                  style={{
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                  }}
                />
              </div>

              {/* Submit Button - Appears when typing */}
              <AnimatePresence>
                {firstName.trim().length > 0 && (
                  <motion.div
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex justify-center"
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white p-6 transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Arrow */}
                      <ArrowRight
                        className={`h-8 w-8 text-black transition-transform duration-300 group-hover:translate-x-1 ${
                          loading ? "animate-pulse" : ""
                        }`}
                      />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: firstName.length === 0 ? 0.3 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-sm text-zinc-600"
              >
                Tape ton prénom et appuie sur Entrée
              </motion.p>
            </motion.form>

            {/* Decorative Elements */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* Top Glow */}
              <div className="absolute top-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
              {/* Bottom Glow */}
              <div className="absolute bottom-1/4 h-96 w-96 rounded-full bg-pink-500/5 blur-3xl" />
            </div>
          </div>
        </motion.div>
      ) : (
        // Fade out screen
        <motion.div
          key="fadeout"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-black"
        />
      )}
    </AnimatePresence>
  );
}

