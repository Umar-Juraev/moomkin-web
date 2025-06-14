"use client"
import { ProductCard, ProductDialogContent } from '@/components/shared'
import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation';
import { useDiscounts } from '@/hooks/useDiscount';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useResponsiveDialog } from '@/hooks/useResponsiveDialog';
import { buildApiParams } from '@/utils/data';
import useFilter from '@/store/slices/usefilter';
import { Filters } from '@/section';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('q') || '';

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { clickedFilters, clearAllFilters } = useFilter();

  const { data, isFetching } = useDiscounts({ ...buildApiParams(clickedFilters), search: searchQuery });
  const [responsiveDialog, showResponsiveDialog] =
    useResponsiveDialog();


  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      )
    });
  };
  return (
    <div className='animate-fade-in container'>
      <Breadcrumb className='mt-6 mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home page</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1
        className="font-pretendard font-extrabold text-[56px] leading-[64px] tracking-[-0.5%] mb-8"
      >
        `&quot;`{searchQuery}`&quot;`
      </h1>
      <div className='mb-8'>
      <Filters />
      </div>
      {!isFetching ? (
        <div className="animate-fade-in grid grid-cols-4 gap-6 md:grid-cols-1 mb-24">
          {data?.data?.data?.map((item, index) => (
            <ProductCard
              onClick={handleProductClick}
              key={index}
              data={item}
              className="md:!w-full"
            />
          ))}
        </div>
      ) : <div>...loading</div>}

      {responsiveDialog}
    </div>
  )
}