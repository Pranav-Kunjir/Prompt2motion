import React, { useState, KeyboardEvent, FormEvent } from "react";
import "@/css/inputField.css";
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isNewChat?: boolean; // 👈 Add this
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  isNewChat = false,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div
      className={isNewChat ? "chat-input-wrapper-new" : "chat-input-wrapper"}
    >
      <form
        onSubmit={handleSubmit}
        className={
          isNewChat ? "chat-input-container-new" : "chat-input-container"
        }
      >
        <input
          type="text"
          className="chat-input-field"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          type="submit"
          className="chat-send-button"
          disabled={disabled || !input.trim()}
        >
          <i className="bi bi-send"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
