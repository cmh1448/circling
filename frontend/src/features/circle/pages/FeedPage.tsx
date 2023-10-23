import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import { authStore } from "@/stores/authStore";
import { useStore } from "zustand";
import { Circle } from "@/models/Circle";
import FeedCard from "../components/FeedCard";
import { useQuery } from "react-query";
import api from "@/api";
import { Pageable } from "@/models/Pagination";

export default function FeedPage() {
  const authContext = useStore(authStore);

  const { data: feeds, isLoading } = useQuery(["fetchFeedPosts"], () =>
    api.board.fetchFeedPosts(Pageable.of(10, 1))
  );

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        {feeds?.content.map((it) => (
          <FeedCard key={it.id} post={it} />
        ))}
      </div>
    </PageContainer>
  );
}
