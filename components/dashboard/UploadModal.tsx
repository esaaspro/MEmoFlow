"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, Upload, Mic, Loader2, CheckCircle2, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";

type ActionType = "document" | "audio" | "youtube" | "web" | null;
type ProcessingStage = "idle" | "processing" | "success";

interface UploadModalProps {
  isOpen: boolean;
  actionType: ActionType;
  onClose: () => void;
}

export function UploadModal({ isOpen, actionType, onClose }: UploadModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setUrlInput("");
    setIsRecording(false);
    setProcessingStage("idle");
    setIsDragging(false);
    setError("");
    onClose();
  }, [onClose]);

  // File upload handlers
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Recording handlers
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real app, start/stop MediaRecorder here
  };

  // Process/Submit handlers
  const handleProcess = async () => {
    if (!user) {
      setError("Vous devez être connecté pour continuer");
      return;
    }

    setProcessingStage("processing");
    setError("");

    try {
      if (actionType === "document" && selectedFile) {
        // Process document (PDF/DOCX)
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", user.id);

        const response = await fetch("/api/process-document", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to process document");
        }

        setProcessingStage("success");

        // Redirect to the new note after showing success
        setTimeout(() => {
          handleClose();
          router.push(`/dashboard/notes/${data.noteId}`);
        }, 1500);
      } else if (actionType === "audio" && selectedFile) {
        // TODO: Implement audio file processing
        setError("Traitement audio depuis fichier - À venir");
        setProcessingStage("idle");
      } else if (actionType === "youtube") {
        // Process YouTube URL
        if (!urlInput.trim()) {
          throw new Error("Veuillez entrer une URL YouTube");
        }

        const response = await fetch("/api/process-youtube", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: urlInput.trim(),
            userId: user.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to process YouTube video");
        }

        setProcessingStage("success");

        // Redirect to the new note after showing success
        setTimeout(() => {
          handleClose();
          router.push(`/dashboard/notes/${data.noteId}`);
        }, 1500);
      } else if (actionType === "web") {
        // Process Website URL
        if (!urlInput.trim()) {
          throw new Error("Veuillez entrer une URL");
        }

        const response = await fetch("/api/process-website", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: urlInput.trim(),
            userId: user.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to process website");
        }

        setProcessingStage("success");

        // Redirect to the new note after showing success
        setTimeout(() => {
          handleClose();
          router.push(`/dashboard/notes/${data.noteId}`);
        }, 1500);
      } else {
        throw new Error("Aucun fichier ou URL fourni");
      }
    } catch (err: any) {
      console.error("Processing error:", err);
      setError(err.message || "Une erreur est survenue");
      setProcessingStage("idle");
    }
  };

  // Get modal content based on action type
  const getModalTitle = () => {
    switch (actionType) {
      case "document":
        return "Importer un Document";
      case "audio":
        return "Audio / Enregistrement";
      case "youtube":
        return "Lien YouTube";
      case "web":
        return "Lien Site Web";
      default:
        return "";
    }
  };

  const canSubmit = () => {
    if (actionType === "document" || actionType === "audio") {
      return selectedFile !== null || isRecording;
    }
    if (actionType === "youtube" || actionType === "web") {
      // Basic URL validation
      const url = urlInput.trim();
      if (actionType === "youtube") {
        // Check if it looks like a YouTube URL
        return (
          url.length > 0 &&
          (url.includes("youtube.com") || url.includes("youtu.be"))
        );
      }
      return url.length > 0;
    }
    return false;
  };

  if (!isOpen || !actionType) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{getModalTitle()}</h2>
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            {processingStage === "idle" && (
              <>
                {/* File Upload (Document & Audio) */}
                {(actionType === "document" || actionType === "audio") && (
                  <div className="space-y-4">
                    {/* Drag & Drop Zone */}
                    <div
                      className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                        isDragging
                          ? "border-[#bd24df] bg-[#bd24df]/10"
                          : "border-white/20 bg-white/5"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept={
                          actionType === "document"
                            ? ".pdf,.doc,.docx"
                            : ".mp3,.m4a,.wav"
                        }
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file);
                        }}
                      />

                      <Upload className="mx-auto mb-4 h-12 w-12 text-zinc-400" />
                      
                      {selectedFile ? (
                        <div>
                          <p className="font-medium text-white">{selectedFile.name}</p>
                          <p className="text-sm text-zinc-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-2 font-medium text-white">
                            Glissez-déposez votre fichier ici
                          </p>
                          <p className="text-sm text-zinc-400">
                            ou cliquez pour parcourir
                          </p>
                          <p className="mt-2 text-xs text-zinc-500">
                            {actionType === "document"
                              ? "PDF, DOCX (max 50 MB)"
                              : "MP3, M4A, WAV (max 100 MB)"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Recording Option (Audio only) */}
                    {actionType === "audio" && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <span className="text-sm text-zinc-500">ou</span>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <button
                          onClick={toggleRecording}
                          className={`flex w-full items-center justify-center gap-3 rounded-xl p-4 font-medium transition-all ${
                            isRecording
                              ? "bg-red-500/20 text-red-400 ring-2 ring-red-500/50"
                              : "bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          <Mic className="h-5 w-5" />
                          {isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
                          {isRecording && (
                            <motion.span
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="h-3 w-3 rounded-full bg-red-500"
                            />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* URL Input (YouTube & Web) */}
                {(actionType === "youtube" || actionType === "web") && (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-400">
                        {actionType === "youtube" ? "URL de la vidéo" : "URL de l'article"}
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                        <input
                          type="url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder={
                            actionType === "youtube"
                              ? "https://youtube.com/watch?v=..."
                              : "https://example.com/article"
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-[#bd24df]/50 focus:outline-none focus:ring-2 focus:ring-[#bd24df]/20"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#bd24df]/10 p-4">
                      <p className="text-sm text-zinc-300">
                        💡 <span className="font-medium">Astuce :</span> L'IA va extraire et résumer le contenu automatiquement.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleProcess}
                  disabled={!canSubmit()}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#bd24df] to-[#ff2b8f] py-3 font-semibold text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  Générer les Notes
                </button>
              </>
            )}

            {/* Processing State */}
            {processingStage === "processing" && (
              <div className="py-12 text-center">
                <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#bd24df]" />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {actionType === "youtube"
                    ? "Récupération des sous-titres..."
                    : actionType === "web"
                    ? "Extraction du contenu..."
                    : "L'IA analyse votre contenu..."}
                </h3>
                <p className="text-sm text-zinc-400">
                  {actionType === "youtube"
                    ? "Extraction du transcript et génération de la fiche en cours"
                    : actionType === "web"
                    ? "Nettoyage de la page et génération de la fiche en cours"
                    : "Génération des flashcards et résumés en cours"}
                </p>
              </div>
            )}

            {/* Success State */}
            {processingStage === "success" && (
              <div className="py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Traitement terminé !
                </h3>
                <p className="text-sm text-zinc-400">
                  Redirection vers vos notes...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

