"use client";

import {
  Pagination,
  ProductCard,
  ProductDialogContent,
  SkeletonCard,
} from "@/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDiscounts } from "@/hooks/useDiscount";
import { useResponsiveDialog } from "@/hooks/useResponsiveDialog";
import { Filters } from "@/section";
import useFilter from "@/store/slices/usefilter";
import { buildApiParams } from "@/utils/data";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import { Inbox } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const locale = params?.locale || "uz";
  const { products } = params as { locale: string; products: string };
  const { t, i18n } = useTranslation();

  const { clickedFilters, clearAllFilters } = useFilter();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = 8;

  const { data, isFetching } = useDiscounts({
    ...buildApiParams(clickedFilters),
    page,
    limit,
  });
  const [responsiveDialog, showResponsiveDialog] = useResponsiveDialog();

  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      ),
    });
  };


  return (
    <>
      <div className="container ">
        <Breadcrumb className=" mt-6 mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}`}>{t('pages.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {t(`titles.${products}`)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className=" font-pretendard font-extrabold text-[56px] leading-[64px] tracking-[-0.5%] md:text-5xl mb-8">
          {t(`titles.${products}`)}
        </h1>
      </div>

      <div className="mb-8 container md:p-0 md:pl-4">
        <Filters />
      </div>
      <div className="container grid grid-cols-4 gap-6 md:grid-cols-1 mb-8">
        <Suspense fallback={
          [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
        }>
          {!isFetching && data?.data?.data?.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-16">
              <Inbox className="w-20 h-20 text-gray-300 mb-4" />
            </div>
          ) : !isFetching
            ? data?.data?.data?.map((item, index) => (
              <ProductCard
                onClick={handleProductClick}
                key={index}
                data={item}
                className="md:!w-full"
              />
            ))
            : null}
        </Suspense>
      </div>

      {data?.data && data.data.total > data.data.limit && (
        <div className="mb-8">
          <Pagination
            limit={data.data.limit}
            page={data.data.page}
            total={data.data.total}
          />
        </div>
      )}
      {responsiveDialog}
    </>
  );
}
