"use client";
import {
  ProductCard,
  ProductDialogContent,
  SkeletonCard,
} from "@/components/shared";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useDiscounts } from "@/hooks/useDiscount";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useResponsiveDialog } from "@/hooks/useResponsiveDialog";
import { buildApiParams } from "@/utils/data";
import useFilter from "@/store/slices/usefilter";
import { Filters } from "@/section";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Inbox } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params?.locale || "uz";
  const { t, i18n } = useTranslation();


  const searchQuery = searchParams.get("q") || "";

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { clickedFilters, clearAllFilters } = useFilter();

  const { data, isFetching } = useDiscounts({
    ...buildApiParams(clickedFilters),
    search: searchQuery,
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
      <div className="container">
        <Breadcrumb className="mt-6 mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}`}>{t('pages.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("pages.search")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-pretendard font-extrabold text-[56px] leading-[64px] tracking-[-0.5%] md:text-5xl mb-8">
          &quot;{searchQuery}&quot;
        </h1>
      </div>
      <div className="container mb-8 md:p-0">
        <Filters />
      </div>

      <div className="container grid grid-cols-4 gap-6 md:grid-cols-1 mb-24">
        {isFetching ? (
          [...Array(1)].map((_, i) => (
            <SkeletonCard fullscreen key={i} />
          ))
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
              className="md:!w-full"
            />
          ))
        )}
      </div>

      {responsiveDialog}
    </>
  );
}
