import { NextRequest, NextResponse } from "next/server";
import { generateStudyContent } from "@/lib/ai/groq";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { content } = body;

    // Validate input
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Invalid input. 'content' field is required and must be a string." },
        { status: 400 }
      );
    }

    // Check content length (minimum 50 characters)
    if (content.length < 50) {
      return NextResponse.json(
        { error: "Content is too short. Please provide at least 50 characters." },
        { status: 400 }
      );
    }

    // Check content length (maximum 10,000 characters)
    if (content.length > 10000) {
      return NextResponse.json(
        { error: "Content is too long. Maximum 10,000 characters allowed." },
        { status: 400 }
      );
    }

    // Generate study content using Groq AI
    const markdown = await generateStudyContent(content);

    // Return the generated Markdown
    return NextResponse.json(
      {
        success: true,
        markdown,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error:", error);

    // Handle specific errors
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "AI service configuration error. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

