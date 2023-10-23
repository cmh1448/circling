import "./textview.css";

interface TextViewerProps {
  html: string;
}

export default function TextViewer(props: TextViewerProps) {
  return (
    <div
      className="viewer"
      dangerouslySetInnerHTML={{ __html: props.html }}
    ></div>
  );
}
