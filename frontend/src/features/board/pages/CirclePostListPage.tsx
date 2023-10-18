import BoardTab from "../components/BoardTab";
import PostListItem from "../components/PostListItem";
import { useNavigate } from "react-router-dom";
import ActionButton from "@/components/base/ActionButton";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";

export default function CirclePostListPage() {
  const navigate = useNavigate();
  const handleClickPost = (id: number) => {
    navigate(`/circles/board/posts/${id}`);
  };
  return (
    <PageContainer>
      <BoardTab
        categories={[
          {
            id: 1,
            title: "공지사항",
          },
          {
            id: 2,
            title: "활동 사진",
          },
          {
            id: 3,
            title: "열린 게시판",
          },
        ]}
      />
      <div className="mt-4 flex flex-col">
        {[...Array(20)].map((it) => (
          <PostListItem onClick={() => handleClickPost(1)} key={it} />
        ))}
      </div>
      <ActionButton>
        <Icon icon="edit" className="text-white text-4xl" />
      </ActionButton>
    </PageContainer>
  );
}
