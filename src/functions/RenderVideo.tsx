// export async function RenderAndDownloadVideo(code: any) {
//   const formatted_code = code.replace(/```/g, "`");

//   const res = await fetch("http://localhost:8000/render/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ auth: "pranavbhai", code: formatted_code }),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     console.error("Error rendering video:", error);
//     return;
//   }

//   const blob = await res.blob();

//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "output.mp4";
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   URL.revokeObjectURL(url);
// }

export async function RenderVideo(code: any): Promise<string | null> {
  const formatted_code = code.replace(/```/g, "`");

  try {
    const res = await fetch("http://localhost:8000/render/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth: "pranavbhai", code: formatted_code }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to render video:", res.status, errorText);
      return null;
    }

    const blob = await res.blob();
    const contentType = res.headers.get("Content-Type");

    if (!contentType?.includes("video")) {
      const text = await blob.text();
      console.error("Expected video blob, got text:", text);
      return null;
    }

    const videoURL = URL.createObjectURL(blob);
    return videoURL; // Return URL to be used as video src
  } catch (err) {
    console.error("Error fetching video:", err);
    return null;
  }
}
