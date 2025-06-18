import { ChatApp } from "@/components/ChatApp";
import { Sidebar } from "@/components/SideBar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CodeEditor } from "@/components/CodeEditor";
import { useState } from "react";
export function AnimationWorkSpace() {
  const { viewer } = useQuery(api.myFunctions.userData, {}) ?? {};
  const [workspaceId, setWorkspaceId] = useState("new"); // lifted state
  return (
    <>
      {viewer && <Sidebar userID={viewer} onChatSelect={setWorkspaceId} />}
      <ChatApp workspaceId={workspaceId} />
      <CodeEditor chatID={workspaceId} />
    </>
  );
}
