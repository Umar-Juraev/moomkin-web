"use client";

import { CompanyCard, SkeletonCategory, SkeletonCompany } from "@/components/shared";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCompanies } from "@/hooks/useCompany";
import useFilter from "@/store/slices/usefilter";
import { Inbox } from "lucide-react";
import React from "react";

const Companies = () => {

  const { data, isFetching } = useCompanies({})
  const { clickedFilters, toggleFilterButton } = useFilter();


  return (
    <section className="container mx-auto mb-8 md:mb-6 md:p-0 ">
      {!isFetching ? (
        (!data?.data.data || data.data.data.length === 0) ? (
          <div className="col-span-4 flex flex-col items-center justify-center py-16">
            <Inbox className="w-20 h-20 text-gray-300 mb-4" />
          </div>
        ) : (
          <Carousel className="w-full mb-8 md:mb-6">
            <CarouselContent className="-ml-2 md:ml-1">
              {data?.data.data.map((company, index) => (
                <CarouselItem
                  key={index}
                  className="pl-5  basis-auto md:basis-auto md:pl-3"
                >
                  <CompanyCard
                    key={company.id}
                    isActiveId={clickedFilters.company_id}
                    data={company}
                    onClick={toggleFilterButton}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )
      ) : (
        <div className="flex gap-5 mb-8 overflow-x-auto md:mb-6 md:gap-3 md:relative md:left-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonCompany key={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Companies;
