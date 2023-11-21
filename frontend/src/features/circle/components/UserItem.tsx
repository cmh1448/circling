import api from "@/api";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import Spinner from "@/components/base/Spinner";
import Suspense from "@/components/suspense/Suspense";
import { Circle } from "@/models/Circle";
import { User } from "@/models/User";
import { useMutation, useQueryClient } from "react-query";

interface UserItemProps {
  user: User;
  circleId: number;

  deletable?: boolean;
}

export default function UserItem({
  user,
  deletable = false,
  circleId,
}: UserItemProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteMember, isLoading } = useMutation(
    () => api.circle.deleteMember(circleId, user.email),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "fetchMembersByCircleId",
          circleId.toString(),
        ]);
      },
    }
  );

  return (
    <div className="w-full p-2 bg-gray-200 rounded-lg flex items-center">
      <span className="text-lg flex items-center gap-1 text-gray-700">
        <Icon icon="person" fill />
        {user.lastName + user.firstName}
      </span>
      <div className="flex-1" />
      {deletable ? (
        <Button
          className="w-10 h-10 bg-red-500 hover:bg-red-600"
          onClick={() => deleteMember()}
        >
          <Suspense isLoading={isLoading} fallback={<Spinner size="20px" />}>
            <Icon icon="close" />
          </Suspense>
        </Button>
      ) : null}
    </div>
  );
}
