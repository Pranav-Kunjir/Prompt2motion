import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
export function Chat(chatId: any) {
  const ID = chatId.chatid;
  let messages = useQuery(api.myFunctions.readMessage, { chatId: ID }) ?? [];
  return (
    <div>
      <div>
        {messages.map((item) => (
          <p key={item._id}>{item.text}</p>
        ))}
      </div>
    </div>
  );
}
