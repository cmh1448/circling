import TextEditor from "@/components/editor/TextEditor";
import PageContainer from "@components/pages/PageContainer.tsx";
import TitleInput from "@features/board/components/TitleInput.tsx";
import Button from "@components/base/Button.tsx";
import Icon from "@components/base/Icon.tsx";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import api from "@/api";
import DropDown from "@/components/base/DropDown";
import { useNavigate, useParams } from "react-router-dom";
import { DropDownItem } from "@/models/DropDown";
import { Category } from "@/models/Board";
import Suspense from "@/components/suspense/Suspense";
import Spinner from "@/components/base/Spinner";

export default function NewPostPage() {
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");
  const { circleId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<
    DropDownItem | undefined
  >(undefined);

  const navigate = useNavigate();

  const { data: categories, isLoading: isCategoryLoading } = useQuery(
    ["fetchCategoriesByCircle", circleId],
    () => api.board.fetchCategoriesByCircleId(Number(circleId))
  );

  const categoryDropdown = useMemo(() => {
    return (
      categories?.map(
        (it) =>
          ({
            display: <span>{it.title}</span>,
            item: it,
          } as DropDownItem)
      ) ?? []
    );
  }, [categories]);

  const {
    mutate: uploadPost,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: () =>
      api.board.uploadPost((selectedCategory?.item as Category).id, {
        title: title,
        content: editorValue,
      }),
    onSuccess: (res) => {
      navigate(`/circles/board/posts/${res.id}`);
    },
  });

  const handleUpload = () => {
    uploadPost();
  };

  return (
    <PageContainer>
      <div>
        <DropDown
          className="w-full md:w-fit"
          items={categoryDropdown}
          onItemClick={setSelectedCategory}
          selected={selectedCategory}
        />
      </div>
      <TitleInput className={`text-2xl font-bold`} onInput={setTitle} />
      <TextEditor onChange={(val) => setEditorValue(val)} value={editorValue} />
      <div></div>
      <div className={`flex flex-col mt-2`}>
        <Button
          sizeType={"big"}
          className={"gap-1 text-xl w-full h-14"}
          onClick={handleUpload}
        >
          <Suspense isLoading={isLoading} fallback={<Spinner size="20px" />}>
            <Icon icon={`edit`} />
            업로드
          </Suspense>
        </Button>
      </div>
    </PageContainer>
  );
}
