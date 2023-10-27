import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import Spinner from "@/components/base/Spinner";
import TextEditor from "@/components/editor/TextEditor";
import Suspense from "@/components/suspense/Suspense";
import { useState } from "react";

interface CommentInputProps {
  text?: string;

  onUpload?: (value: string) => void;
  isUploading?: boolean;
}

export default function CommentInput({
  text = "확인",
  onUpload,
  isUploading = false,
}: CommentInputProps) {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (!isUploading) {
      onUpload && onUpload(value);
      setValue("");
    }
  };

  return (
    <div>
      <TextEditor height={100} onChange={setValue} value={value} />
      <Button className="w-full gap-2 h-10" onClick={handleClick}>
        <Suspense isLoading={isUploading} fallback={<Spinner size="20px" />}>
          <Icon icon="check" />
          {text}
        </Suspense>
      </Button>
    </div>
  );
}
