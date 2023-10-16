import { Circle } from "@/models/Circle";
import CircleLogo from "./CircleLogo";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import api from "@/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "@/components/base/Spinner";

export interface ExplorerCircleItem {
  circle: Circle;

  following: boolean;
}

const buttonStyles = {
  follow: "",
  unfollow: "bg-gray-400 hover:bg-gray-500",
};

export default function ExplorerCircleItem(props: ExplorerCircleItem) {
  const queryClient = useQueryClient();

  const { mutate: follow, isLoading: isFollowing } = useMutation({
    mutationFn: () => api.circle.followCircle(props.circle.id),
    onSuccess: () => queryClient.invalidateQueries(["fetchFollowingCircles"]),
  });

  const { mutate: unfollow, isLoading: isUnFollowing } = useMutation({
    mutationFn: () => api.circle.unfollowCircle(props.circle.id),
    onSuccess: () => queryClient.invalidateQueries(["fetchFollowingCircles"]),
  });

  const handleClick = () => {
    if (props.following) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <div className=" bg-gray-100 rounded-lg p-4 md:flex md:justify-between">
      <div className="flex items-center gap-4">
        <CircleLogo />
        <div className="flex flex-col">
          <span className=" text-blue-500 text-lg font-bold">
            {props.circle.name}
          </span>
          <div className="flex flex-col">
            <span className="text-gray-500">{props.circle.description}</span>
            <span className=" text-sm text-gray-400 flex items-center cursor-pointer select-none">
              더 알아보기
              <Icon icon="arrow_right" />
            </span>
          </div>
        </div>
      </div>
      <Button
        className={`w-full mt-3 md:w-40 md:h-20 ${
          props.following ? buttonStyles.unfollow : buttonStyles.follow
        }`}
        onClick={handleClick}
      >
        {isFollowing || isUnFollowing ? (
          <Spinner size="20px" />
        ) : props.following ? (
          <div className="flex gap-1 items-center">
            <Icon icon="check" />
            팔로우됨
          </div>
        ) : (
          "팔로우"
        )}
      </Button>
    </div>
  );
}
