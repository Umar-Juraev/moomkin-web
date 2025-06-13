"use client";
import { Badge, CategoryItem, Search } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React, { useEffect, useMemo, useState } from "react";
import favoritesFilterIcon from "@/assets/icons/favoritesFilter.svg";
import trendIcon from "@/assets/icons/trend.svg";
import discountIcon from "@/assets/icons/discount.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFilter from "@/store/slices/usefilter";

const Category = () => {
  const { data, isFetching } = useCategories();
  const router = useRouter();
  const { clickedFilters, toggleFilterButton, clearAllFilters } = useFilter();

  const badges = useMemo(
    () =>
      [
        {
          key: 'order',
          id: 0,
          icon: favoritesFilterIcon,
          label: "Избранное",
          value: "test1",
        },
        {
          key: 'order',
          id: 1,
          icon: trendIcon,
          label: "В тренде",
          value: "trend",
        },
        {
          key: 'order',
          id: 2,
          icon: null,
          label: "Самый близкий",
          value: "test2",
        },
        {
          key: 'order',
          id: 3,
          icon: null,
          label: "Самый новый",
          value: "created_at",
        },
        {
          key: 'tags',
          id: 4,
          icon: discountIcon,
          label: "50%",
          value: "1",
        },
        {
          key: 'tags',
          id: 5,
          icon: discountIcon,
          label: "30%",
          value: "2",
        },
        {
          key: 'tags',
          id: 6,
          icon: discountIcon,
          label: "10%",
          value: "3",
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

  const handleClicktoSearch = () => {
    router.push('/search')
  }

  return (
    <section className="container mx-auto mb-8 md:mb-6">
      <Button onClick={handleClicktoSearch} className="w-full hidden  text-base md:block  md:mb-8 cursor-pointer">
        Ищите горячие скидки
      </Button>
      <div className="flex gap-5 mb-8 md:mb-6 md:gap-3">
        {!isFetching ? (
          data?.data.map((category) => (
            <CategoryItem data={category} isActiveId={clickedFilters.category_id} key={category.id} onClick={toggleFilterButton} />
          ))
        ) : (
          <div>...loading</div>
        )}
      </div>
      <div className="flex gap-5 overflow-x-auto md:gap-2">
        {badges.map((data) => (
          <Badge
            data={data}
            key={data.id}
            onClick={(data) => {
              toggleFilterButton({ id: String(data.id), key: data.key, value: data.value })
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Category;
