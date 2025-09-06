"use client";

import { type ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
  totalCount: number;
  pageSize: number;
  page: number;
  pageSelect: React.Dispatch<React.SetStateAction<number>>;
}
export function PaginationWithLinks({ pageSize, totalCount, page, pageSelect }: PaginationWithLinksProps) {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={
                (page === i ? `bg-primary text-white` : `text-primary`) + ` cursor-pointer border border-primary`
              }
              onClick={() => pageSelect(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className={
              (page === 1 ? `bg-primary text-white` : `text-primary`) + ` cursor-pointer border border-primary`
            }
            onClick={() => pageSelect(1)}
            isActive={page === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={
                (page == i ? `bg-primary text-white` : `text-primary`) + ` cursor-pointer border border-primary`
              }
              key={i}
              onClick={() => pageSelect(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            className={
              page == totalPageCount
                ? `bg-primary text-white`
                : `text-primary` + ` cursor-pointer border border-primary`
            }
            onClick={() => pageSelect(totalPageCount)}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className={cn({ "md:justify-end": "" })}>
      <PaginationContent className="max-sm:gap-0">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
            className={
              (page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer  text-primary") +
              " border border-primary"
            }
            onClick={() => (page > 1 ? pageSelect(page - 1) : "")}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            aria-disabled={page === totalPageCount}
            tabIndex={page === totalPageCount ? -1 : undefined}
            className={
              (page === totalPageCount ? "pointer-events-none opacity-50" : "cursor-pointer text-primary") +
              " border border-primary"
            }
            onClick={() => (page < totalPageCount ? pageSelect(page + 1) : "")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
