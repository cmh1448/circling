import api from "@/api";
import Button from "@/components/base/Button";
import Card from "@/components/base/Card";
import Icon from "@/components/base/Icon";
import Spinner from "@/components/base/Spinner";
import TextViewer from "@/components/editor/TextViewer";
import Suspense from "@/components/suspense/Suspense";
import { Register } from "@/models/Circle";
import { useMutation, useQueryClient } from "react-query";

interface ApproveItemProps {
  register: Register;
}

export default function ApproveItem({ register }: ApproveItemProps) {
  const queryClient = useQueryClient();

  const { mutate: accept, isLoading } = useMutation(
    () => api.circle.approveRegister(register.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["toApproves"]);
      },
    }
  );

  return (
    <Card className=" flex items-center">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <span className="text-xl flex items-center justify-center font-bold gap-2 text-blue-500">
            {register.circle.name}
          </span>
          <span className="text-gray-500">{register.createdBy.nickName}</span>
        </div>
        <TextViewer html={register.message} />
      </div>
      <div className="flex-1" />
      <Button className="gap-1 w-28 h-10" onClick={() => accept()}>
        <Suspense isLoading={isLoading} fallback={<Spinner size="20px" />}>
          <Icon icon="check" />
          가입 수락
        </Suspense>
      </Button>
    </Card>
  );
}
