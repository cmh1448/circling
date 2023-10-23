import { Category } from "@/models/Board";
import TabItem from "./TabItem";
import { useEffect, useState } from "react";

export interface BoardTabProps {
  categories: Category[];

  selectedChange?: (changedTo: Category | undefined) => void;
  selectedDefault?: Category;
}

export default function BoardTab(props: BoardTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(props.selectedDefault);

  useEffect(() => {
    props.selectedChange && props.selectedChange(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex gap-2 flex-wrap">
      <TabItem
        title="전체보기"
        primary
        selected={selectedCategory === undefined}
        onClick={() => setSelectedCategory(undefined)}
      />
      {props.categories.map((it) => (
        <TabItem
          title={it.title}
          onClick={() => setSelectedCategory(it)}
          selected={selectedCategory?.id === it.id}
          key={it.id}
        />
      ))}
    </div>
  );
}
