import { GoogleGenAI } from "@google/genai";

// export function GetAiResponse(inputMessage: any) {
//   const response = "";

//   return response;
// }
const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });
export async function IntentDetector(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `you are to respond accoridng to followng condition
               1)"prompt"- if the given input message is a prompt to another ai to generate manim code
               2)"none"- if nothing happens 
              ${message}`,
  });
  return response.text;
}
// export default GetAiResponse;
