import ActionButton from "@/components/base/ActionButton";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import ChatItem from "../components/ChatItem";
import api from "@/api";
import { useQuery } from "react-query";
import Suspense from "@/components/suspense/Suspense";
import Fallback from "@/components/fallback/fallback";
import Skeleton from "@/components/base/Skeleton";

export default function ChatListPage() {
  const { data: chats, isLoading: isChatsLoading } = useQuery(
    ["fetchLastChatMessages"],
    () => api.chat.fetchLastChatMessages()
  );

  return (
    <PageContainer>
      <div className="flex flex-col">
        <Suspense
          isLoading={isChatsLoading}
          fallback={[...Array(10)].map((i) => (
            <Skeleton className="w-full h-6" />
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
      <ActionButton onClick={() => {}}>
        <Icon icon="add" className="text-white text-4xl"  />
      </ActionButton>
    </PageContainer>
  );
}