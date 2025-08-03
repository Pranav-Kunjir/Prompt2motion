import { useState } from "react";
import "@/css/handleErrorComponent.css";
import { api } from "../../convex/_generated/api";
import { HandleError } from "@/functions/HandleError";
import { useMutation, useQuery } from "convex/react";
import { RenderVideo } from "@/functions/RenderVideo";
import { ChatWithUser } from "@/functions/ChatWithUser";
import ToasterUi from "toaster-ui";

interface HandleErrorComponentProps {
  manimError: string;
  chatID: string;
  videoLink: (id: string) => void;
  setManimError: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsRenderingVideo: (rendering: boolean) => void;
}

export function HandleErrorComponent({
  manimError,
  chatID,
  videoLink,
  setManimError,
  setIsLoading,
  setIsRenderingVideo,
}: HandleErrorComponentProps) {
  const [showPopup, setShowPopup] = useState(false);
  const toaster = new ToasterUi();
  const createCode = useMutation(api.myFunctions.createCode);
  const code = useQuery(api.myFunctions.displayCode, { chatId: chatID });
  const fullCode = code?.[0]?.pythonCode || "";
  const sendMessage = useMutation(api.myFunctions.sendMessage);

  function handleReprompt() {
    const activeChatId = chatID;
    setIsLoading(true);
    if (activeChatId && activeChatId !== "new") {
      const existingCode = fullCode ?? "";
      ChatWithUser(manimError, existingCode).then((x) => {
        if (x) {
          HandleError(manimError, existingCode).then((updatedCode) => {
            setIsRenderingVideo(true);
            RenderVideo(updatedCode, setManimError).then((url) => {
              if (url) videoLink(url);
              setIsRenderingVideo(false);
            });
            if (updatedCode) {
              toaster.addToast("Code Updated");
              createCode({
                chatID: activeChatId,
                pythonCode: updatedCode,
                prompt: manimError,
              });
            }
            sendMessage({ chatID: activeChatId, text: x, isLLM: true });
            setIsLoading(false);
          });
        }
      });
    }
    setManimError("");
  }

  function handleCloseError() {
    setManimError("");
  }

  return (
    <>
      <div className="cards">
        <div className="error-header">
          <h3>Error Occurred</h3>
          <button className="close-btn" onClick={handleCloseError}>
            ✖
          </button>
        </div>
        <p>{manimError.slice(0, 100)}...</p>
        <button onClick={() => setShowPopup(true)}>View</button>
        <button onClick={handleReprompt}>Fix Error</button>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Full Error</h3>
            <p>{manimError}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
