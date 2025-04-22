import { NextRequest, NextResponse } from "next/server";
import supabase from "@/shared/lib/supaBaseClient";
import { getTemporaryUserId } from "@/shared/lib/mockUser";
import { getRecommendationsBasedOnFavorites } from "@/shared/lib/reccomendationsUser";

const TABLE_NAME = "favorites-moovies";

export async function GET(request: NextRequest) {
  try {
    const tempUserId = getTemporaryUserId(request);

    if (!tempUserId) {
      return NextResponse.json(
        { recommendations: [], message: "No temporary user ID found." },
        { status: 200 }
      );
    }

    const { data: favoritesData, error: favoritesError } = await supabase
      .from(TABLE_NAME)
      .select("Title")
      .eq("temp_user_id", tempUserId);

    if (favoritesError) {
      console.error("Error fetching user favorites:", favoritesError);
      return NextResponse.json(
        { message: "Failed to fetch user favorites" },
        { status: 500 }
      );
    }

    const favoriteMovies: string[] =
      favoritesData?.map((fav) => fav.Title) ?? [];

    if (favoriteMovies.length === 0) {
      return NextResponse.json(
        {
          recommendations: [],
          message: "No favorite movies found for this user.",
        },
        { status: 200 }
      );
    }

    const recommendations = await getRecommendationsBasedOnFavorites(
      favoriteMovies
    );

    if (recommendations) {
      return NextResponse.json({ recommendations }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to generate recommendations" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error fetching recommendations:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
