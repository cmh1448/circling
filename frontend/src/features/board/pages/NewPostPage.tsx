import TextEditor from "@/components/editor/TextEditor";
import PageContainer from "@components/pages/PageContainer.tsx";
import TitleInput from "@features/board/components/TitleInput.tsx";
import Button from "@components/base/Button.tsx";
import Icon from "@components/base/Icon.tsx";

export default function NewPostPage() {
  return (
    <PageContainer>
      <TitleInput className={`text-2xl font-bold`} />
      <TextEditor />
      <div className={`flex flex-col mt-2`}>
        <Button sizeType={"big"} className={"gap-1 text-xl w-full"}>
          <Icon icon={`edit`} />
          업로드
        </Button>
      </div>
    </PageContainer>
  );
}
