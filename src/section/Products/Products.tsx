"use client";
import { ProductCard, ProductDialogContent } from "@/components/shared";
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
const Products = () => {
  const [responsiveDialog, showResponsiveDialog] =
    useResponsiveDialog();

  const { data, isFetching } = useDiscounts({
    category_id: 1,
    limit: 30,
    page: 1,
  });

  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      )
    });
  };
  return (
    <section className="container mx-auto mb-24">
      <div className="relative mb-12">
        <div className="flex items-end justify-between mb-6 md:items-center md:mb-4">
          <h2 className="font-extrabold text-[32px] leading-10 tracking-tight md:text-2xl">
            Огненные скидки
          </h2>
          <div className="font-medium text-base text-red relative right-25 flex items-center gap-1.5 md:static">
            <span>Все</span> <Image src={redChervonRight} alt="chervon right" />
          </div>
        </div>

        {!isFetching ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {data?.data.data.map((item, index) => (
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
          <div>...loading</div>
        )}
      </div>

      <div className="relative">
        <div className="flex items-end justify-between mb-6 md:items-center md:mb-4">
          <h2 className="font-extrabold text-[32px] leading-10 tracking-tight md:text-2xl">
            Скидки на тренды
          </h2>
          <div className="font-medium text-base text-red relative right-25 flex items-center gap-1.5 md:static">
            <span>Все</span> <Image src={redChervonRight} alt="chervon right" />
          </div>
        </div>

        {!isFetching ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {data?.data.data.map((item, index) => (
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
          <div>...loading</div>
        )}
      </div>
      {responsiveDialog}
    </section>
  );
};

export default Products;
