import { NextRequest, NextResponse } from "next/server";
import supabase from "@/shared/lib/supaBaseClient";
import {
  getTemporaryUserId,
  setTemporaryUserIdCookie,
} from "@/shared/lib/mockUser";
import { OMDBMovieShort } from "@/shared/types"; // Assuming your interface is in this path

const TABLE_NAME = "favorites-moovies";

export async function POST(request: NextRequest) {
  try {
    const movie: OMDBMovieShort = await request.json();

    if (!movie?.imdbID) {
      return NextResponse.json({ error: "Missing imdbID" }, { status: 400 });
    }

    let tempUserId = getTemporaryUserId(request);
    const earlyResponse = NextResponse.json(
      { message: "Movie added to favorites." },
      { status: 200 }
    );

    if (!tempUserId) {
      tempUserId = setTemporaryUserIdCookie(earlyResponse);
    }

    const { error } = await supabase.from(TABLE_NAME).insert([
      {
        temp_user_id: tempUserId,
        imdbID: movie.imdbID,
        Poster: movie.Poster,
        Title: movie.Title,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return earlyResponse;
  } catch (error) {
    console.error("Server error adding favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { imdbID } = await request.json();
    const tempUserId = getTemporaryUserId(request);

    if (!imdbID || !tempUserId) {
      return NextResponse.json(
        { error: "Missing imdbID or temporary user ID" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .match({ temp_user_id: tempUserId, imdbID: imdbID });

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error removing favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const tempUserId = getTemporaryUserId(request);

    if (!tempUserId) {
      return NextResponse.json([], { status: 200 });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("imdbID, Poster, Title")
      .match({ temp_user_id: tempUserId });

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const favoriteMovies: OMDBMovieShort[] = data.map((item) => ({
      imdbID: item.imdbID,
      Poster: item.Poster,
      Title: item.Title,
    }));

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (error) {
    console.error("Server error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
