// export async function HandleError(manimError: string, code: string) {
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`, // Your OpenRouter API key
//         "HTTP-Referer": "<YOUR_SITE_URL>", // Optional for ranking
//         "X-Title": "<YOUR_SITE_NAME>", // Optional for ranking
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "qwen/qwen3-coder:free",
//         messages: [
//           {
//             role: "user",
//             content: `You are a Python expert specializing in the Manim library for mathematical animations.

//                     Below is the current Manim script:
//                     ${code ?? ""}

//                     When executed, this code produces the following error:
//                     ${manimError}

//                     Your task is to analyze the error and provide a corrected version of the code that fixes the issue.

//                     Instructions:
//                     - If the error is due to syntax, logic, or a missing Manim construct, correct it accordingly.
//                     - Only make the minimal necessary changes to fix the error while preserving the rest of the animation logic.
//                     - If the original code is fundamentally flawed or incomplete, rewrite it as a valid and functional Manim script.

//                     Output Format:
//                     - Return **only** the updated code.
//                     - **Do not** include any explanation, commentary, or extra text.
//                     - Wrap the code in a valid Python script using standard Manim structure (Scene subclasses, proper imports, etc.).`,
//           },
//         ],
//       }),
//     },
//   );

//   if (!response.ok) {
//     throw new Error("Failed to update Manim code");
//   }

//   const data = await response.json();
//   return data.choices[0].message.content;
// }

import { GoogleGenAI } from "@google/genai";

const APIKEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: APIKEY });

export async function HandleError(manimError: string, code: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
              You are a Python expert specializing in the Manim library for mathematical animations.

              Below is the current Manim script:
              ${code ?? ""}

              When executed, this code produces the following error:
              ${manimError}

              Your task is to analyze the error and provide a corrected version of the code that fixes the issue.

              Instructions:
              - If the error is due to syntax, logic, or a missing Manim construct, correct it accordingly.
              - Only make the minimal necessary changes to fix the error while preserving the rest of the animation logic.
              - If the original code is fundamentally flawed or incomplete, rewrite it as a valid and functional Manim script.
              - Show to complete animation

              Output Format:
              - Return **only** the updated code.
              - **Do not** include any explanation, commentary, or extra text.
              - Wrap the code in a valid Python script using standard Manim structure (Scene subclasses, proper imports, etc.).
                  `,
  });

  return response.text;
}
