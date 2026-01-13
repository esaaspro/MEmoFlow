import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { createClient } from "@/lib/supabase/client";
import { generateStudyContent } from "@/lib/ai/groq";

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Fetch HTML from URL with proper headers
 */
async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch URL: ${response.status} ${response.statusText}`
    );
  }

  return await response.text();
}

/**
 * Extract clean content using Readability
 */
function extractContent(html: string, url: string) {
  const dom = new JSDOM(html, {
    url,
  });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    throw new Error("Impossible d'extraire le contenu principal de la page");
  }

  return {
    title: article.title || "Article Web",
    textContent: article.textContent || "",
    excerpt: article.excerpt || "",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, userId } = body;

    // Step A: Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL requise" },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "URL invalide. Format attendu: https://example.com/article" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Step B: Fetch HTML
    console.log(`Fetching HTML from: ${url}`);
    let html: string;

    try {
      html = await fetchHtml(url);
    } catch (error: any) {
      console.error("Fetch error:", error);
      return NextResponse.json(
        {
          error:
            "Site protégé ou inaccessible. Vérifie que l'URL est correcte et que le site est accessible.",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (!html || html.length < 100) {
      return NextResponse.json(
        {
          error: "La page est vide ou inaccessible",
        },
        { status: 400 }
      );
    }

    // Step C: Extract and clean content
    console.log("Extracting content with Readability...");
    let extractedContent;

    try {
      extractedContent = extractContent(html, url);
    } catch (error: any) {
      console.error("Readability error:", error);
      return NextResponse.json(
        {
          error:
            "Impossible d'extraire le contenu principal. La page pourrait être protégée ou mal formatée.",
          details: error.message,
        },
        { status: 400 }
      );
    }

    // Step D: Validate content length
    const textContent = extractedContent.textContent.trim();

    if (!textContent || textContent.length < 500) {
      return NextResponse.json(
        {
          error:
            "Contenu insuffisant ou illisible. Assure-toi que la page contient un article complet.",
          contentLength: textContent.length,
        },
        { status: 400 }
      );
    }

    console.log(
      `Content extracted: ${textContent.length} characters, title: ${extractedContent.title}`
    );

    // Step E: Generate summary using Groq AI
    console.log("Generating summary with Groq AI...");
    const summaryMarkdown = await generateStudyContent(textContent);

    // Step F: Save to database
    console.log("Saving note to database...");
    const supabase = createClient();

    const { data: note, error: dbError } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title: extractedContent.title,
        type: "website",
        summary_markdown: summaryMarkdown,
        flashcards: [],
        // Store original URL (you may need to add a metadata column)
        // For now, we'll include it in the summary or add metadata later
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
        originalUrl: url,
        contentLength: textContent.length,
        title: extractedContent.title,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Process Website API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to process website",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

