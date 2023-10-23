import ReactQuill from "react-quill";
import "./theme.css";
import { useEffect } from "react";

interface TextEditorProps {
  onChange?: (val: string) => void;

  value?: string;
}

export default function TextEditor({ onChange, value = "" }: TextEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      onChange={(value: string) => onChange && onChange(value)}
    />
  );
}
