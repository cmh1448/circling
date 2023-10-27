import ReactQuill from "react-quill";
import "./theme.css";
import { useEffect } from "react";

interface TextEditorProps {
  onChange?: (val: string) => void;
  value?: string;
  height?: number;
}

export default function TextEditor({
  onChange,
  height,
  value,
}: TextEditorProps) {
  return (
    <div className={`${height ? `mb-[10px] h-[${height}px]` : ""}`}>
      <ReactQuill
        value={value}
        className="h-full"
        theme="snow"
        onChange={(value: string) => onChange && onChange(value)}
      />
    </div>
  );
}
