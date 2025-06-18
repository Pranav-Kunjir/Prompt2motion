import ChatInput from "./InputField";
import { Chat } from "./Chat";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { GetAiResponse } from "@/functions/GetAPiResponse";
import { GenarateChatName } from "@/functions/GenarateChatName";
import { IntentDetector } from "@/functions/IntentDetector";
import { GenarateManimCode } from "@/functions/GenarateManimCode";
import { useEffect, useState } from "react";
let newChat = 0;
export function ChatApp(workspaceId: any) {
  const createChat = useMutation(api.myFunctions.createChat);
  const sendMessage = useMutation(api.myFunctions.sendMessage);
  const createCode = useMutation(api.myFunctions.createCode);
  const [ChatId, setChatId] = useState<string | undefined>("");
  // const [ChatName, setChatName] = useState<string | undefined>("");
  const { viewer } = useQuery(api.myFunctions.userData, {}) ?? {};
  useEffect(() => {
    if (workspaceId.workspaceId !== "new") {
      setChatId(workspaceId.workspaceId);
    }
  }, [workspaceId.workspaceId]);
  const handleSend = (message: string) => {
    if (workspaceId.workspaceId === "new" && newChat === 0 && viewer) {
      newChat += 1;

      GenarateChatName(message).then((n) => {
        // console.log(n);
        // setChatName(n);

        createChat({
          userID: viewer,
          chatName: n ?? "untitled chat",
        }).then((chatAttr) => {
          setChatId(chatAttr);

          sendMessage({ chatID: chatAttr, text: message, isLLM: false });

          GetAiResponse(message).then((x) => {
            if (x) {
              // sendMessage({ chatID: chatAttr, text: x, isLLM: true });
              IntentDetector(x).then((intent) => {
                if (intent && intent?.toLowerCase().includes("prompt")) {
                  // console.log("hello");
                  GenarateManimCode(x).then((code) => {
                    if (code) {
                      createCode({
                        chatID: chatAttr,
                        pythonCode: code,
                        prompt: x,
                      });
                    }
                  });
                }
                sendMessage({ chatID: chatAttr, text: x, isLLM: true });
              });
            }
          });
        });
      });
    } else {
      const activeChatId = ChatId || workspaceId.workspaceId;

      if (activeChatId && activeChatId !== "new") {
        sendMessage({ chatID: activeChatId, text: message, isLLM: false });

        GetAiResponse(message).then((x) => {
          if (x) {
            IntentDetector(x).then((intent) => {
              if (intent && intent?.toLowerCase().includes("prompt")) {
                // console.log("hello");
                GenarateManimCode(x).then((code) => {
                  if (code) {
                    createCode({
                      chatID: activeChatId,
                      pythonCode: code,
                      prompt: x,
                    });
                  }
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
      <Chat chatid={ChatId} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
