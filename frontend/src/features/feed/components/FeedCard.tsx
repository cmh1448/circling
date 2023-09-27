import Card from "@/components/base/Card";
import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";

export interface FeedCardProps {}

export default function FeedCard(props: FeedCardProps) {
  return (
    <Card className="flex flex-col gap-4 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
      <div className="flex">
        <span className="flex gap-2 items-center">
          <span className="text-lg font-bold">락커스타</span>
          <Divider variant="dot" />
          <span className="text-gray-500">공지사항</span>
        </span>
      </div>
      <div className="">
        <p>네 안녕하세요 오늘의 공지사항입니다.</p>
        <p>...위와 같은 원칙을 잘 지켜주시기 바랍니다.</p>
        <p>이상입니다.</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-gray-500">
          <span className="flex items-center">홍길동</span>
          10분전
        </div>
        <div className="flex items-center text-gray-500 gap-1  rounded">
          <Icon icon="comment" className="text-[18px]" fill />9
        </div>
      </div>
    </Card>
  );
}
