import { GoogleGenAI } from "@google/genai";
const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });
export async function GenarateManimCode(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `you will be given a prompt to generate manim code make sure to only return the code no explaination and nothing else
              ${message} `,
  });
  return response.text;
}
// export default GetAiResponse;
