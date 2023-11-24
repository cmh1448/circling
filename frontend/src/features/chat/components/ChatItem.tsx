import Icon from "@/components/base/Icon";
import { LastChatMessage } from "@/models/Chat";
import { authStore } from "@/stores/authStore";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";

interface ChatItemProps {
  chat: LastChatMessage;
}

export default function ChatItem(props: ChatItemProps) {
  const authContext = useStore(authStore);

  const target = useMemo(() => {
    if (props.chat.receiver.email === authContext.user.email) {
      return props.chat.sender;
    } else {
      return props.chat.receiver;
    }
  }, [props.chat]);

  const naviage = useNavigate();

  const handleClick = () => {
    naviage(`/chat/${target.email}`);
  };

  return (
    <div
      className="select-none flex p-2 hover:bg-gray-100 rounded-lg transition-all items-center gap-2 cursor-pointer active:scale-95"
      onClick={handleClick}
    >
      <div className="w-12 aspect-square rounded-full bg-gray-200 flex items-center justify-center">
        <Icon icon="person" className="text-gray-500" fill />
      </div>
      <div className="flex flex-col flex-1 ">
        <span className="text-lg font-bold h-7">
          {target.lastName + " " + target.firstName}
        </span>
        <span className="text-sm text-gray-400 h-5">{props.chat.content}</span>
      </div>
      <div>
        <div className="text-gray-400 text-sm">
          {elapsedStringOf(parseLocalDateTime(props.chat.timestamp))}
        </div>
      </div>
    </div>
  );
}
