import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { SignOut } from "@/auth/SignOut";
import "@/css/sidebar.css";
export function Sidebar({
  userID,
  onChatSelect,
}: {
  userID: string;
  onChatSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  let chats = useQuery(api.myFunctions.getUserChats, { userId: userID }) ?? [];
  // console.log(chats);
  return (
    <>
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Your Chats</h2>
        <div className="sidebar-content">
          <div className="sidebar-chats">
            {chats.length === 0 ? (
              <p className="sidebar-empty">No chats yet.</p>
            ) : (
              chats.map((chat) => (
                <p
                  key={chat._id}
                  className="sidebar-chat"
                  onClick={() => {
                    onChatSelect(chat._id);
                    setIsOpen(false);
                  }}
                >
                  {chat.chatName}
                </p>
              ))
            )}
          </div>
          <div className="signout">
            <SignOut />
          </div>
        </div>
      </div>
    </>
  );
}
