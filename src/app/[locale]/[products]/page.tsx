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
import { Companies, Filters } from "@/section";
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
        <h1 className=" font-pretendard font-extrabold text-[56px] leading-[64px] tracking-[-0.5%] md:text-5xl mb-6">
          {t(`titles.${products}`)}
        </h1>
      </div>

      <div className="mb-8 container md:p-0">
        <Companies />
        <Filters />
      </div>
      <div className="container gap-4 flex flex-wrap mb-8 md:gap-3.5 md:grid md:grid-cols-2">
        {!isFetching ? (
          [...Array(6)].map((_, i) => <SkeletonCard fullscreen key={i} />)
        ) : data?.data?.data?.length === 0 ? (
          <div className="col-span-4 flex flex-col items-center justify-center py-16">
            <Inbox className="w-20 h-20 text-gray-300 mb-4" />
          </div>
        ) : (
          data?.data?.data?.map((item, index) => (
            <ProductCard
              key={index}
              data={item}
              onClick={handleProductClick}
              className="w-[177.33px] md:!w-full"
            />
          ))
        )}
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
