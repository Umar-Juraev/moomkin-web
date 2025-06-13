"use client";
import { Badge, CategoryItem, Search } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React, { useEffect, useMemo, useState } from "react";
import favoritesFilterIcon from "@/assets/icons/favoritesFilter.svg";
import trendIcon from "@/assets/icons/trend.svg";
import discountIcon from "@/assets/icons/discount.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFilter, { FilterItem } from "@/store/slices/usefilter";

const Category = () => {
  const { data, isFetching } = useCategories();
  const router = useRouter();
  const badges = useMemo(
    () => [
      {
        key: 'order',
        id: 0,
        icon: favoritesFilterIcon,
        label: "Избранное",
        value: "Favorites",
      },
      {
        key: 'order',
        id: 1,
        icon: trendIcon,
        label: "В тренде",
        value: "Trending",
      },
      {
        key: 'order',
        id: 2,
        icon: null,
        label: "Самый близкий",
        value: "Closest",
      },
      {
        key: 'order',
        id: 3,
        icon: null,
        label: "Самый новый",
        value: "Newest",
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
    ],
    []
  );

  const handleClicktoSearch = () => {
    router.push('/search')
  }

  const { clickedFilters, toggleFilterButton, loadFiltersFromStorage } = useFilter();

  useEffect(() => {
    loadFiltersFromStorage();
  }, [loadFiltersFromStorage]);

  // When a filter button is clicked
  const handleFilterClick = (button:FilterItem) => {
    toggleFilterButton({
      id: button.id,
      key: button.key, // e.g., 'category', 'brand', etc.
      value: button.value // the actual value to store
    });
  };

  // Check if a button is active
  const isButtonActive = (buttonId:number) => {
    return Object.values(clickedFilters).some(value => {
      if (Array.isArray(value)) {
        return value.some(v => v?.id === buttonId);
      }
      return value?.id === buttonId;
    });
  };

  return (
    <section className="container mx-auto mb-8 md:mb-6">
      <Button onClick={handleClicktoSearch} className="w-full hidden  text-base md:block  md:mb-8 cursor-pointer">
        Ищите горячие скидки
      </Button>
      <div className="flex gap-5 mb-8 md:mb-6 md:gap-3">
        {!isFetching ? (
          data?.data.map((category) => (
            <CategoryItem data={category} key={category.id} />
          ))
        ) : (
          <div>...loading</div>
        )}
      </div>
      <div className="flex gap-5 overflow-x-auto md:gap-2">
        {badges.map(({ id, icon, label, value }) => (
          <Badge
            svg={icon}
            label={label}
            value={value}
            key={id}
            onClick={(data) => {
              console.log(data);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Category;
