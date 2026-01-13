import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { createClient } from "@/lib/supabase/client";
import { generateStudyContent } from "@/lib/ai/groq";

/**
 * Extract video ID from YouTube URL
 */
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validate YouTube URL
 */
function isValidYouTubeUrl(url: string): boolean {
  return extractVideoId(url) !== null;
}

/**
 * Get video title from YouTube (optional, can be enhanced with youtube-dl or similar)
 */
function getVideoTitle(videoId: string): string {
  // For now, return a generic title with date
  // In production, you could use youtube-dl or YouTube Data API
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `Vidéo YouTube du ${date}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, userId } = body;

    // Step A: Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL YouTube requise" },
        { status: 400 }
      );
    }

    if (!isValidYouTubeUrl(url)) {
      return NextResponse.json(
        { error: "URL YouTube invalide. Format attendu: https://youtube.com/watch?v=..." },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Impossible d'extraire l'ID de la vidéo" },
        { status: 400 }
      );
    }

    // Step B: Fetch transcript
    console.log(`Fetching transcript for video: ${videoId}`);
    let transcriptChunks;

    try {
      transcriptChunks = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: "fr", // Try French first, fallback to auto if not available
      });
    } catch (error: any) {
      console.error("Transcript fetch error:", error);

      // Try with auto language detection
      try {
        transcriptChunks = await YoutubeTranscript.fetchTranscript(videoId);
      } catch (retryError: any) {
        return NextResponse.json(
          {
            error:
              "Impossible de récupérer les sous-titres pour cette vidéo. Assure-toi que la vidéo a des sous-titres activés.",
            details: retryError.message,
          },
          { status: 400 }
        );
      }
    }

    if (!transcriptChunks || transcriptChunks.length === 0) {
      return NextResponse.json(
        {
          error:
            "Aucun sous-titre trouvé pour cette vidéo. La vidéo doit avoir des sous-titres activés.",
        },
        { status: 400 }
      );
    }

    // Step C: Combine transcript chunks into single string
    const transcriptText = transcriptChunks
      .map((chunk) => chunk.text)
      .join(" ")
      .trim();

    if (!transcriptText || transcriptText.length < 50) {
      return NextResponse.json(
        {
          error:
            "Le transcript est trop court ou vide. Vérifie que la vidéo a des sous-titres complets.",
        },
        { status: 400 }
      );
    }

    console.log(`Transcript extracted: ${transcriptText.length} characters`);

    // Step D: Generate summary using Groq AI
    console.log("Generating summary with Groq AI...");
    const summaryMarkdown = await generateStudyContent(transcriptText);

    // Step E: Save to database
    console.log("Saving note to database...");
    const supabase = createClient();

    const videoTitle = getVideoTitle(videoId);
    const { data: note, error: dbError } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title: videoTitle,
        type: "youtube",
        summary_markdown: summaryMarkdown,
        flashcards: [],
        // Store original URL in a custom field (you may need to add this column)
        // For now, we'll store it in the title or add a metadata field
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save note: ${dbError.message}`);
    }

    // Return success
    return NextResponse.json(
      {
        success: true,
        noteId: note.id,
        note,
        videoId,
        transcriptLength: transcriptText.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Process YouTube API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to process YouTube video",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

