
import { GoogleGenAI, Type } from "@google/genai";
import { EnrichmentData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeUrl = async (url: string): Promise<EnrichmentData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following URL and provide a concise title, 3 relevant tags, and a one-sentence summary of what the content likely is: ${url}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for the link" },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3 relevant tags" 
            },
            summary: { type: Type.STRING, description: "A one-sentence summary" }
          },
          required: ["title", "tags", "summary"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      title: result.title || "Untitled Link",
      tags: result.tags || ["General"],
      summary: result.summary || "No description available."
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      title: url.split('/').pop() || "Untitled Link",
      tags: ["Web"],
      summary: "Shortened link for " + url
    };
  }
};
