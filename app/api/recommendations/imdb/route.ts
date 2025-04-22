import { getRecommendationsBasedOnIMDBIds } from "@/shared/lib/reccomendationsImdb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { imdbIds } = await request.json();

    if (!Array.isArray(imdbIds) || imdbIds.length === 0) {
      return NextResponse.json(
        { message: "Please provide an array of IMDB IDs in the request body." },
        { status: 400 }
      );
    }

    const recommendations = await getRecommendationsBasedOnIMDBIds(imdbIds);

    if (recommendations) {
      return NextResponse.json({ recommendations }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to generate recommendations based on IMDB IDs" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error generating recommendations:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
