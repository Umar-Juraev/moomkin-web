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

export default function ProductPage() {
  const params = useParams();
  const { products } = params as { locale: string; products: string };
  const { t } = useTranslation();

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

  console.log(data?.data.limit, data?.data.page, data?.data.total);

  return (
    <div className="container">
      <Breadcrumb className="mt-6 mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('pages.home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage> {t(`titles.${products}`)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-pretendard font-extrabold text-[56px] leading-[64px] tracking-[-0.5%] mb-8">
        {t(`titles.${products}`)}
      </h1>

      <div className="mb-8">
        <Filters />
      </div>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-1 mb-8">
        {!isFetching
          ? data?.data?.data?.map((item, index) => (
              <ProductCard
                onClick={handleProductClick}
                key={index}
                data={item}
                className="md:!w-full"
              />
            ))
          : [...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
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
    </div>
  );
}
