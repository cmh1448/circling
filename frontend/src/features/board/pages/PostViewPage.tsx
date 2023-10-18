import Button from "@/components/base/Button";
import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import { useNavigate } from "react-router-dom";

export default function PostViewPage() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <PageContainer>
      <div className="flex mb-2">
        <Button variant={"primary"} onClick={handleGoBack}>
          <Icon icon="arrow_back" />
          뒤로가기
        </Button>
        <div className="flex-1" />
        <Button variant={"third"}>
          <Icon icon="link" />
          링크 복사
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-4 bg-gray-100 rounded-lg">
          <span className="text-3xl text-blue-500">글 제목입니다.</span>
          <div className="w-full h-[2px] bg-gray-200 rounded-full my-2" />
          <div className="flex items-center gap-2 text-gray-400">
            천명현 <Divider variant="dot" className="!bg-gray-400" /> 10분전
          </div>
        </div>
        <div className="px-4 py-8 bg-gray-100 rounded-lg">
          여기에 게시물 내용이 보여집니다.
        </div>
      </div>
      <div>
        댓글
      </div>

    </PageContainer>
  );
}
