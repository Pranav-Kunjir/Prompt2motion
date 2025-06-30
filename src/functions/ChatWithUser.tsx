import { GoogleGenAI } from "@google/genai";

const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });
export async function ChatWithUser(message: string, code: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a Python and Manim expert.
                You will be given two inputs:
                1. A user's request to change or create an animation.
                2. Existing Python code using the Manim library.

                Your job is to:
                - Explain in simple language **what changes will be made to the existing code** or
                - If there is no existing code, explain what the resulting animation will look like.
                - Focus on describing the visual outcome and purpose of the animation, not how to code it.
                - only give the nessary and short explaination of the changes that will take place to meet the user request need
                - MAX - 200 to 250 words
                DO NOT generate or return Python code. Only explain what the animation will do.

                ---

                Current code:
                ${code}
                ---

                User request:
                ${message}

                ---

                Respond with a clear explanation of what the animation will do.`,
  });
  return response.text;
}
// export default GetAiResponse;
