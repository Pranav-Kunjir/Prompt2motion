import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { SignOut } from "@/auth/SignOut";
import "@/css/sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export function Sidebar({
  userID,
  onChatSelect,
}: {
  userID: string;
  onChatSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { viewerImage } = useQuery(api.myFunctions.userData, {}) ?? {};
  let chats = useQuery(api.myFunctions.getUserChats, { userId: userID }) ?? [];
  const [showMenu, setShowMenu] = useState(false);

  // console.log(chats);
  return (
    <>
      <div className="left-bar">
        <p>ICON</p>
        {/* Toggle Button */}

        <div className="bootom-btn">
          <div className="profile-menu-wrapper">
            {viewerImage && (
              <img
                src={viewerImage}
                alt="avatar"
                referrerPolicy="no-referrer"
                className="profile-picture"
                onClick={() => setShowMenu((prev) => !prev)}
              />
            )}

            {showMenu && (
              <div className="profile-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    /* Navigate to dashboard */
                  }}
                >
                  <i className="bi bi-speedometer2"></i> Dashboard
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    /* Navigate to settings */
                  }}
                >
                  <i className="bi bi-gear"></i> Settings
                </button>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item"
                  onClick={() => {
                    /* Navigate to settings */
                  }}
                >
                  <i className="bi bi-box-arrow-left"></i>
                  <SignOut />
                </button>
              </div>
            )}
          </div>

          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : <i className="bi bi-layout-sidebar-inset"></i>}
          </button>
        </div>
      </div>
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
        </div>
      </div>
    </>
  );
}
