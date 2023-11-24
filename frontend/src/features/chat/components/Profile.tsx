import Icon from "@/components/base/Icon";

interface ProfileProps {
  isMine?: boolean;
}

export default function Profile(props: ProfileProps) {
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ${
        props.isMine ? "bg-blue-100" : ""
      }`}
    >
      <Icon icon="person" className="text-gray-500" fill />
    </div>
  );
}
