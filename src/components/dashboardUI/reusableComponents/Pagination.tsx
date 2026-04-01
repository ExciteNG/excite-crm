"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";

export default function PaginationComponent() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="">
        <span className="">1</span>
        &#47;
        <span>10</span>
      </div>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => {}} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => {}} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
