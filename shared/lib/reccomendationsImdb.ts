import { Type } from "@google/genai";
import genAI from "./genAiClient";

async function getRecommendationsBasedOnIMDBIds(
  imdbIds: string[]
): Promise<string[] | null> {
  try {
    const prompt = `Based on the following list of IMDB IDs: "${imdbIds.join(
      ", "
    )}", recommend 5 different movies that are related or similar. Provide the recommendations as a JSON array of IMDB IDs.

    The response must be a valid JSON array of strings. For example:
    ["tt0076759", "tt0082971", "tt0086190", "tt0088763", "tt0096229"]
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

export { getRecommendationsBasedOnIMDBIds };
