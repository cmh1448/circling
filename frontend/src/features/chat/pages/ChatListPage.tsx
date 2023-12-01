import ActionButton from "@/components/base/ActionButton";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import ChatItem from "../components/ChatItem";
import api from "@/api";
import { useQuery } from "react-query";
import Suspense from "@/components/suspense/Suspense";
import Fallback from "@/components/fallback/fallback";
import Skeleton from "@/components/base/Skeleton";
import SlideDlialog from "@/components/dialog/SlideDialog";
import NewChatDialog from "../dialogs/NewChatDialog";
import { useState } from "react";

export default function ChatListPage() {
  const { data: chats, isLoading: isChatsLoading } = useQuery(
    ["fetchLastChatMessages"],
    () => api.chat.fetchLastChatMessages()
  );

  const [newChatDialogOpened, setNewChatDialogOpened] = useState(false);

  return (
    <PageContainer>
      <div className="flex flex-col">
        <Suspense
          isLoading={isChatsLoading}
          fallback={[...Array(10)].map((i) => (
            <Skeleton className="w-full h-14 rounded-lg mb-2" />
          ))}
        >
          <Fallback
            when={chats?.length === 0}
            message="아직 아무 채팅이 없어요"
          >
            {chats?.map((chat) => (
              <ChatItem chat={chat} />
            ))}
          </Fallback>
        </Suspense>
      </div>
      <ActionButton
        onClick={() => {
          setNewChatDialogOpened(true);
        }}
      >
        <Icon icon="add" className="text-white text-4xl" />
      </ActionButton>
      <NewChatDialog
        opened={newChatDialogOpened}
        onClosed={() => {
          setNewChatDialogOpened(false);
        }}
      />
    </PageContainer>
  );
}
