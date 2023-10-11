import PageContainer from "@/components/pages/PageContainer";
import CircleItem from "../components/CircleItem";

export default function MyCirclesPage() {
  return (
    <PageContainer>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center">
        {/* <Icon icon="groups" /> */}
        내가 회원인 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {[1].map(() => {
          return <CircleItem />;
        })}
      </div>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center mt-4">
        {/* <Icon icon="groups" /> */}
        내가 팔로우한 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {[1, 2, 3, 4, 5].map(() => {
          return <CircleItem />;
        })}
      </div>
    </PageContainer>
  );
}
