import { useMemo, useState } from "react";
import { useQuery } from "react-query";

export function useNotFoundQuery<DataType>(
  queryKey: any[],
  queryFn: () => Promise<DataType>
) {
  const [resultData, setResultData] = useState<DataType | undefined>(undefined);
  const [lastError, setLastError] = useState<any>(undefined);

  const query = useQuery(queryKey, queryFn, {
    onError: (error: any) => {
      if (error?.codeName === "GLOBAL_NOT_FOUND") setResultData(undefined);
      setLastError(error);
    },
    onSuccess(data) {
      setResultData(data);
      setLastError(undefined);
    },
    retry: (failureCount, error: any) => {
      if (error?.codeName === "GLOBAL_NOT_FOUND") return false;
      return failureCount < 3;
    },
  });

  const isLoading = useMemo(() => {
    if (query.isFetching && resultData === undefined) {
      console.log(
        ["debug: "],
        queryKey,
        lastError?.codeName === "GLOBAL_NOT_FOUND"
      );
      if (lastError?.codeName === "GLOBAL_NOT_FOUND") return false;
      return true;
    }
    return false;
  }, [query.isFetching, resultData]);

  return {
    ...query,
    data: resultData,
    isLoading: isLoading,
  } as const;
}
useQuery;
