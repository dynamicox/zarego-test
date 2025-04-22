import { GoogleGenAI } from "@google/genai";

if (process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
  console.log("Google API Key is loaded.");
} else {
  console.error("Google API Key is not available!");
}

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

console.log("GoogleGenAI instance created:", genAI);

export default genAI;
