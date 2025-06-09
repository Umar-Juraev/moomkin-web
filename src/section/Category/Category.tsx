"use client";
import { Badge, CategoryItem, Search } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React, { useEffect, useMemo, useState } from "react";
import favoritesFilterIcon from "@/assets/icons/favoritesFilter.svg";
import trendIcon from "@/assets/icons/trend.svg";
import discountIcon from "@/assets/icons/discount.svg";
import { SearchData } from "@/components/shared/Search/Search";

const Category = () => {
  const { data, isFetching } = useCategories();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchData | null>(null);
  const badges = useMemo(
    () => [
      {
        id: 0,
        icon: favoritesFilterIcon,
        label: "Избранное",
        value: "Favorites",
      },
      {
        id: 1,
        icon: trendIcon,
        label: "В тренде",
        value: "Trending",
      },
      {
        id: 2,
        icon: null,
        label: "Самый близкий",
        value: "Closest",
      },
      {
        id: 3,
        icon: null,
        label: "Самый новый",
        value: "Newest",
      },
      {
        id: 4,
        icon: discountIcon,
        label: "50%",
        value: "50%",
      },
      {
        id: 5,
        icon: discountIcon,
        label: "30%",
        value: "30%",
      },
      {
        id: 6,
        icon: discountIcon,
        label: "10%",
        value: "10%",
      },
    ],
    []
  );

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsLoading(true);

      // Simulating API call
      setTimeout(() => {
        setSearchResults({
          suggestions: [
            {
              id: "1",
              label: "Calendar",
              onSelect: () => console.log("Calendar selected"),
            },
            {
              id: "2",
              label: "Search Emoji",
              onSelect: () => console.log("Search Emoji selected"),
            },
          ],
          settings: [
            {
              id: "4",
              label: "Profile",
              onSelect: () => console.log("Profile selected"),
            },
            {
              id: "5",
              label: "Settings",
              onSelect: () => console.log("Settings selected"),
            },
          ],
        });
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);
  return (
    <section className="container mx-auto mb-8 md:mb-6">
      <Search
        placeholder="Ищите горячие скидки"
        onSearch={setSearchQuery}
        isLoading={isLoading}
        data={searchResults}
        className="w-full hidden  text-base md:block  md:mb-8"
      />
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
