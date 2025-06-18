import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Sidebar({
  userID,
  onChatSelect,
}: {
  userID: string;
  onChatSelect: (id: string) => void;
}) {
  //   const userId = userID.userID;
  let chats = useQuery(api.myFunctions.getUserChats, { userId: userID }) ?? [];
  // console.log(chats);
  return (
    <div>
      <div>
        {chats.map((item) => (
          <p key={item._id} onClick={() => onChatSelect(item._id)}>
            {item.chatName}
          </p>
        ))}
      </div>
    </div>
  );
}
