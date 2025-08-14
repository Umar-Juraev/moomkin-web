"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductDialogContent, SkeletonStories, StoriesCard } from "@/components/shared";
import { useDiscountStories } from "@/hooks/useDiscount";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import StoriesItem, { WithSeeMore } from "react-insta-stories";
import Image from "next/image";
import { AttachmentsDTO } from "@/types/DTO";
import type { Swiper as SwiperType } from "swiper";
import { X, Inbox } from "lucide-react";
import useViewedStories from "@/store/slices/useStoryView";
import { createPortal } from "react-dom";
import { AttachmentTypeEnum } from "@/constants/enums";
import { useTranslation } from "react-i18next";
import { useResponsiveDialog } from "@/hooks/useResponsiveDialog";

const Stories = () => {
  const { data, isFetching } = useDiscountStories();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const { addViewed, isViewed } = useViewedStories();
  const { t } = useTranslation()
  const [responsiveDialog, showResponsiveDialog] = useResponsiveDialog();

  const handleSwiperOpen = (storyId: number) => {
    // Find the index of the clicked story
    const index = data?.data.findIndex((story) => story.id === storyId) || 0;
    setActiveIndex(index);
    setVisible(true);
  };

  const handleSwiperClose = () => {
    setVisible(false);
  };

  const handleStoryEnd = () => {
    if (data?.data && activeIndex < data.data.length - 1) {
      // Move to next swiper slide
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      if (swiperRef.current) {
        swiperRef.current.slideTo(nextIndex);
      }
    } else {
      // All stories finished, close the viewer
      handleSwiperClose();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);    
  };

  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      ),
      hideHeader: true,
    });
  };

  const handleSeeMoreClick = () => {
    alert('hello');
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Convert story attachments to stories format
  const getStoriesFromAttachments = (attachments: AttachmentsDTO[], discountId: number) => {
    return attachments.filter(item => item.type === AttachmentTypeEnum.STORY).map((attachment) => {
      return {
        content: () => (
          <div className="sr w-full h-full relative">
            <Image
              src={attachment.attachment.url}
              alt="Story"
              className="relative z-30 w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 360px"
            />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleProductClick(discountId);
                }}
                className="h-14 w-[312px] flex items-center justify-center bg-white shadow-[0px_2px_6px_0px_#3333331F] text-lg font-semibold rounded-[32px] mx-6 absolute bottom-6 hover:opacity-90 z-50 md:w-[calc(100%-32px)] md:mx-4 md:static"
                style={{
                  zIndex: 9999,
                  pointerEvents: 'auto',
                  position: 'absolute'
                }}
              >
                {t('buttons.seeMore')}

              </div>
          </div>
        ),
      };
    });
  };

  return (
    <div className="container mx-auto mt-6 mb-12 md:mt-6 md:mb-8 md:p-0">
      <Carousel className="w-full">
        {/* -ml-2 md:ml-1 */}
        <CarouselContent className="pl-3">
          {!isFetching ? (
            data?.data?.length === 0 ? (
              <div className="col-span-4 flex flex-col items-center justify-center py-16">
                <Inbox className="w-20 h-20 text-gray-300 mb-4" />
              </div>
            ) : (
              data?.data?.map((story) => (
                <CarouselItem
                  onClick={() => handleSwiperOpen(story.id)}
                  key={story.id}
                  className="basis-auto pl-3"
                >
                  <div className={isViewed(story.id) ? "p-[2px] rounded-[17px] bg-gradient-to-tr from-gray-300 via-gray-300 to-gray-300" : "p-[2px] rounded-[17px] bg-gradient-to-tr from-[#FFCA00] via-[#ce3628e1] to-[#CE3728]"}>
                    <StoriesCard data={story} />
                  </div>
                </CarouselItem>
              ))
            )
          ) : (
            <div className="grid grid-cols-4 gap-3 md:relative md:left-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonStories key={i} />
              ))}
            </div>
          )}
        </CarouselContent>
        <CarouselNext className="w-11 h-11 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
        <CarouselPrevious
          hideWhenDisabled
          className="w-11 h-11 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden"
        />
      </Carousel>

      {visible &&
        data?.data &&
        createPortal(
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-blur-sm bg-black/60 z-20">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              effect="cards"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={false}
              spaceBetween={0}
              slideToClickedSlide={true}
              initialSlide={activeIndex}
              onSlideChange={handleSlideChange}
              modules={[EffectCoverflow, Navigation, Pagination]}
              className="mySwiper w-full"
            >
              {data.data.map((story, index) => (
                <SwiperSlide
                  key={story.id}
                  className="!rounded-2xl !overflow-hidden !flex !items-center !justify-center !w-[360px] !h-[640px] md:!w-screen md:!h-screen md:!rounded-none"
                >
                  {index === activeIndex ? (
                    // Active slide - show StoriesItem
                    <StoriesItem
                      keyboardNavigation
                      stories={getStoriesFromAttachments(story.attachments, story.id)}
                      defaultInterval={5000}
                      onNext={()=>addViewed(story.id)}
                      onAllStoriesEnd={() => {
                        addViewed(story.id);
                        handleStoryEnd();
                      }}
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <div className="w-[280px] h-[500px] md:w-full md:h-full flex items-center justify-center relative rounded-2xl overflow-hidden">
                      {story.attachments.length > 0 && story.attachments[0].attachment.url ? (
                        <Image
                          src={story.attachments[0].attachment.url}
                          alt={story.name}
                          fill
                          className="object-cover absolute"
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full" />
                      )}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={handleSwiperClose}
              className="absolute top-4 right-4 z-30 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer md:absolute"
            >
              <X />
            </button>
          </div>,
          document.body
        )}
      {responsiveDialog}
    </div>
  );
};

export default Stories;

