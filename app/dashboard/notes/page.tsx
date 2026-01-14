"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FolderPlus, ArrowLeft, Plus } from "lucide-react";
import { FolderCard } from "@/components/dashboard/FolderCard";
import { NoteCard } from "@/components/dashboard/NoteCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { Note, Folder } from "@/types";

// Force dynamic rendering - prevents static prerendering for protected route
export const dynamic = "force-dynamic";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function NotesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const supabase = createClient();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    searchParams.get("folder") || null
  );
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Fetch folders and notes
  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch folders
        const { data: foldersData, error: foldersError } = await supabase
          .from("folders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (foldersError) {
          console.error("Error fetching folders:", foldersError);
        } else {
          setFolders(foldersData || []);
        }

        // Fetch notes
        let notesQuery = supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (selectedFolderId) {
          notesQuery = notesQuery.eq("folder_id", selectedFolderId);
        } else {
          notesQuery = notesQuery.is("folder_id", null);
        }

        const { data: notesData, error: notesError } = await notesQuery;

        if (notesError) {
          console.error("Error fetching notes:", notesError);
          setNotes([]);
        } else {
          setNotes(notesData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotes([]);
        setFolders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, supabase, selectedFolderId]);

  // Get note count per folder
  const getFolderNoteCount = async (folderId: string): Promise<number> => {
    const { count } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user?.id)
      .eq("folder_id", folderId);

    return count || 0;
  };

  // Create folder
  const handleCreateFolder = async () => {
    if (!user || !newFolderName.trim()) return;

    try {
      const { data, error } = await supabase
        .from("folders")
        .insert({
          user_id: user.id,
          name: newFolderName.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      setFolders([...folders, data]);
      setNewFolderName("");
      setShowCreateFolderModal(false);
    } catch (error: any) {
      console.error("Error creating folder:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Move note to folder
  const handleMoveNote = async (noteId: string, folderId: string | null) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("notes")
        .update({ folder_id: folderId })
        .eq("id", noteId)
        .eq("user_id", user.id);

      if (error) throw error;

      // Update local state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, folder_id: folderId } : note
        )
      );
    } catch (error: any) {
      console.error("Error moving note:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Handle folder click
  const handleFolderClick = (folderId: string) => {
    setSelectedFolderId(folderId);
    router.push(`/dashboard/notes?folder=${folderId}`);
  };

  // Handle back to root
  const handleBackToRoot = () => {
    setSelectedFolderId(null);
    router.push("/dashboard/notes");
  };

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
                {/* Title */}
                <div>
                  {selectedFolderId ? (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleBackToRoot}
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <div>
                        <h1 className="text-3xl font-semibold text-white font-[var(--font-space-grotesk)]">
                          {folders.find((f) => f.id === selectedFolderId)?.name || "Dossier"}
                        </h1>
                        <p className="text-sm text-zinc-500">
                          Notes dans ce dossier
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-3xl font-semibold text-white font-[var(--font-space-grotesk)]">
                        Mes Notes
                      </h1>
                      <p className="text-sm text-zinc-500">
                        Organise tes révisions par dossier
                      </p>
                    </div>
                  )}
                </div>

                {/* Create Folder Button */}
                {!selectedFolderId && (
                  <motion.button
                    onClick={() => setShowCreateFolderModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-5 w-5" />
                    Nouveau Dossier
                  </motion.button>
                )}
              </div>
            </div>
          </motion.header>

          {/* Content */}
          <div className="mx-auto max-w-7xl space-y-8 p-6 lg:px-12">
            {/* Folders Section (only show when not in a folder) */}
            {!selectedFolderId && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white">Dossiers</h2>

                {loading ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-32 animate-pulse rounded-xl bg-zinc-900/30"
                      />
                    ))}
                  </div>
                ) : folders.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {folders.map((folder) => (
                      <FolderCard
                        key={folder.id}
                        folder={folder}
                        noteCount={notes.filter((n) => n.folder_id === folder.id).length}
                        onClick={() => handleFolderClick(folder.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-12 text-center backdrop-blur-xl">
                    <FolderPlus className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                    <p className="text-zinc-400">Aucun dossier pour le moment</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      Crée ton premier dossier pour organiser tes notes
                    </p>
                  </div>
                )}
              </motion.section>
            )}

            {/* Notes Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-white">
                {selectedFolderId ? "Notes" : "Notes non classées"}
              </h2>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 animate-pulse rounded-xl bg-zinc-900/30"
                    />
                  ))}
                </div>
              ) : notes.length > 0 ? (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      folders={folders}
                      onMoveToFolder={handleMoveNote}
                      onClick={() => handleNoteClick(note.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-12 text-center backdrop-blur-xl">
                  <p className="text-zinc-400">
                    {selectedFolderId
                      ? "Ce dossier est vide."
                      : "Aucune note non classée pour le moment."}
                  </p>
                </div>
              )}
            </motion.section>
          </div>

        {/* Create Folder Modal */}
        {showCreateFolderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCreateFolderModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
            >
              <div className="p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Créer un nouveau dossier
                </h3>

                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Nom du dossier"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateFolder();
                    }
                  }}
                  className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCreateFolderModal(false);
                      setNewFolderName("");
                    }}
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 font-semibold text-zinc-300 transition-colors hover:bg-zinc-800"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim()}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-semibold text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Créer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

