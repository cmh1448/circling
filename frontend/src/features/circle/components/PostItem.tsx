import Icon from "@/components/base/Icon";

export default function PostItem() {
  return (
    <div className="flex text-sm cursor-pointer text-gray-400 gap-2 items-center hover:bg-gray-200 active:scale-95 p-1 rounded-lg transition-all">
      <Icon icon="article" className="text-sm" />
      <span className=" font-semibold flex items-center gap-3">
        저희 동아리 이번 대회 관련해서 공지사항입니다. 필독!
        <span className="flex items-center gap-[2px]">
          <Icon icon="comment" className="text-sm" />4
        </span>
      </span>
      <span className="flex-1" />
      <span className="flex gap-1 items-center">
        <Icon icon="schedule" className="text-sm" />
        19:00
      </span>
    </div>
  );
}
