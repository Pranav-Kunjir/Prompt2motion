import React, { useState, KeyboardEvent, FormEvent } from "react";
import "@/css/inputField.css";
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
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
    <form onSubmit={handleSubmit} className="chat-input-container">
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
        Send
      </button>
    </form>
  );
};

export default ChatInput;
