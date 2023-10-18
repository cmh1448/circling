import ReactQuill from "react-quill";
import "./theme.css";

interface TextEditorProps {
  onChange?: (val: string) => void;

  value?: string;
}

export default function TextEditor({ onChange, value = "" }: TextEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(value: string) => onChange && onChange(value)}
    />
  );
}
