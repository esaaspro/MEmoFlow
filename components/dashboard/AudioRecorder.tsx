"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mic, Square, Pause, Play, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";

type RecordingState = "idle" | "recording" | "paused" | "processing";

export function AudioRecorder() {
  const router = useRouter();
  const { user } = useAuth();

  const [state, setState] = useState<RecordingState>("idle");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update timer (background-safe using Date.now() delta)
  useEffect(() => {
    if (state === "recording") {
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeRef.current - pausedTimeRef.current) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state]);

  // Cleanup: Release stream on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 Component unmounting, cleaning up...");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          console.log("🛑 Stopping track on unmount:", track.kind);
          track.stop();
        });
        streamRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        console.log("🛑 Stopping MediaRecorder on unmount");
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Start recording - STRICT FLOW
  const startRecording = async () => {
    console.log("🔄 startRecording called");
    setError("");

    // Step 1: Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const errorMsg = "Microphone not supported in this browser";
      console.error("❌", errorMsg);
      alert(errorMsg);
      return;
    }

    try {
      console.log("📞 Requesting microphone permissions...");
      
      // Step 2: Request permissions (THIS WILL TRIGGER THE PROMPT)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      console.log("✅ Stream acquired:", stream);
      console.log("📊 Stream active:", stream.active);
      console.log("🎤 Audio tracks:", stream.getAudioTracks().length);

      // Store stream in ref for cleanup
      streamRef.current = stream;

      // Step 3: Only AFTER stream is obtained, create MediaRecorder
      console.log("🎬 Creating MediaRecorder...");
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      console.log("✅ MediaRecorder created:", mediaRecorder);
      console.log("📊 MediaRecorder state:", mediaRecorder.state);

      // Store recorder in ref
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Setup data handler
      mediaRecorder.ondataavailable = (event) => {
        console.log("📦 Data available:", event.data.size, "bytes");
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Setup stop handler
      mediaRecorder.onstop = () => {
        console.log("🛑 MediaRecorder stopped");
      };

      // Setup error handler
      mediaRecorder.onerror = (event: any) => {
        console.error("❌ MediaRecorder error:", event);
        setError("Erreur lors de l'enregistrement");
      };

      // Start recording
      console.log("▶️ Starting MediaRecorder...");
      mediaRecorder.start(1000); // Collect data every 1 second
      
      console.log("✅ Recorder started, state:", mediaRecorder.state);

      // Step 4: ONLY NOW set state to recording and start timer
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
      setState("recording");
      console.log("🎉 Recording state set to 'recording'");

    } catch (err: any) {
      console.error("❌ Error in startRecording:", err);
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        const errorMsg = "Accès micro refusé. Active les permissions dans les paramètres du navigateur.";
        alert(errorMsg);
        setError(errorMsg);
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        const errorMsg = "Aucun microphone trouvé. Vérifie que ton micro est connecté.";
        alert(errorMsg);
        setError(errorMsg);
      } else {
        const errorMsg = `Impossible d'accéder au microphone: ${err.message}`;
        alert(errorMsg);
        setError(errorMsg);
      }
      
      // DO NOT set state to recording if permission was denied
      setState("idle");
    }
  };

  // Pause recording
  const pauseRecording = () => {
    console.log("⏸️ pauseRecording called");
    if (mediaRecorderRef.current && state === "recording") {
      console.log("📊 MediaRecorder state before pause:", mediaRecorderRef.current.state);
      mediaRecorderRef.current.pause();
      pausedTimeRef.current += Date.now() - startTimeRef.current;
      setState("paused");
      console.log("✅ Recording paused");
    }
  };

  // Resume recording
  const resumeRecording = () => {
    console.log("▶️ resumeRecording called");
    if (mediaRecorderRef.current && state === "paused") {
      console.log("📊 MediaRecorder state before resume:", mediaRecorderRef.current.state);
      mediaRecorderRef.current.resume();
      startTimeRef.current = Date.now();
      setState("recording");
      console.log("✅ Recording resumed");
    }
  };

  // Stop and transcribe - STRICT FLOW
  const stopRecording = async () => {
    console.log("🛑 stopRecording called");
    
    if (!mediaRecorderRef.current || !user) {
      console.warn("⚠️ Cannot stop: no recorder or user");
      return;
    }

    console.log("📊 MediaRecorder state before stop:", mediaRecorderRef.current.state);
    
    // Set processing state immediately
    setState("processing");

    // Setup onstop handler BEFORE calling stop()
    mediaRecorderRef.current.onstop = async () => {
      console.log("🛑 MediaRecorder onstop event fired");
      
      try {
        // Create audio blob from chunks
        console.log("📦 Creating blob from chunks...");
        console.log("📊 Chunks count:", audioChunksRef.current.length);
        console.log("📊 Total chunks size:", audioChunksRef.current.reduce((acc, chunk) => acc + chunk.size, 0), "bytes");
        
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        console.log("✅ Blob created, size:", audioBlob.size, "bytes");
        console.log("📊 Blob type:", audioBlob.type);
        
        if (audioBlob.size === 0) {
          throw new Error("L'enregistrement est vide. Vérifie que tu as parlé pendant l'enregistrement.");
        }

        // Send to API for transcription
        console.log("📤 Sending to transcription API...");
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
        formData.append("userId", user.id);

        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Transcription failed");
        }

        console.log("✅ Transcription successful, redirecting to note:", data.noteId);

        // Redirect to the new note
        router.push(`/dashboard/notes/${data.noteId}`);
      } catch (err: any) {
        console.error("❌ Transcription error:", err);
        setError(err.message || "Erreur lors de la transcription.");
        setState("idle");
      }
    };

    // Stop the recorder
    console.log("⏹️ Stopping MediaRecorder...");
    mediaRecorderRef.current.stop();
    console.log("✅ MediaRecorder.stop() called");

    // Stop all tracks to release microphone (turn off red dot)
    console.log("🔇 Stopping all stream tracks...");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        console.log("🛑 Stopping track:", track.kind, track.label);
        track.stop();
      });
      streamRef.current = null;
      console.log("✅ All tracks stopped, stream released");
    } else if (mediaRecorderRef.current.stream) {
      // Fallback: use stream from recorder
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        console.log("🛑 Stopping track (fallback):", track.kind, track.label);
        track.stop();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-12 backdrop-blur-xl">
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {error}
        </motion.div>
      )}

      {/* Microphone Icon with Pulsing Animation */}
      <motion.div
        className="relative mb-8"
        animate={
          state === "recording"
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: state === "recording" ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Pulsing Glow */}
        <AnimatePresence>
          {state === "recording" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          className={`relative flex h-32 w-32 items-center justify-center rounded-full border-4 transition-colors ${
            state === "recording"
              ? "border-red-500 bg-red-500/20"
              : state === "paused"
              ? "border-yellow-500 bg-yellow-500/20"
              : state === "processing"
              ? "border-purple-500 bg-purple-500/20"
              : "border-zinc-700 bg-zinc-800/50"
          }`}
        >
          {state === "processing" ? (
            <Loader2 className="h-16 w-16 animate-spin text-purple-400" />
          ) : (
            <Mic
              className={`h-16 w-16 ${
                state === "recording"
                  ? "text-red-400"
                  : state === "paused"
                  ? "text-yellow-400"
                  : "text-zinc-400"
              }`}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Timer */}
      <motion.div
        className="mb-6 font-mono text-4xl font-bold text-white"
        animate={
          state === "recording"
            ? {
                color: ["#fff", "#ef4444", "#fff"],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: state === "recording" ? Infinity : 0,
        }}
      >
        {formatTime(elapsedTime)}
      </motion.div>

      {/* Status Text */}
      <p className="mb-8 text-sm text-zinc-400">
        {state === "idle" && "Appuie sur le bouton pour commencer"}
        {state === "recording" && "Enregistrement en cours..."}
        {state === "paused" && "Enregistrement en pause"}
        {state === "processing" && "Transcription en cours..."}
      </p>

      {/* Controls */}
      <div className="flex gap-4">
        {state === "idle" && (
          <motion.button
            onClick={startRecording}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="h-5 w-5" />
            Commencer l'enregistrement
          </motion.button>
        )}

        {state === "recording" && (
          <>
            <motion.button
              onClick={pauseRecording}
              className="flex items-center gap-2 rounded-xl border border-yellow-500 bg-yellow-500/10 px-6 py-3 font-semibold text-yellow-400 transition-all hover:bg-yellow-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Pause className="h-5 w-5" />
              Pause
            </motion.button>
            <motion.button
              onClick={stopRecording}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Square className="h-5 w-5" />
              Terminer
            </motion.button>
          </>
        )}

        {state === "paused" && (
          <>
            <motion.button
              onClick={resumeRecording}
              className="flex items-center gap-2 rounded-xl border border-green-500 bg-green-500/10 px-6 py-3 font-semibold text-green-400 transition-all hover:bg-green-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-5 w-5" />
              Reprendre
            </motion.button>
            <motion.button
              onClick={stopRecording}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Square className="h-5 w-5" />
              Terminer
            </motion.button>
          </>
        )}
      </div>

      {/* Background Safety Notice */}
      {(state === "recording" || state === "paused") && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-xs text-zinc-500"
        >
          ✓ L'enregistrement continue même si tu changes d'onglet
        </motion.p>
      )}
    </div>
  );
}

