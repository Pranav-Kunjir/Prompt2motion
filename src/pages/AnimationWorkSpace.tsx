import { ChatApp } from "@/components/ChatApp";
import { Sidebar } from "@/components/SideBar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CodeEditor } from "@/components/CodeEditor";
import { useState } from "react";
import "@/css/animationWorkSpace.css";
export function AnimationWorkSpace() {
  const { viewer } = useQuery(api.myFunctions.userData, {}) ?? {};
  const [workspaceId, setWorkspaceId] = useState("new");

  return (
    <div className="workspace-container">
      {viewer && <Sidebar userID={viewer} onChatSelect={setWorkspaceId} />}
      <div className="workspace-content">
        <div className="chat-section">
          <ChatApp workspaceId={workspaceId} setWorkspaceId={setWorkspaceId} />
        </div>
        {workspaceId !== "new" && (
          <div className="code-section">
            <CodeEditor chatID={workspaceId} />
          </div>
        )}
      </div>
    </div>
  );
}
