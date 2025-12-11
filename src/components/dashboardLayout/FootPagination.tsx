'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,PaginationEllipsis } from '../ui/pagination';

const FootPagination = () => {
  const pathName = usePathname();
  //The display condition
  const displayCondition = pathName === '/dashboard/newsletter' ||
    pathName === "/dashboard/setting";
  return (
    <div className={`h-full ${displayCondition && 'hidden'}`}>
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