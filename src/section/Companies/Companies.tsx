"use client";

import { CompanyCard, SkeletonCategory, SkeletonCompany } from "@/components/shared";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCompanies } from "@/hooks/useCompany";
import useFilter from "@/store/slices/usefilter";
import { Inbox } from "lucide-react";
import React from "react";
import type { CompanyDTO } from "@/types/DTO";
import type { CarouselApi } from "@/components/ui/carousel";

const Companies = () => {
  const limit = 12;
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<CompanyDTO[]>([]);
  const [total, setTotal] = React.useState(0);
  const [embla, setEmbla] = React.useState<CarouselApi | null>(null);

  const { data, isFetching } = useCompanies({ page, limit });
  const { clickedFilters, toggleFilterButton } = useFilter();

  const hasMore = React.useMemo(() => {
    return total > 0 && items.length < total;
  }, [items.length, total]);

  React.useEffect(() => {
    if (!data?.data) return;
    const newPageItems = data.data.data || [];
    setTotal(data.data.total || 0);
    setItems((prev) => (page === 1 ? newPageItems : [...prev, ...newPageItems]));
  }, [data, page]);

  React.useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      if (!embla) return;
      const atEnd = !embla.canScrollNext();
      if (atEnd && hasMore && !isFetching) {
        setPage((p) => p + 1);
      }
    };

    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    // Run once in case the initial content already fills the viewport
    onSelect();

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, hasMore, isFetching]);

  const isInitialLoading = isFetching && items.length === 0;
  const isLoadingMore = isFetching && items.length > 0;

  return (
    <section className="container mx-auto mb-8 md:mb-6 md:p-0 ">
      {!isInitialLoading ? (
        (items.length === 0) ? (
          <div className="col-span-4 flex flex-col items-center justify-center py-16">
            <Inbox className="w-20 h-20 text-gray-300 mb-4" />
          </div>
        ) : (
          <Carousel opts={{dragFree:true}} className="w-full mb-8 md:mb-6" setApi={setEmbla}>
            <CarouselContent className="-ml-2 md:ml-1">
              {items.map((company, index) => (
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
              {isLoadingMore && (
                <CarouselItem className="pl-5 basis-auto md:basis-auto md:pl-3">
                  <SkeletonCompany />
                </CarouselItem>
              )}
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
