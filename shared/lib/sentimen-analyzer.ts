import { Type } from "@google/genai";
import genAI from "./genAiClient";

async function analyzeSentimentWithGenAI(
  title: string
): Promise<string | null> {
  try {
    //!TODO: REFINE PROMPT
    const prompt = `Analyze the general audience sentiment for the movie "${title}". Based on your analysis of the title, provide the sentiment in the following strict JSON:
    {
      "overall": "positive", // one of: "positive", "negative", "neutral"
      "positive_score": 8,    // confidence score (0-10)
      "negative_score": 2,    // confidence score (0-10)
      "neutral_score": 1,     // confidence score (0-10)
      "summary": "A brief 8 - 10 sentence summary of the sentiment."
    }
    The response must be valid to peform a JSON.parse operation.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overall: {
              type: Type.STRING,
              enum: ["positive", "negative", "neutral"],
              description: "Overall sentiment",
            },
            positive_score: {
              type: Type.INTEGER,
              minimum: 0,
              maximum: 10,
              description: "Confidence score for positive sentiment (0-10)",
            },
            negative_score: {
              type: Type.INTEGER,
              minimum: 0,
              maximum: 10,
              description: "Confidence score for negative sentiment (0-10)",
            },
            neutral_score: {
              type: Type.INTEGER,
              minimum: 0,
              maximum: 10,
              description: "Confidence score for neutral sentiment (0-10)",
            },
            summary: {
              type: Type.STRING,
              description: "A brief 8 - 10 sentence summary of the sentiment.",
            },
          },
          required: [
            "overall",
            "positive_score",
            "negative_score",
            "neutral_score",
            "summary",
          ],
        },
      },
    });

    const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseText) {
      try {
        const sentimentData = JSON.parse(responseText);
        return sentimentData;
      } catch (error) {
        console.error("Error parsing JSON response from Gemini:", error);
        console.error("Problematic Response:", responseText);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error analyzing sentiment with Gemini:", error);
    console.log(process.env.GOOGLE_API_KEY);
    return null;
  }
}

export { analyzeSentimentWithGenAI };
