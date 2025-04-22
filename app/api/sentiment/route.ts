import { analyzeSentimentWithGenAI } from "@/shared/lib/sentimen-analyzer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Movie title is required" },
        { status: 400 }
      );
    }

    const sentiment = await analyzeSentimentWithGenAI(title);

    if (sentiment) {
      return NextResponse.json(sentiment);
    } else {
      return NextResponse.json(
        { title: title, sentiment: "Unknown" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
