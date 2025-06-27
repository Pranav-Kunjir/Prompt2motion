import { GoogleGenAI } from "@google/genai";
// import { api } from "../../convex/_generated/api";
// import { useQuery } from "convex/react";
const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });

export async function UpdateManimCode(message: string, code: string) {
  //   const ID = chatID.chatid;
  //   const code = useQuery(api.myFunctions.displayCode, { chatId: ID }) ?? [];
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a Python expert specialized in using the Manim library to create animations.
                Below is an existing Manim script:
                ${code ?? ""}
                The user has requested the following change:
                ${message}
                Update the code based on the user's instruction. If the request refers to modifying, enhancing, or changing part of the existing animation, only update those parts. If it’s a new animation, replace the entire code.
                Important:
                - Return **only** the updated code.
                - **No explanations**, no text before or after.
                - Wrap the code in standard Manim format using classes and 'Scene' subclasses.

                Your response should be valid Python using Manim syntax
                 `,
  });
  return response.text;
}
