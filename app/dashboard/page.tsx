"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Search,
  FileText,
  BookOpen,
  Zap,
  Link as LinkIcon,
  Youtube,
  Mic
} from "lucide-react";
import { DashboardActions } from "@/components/dashboard/DashboardActions";
import { RecentNoteRow } from "@/components/dashboard/RecentNoteRow";
import { NoteRowSkeleton } from "@/components/dashboard/NoteRowSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { Note } from "@/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Helper function to get icon based on note type
function getNoteIcon(type: Note["type"]) {
  const iconProps = { className: "h-5 w-5" };
  
  switch (type) {
    case "pdf":
      return <FileText {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "audio":
      return <Mic {...iconProps} />;
    case "link":
      return <LinkIcon {...iconProps} />;
    case "text":
      return <BookOpen {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's notes
  useEffect(() => {
    async function fetchNotes() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching notes:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
          });
          throw error;
        }

        // Handle null data (empty table or no results)
        if (data === null) {
          console.log("No notes found for user, setting empty array");
          setNotes([]);
        } else {
          setNotes(data);
        }
      } catch (error: any) {
        console.error("Error fetching notes:", {
          message: error?.message || "Unknown error",
          details: error?.details || error?.toString(),
          stack: error?.stack,
        });
        // Set empty array on error to prevent UI issues
        setNotes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [user, supabase]);

  // Handle note click
  const handleNoteClick = (noteId: string) => {
    router.push(`/dashboard/notes/${noteId}`);
  };

  return (
    <ProtectedRoute>
      <div className="relative h-full w-full">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="border-b border-zinc-800/30 bg-[#0a0a0a]/80 p-6 backdrop-blur-xl lg:px-12 lg:pt-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              {/* Title - Minimal & Professional */}
              <div>
                <h1 className="text-3xl font-semibold text-white font-[var(--font-space-grotesk)]">
                  Tableau de bord
                </h1>
                <p className="text-sm text-zinc-500">
                  Gère tes révisions.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative hidden lg:block lg:w-96">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Rechercher dans tes notes..."
                  className="w-full rounded-xl border border-zinc-800/50 bg-zinc-900/30 py-3 pl-12 pr-4 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-[#bd24df]/50 focus:outline-none focus:ring-2 focus:ring-[#bd24df]/20"
                />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="mx-auto max-w-7xl space-y-8 p-6 lg:px-12">
          {/* Quick Actions */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <DashboardActions />
          </motion.div>

          {/* Recent Notes */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <h2 className="text-lg font-semibold text-white">Notes Récentes</h2>
              {notes.length > 0 && (
                <button className="text-sm text-zinc-400 hover:text-white">
                  Voir tout →
                </button>
              )}
            </motion.div>

            <div className="space-y-3">
              {/* Loading State */}
              {loading && (
                <>
                  <NoteRowSkeleton />
                  <NoteRowSkeleton />
                  <NoteRowSkeleton />
                </>
              )}

              {/* Empty State */}
              {!loading && notes.length === 0 && <EmptyState />}

              {/* Notes List */}
              {!loading &&
                notes.map((note) => (
                  <RecentNoteRow
                    key={note.id}
                    title={note.title}
                    date={note.created_at}
                    icon={getNoteIcon(note.type)}
                    onClick={() => handleNoteClick(note.id)}
                  />
                ))}
            </div>
          </motion.section>

          {/* Stats Cards */}
          {!loading && notes.length > 0 && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-3"
            >
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 backdrop-blur-xl"
              >
                <p className="mb-2 text-sm text-zinc-400">Total de Notes</p>
                <p className="text-3xl font-bold text-white">{notes.length}</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 backdrop-blur-xl"
              >
                <p className="mb-2 text-sm text-zinc-400">Cette Semaine</p>
                <p className="text-3xl font-bold text-white">
                  {notes.filter((note) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(note.created_at) > weekAgo;
                  }).length}
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 backdrop-blur-xl"
              >
                <p className="mb-2 text-sm text-zinc-400">Flashcards</p>
                <p className="text-3xl font-bold text-white">
                  {notes.reduce((acc, note) => acc + (note.flashcards?.length || 0), 0)}
                </p>
              </motion.div>
            </motion.section>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

