"use client";
import { CategoryItem, Search, SkeletonCategory } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFilter from "@/store/slices/usefilter";
import Filters from "../Filters/Filters";
import { useDiscounts } from "@/hooks/useDiscount";
import { Inbox } from "lucide-react";

const Category = () => {
  const { data, isFetching } = useCategories();
  const router = useRouter();
  const { clickedFilters, toggleFilterButton, clearAllFilters } = useFilter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchData, isFetching: isSearchFetching } = useDiscounts({
    search: searchQuery,
  });
  
  return (
    <section className="container mx-auto mb-8 md:mb-6 md:p-0 md:pl-4">
      <Search
        placeholder="Ищите горячие скидки"
        onSearch={setSearchQuery}
        isLoading={isSearchFetching}
        onOpen={()=>{}}
        data={searchData?.data.data || []}
        className="hidden md:block"
      />
      <div className="flex gap-5 mb-8 overflow-x-auto md:mb-6 md:gap-3">
        {!isFetching && (!data?.data || data.data.length === 0) ? (
          <div className="col-span-4 flex flex-col items-center justify-center py-16">
            <Inbox className="w-20 h-20 text-gray-300 mb-4" />
          </div>
        ) : !isFetching
          ? data?.data.map((category) => (
              <CategoryItem
                data={category}
                isActiveId={clickedFilters.category_id}
                key={category.id}
                onClick={toggleFilterButton}
              />
            ))
          : [...Array(5)].map((_, i) => <SkeletonCategory key={i} />)}
      </div>
      <Filters />
    </section>
  );
};

export default Category;
