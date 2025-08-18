"use client";
import { Badge } from "@/components/shared";
import React, { useMemo } from "react";
import favoritesFilterIcon from "@/assets/icons/favoritesFilter.svg";
import trendIcon from "@/assets/icons/trend.svg";
import discountIcon from "@/assets/icons/discount.svg";
import useFilter from "@/store/slices/usefilter";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Filters = () => {
  const { clickedFilters, toggleFilterButton } = useFilter();
  const { t } = useTranslation();

  const badges = useMemo(
    () =>
      [
        // {
        //   key: 'order',
        //   id: 0,
        //   icon: favoritesFilterIcon,
        //   label: t('category.favorites'),
        //   value: "test1",
        // },
        {
          key: 'order',
          id: 1,
          icon: trendIcon,
          label: 'category.trend',
          value: "trend",
        },
        // {
        //   key: 'order',
        //   id: 2,
        //   icon: null,
        //   label: t('category.nearest'),
        //   value: "test2",
        // },
        {
          key: 'order',
          id: 3,
          icon: null,
          label: 'category.newest',
          value: "created_at",
        },
        {
          key: 'tags',
          id: 4,
          icon: discountIcon,
          label: "50%",
          value: "10",
        },
        {
          key: 'tags',
          id: 5,
          icon: discountIcon,
          label: "30%",
          value: "6",
        },
        {
          key: 'tags',
          id: 6,
          icon: discountIcon,
          label: "10%",
          value: "2",
        },
      ].map((badge) => {
        let isActive = false;
        if (badge.key === "order" && clickedFilters.order === badge.value) {
          isActive = true;
        }
        if (
          badge.key === "tags" &&
          Array.isArray(clickedFilters.tags) &&
          clickedFilters.tags.includes(badge.value)
        ) {
          isActive = true;
        }
        return { ...badge, isActive };
      }),
    [clickedFilters]
  );

  return (
    // <div className="flex gap-5 overflow-x-auto md:gap-2">
    //   {badges.map((data) => (
    //     <Badge
    //       data={data}
    //       key={data.id}
    //       onClick={(data) => {
    //         toggleFilterButton({ id: String(data.id), key: data.key, value: data.value })
    //       }}
    //     />
    //   ))}

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:ml-1">
          {badges.map((data, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-auto md:basis-auto"
            >
              <Badge
                data={data}
                key={data.id}
                onClick={(data) => {
                  toggleFilterButton({ id: String(data.id), key: data.key, value: data.value })
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    // </div>
  );
};

export default Filters;
