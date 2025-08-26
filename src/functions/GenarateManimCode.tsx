// import { GoogleGenAI } from "@google/genai";
// const APIKEY = import.meta.env.VITE_API_KEY;
// const ai = new GoogleGenAI({ apiKey: APIKEY });
// export async function GenarateManimCode(message: string) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-pro",
//     contents: `you will be given a prompt to generate manim code make sure to only return the code no explaination and nothing else
//               ${message} `,
//   });
//   return response.text;
// }
// // export default GetAiResponse;

export async function GenarateManimCode(message: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`, // Your API key stored in .env
        "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
        "X-Title": "<YOUR_SITE_NAME>", // Optional
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "eepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: `you will be given a prompt to generate manim code. make sure to only return the code. no explanation and nothing else.
// ${message}`,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to generate Manim code");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
