// export async function RenderVideo(code: any): Promise<string | null> {
//   const formatted_code = code.replace(/```/g, "`");

//   try {
//     const res = await fetch("http://localhost:8000/render/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ auth: "pranavbhai", code: formatted_code }),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("Failed to render video:", res.status, errorText);
//       return null;
//     }

//     const blob = await res.blob();
//     const contentType = res.headers.get("Content-Type");

//     if (!contentType?.includes("video")) {
//       const text = await blob.text();
//       console.error("Expected video blob, got text:", text);
//       return null;
//     }

//     const videoURL = URL.createObjectURL(blob);
//     return videoURL; // Return URL to be used as video src
//   } catch (err) {
//     console.error("Error fetching video:", err);
//     return null;
//   }
// }
// this is the correct down??
export async function RenderVideo(
  code: any,
  setManimError: (msg: string) => void,
): Promise<string | null> {
  const formatted_code = code.replace(/```/g, "`");
  let manimErrorMessage: string | null = null;

  try {
    const res = await fetch("http://localhost:8000/render/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth: "pranavbhai", code: formatted_code }),
    });

    const contentType = res.headers.get("Content-Type");

    if (!res.ok) {
      try {
        const { error, details } = await res.json();
        manimErrorMessage = `Error: ${error}\nDetails:\n${details}`;
      } catch (e) {
        manimErrorMessage = "Failed to parse error response from server.";
      }

      console.log("Render error message:\n", manimErrorMessage);
      setManimError(`Render error message:\n, ${manimErrorMessage}`);
      return null;
    }

    const blob = await res.blob();

    if (!contentType?.includes("video")) {
      const text = await blob.text();
      manimErrorMessage = `Expected video, got:\n${text}`;
      console.log("Render error message:\n", manimErrorMessage);
      setManimError(`Render error message:\n, ${manimErrorMessage}`);
      return null;
    }

    const videoURL = URL.createObjectURL(blob);
    return videoURL;
  } catch (err) {
    manimErrorMessage = `Network or fetch error: ${err}`;
    console.log("Render error message:\n", manimErrorMessage);
    setManimError(`Render error message:\n, ${manimErrorMessage}`);
    return null;
  }
}
