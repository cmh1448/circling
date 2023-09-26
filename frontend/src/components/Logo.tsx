export interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function Logo(props: LogoProps) {
  const sizeStyle = () => {
    if (props.size === "small") return "text-lg";
    if (props.size === "medium") return "text-2xl";
    if (props.size === "large") return "text-4xl";
  };

  return (
    <div className={`font-extrabold ${sizeStyle()}`}>
      <span className="text-gray-700 ">CIRCL</span>
      <span className="text-blue-500">iNG</span>
    </div>
  );
}
