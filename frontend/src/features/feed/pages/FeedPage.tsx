import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import { authStore } from "@/stores/authStore";
import { useStore } from "zustand";
import CircleItem from "../components/CircleItem";
import { Circle } from "@/models/Circle";
import Section from "../components/Section";
import FeedCard from "../components/FeedCard";

export default function FeedPage() {
  const authContext = useStore(authStore);

  const dummyCircles: Circle[] = [
    {
      name: "댄스타임",
      description: "힙합 댄스 동아리",
      memberCount: 12,
    },
    {
      name: "코드팩토리",
      description: "프로그래밍 동아리",
      memberCount: 8,
    },
    {
      name: "밴딩",
      description: "명지대 밴드 동아리",
      memberCount: 11,
    },
  ];
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        {[...Array(10).keys()].map(() => (
          <FeedCard />
        ))}
      </div>
    </PageContainer>
  );
}
