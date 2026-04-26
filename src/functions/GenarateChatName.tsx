export async function GenarateChatName(message: string) {
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
            content: `Give me a title of the chat, do not give me any explanation only the title itself form the message of the user:- ${message} `,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to generate chat name");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
