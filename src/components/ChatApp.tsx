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
// import { VideoPlayer } from "./VideoPlayer";
import ToasterUi from "toaster-ui";
import "@/css/chatapp.css";
let newChat = 0;

type ChatAppProps = {
  workspaceId: string;
  setWorkspaceId: (id: string) => void;
  videoLink: (id: string) => void;
  manimError: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsRenderingVideo: (rendering: boolean) => void;
  isLoading: boolean;
  isRenderingVideo: boolean;
};

export function ChatApp({
  workspaceId,
  setWorkspaceId,
  videoLink,
  manimError,
  setIsLoading, // Destructure the new prop
  setIsRenderingVideo, // Destructure the new prop
  isLoading,
  isRenderingVideo,
}: ChatAppProps) {
  const createChat = useMutation(api.myFunctions.createChat);
  const sendMessage = useMutation(api.myFunctions.sendMessage);
  const createCode = useMutation(api.myFunctions.createCode);
  // const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const toaster = new ToasterUi();
  const isNewChat = workspaceId === "new" && newChat === 0;
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
      setIsLoading(true); // START loading

      GenarateChatName(message).then((n) => {
        createChat({
          userID: viewer,
          chatName: n ?? "untitled chat",
        }).then((chatAttr) => {
          setChatId(chatAttr);
          setWorkspaceId(chatAttr);
          sendMessage({ chatID: chatAttr, text: message, isLLM: false });

          GetAiResponse(message).then((x) => {
            if (x) {
              GenarateManimCode(x).then((code) => {
                setIsRenderingVideo(true);
                RenderVideo(code, manimError).then((url) => {
                  if (url) videoLink(url);
                  setIsRenderingVideo(false);
                });

                if (code) {
                  toaster.addToast("Code Updated");
                  createCode({
                    chatID: chatAttr,
                    pythonCode: code,
                    prompt: x,
                  });
                  setIsLoading(false); // STOP loading
                }
              });
              sendMessage({ chatID: chatAttr, text: x, isLLM: true });
            }
          });
        });
      });
    } else {
      const activeChatId = ChatId || workspaceId;
      if (activeChatId && activeChatId !== "new") {
        setIsLoading(true); // START loading
        sendMessage({ chatID: activeChatId, text: message, isLLM: false });
        const existingCode = codeData?.[0]?.pythonCode ?? "";

        ChatWithUser(message, existingCode).then((x) => {
          if (x) {
            UpdateManimCode(message, existingCode).then((updatedCode) => {
              setIsRenderingVideo(true);
              RenderVideo(updatedCode, manimError).then((url) => {
                if (url) videoLink(url);
                setIsRenderingVideo(false);
              });
              if (updatedCode) {
                toaster.addToast("Code Updated");
                createCode({
                  chatID: activeChatId,
                  pythonCode: updatedCode,
                  prompt: message,
                });
              }
              sendMessage({ chatID: activeChatId, text: x, isLLM: true });
              setIsLoading(false); // STOP loading
            });
          }
        });
      }
    }
  };

  return (
    <div className="chat">
      {ChatId && <Chat chatid={ChatId} />}
      {(isLoading || isRenderingVideo) && (
        <div className="bolt-loader-container unified-loader">
          <div className="bolt-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>
            {isLoading && isRenderingVideo
              ? "Working..."
              : isRenderingVideo
                ? "Rendering video..."
                : "Loading..."}
          </p>
        </div>
      )}

      <div className="chat-input-animate">
        {/* <ChatInput onSend={handleSend} /> */}
        <ChatInput onSend={handleSend} isNewChat={isNewChat} />
      </div>
      {/* {videoUrl && <VideoPlayer videoUrl={videoUrl} />} */}
    </div>
  );
}
