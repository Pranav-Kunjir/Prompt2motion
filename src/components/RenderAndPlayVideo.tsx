import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { RenderVideo } from "@/functions/RenderVideo";
import ShinyText from "@/TextAnimations/ShinyText/ShinyText";
import "@/css/RenderAndPlayVideo.css";
interface RenderAndPlayVideoProps {
  videoUrl: string;
  workspaceId: string;
  setVideoUrl: (url: string) => void;
  manimError: (url: string) => void;
}

export function RenderAndPlayVideo({
  videoUrl,
  workspaceId,
  setVideoUrl,
  manimError,
}: RenderAndPlayVideoProps) {
  const convex = useConvex();
  const [isLoading, setIsLoading] = useState(false);

  async function handleRender() {
    setIsLoading(true);
    try {
      // 1. Fetch latest code for this chat/workspace
      const messages = await convex.query(api.myFunctions.displayCode, {
        chatId: workspaceId,
      });

      if (!messages || messages.length === 0) {
        alert("No code found for this workspace.");
        return;
      }

      const code = messages[0].pythonCode;

      // 2. Render the video using the fetched code
      const renderedVideoURL = await RenderVideo(code, manimError);

      if (renderedVideoURL) {
        setVideoUrl(renderedVideoURL);
      } else {
        alert("Video rendering failed.");
      }
    } catch (err) {
      console.error("Error rendering video:", err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  // Don't show the button if the video is already rendered
  if (videoUrl) return null;

  return (
    <button
      className="open-video-btn"
      onClick={handleRender}
      disabled={isLoading}
    >
      {isLoading ? (
        <ShinyText
          text="Rendering ..."
          disabled={false}
          speed={3}
          className="render-btn"
        />
      ) : (
        <ShinyText
          text="▶️ Render Video"
          disabled={false}
          speed={3}
          className="render-btn"
        />
      )}
    </button>
  );
}
