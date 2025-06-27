import { GoogleGenAI } from "@google/genai";

const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });
export async function GetAiResponse(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a prompt engineer. Your task is to generate a highly detailed and accurate prompt for another AI that will generate Python code using the Manim library.

            Instructions:
            - Based on the user's message below, break down the request into logical animation steps.
            - Explain every visual element and transformation clearly, in plain language, that can be understood by a code-generating AI.
            - Specify all animation timings, text content, positioning, transitions, and styles.
            - Do NOT reference external files (like SVGs, images, or audio). Keep everything self-contained.
            - Ensure the prompt is unambiguous and leads to code with no or minimal errors.
            - Format your output as a single complete prompt, ready to be given to an AI to generate Manim code.
            - Do NOT generate code. Only generate the prompt with complete instructions.

            User message:
              ${message}`,
  });
  return response.text;
}
// export default GetAiResponse;
