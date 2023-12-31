import api from "@/api";
import { useQuery } from "react-query";
import CircleItem from "../../components/CircleItem";
import RegisterCircleItem from "../components/RegisterCircleItem";
import { Circle } from "@/models/Circle";
import Suspense from "@/components/suspense/Suspense";
import Skeleton from "@/components/base/Skeleton";
import { useNotFoundQuery } from "@/hooks/apiHook";

interface SelectCirclePanelProps {
  onCircleSelect: (circle: Circle) => void;
}

export default function SelectCirclePanel(props: SelectCirclePanelProps) {
  const { data: circles, isLoading } = useNotFoundQuery(
    ["fetchCircles"],
    () => api.circle.fetchAllCircleList(),
  );

  return (
    <div>
      <div>
        <div className="text-2xl font-bold mb-4">동아리 선택</div>
      </div>
      <div className="flex flex-col gap-3 apply-scrollbar">
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
          {circles?.map((it) => (
            <RegisterCircleItem
              circle={it}
              onRegister={() => props.onCircleSelect(it)}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
