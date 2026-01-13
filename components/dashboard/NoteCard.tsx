"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  MoreVertical, 
  FolderPlus,
  Youtube,
  Mic,
  Link as LinkIcon,
  BookOpen,
  Zap
} from "lucide-react";
import { RelativeTime } from "@/components/ui/RelativeTime";
import type { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  folders: Array<{ id: string; name: string }>;
  onMoveToFolder: (noteId: string, folderId: string | null) => void;
  onClick: () => void;
}

function getNoteIcon(type: Note["type"]) {
  const iconProps = { className: "h-5 w-5" };
  
  switch (type) {
    case "pdf":
    case "docx":
      return <FileText {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "audio":
      return <Mic {...iconProps} />;
    case "link":
    case "website":
      return <LinkIcon {...iconProps} />;
    case "text":
      return <BookOpen {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
}

export function NoteCard({ note, folders, onMoveToFolder, onClick }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleMoveToFolder = (folderId: string | null) => {
    onMoveToFolder(note.id, folderId);
    setShowMenu(false);
  };

  return (
    <motion.div
      className="group relative flex cursor-pointer items-center gap-4 rounded-xl border border-zinc-800/30 bg-zinc-900/20 px-4 py-3 backdrop-blur-xl transition-all hover:border-[#bd24df]/30 hover:bg-[#bd24df]/5"
      whileHover={{ x: 4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 group-hover:bg-[#bd24df]/20 group-hover:text-purple-400">
        {getNoteIcon(note.type)}
      </div>

      {/* Title & Date */}
      <div className="flex-1">
        <h4 className="font-medium text-white">{note.title}</h4>
        <p className="text-sm text-zinc-500">
          <RelativeTime date={note.created_at} />
        </p>
      </div>

      {/* Move Menu */}
      <div className="relative">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 opacity-0 transition-all hover:bg-zinc-800/50 hover:text-white group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical className="h-4 w-4" />
        </motion.button>

        {/* Dropdown Menu */}
        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-zinc-800/50 bg-zinc-900/95 p-2 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-2 px-3 py-1 text-xs font-medium text-zinc-400">
                Déplacer vers
              </p>

              {/* Remove from folder */}
              <button
                onClick={() => handleMoveToFolder(null)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800/50"
              >
                <FolderPlus className="mr-2 inline h-4 w-4" />
                Non classé
              </button>

              {/* Folders list */}
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => handleMoveToFolder(folder.id)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800/50"
                >
                  <FolderPlus className="mr-2 inline h-4 w-4" />
                  {folder.name}
                </button>
              ))}

              {folders.length === 0 && (
                <p className="px-3 py-2 text-xs text-zinc-500">
                  Aucun dossier disponible
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

