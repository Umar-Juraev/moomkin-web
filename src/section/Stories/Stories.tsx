"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StoriesCard } from "@/components/shared";
// import { useCreateDiscount } from "@/hooks/useDiscount";
// import { useCreateDiscount, useDeleteDiscount, useDiscount, useDiscounts } from "@/hooks/useDiscount";

const Stories = () => {
  // const [page, setPage] = useState(1);
  // const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // // Get paginated discounts
  // const { 
  //   data: discountList, 
  //   isLoading, 
  //   error
  // } = useDiscounts({ page, limit: 10 });
  
  // // Get single discount by ID (only runs when selectedId exists)
  // const { 
  //   data: selectedDiscount 
  // } = useDiscount(selectedId || 0);
  
  // // Mutations
  // const createDiscount = useCreateDiscount();
  // const deleteDiscount = useDeleteDiscount();
  
  // // Handle pagination
  // const handleNextPage = () => {
  //   if (discountList && page < discountList.totalPages) {
  //     setPage(page + 1);
  //   }
  // };
  
  // const handlePrevPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };
  
  // // Handle create example
  // const handleCreateExample = () => {
  //   createDiscount.mutate({
  //     name: "Summer Sale",
  //     percentage: 15,
  //     code: "SUMMER15",
  //     isActive: true,
  //   });
  // };
  
  // if (isLoading) return <div>Loading discounts...</div>;
  // if (error) return <div>Error loading discounts</div>;
  
  return (
    <div className="container mx-auto mt-6 mb-12 md:mt-6 md:mb-8">
      <Carousel  className="w-full">
        <CarouselContent className="pl-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index} className="basis-auto pl-3">
              <StoriesCard key={index} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="w-11 h-11 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
        <CarouselPrevious hideWhenDisabled className="w-11 h-11 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
      </Carousel>
    </div>
  );
};

export default Stories;
