import { Page, Pageable } from "@/models/Pagination";
import PaginationButton from "./PaginationButton";
import Icon from "../base/Icon";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: Page<Object>;
  range?: number;

  onPageMove?: (newPageable: Pageable) => void;
}

export default function Pagination({
  currentPage,
  onPageMove,
  range = 4,
}: PaginationProps) {
  const pages = useMemo(() => {
    let result = [];
    if (currentPage.totalPages < range) {
      for (let i = 1; i <= currentPage.totalPages; i++) result.push(i);
    } else {
      const leftLength = Math.floor(range / 2) - 1;
      const rightLength = range - leftLength - 1;
      const current = currentPage.number + 1;
      // console.log(leftLength, rightLength, current);

      result = [current];
      let leftAddCount = 0;
      let rightAddCount = 0;

      for (let i = 1; i <= leftLength; i++) {
        if (current - i < 1) {
          rightAddCount++;
          continue;
        }
        result = [current - i, ...result];
      }
      for (let i = 1; i <= rightLength; i++) {
        if (current + i > currentPage.totalPages) {
          leftAddCount++;
          continue;
        }
        result = [...result, current + i];
      }

      let initLeft = result[0];
      for (let i = 1; i <= leftAddCount; i++) {
        result = [initLeft - i, ...result];
      }

      let initRight = result[result.length - 1];
      for (let i = 1; i <= rightAddCount; i++) {
        result = [...result, initRight + i];
      }
    }

    return result;
  }, [currentPage]);

  return (
    <div className="flex gap-2 mt-4 w-full justify-center">
      {!currentPage.first ? (
        <PaginationButton
          onClick={() =>
            onPageMove(
              Pageable.of(currentPage.pageable.pageSize, currentPage.number)
            )
          }
        >
          <Icon icon="arrow_left_alt" />
        </PaginationButton>
      ) : null}

      {pages.map((it, idx) => (
        <PaginationButton
          key={it}
          isEnabled={it === currentPage.pageable.pageNumber + 1}
          onClick={() =>
            onPageMove(Pageable.of(currentPage.pageable.pageSize, it))
          }
        >
          {it}
        </PaginationButton>
      ))}
      {!currentPage.last ? (
        <PaginationButton
          onClick={() =>
            onPageMove(
              Pageable.of(currentPage.pageable.pageSize, currentPage.number + 2)
            )
          }
        >
          <Icon icon="arrow_right_alt" />
        </PaginationButton>
      ) : null}
    </div>
  );
}
