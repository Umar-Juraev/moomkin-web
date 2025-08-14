"use client";
import { CategoryItem, Search, SkeletonCategory } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFilter from "@/store/slices/usefilter";
import Filters from "../Filters/Filters";
import { useSearchSuggestions } from "@/hooks/useDiscount";
import { Inbox } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useUI from "@/store/slices/useUI";

const Category = () => {
  const { data, isFetching } = useCategories();
  const router = useRouter();
  const { clickedFilters, toggleFilterButton, clearAllFilters } = useFilter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { storedSuggestions } = useUI()

  const suggestionQuery = useSearchSuggestions({
    search: searchQuery,
  })

  return (
    <section className="container mx-auto mb-8 md:mb-6 md:p-0 ">
      <Search
        placeholder="Ищите горячие скидки"
        onSearch={setSearchQuery}
        isLoading={suggestionQuery.isFetching}
        onOpen={() => { }}
        data={suggestionQuery.data?.data || storedSuggestions}
        className="container hidden md:block"
      />
      {/* <div className="flex gap-5 mb-8 overflow-x-auto md:mb-6 md:gap-3">
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
      </div> */}

      {!isFetching ? (
        (!data?.data || data.data.length === 0) ? (
          <div className="col-span-4 flex flex-col items-center justify-center py-16">
            <Inbox className="w-20 h-20 text-gray-300 mb-4" />
          </div>
        ) : (
          <Carousel className="w-full mb-8 md:mb-6">
            <CarouselContent className="-ml-2 md:ml-1">
              {data?.data.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="pl-5  basis-auto md:basis-auto md:pl-3"
                >
                  <CategoryItem
                    data={category}
                    isActiveId={clickedFilters.category_id}
                    key={category.id}
                    onClick={toggleFilterButton}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )
      ) : (
        <div className="flex gap-5 mb-8 overflow-x-auto md:mb-6 md:gap-3 md:relative md:left-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCategory key={i} />
          ))}
        </div>
      )}
      <Filters />
    </section>
  );
};

export default Category;
