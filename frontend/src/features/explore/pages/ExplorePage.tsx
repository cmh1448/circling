import PageContainer from "@/components/pages/PageContainer";
import ExplorerCircleItem from "../components/ExplorerCircleItem";
import { Circle } from "@/models/Circle";
import Input from "@/components/base/Input";
import { useQuery } from "react-query";
import api from "@/api";
import Skeleton from "@/components/base/Skeleton";
import { useMemo, useState } from "react";
import Fallback from "@/components/fallback/fallback";
import { useNotFoundQuery } from "@/hooks/apiHook";

export default function ExplorePage() {
  /* Constants & Variables */
  const [searchKeyword, setSearchKeyword] = useState("");

  /* Server Side */
  const { data: circles, isLoading } = useQuery(["fetchAllCircles"], () =>
    api.circle.fetchAllCircleList()
  );

  const { data: followingCircles, isLoading: followingLoading } = useQuery(
    ["fetchFollowingCircles"],
    () => api.circle.fetchFollowingCircles()
  );

  const { data: memberedCircle, isLoading: memberedLoading } = useNotFoundQuery(
    ["fetchMyMemberedCircle"],
    () => api.circle.fetchMyMemberedCircle()
  );

  const filteredCircles = useMemo(
    () =>
      searchKeyword === ""
        ? circles
        : circles?.filter((it) => it.name.includes(searchKeyword)),
    [searchKeyword, circles]
  );

  /* Functions */
  const getCircleItemList = (circles: Circle[] | undefined) => {
    return (
      <Fallback when={circles?.length === 0} message="동아리를 찾을 수 없어요">
        {circles?.map((it) => (
          <ExplorerCircleItem
            membered={memberedCircle?.circle.id === it.id}
            circle={it}
            following={followingCircles?.some((f) => f.circle.id === it.id)!}
          />
        ))}
      </Fallback>
    );
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-1 md:flex-row">
        <span className="text-2xl font-bold">우리학교 동아리 목록</span>
        <div className="flex-1" />
        <Input
          icon="search"
          placeholder="이름으로 검색"
          onInput={(val) => setSearchKeyword(val)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {isLoading || followingLoading || memberedLoading
          ? [...Array(3)].map(() => (
              <Skeleton className=" w-full h-32 rounded-lg" />
            ))
          : getCircleItemList(filteredCircles)}
      </div>
    </PageContainer>
  );
}
