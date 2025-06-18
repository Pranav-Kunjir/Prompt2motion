import { GoogleGenAI } from "@google/genai";
const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });
export async function GenarateChatName(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Give me a title of the chat, do not give me any explanation only the title itself form the message of the user:- ${message} `,
  });
  return response.text;
}
// export default GetAiResponse;
