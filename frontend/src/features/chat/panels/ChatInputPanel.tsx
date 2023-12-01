import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import Input from "@/components/base/Input";
import { useState } from "react";

interface ChatInputPanelProps {
  onSend: (message: string) => void;
}

export default function ChatInputPanel(props: ChatInputPanelProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    props.onSend && props.onSend(message);
    setMessage("");
  };

  return (
    <div className="p-2 px-0 flex gap-2">
      <Input
        placeholder="메세지를 입력하세요..."
        className="flex-1"
        onEntered={() => handleSend()}
        onInput={(str) => setMessage(str)}
        value={message}
      />
      <Button onClick={handleSend}>
        <Icon icon="send" className="text-white text-2xl" fill />
      </Button>
    </div>
  );
}
