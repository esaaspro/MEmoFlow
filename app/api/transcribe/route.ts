import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/ai/groq";
import { uploadAudioToStorage } from "@/lib/supabase/storage";
import { createClient } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Step 1: Upload audio to Supabase Storage
    console.log("Uploading audio to Supabase Storage...");
    const audioBlob = new Blob([await audioFile.arrayBuffer()], {
      type: audioFile.type,
    });
    const storageUrl = await uploadAudioToStorage(audioBlob, userId);

    // Step 2: Transcribe using Groq Whisper
    console.log("Transcribing audio with Groq Whisper...");
    
    // Lazy initialize client to prevent build-time errors
    const groq = getGroqClient();
    
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3",
      language: "fr", // French language (change to "en" if needed)
      temperature: 0.0,
      response_format: "text",
    });

    // Ensure transcription is a string
    const transcribedText = typeof transcription === "string" 
      ? transcription 
      : transcription.text || "";

    if (!transcribedText) {
      throw new Error("Transcription returned empty");
    }

    // Step 3: Create note in database
    console.log("Creating note in database...");
    const supabase = createClient();
    
    const { data: note, error: dbError } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title: `Enregistrement du ${new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        type: "audio",
        summary_markdown: `# 🎤 Transcript\n\n${transcribedText}`,
        flashcards: [],
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save note: ${dbError.message}`);
    }

    // Return success with note data
    return NextResponse.json(
      {
        success: true,
        transcription: transcribedText,
        storageUrl,
        noteId: note.id,
        note,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Transcription API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to transcribe audio",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

