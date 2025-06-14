"use client";
import { Badge } from "@/components/shared";
import React, {useMemo } from "react";
import favoritesFilterIcon from "@/assets/icons/favoritesFilter.svg";
import trendIcon from "@/assets/icons/trend.svg";
import discountIcon from "@/assets/icons/discount.svg";
import useFilter from "@/store/slices/usefilter";

const Filters = () => {
  const { clickedFilters, toggleFilterButton } = useFilter();

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

  return (
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
  );
};

export default Filters;
