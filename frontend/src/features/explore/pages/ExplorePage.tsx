import PageContainer from "@/components/pages/PageContainer";
import ExplorerCircleItem from "../components/ExplorerCircleItem";
import { Circle } from "@/models/Circle";
import Input from "@/components/base/Input";

export default function ExplorePage() {
  const dummyData: Circle[] = [
    {
      name: "프로그램인",
      description: "프로그래밍을 공부하는 사람들의 모임입니다.",
      memberCount: 4,
    },
    {
      name: "락커스타",
      description: "Rock and Roll!! 락을 즐기는 사람들의 모임",
      memberCount: 6,
    },
    {
      name: "맛집탐방",
      description: "맛집탐방 동아리 입니다.",
      memberCount: 3,
    },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col gap-1 md:flex-row">
        <span className="text-2xl font-bold">우리학교 동아리 목록</span>
        <div className="flex-1" />
        <Input icon="search" placeholder="이름으로 검색" />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {dummyData.map((it) => (
          <ExplorerCircleItem circle={it} />
        ))}
      </div>
    </PageContainer>
  );
}
