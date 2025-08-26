// import { GoogleGenAI } from "@google/genai";

// const APIKEY = import.meta.env.VITE_API_KEY;
// const ai = new GoogleGenAI({ apiKey: APIKEY });
// export async function GetAiResponse(message: string) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-pro",
//     contents: `You are a prompt engineer. Your task is to generate a highly detailed and accurate prompt for another AI that will generate Python code using the Manim library.

//             Instructions:
//             - Based on the user's message below, break down the request into logical animation steps.
//             - Explain every visual element and transformation clearly, in plain language, that can be understood by a code-generating AI.
//             - Specify all animation timings, text content, positioning, transitions, and styles.
//             - Do NOT reference external files (like SVGs, images, or audio). Keep everything self-contained.
//             - Ensure the prompt is unambiguous and leads to code with no or minimal errors.
//             - Format your output as a single complete prompt, ready to be given to an AI to generate Manim code.
//             - Do NOT generate code. Only generate the prompt with complete instructions.

//             User message:
//               ${message}`,
//   });
//   return response.text;
// }

// // export default GetAiResponse;

export async function GetAiResponse(message: string) {
  const APIKEY = import.meta.env.VITE_OPENROUTER_KEY;
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${APIKEY}`,
          "HTTP-Referer": "<YOUR_SITE_URL>", // Required by OpenRouter
          "X-Title": "<YOUR_APP_NAME>", // Required by OpenRouter
        },
        body: JSON.stringify({
          model: "sao10k/l3-lunaris-8b",
          messages: [
            {
              role: "system",
              content: `You are a prompt engineer. Your task is to generate a highly detailed and accurate prompt for another AI that will generate Python code using the Manim library.`,
            },
            {
              role: "user",
              content: `Based on the user's message below, break down the request into logical animation steps.
            - Explain every visual element and transformation clearly, in plain language, that can be understood by a code-generating AI.
            - Specify all animation timings, text content, positioning, transitions, and styles.
            - Do NOT reference external files (like SVGs, images, or audio). Keep everything self-contained.
            - Ensure the prompt is unambiguous and leads to code with no or minimal errors.
            - Format your output as a single complete prompt, ready to be given to an AI to generate Manim code.
            - Do NOT generate code. Only generate the prompt with complete instructions.

            User message: ${message}`,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
}
