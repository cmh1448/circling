import Icon from "@/components/base/Icon";
import { Message } from "@/models/Chat";
import { User } from "@/models/User";
import { authStore } from "@/stores/authStore";
import { useMemo } from "react";
import { useStore } from "zustand";
import Profile from "./Profile";

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const authContext = useStore(authStore);

  const isMine = useMemo(
    () => authContext.user.email === props.message.sender,
    [props.message]
  );

  return (
    <div className="flex gap-2">
      {!isMine ? <Profile /> : null}
      <div
        className={`p-2 flex-1 bg-gray-200 rounded-lg ${
          isMine ? "!bg-blue-100 ml-20" : "mr-20"
        }`}
      >
        <div className="text-sm text-gray-500">{props.message.sender}</div>
        {props.message.content}
      </div>
      {isMine ? <Profile isMine /> : null}
    </div>
  );
}
