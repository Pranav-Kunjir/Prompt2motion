import { ChatApp } from "@/components/ChatApp";
import { Sidebar } from "@/components/SideBar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CodeEditor } from "@/components/CodeEditor";
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { RenderAndPlayVideo } from "@/components/RenderAndPlayVideo";
import "@/css/animationWorkSpace.css";
import { HandleErrorComponent } from "@/components/HandleErrorComponent";
export function AnimationWorkSpace() {
  const { viewer } = useQuery(api.myFunctions.userData, {}) ?? {};
  const [workspaceId, setWorkspaceId] = useState("new");
  const [videoLink, setVideoLink] = useState("");
  const [manimError, setManimError] = useState("");
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="workspace-container">
        <div className="workspace-content">
          {viewer && (
            <Sidebar
              userID={viewer}
              onChatSelect={setWorkspaceId}
              selectedChatId={workspaceId}
              videoLink={setVideoLink}
            />
          )}
          <div className="chat-section">
            <ChatApp
              workspaceId={workspaceId}
              setWorkspaceId={setWorkspaceId}
              videoLink={setVideoLink}
              manimError={setManimError}
              setIsLoading={setIsLoading}
              setIsRenderingVideo={setIsRenderingVideo}
              isLoading={isLoading}
              isRenderingVideo={isRenderingVideo}
            />
          </div>
          {workspaceId !== "new" && (
            <div className="code-section">
              <CodeEditor chatID={workspaceId} />
            </div>
          )}
        </div>
        <div>
          {videoLink !== "" && <VideoPlayer videoUrl={videoLink} />}
          {workspaceId !== "new" && videoLink === "" && (
            <RenderAndPlayVideo
              videoUrl={videoLink}
              workspaceId={workspaceId}
              setVideoUrl={setVideoLink}
              manimError={setManimError}
            />
          )}
        </div>
        <div>
          {manimError !== "" && (
            <HandleErrorComponent
              manimError={manimError}
              videoLink={setVideoLink}
              chatID={workspaceId}
              setManimError={setManimError}
              setIsLoading={setIsLoading}
              setIsRenderingVideo={setIsRenderingVideo}
            />
          )}
        </div>
      </div>
    </>
  );
}
