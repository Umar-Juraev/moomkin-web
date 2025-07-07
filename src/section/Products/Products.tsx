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

const Products = () => {
  const [responsiveDialog, showResponsiveDialog] = useResponsiveDialog();
  const { t } = useTranslation();

  const { clickedFilters, clearAllFilters } = useFilter();

  const isFilterEmpty = Object.keys(clickedFilters).length === 0;

  const { data, isFetching } = useDiscounts({
    ...buildApiParams(clickedFilters),
    limit: 30,
    page: 1,
    order: "trend",
  });

  const { data: hotData, isFetching: hotIsFetching } = useDiscounts({
    ...buildApiParams(clickedFilters),
    limit: 30,
    page: 1,
    order: "hot",
  });
  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      ),
      hideHeader: true,
    });
  };

  return (
    <section className="container mx-auto mb-24">
      {!isFilterEmpty && (
        <>
          <div className=" flex items-center justify-between mb-6 md:items-center md:mb-4">
            <div>
              <h2 className="font-extrabold text-[32px] leading-10 mb-1.5 tracking-tight md:text-2xl">
                {12} места найдено
              </h2>
              <p className="font-normal text-base leading-5.5 tracking-[-0.5%]">
                {Object.keys(clickedFilters).length} фильтр применён
              </p>
            </div>

            <Button variant="primary" onClick={clearAllFilters}>
              Очистить
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6 md:grid-cols-1">
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
        </>
      )}
      {isFilterEmpty && (
        <>
          <div className="relative mb-12">
            <div className="flex items-end justify-between mb-6 md:items-center md:mb-4">
              <h2 className="font-extrabold text-[32px] leading-10 tracking-tight md:text-2xl">
                {t("titles.trends")}
              </h2>
              <Link
                href={`/trends`}
                className="font-medium text-base text-red relative right-25 flex items-center gap-1.5 md:static cursor-pointer"
              >
                <span>Все</span>{" "}
                <Image src={redChervonRight} alt="chervon right" />
              </Link>
            </div>
            {!isFetching ? (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {data?.data?.data?.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-6  basis-1/4 md:basis-auto md:pl-3"
                    >
                      <ProductCard
                        onClick={handleProductClick}
                        key={index}
                        data={item}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute -top-10 right-0">
                  <CarouselNext className="w-9 h-9 -right-0 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
                  <CarouselPrevious className="w-9 h-9 -left-20 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
                </div>
              </Carousel>
            ) : (
              <div className="grid grid-cols-4 gap-6 md:grid-cols-1">
                {[...Array(4)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="flex items-end justify-between mb-6 md:items-center md:mb-4">
              <h2 className="font-extrabold text-[32px] leading-10 tracking-tight md:text-2xl">
                {t("titles.hot")}
              </h2>
              <Link
                href={`/hot`}
                className="font-medium text-base text-red relative right-25 flex items-center gap-1.5 md:static cursor-pointer"
              >
                <span>Все</span>
                <Image src={redChervonRight} alt="chervon right" />
              </Link>
            </div>
            {!hotIsFetching ? (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {hotData?.data?.data?.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-6  basis-1/4 md:basis-auto md:pl-3"
                    >
                      <ProductCard
                        onClick={handleProductClick}
                        key={index}
                        data={item}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute -top-10 right-0">
                  <CarouselNext className="w-9 h-9 -right-0 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
                  <CarouselPrevious className="w-9 h-9 -left-20 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
                </div>
              </Carousel>
            ) : (
              <div className="grid grid-cols-4 gap-6 md:grid-cols-1">
                {[...Array(4)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {responsiveDialog}
    </section>
  );
};

export default Products;
