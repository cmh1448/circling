interface TitleInputProps {
  onInput?: (val: string) => void;

  className?: string;
}

export default function TitleInput(props: TitleInputProps) {
  return (
    <div className={`p-2  ${props.className}`}>
      <input
        placeholder={`제목을 입력하세요`}
        className={`bg-transparent w-full h-full text-gray-900 placeholder:text-gray-300`}
        onInput={(e) =>
          props.onInput ? props.onInput(e.currentTarget.value) : null
        }
      />
      <div className={`w-full h-px bg-gray-300 mt-2`} />
    </div>
  );
}
