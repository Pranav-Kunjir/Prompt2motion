import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "@/css/chat.css";
import { useState } from "react";

export function Chat(chatId: any) {
  const ID = chatId.chatid;
  const messages = useQuery(api.myFunctions.readMessage, { chatId: ID }) ?? [];

  return (
    <div className="chat-container">
      {messages.map((item) => (
        <CollapsibleMessage
          key={item._id}
          text={item.text}
          isLLM={item.isLLM}
        />
      ))}
    </div>
  );
}

function CollapsibleMessage({ text, isLLM }: { text: string; isLLM: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > 300; // threshold for collapsing

  return (
    <div className={`message ${isLLM ? "ai" : "user"}`}>
      <div className={isLong && !isExpanded ? "message-collapsed" : ""}>
        {text}
      </div>
      {isLong && (
        <span
          className="toggle-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </span>
      )}
    </div>
  );
}
