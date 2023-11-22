import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import TextEditor from "@/components/editor/TextEditor";
import { useEffect, useState } from "react";

interface WriteFormPanelProps {
  onBack: () => void;
  onSubmit: (content: string) => void;

  clearTrigger?: boolean;
}

export default function WriteFormPanel(props: WriteFormPanelProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.clearTrigger === true) {
      setText("");
    }
  });

  return (
    <div>
      <div className="flex">
        <span className="text-2xl font-bold">신청서 작성</span>
        <div className="flex-1" />
        <div className="flex gap-2">
          <Button variant="third" onClick={() => props.onBack()}>
            <Icon icon="arrow_back" />
            뒤로가기
          </Button>
          <Button onClick={() => props.onSubmit(text)}>
            <Icon icon="check" />
            제출
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <TextEditor onChange={(str) => setText(str)} value={text} />
      </div>
    </div>
  );
}
