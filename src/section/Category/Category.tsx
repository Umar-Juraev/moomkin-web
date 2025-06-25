"use client";
import { CategoryItem } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFilter from "@/store/slices/usefilter";
import Filters from "../Filters/Filters";
import { Search } from "lucide-react";
import { useUi } from "@/store/slices/useUI";

const Category = () => {
  const { data, isFetching } = useCategories();
  const router = useRouter();
  const { clickedFilters, toggleFilterButton, clearAllFilters } = useFilter();
  const { setIsMobileSearch } = useUi()

  const handleClicktoSearch = () => {
    router.push(`/search`);
    setIsMobileSearch(true)
  }

  return (
    <section className="container mx-auto mb-8 md:mb-6">
      <Button onClick={handleClicktoSearch} className="w-full hidden  text-base md:flex font-normal  md:mb-8 cursor-pointer text-start text-[#919DA6]  items-center justify-start">
        <Search color="#656E78" />
        <span>
          Ищите горячие скидки
        </span>
      </Button>
      <div className="flex gap-5 mb-8 overflow-x-auto md:mb-6 md:gap-3">
        {!isFetching ? (
          data?.data.map((category) => (
            <CategoryItem data={category} isActiveId={clickedFilters.category_id} key={category.id} onClick={toggleFilterButton} />
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
