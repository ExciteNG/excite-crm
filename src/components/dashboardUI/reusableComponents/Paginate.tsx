"use client";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";


export default function Paginate({ currPage, totalPages,setPage }: {
  currPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  

  const handlePrev = () => {
    if (currPage > 1) {
      setPage(currPage - 1);
    }
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      setPage(currPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-primary/10 px-10 py-2">
      <div className="text-foreground">
        Page
        <span className="text-primary">{` ${currPage} `}</span>
        out of
        <span className="text-primary">{` ${totalPages} `}</span>
      </div>

      <Pagination className={`mx-0 w-auto ${totalPages===1?'hidden':'block'}`}>
        <PaginationContent>
          <PaginationItem
            className={`cursor-pointer hover:text-primary ${
              currPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>

          <PaginationItem
            className={`cursor-pointer hover:text-primary ${
              currPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}