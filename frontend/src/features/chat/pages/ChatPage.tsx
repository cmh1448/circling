import PageContainer from "@/components/pages/PageContainer";
import ChatInputPanel from "../panels/ChatInputPanel";
import api from "@/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Suspense from "@/components/suspense/Suspense";
import { useEffect, useRef, useState } from "react";
import { Message, MessageRequest } from "@/models/Chat";
import { useStore } from "zustand";
import { authStore } from "@/stores/authStore";
import ChatBubble from "../components/ChatBubble";
import FullScreenContainer from "@/components/pages/FullScreenContainer";
import { notificationStore } from "@/stores/notiStore";

export default function ChatPage() {
  const { target } = useParams();

  const authContext = useStore(authStore);
  const notiContext = useStore(notificationStore);

  const { data: chatLogs, isLoading: isChatLogsLoading } = useQuery(
    ["fetchChatLogs"],
    () => api.chat.fetchChatMessages(target),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const [receivedChatLogs, setReceivedChatLogs] = useState<Message[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket>();

  useEffect(() => {
    if (!websocket) {
      console.log("connecting");
      let ws: WebSocket;

      if (location.host.includes("localhost")) {
        ws = new WebSocket(`ws://${location.host}/ws/chat`);
      } else {
        ws = new WebSocket(`wss://${location.host}/circling/ws/chat`);
      }

      setWebsocket(ws);

      ws.onopen = () => {
        console.log("connected");
        ws.send(
          JSON.stringify({
            jwtToken: authContext.accessToken,
          })
        );
      };

      ws.onmessage = (event) => {
        const received = event.data as string;
        if (received.startsWith("ERROR")) {
          //on Error
        } else {
          const message = JSON.parse(received) as Message;
          setReceivedChatLogs((prev) => [...prev, message]);
          scrollToBottom();
        }
      };
    }

    return () => {
      websocket?.close();
    };
  }, []);

  useEffect(() => {
    notiContext.disableNotiPopup();

    return () => {
      notiContext.enableNotiPopup();
    };
  }, []);

  const handleSend = (message: string) => {
    websocket.send(
      JSON.stringify({
        receiver: target,
        content: message,
      } as MessageRequest)
    );
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <FullScreenContainer>
      <div className="flex flex-col !h-full">
        <div
          className="flex-1 flex flex-col gap-2 overflow-auto apply-scrollbar"
          ref={scrollRef}
        >
          <div className="text-gray-400 self-center">채팅이 시작되었습니다</div>
          <Suspense isLoading={isChatLogsLoading}>
            {chatLogs?.map((chatLog) => (
              <ChatBubble message={chatLog} />
            ))}
          </Suspense>
          {receivedChatLogs.map((chatLog) => (
            <ChatBubble message={chatLog} />
          ))}
        </div>
        <ChatInputPanel onSend={(str) => handleSend(str)} />
      </div>
    </FullScreenContainer>
  );
}
