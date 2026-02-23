import { GoogleGenAI, Type } from "@google/genai";
import { CommuteInsight, City } from "../types";

/**
 * ✅ Correct way to read env in Vite
 * (.env.local → VITE_GEMINI_API_KEY)
 */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * ✅ Do NOT crash the app if key is missing
 */
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY missing – Gemini disabled");
}

/**
 * ✅ Initialize Gemini only if key exists
 */
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getCommuteInsights = async (
  city: City
): Promise<CommuteInsight[]> => {

  /**
   * ✅ STEP 3 SAFETY CHECK
   * Prevents white screen
   */
  if (!ai) {
    return [
      {
        title: "AI Disabled",
        content: "Commute insights are currently unavailable.",
        severity: "warning",
      },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 short, realistic commute insights for public bus travel in ${city}.
Consider traffic patterns, local events, or weather.
Return JSON only.`,

      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              severity: {
                type: Type.STRING,
                enum: ["info", "warning", "success"],
              },
            },
            required: ["title", "content", "severity"],
          },
        },
      },
    });

    return JSON.parse(response.text ?? "[]");
  } catch (error) {
    console.error("Gemini Error:", error);

    return [
      {
        title: "Service Unavailable",
        content: "AI commute insights are temporarily unavailable.",
        severity: "warning",
      },
    ];
  }
};
