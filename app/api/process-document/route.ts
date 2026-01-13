import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { generateStudyContent } from "@/lib/ai/groq";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

/**
 * Upload document to Supabase Storage
 */
async function uploadDocumentToStorage(
  file: File,
  userId: string
): Promise<string> {
  const supabase = createClient();

  // Generate unique filename
  const timestamp = Date.now();
  const extension = file.name.split(".").pop() || "pdf";
  const filename = `${userId}/${timestamp}.${extension}`;

  // Convert File to Buffer for upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filename, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Failed to upload document: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("documents")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Extract text from PDF
 */
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

/**
 * Extract text from DOCX
 */
async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("DOCX parsing error:", error);
    throw new Error("Failed to extract text from DOCX");
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate file type
    const mimeType = file.type;
    const isPDF = mimeType === "application/pdf";
    const isDOCX =
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    // Step A: Upload to Supabase Storage
    console.log("Uploading document to Supabase Storage...");
    const storageUrl = await uploadDocumentToStorage(file, userId);

    // Step B: Extract text from document
    console.log("Extracting text from document...");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText: string;

    if (isPDF) {
      extractedText = await extractTextFromPDF(buffer);
    } else {
      // DOCX
      extractedText = await extractTextFromDOCX(buffer);
    }

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error("No text could be extracted from the document");
    }

    // Step C: Generate summary using Groq AI
    console.log("Generating summary with Groq AI...");
    const summaryMarkdown = await generateStudyContent(extractedText);

    // Step D: Save to database
    console.log("Saving note to database...");
    const supabase = createClient();

    const noteType = isPDF ? "pdf" : "docx";
    const { data: note, error: dbError } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        type: noteType,
        summary_markdown: summaryMarkdown,
        flashcards: [],
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
        storageUrl,
        extractedTextLength: extractedText.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Process Document API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to process document",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

