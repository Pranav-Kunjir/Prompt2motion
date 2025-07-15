import { useState } from "react";
import "@/css/videoplayer.css";
import ShinyText from "@/TextAnimations/ShinyText/ShinyText";
interface VideoPlayerProps {
  videoUrl: string;
}
export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      {videoUrl && (
        <>
          <button
            className="open-video-btn"
            onClick={() => setShowPlayer(true)}
          >
            <ShinyText
              text="▶️ Play Video"
              disabled={false}
              speed={3}
              className="render-btn"
            />
          </button>

          {showPlayer && (
            <div className="floating-player">
              <button
                className="close-btn"
                onClick={() => setShowPlayer(false)}
              >
                ✖
              </button>
              <video controls src={videoUrl} width="640" />
            </div>
          )}
        </>
      )}
    </>
  );
}
