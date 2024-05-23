"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function CustomPagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const renderPaginationLinks = () => {
    const links: JSX.Element[] = [];

    // Determine the range of pages to display
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(pageCount, start + 2);

    // Render pagination links
    for (let i = start; i <= end; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => changePage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Render ellipsis if necessary
    if (start > 1) {
      links.unshift(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    if (end < pageCount) {
      links.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <div className="flex justify-end items-end my-4">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage === 1) {
                    return;
                  } else {
                    changePage(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            {renderPaginationLinks()}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage === pageCount) {
                    return;
                  } else {
                    changePage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default CustomPagination;
