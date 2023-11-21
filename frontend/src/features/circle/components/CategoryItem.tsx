import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import { Category } from "@/models/Board";

interface CategoryItemProps {
  category: Category;
  order: number;

  onEdit?: () => void;
}

export default function CategoryItem(props: CategoryItemProps) {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg flex items-center"
      onClick={props.onEdit}
    >
      <div className=" text-2xl text-gray-300">#{props.order}</div>
      <div className="text-xl font-bold text-gray-700 w-full ml-4">
        {props.category.title}
      </div>
      <Button>
        <Icon icon="edit" />
      </Button>
    </div>
  );
}
