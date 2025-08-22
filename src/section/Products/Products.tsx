"use client";
import {
  ProductCard,
  ProductDialogContent,
  SkeletonCard,
} from "@/components/shared";
import redChervonRight from "@/assets/icons/redChervonRight.svg";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useResponsiveDialog } from "@/hooks/useResponsiveDialog";
import { useDiscounts } from "@/hooks/useDiscount";
import useFilter from "@/store/slices/usefilter";
import { Button } from "@/components/ui/button";
import { buildApiParams } from "@/utils/data";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import { Inbox } from "lucide-react";

const Products = () => {
  const [responsiveDialog, showResponsiveDialog] = useResponsiveDialog();
  const { t } = useTranslation();

  const { clickedFilters, clearAllFilters } = useFilter();

  const isFilterEmpty = Object.keys(clickedFilters).length === 0;

  const { data, isFetching } = useDiscounts(
    buildApiParams(clickedFilters, { order: "trend" })
  );

  const { data: hotData, isFetching: hotIsFetching } = useDiscounts(
    buildApiParams(clickedFilters, { order: "hot" })
  );
  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      ),
      hideHeader: true,
    });
  };

  return (
    <section className="mx-auto mb-16">
      {!isFilterEmpty && (
        <>
          <div className="container flex items-center justify-between mb-6 md:items-center md:mb-4">
            <div>

              <h2 className="font-extrabold text-[32px] leading-10 mb-1.5 tracking-tight md:text-2xl">
              {Array.isArray(data?.data?.data) && data?.data?.data.length > 0 ? (
                <>
                  {data.data.data.length} {t('foundPlaces')}
                </>
              ) : (
                t('search.noResult')
              )}
              </h2>
              <p className="font-normal text-base leading-5.5 tracking-[-0.5%]">
                {Object.keys(clickedFilters).length} {t('appliedFilters')}
              </p>
            </div>

            <Button variant="primary" onClick={clearAllFilters}>
              {t('buttons.clear')}
            </Button>
          </div>

          <div className="container grid grid-cols-4 gap-6 md:grid-cols-1">
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
              : [...Array(4)].map((_, i) => <SkeletonCard fullscreen key={i} />)}
          </div>
          {/* {data?.data && data.data.total > data.data.limit && (
            <div className="mb-8">
              <Pagination
                limit={data.data.limit}
                page={data.data.page}
                total={data.data.total}
              />
            </div>
          )} */}
        </>
      )}
      {isFilterEmpty && (
        <>
          <div className="relative mb-12">
            <div className="container flex items-end justify-between mb-6 md:items-center md:mb-4">
              <h2 className="font-extrabold text-[32px] leading-10 tracking-tight md:text-2xl md:leading-normal">
                {t("titles.trends")}
              </h2>
              <Link
                href={`/trends`}
                className="font-medium text-base text-red relative right-20 flex items-center gap-1.5 md:static cursor-pointer"
              >
                <span>{t('all')}</span>
                <Image src={redChervonRight} alt="chervon right" />
              </Link>
            </div>
            <Carousel className="container w-full md:px-0">
              <CarouselContent className="-ml-2 md:ml-1">
                {!isFetching
                  ? data?.data?.data?.length === 0
                    ? (
                      <CarouselItem className="pl-6 basis-full md:pl-3">
                        <div className="col-span-4 flex flex-col items-center justify-center py-16 w-full">
                          <Inbox className="w-20 h-20 text-gray-300 mb-4" />
                        </div>
                      </CarouselItem>
                    )
                    : data?.data?.data?.map((item, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-6 basis-1/4 md:basis-auto md:pl-3"
                      >
                        <ProductCard
                          onClick={handleProductClick}
                          data={item}
                        />
                      </CarouselItem>
                    ))
                  : [...Array(4)].map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-6 basis-1/4 md:basis-auto md:pl-3"
                    >
                      <SkeletonCard />
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <div className=" absolute -top-9 right-0">
                <CarouselNext className="w-9 h-9 -right-0 bg-main-light-gray border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
                <CarouselPrevious className="w-9 h-9 -left-20 bg-main-light-gray border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
              </div>
            </Carousel>
          </div>
          <div className="relative">
            <div className="container flex items-end justify-between mb-6 md:items-center md:mb-4">
              <h2 className="font-extrabold text-[32px] leading-10 tracking-tight md:text-2xl">
                {t("titles.hot")}
              </h2>
              <Link
                href={`/hot`}
                className="font-medium text-base text-red relative right-20 flex items-center gap-1.5 md:static cursor-pointer"
              >
                <span>{t('all')}</span>
                <Image src={redChervonRight} alt="chervon right" />
              </Link>
            </div>
            <Carousel className="container w-full md:px-0">
              <CarouselContent className="-ml-2 md:ml-1">
                {!hotIsFetching
                  ? hotData?.data?.data?.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-6 basis-1/4 md:basis-auto md:pl-3"
                    >
                      <ProductCard
                        onClick={handleProductClick}
                        data={item}
                      />
                    </CarouselItem>
                  ))
                  : [...Array(4)].map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-6 basis-1/4 md:basis-auto md:pl-3"
                    >
                      <SkeletonCard />
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <div className="absolute -top-9 right-0">
                <CarouselNext className="w-9 h-9 -right-0 bg-main-light-gray border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
                <CarouselPrevious className="w-9 h-9 -left-20 bg-main-light-gray border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
              </div>
            </Carousel>
          </div>
        </>
      )}
      {responsiveDialog}
    </section>
  );
};

export default Products;
