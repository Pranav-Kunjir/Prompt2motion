export async function GetAiResponse(message: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
        "HTTP-Referer": "<YOUR_SITE_URL>",
        "X-Title": "<YOUR_SITE_NAME>",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_OPENROUTER_MODEL,
        messages: [
          {
            role: "user",
            content: `You are a prompt engineer. Your task is to generate a highly detailed and accurate prompt for another AI that will generate Python code using the Manim library.

            Instructions:
            - Based on the user's message below, break down the request into logical animation steps.
            - Explain every visual element and transformation clearly, in plain language, that can be understood by a code-generating AI.
            - Specify all animation timings, text content, positioning, transitions, and styles.
            - Do NOT reference external files (like SVGs, images, or audio). Keep everything self-contained.
            - Ensure the prompt is unambiguous and leads to code with no or minimal errors.
            - Format your output as a single complete prompt, ready to be given to an AI to generate Manim code.
            - Do NOT generate code. Only generate the prompt with complete instructions.

            User message: ${message}`,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
