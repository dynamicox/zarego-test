import { Type } from "@google/genai";
import genAI from "./genAiClient";

async function getRecommendationsBasedOnFavorites(
  favoriteMovies: string[]
): Promise<string[] | null> {
  try {
    const prompt = `Based on the user's favorite movies: "${favoriteMovies.join(
      ", "
    )}", recommend 5 different movies they might enjoy. Provide the recommendations as a JSON array of IMDB IDs.
    
    The response must be a valid JSON array of strings. For example:
    ["tt0111161", "tt0068646", "tt0080684", "tt0137523", "tt0109830"]
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "IMDB ID of a recommended movie",
          },
        },
      },
    });

    const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseText) {
      try {
        const recommendations: string[] = JSON.parse(responseText);
        return recommendations;
      } catch (error) {
        console.error("Error parsing JSON response from Gemini:", error);
        console.error("Problematic Response:", responseText);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting recommendations from Gemini:", error);
    return null;
  }
}

export { getRecommendationsBasedOnFavorites };
