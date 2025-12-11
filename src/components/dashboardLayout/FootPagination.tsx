import React from 'react';
import { Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,PaginationEllipsis } from '../ui/pagination';

const FootPagination = () => {
  return (
    <div className='h-full'>
      <Pagination className=''>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default FootPagination