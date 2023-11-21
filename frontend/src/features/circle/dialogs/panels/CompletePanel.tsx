import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import Spinner from "@/components/base/Spinner";
import { Circle } from "@/models/Circle";
import { useMutation } from "react-query";

interface CompletePanelProps {
  circle: Circle;
  isLoading: boolean;

  onClose: () => void;
}

export default function CompletePanel(props: CompletePanelProps) {
  return (
    <>
      {props.isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center mt-10 gap-2">
          <Spinner size="30px" color="black" />
          <span className="text-2xl font-bold">등록 중....</span>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center mt-10 gap-2">
          <Icon icon="check" className="text-4xl text-green-500" />
          <span className="text-2xl font-bold text-green-500">등록 완료!</span>
          <div>
            <Button
              onClick={props.onClose}
              className="!bg-green-500 hover:!bg-green-600"
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
