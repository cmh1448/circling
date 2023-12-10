import { useMutation, useQuery, useQueryClient } from "react-query";
import CategoryItem from "../components/CategoryItem";
import api from "@/api";
import Suspense from "@/components/suspense/Suspense";
import Fallback from "@/components/fallback/fallback";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import Skeleton from "@/components/base/Skeleton";
import { useState } from "react";
import SlideDlialog from "@/components/dialog/SlideDialog";
import Input from "@/components/base/Input";
import { Category } from "@/models/Board";
import Spinner from "@/components/base/Spinner";
import { updateCategory } from "@/api/board";

interface CategoryManagePanelProps {
  circleId: number;
}

export default function CategoryManagePanel(props: CategoryManagePanelProps) {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery(
    ["fetchCategories", props.circleId],
    () => api.board.fetchCategoriesByCircleId(props.circleId)
  );

  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [currentEditCategory, setCurrentEditCategory] =
    useState<Category | null>(null);

  const [editCategoryName, setEditCategoryName] = useState("");
  const [addCategoryName, setAddCategoryName] = useState("");

  const handleEditCategory = (category: Category) => {
    setEditCategoryDialogOpen(true);
    setCurrentEditCategory(category);
    setEditCategoryName(category.title);
  };

  const { mutate: editCategory, isLoading: editLoading } = useMutation(
    (categoryId: number) =>
      api.board.updateCategory(props.circleId, categoryId, {
        title: editCategoryName,
      }),
    {
      onSuccess: () => {
        setEditCategoryDialogOpen(false);
        queryClient.invalidateQueries(["fetchCategories", props.circleId]);
      },
    }
  );

  const { mutate: createCategory, isLoading: createLoading } = useMutation(
    (title: string) => api.board.createCategory(props.circleId, { title }),
    {
      onSuccess: () => {
        setAddCategoryDialogOpen(false);
        queryClient.invalidateQueries(["fetchCategories", props.circleId]);
      },
    }
  );

  return (
    <div>
      <div className="text-2xl font-bold flex justify-between">
        게시판 관리
        <Button
          sizeType="small"
          variant={"third"}
          onClick={() => setAddCategoryDialogOpen(true)}
        >
          <Icon icon="add" />
        </Button>
      </div>
      <div className="flex flex-col">
        <Suspense
          isLoading={isLoading}
          fallback={
            <>
              {[...Array(5)].map(() => (
                <Skeleton className="w-full h-20 mt-1 rounded" />
              ))}
            </>
          }
        >
          <Fallback when={categories?.length === 0} message="게시판이 없어요">
            <div className="flex flex-col gap-2 mt-4">
              {categories?.map((it, index) => (
                <CategoryItem
                  category={it}
                  order={index + 1}
                  onEdit={() => handleEditCategory(it)}
                />
              ))}
            </div>
          </Fallback>
        </Suspense>
      </div>
      <SlideDlialog
        opened={addCategoryDialogOpen}
        onClosed={() => setAddCategoryDialogOpen(false)}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-2xl font-bold">게시판 추가</span>
            <div className="flex-1" />
            <span className="flex gap-2">
              <Button
                variant="third"
                onClick={() => setAddCategoryDialogOpen(false)}
              >
                취소
              </Button>
            </span>
          </div>
          <div className="mt-4">
            <div>
              <span className="text-gray-500">게시판 이름</span>
              <Input
                placeholder="열린 게시판"
                onInput={(str) => setAddCategoryName(str)}
              />
            </div>
          </div>
          <Button
            className="mt-4 h-10"
            onClick={() => createCategory(addCategoryName)}
          >
            <Suspense
              isLoading={createLoading}
              fallback={<Spinner size="16px" />}
            >
              확인
            </Suspense>
          </Button>
        </div>
      </SlideDlialog>
      <SlideDlialog
        opened={editCategoryDialogOpen}
        onClosed={() => setEditCategoryDialogOpen(false)}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-2xl font-bold">게시판 수정</span>
            <div className="flex-1" />
            <span className="flex gap-2">
              <Button
                variant="third"
                onClick={() => setEditCategoryDialogOpen(false)}
              >
                취소
              </Button>
            </span>
          </div>
          <div className="mt-4">
            <div>
              <span className="text-gray-500">게시판 이름</span>
              <Input
                placeholder="열린 게시판"
                value={editCategoryName}
                onInput={(str) => setEditCategoryName(str)}
              />
            </div>
          </div>
          <Button
            className="mt-4 h-10"
            onClick={() => editCategory(currentEditCategory.id)}
          >
            <Suspense
              isLoading={editLoading}
              fallback={<Spinner size="16px" />}
            >
              <Icon icon="edit" />
              수정
            </Suspense>
          </Button>
        </div>
      </SlideDlialog>
    </div>
  );
}
