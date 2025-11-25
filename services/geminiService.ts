import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const breakDownTask = async (taskTitle: string): Promise<string[]> => {
  if (!apiKey) {
    console.warn("No API Key found, returning fallback mock data");
    return [`Prepare for ${taskTitle}`, `Do ${taskTitle} part 1`, `Finish ${taskTitle}`];
  }

  try {
    const prompt = `
      You are an executive function assistant for someone with ADHD. 
      Break down the task "${taskTitle}" into 3 to 5 extremely small, actionable micro-steps.
      The steps should be simple and non-intimidating.
      Return ONLY a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });
    
    const responseText = response.text;
    if (!responseText) return [];
    
    return JSON.parse(responseText) as string[];

  } catch (error) {
    console.error("Gemini Breakdown Error:", error);
    // Fallback logic if API fails
    return [`Start ${taskTitle}`, `Continue ${taskTitle}`, `Complete ${taskTitle}`];
  }
};