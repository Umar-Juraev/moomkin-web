"use client";
import { CategoryItem, Search } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFilter from "@/store/slices/usefilter";
import Filters from "../Filters/Filters";
import { useDiscounts } from "@/hooks/useDiscount";

const Category = () => {
  const { data, isFetching } = useCategories();
  const router = useRouter();
  const { clickedFilters, toggleFilterButton, clearAllFilters } = useFilter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchData, isFetching: isSearchFetching } = useDiscounts({
    search: searchQuery ,
  });
  return (
    <section className="container mx-auto mb-8 md:mb-6">
      <Search
        placeholder="Ищите горячие скидки"
        onSearch={setSearchQuery}
        isLoading={isSearchFetching}
        data={searchData?.data.data || []}
        className="hidden md:block"
      />
      <div className="flex gap-5 mb-8 overflow-x-auto md:mb-6 md:gap-3">
        {!isFetching ? (
          data?.data.map((category) => (
            <CategoryItem
              data={category}
              isActiveId={clickedFilters.category_id}
              key={category.id}
              onClick={toggleFilterButton}
            />
          ))
        ) : (
          <div>...loading</div>
        )}
      </div>
      <Filters />
    </section>
  );
};

export default Category;
