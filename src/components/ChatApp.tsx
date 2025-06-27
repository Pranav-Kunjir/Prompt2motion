import ChatInput from "./InputField";
import { Chat } from "./Chat";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { GetAiResponse } from "@/functions/GetAPiResponse";
import { GenarateChatName } from "@/functions/GenarateChatName";
import { GenarateManimCode } from "@/functions/GenarateManimCode";
import { useEffect, useState } from "react";
import { UpdateManimCode } from "@/functions/UpdateManimCode";
import { ChatWithUser } from "@/functions/ChatWithUser";
import { RenderVideo } from "@/functions/RenderVideo";
import { VideoPlayer } from "./VideoPlayer";
import ToasterUi from "toaster-ui";
let newChat = 0;

// interface ChatAppProps {
//   workspaceId: any;
//   onChatCreated: (id: string) => void;
// }

export function ChatApp({
  workspaceId,
  setWorkspaceId,
}: {
  workspaceId: string;
  setWorkspaceId: (id: string) => void;
}) {
  const createChat = useMutation(api.myFunctions.createChat);
  const sendMessage = useMutation(api.myFunctions.sendMessage);
  const createCode = useMutation(api.myFunctions.createCode);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const toaster = new ToasterUi();
  const [ChatId, setChatId] = useState<string | undefined>("");

  const { viewer } = useQuery(api.myFunctions.userData, {}) ?? {};
  const maybeCodeData =
    useQuery(api.myFunctions.displayCode, {
      chatId: ChatId || "placeholder", // some dummy or fallback
    }) ?? [];

  const codeData = ChatId && ChatId !== "new" ? maybeCodeData : [];
  useEffect(() => {
    if (workspaceId !== "new") {
      setChatId(workspaceId);
    }
  }, [workspaceId]);

  const handleSend = (message: string) => {
    if (workspaceId === "new" && newChat === 0 && viewer) {
      newChat += 1;

      GenarateChatName(message).then((n) => {
        createChat({
          userID: viewer,
          chatName: n ?? "untitled chat",
        }).then((chatAttr) => {
          setChatId(chatAttr);
          setWorkspaceId(chatAttr); // ✅ LIFT STATE TO PARENT
          sendMessage({ chatID: chatAttr, text: message, isLLM: false });
          GetAiResponse(message).then((x) => {
            if (x) {
              GenarateManimCode(x).then((code) => {
                RenderVideo(code).then((url) => {
                  if (url) setVideoUrl(url); // <-- ✅ set video for player
                });
                if (code) {
                  toaster.addToast("Code Updated");
                  createCode({
                    chatID: chatAttr,
                    pythonCode: code,
                    prompt: x,
                  });
                }
              });

              // Send the AI's response to the chat
              sendMessage({ chatID: chatAttr, text: x, isLLM: true });
            }
          });
        });
      });
    } else {
      const activeChatId = ChatId || workspaceId;

      if (activeChatId && activeChatId !== "new") {
        sendMessage({ chatID: activeChatId, text: message, isLLM: false });
        const existingCode = codeData?.[0]?.pythonCode ?? "";
        ChatWithUser(message, existingCode).then((x) => {
          if (x) {
            // Directly update the Manim code based on the new user message and existing code
            UpdateManimCode(message, existingCode).then((updatedCode) => {
              // console.log(RenderVideo(updatedCode));
              RenderVideo(updatedCode).then((url) => {
                if (url) setVideoUrl(url); // <-- ✅ set video for player
              });
              if (updatedCode) {
                toaster.addToast("Code Updated");
                createCode({
                  chatID: activeChatId,
                  pythonCode: updatedCode,
                  prompt: message, // store user message as prompt
                });
              }

              sendMessage({ chatID: activeChatId, text: x, isLLM: true });
            });
          }
        });
      }
    }
  };

  return (
    <div className="chat">
      {ChatId && <Chat chatid={ChatId} />}
      <ChatInput onSend={handleSend} />
      {/* {videoUrl && (
        <div className="video-container">
          <video controls src={videoUrl} width="640" />
        </div>
      )} */}
      <VideoPlayer link={videoUrl} />
    </div>
  );
}
