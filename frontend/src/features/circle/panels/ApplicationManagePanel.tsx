import api from "@/api";
import Button from "@/components/base/Button";
import Card from "@/components/base/Card";
import Skeleton from "@/components/base/Skeleton";
import TextViewer from "@/components/editor/TextViewer";
import Suspense from "@/components/suspense/Suspense";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ApproveItem from "../components/ApproveItem";
import Fallback from "@/components/fallback/fallback";
import { useEffect } from "react";

interface ApplicationManagePanelProps {
  circleId: number;
}

export default function ApplicationManagePanel(
  props: ApplicationManagePanelProps
) {
  const { data: toApproves, isLoading } = useQuery(
    ["toApproves", props.circleId],
    () => api.circle.fetchToApprovesByCircleId(props.circleId)
  );

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">가입 신청 목록</span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
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
          <Fallback
            when={toApproves?.length === 0}
            message="가입 신청이 없어요"
          >
            {toApproves?.map((it) => (
              <ApproveItem register={it} />
            ))}
          </Fallback>
        </Suspense>
      </div>
    </div>
  );
}
