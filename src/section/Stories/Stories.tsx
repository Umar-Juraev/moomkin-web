"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StoriesCard } from "@/components/shared";
import { useDiscountStories } from "@/hooks/useDiscount";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import StoriesItem from "react-insta-stories";
import Image from "next/image";
import { AttachmentsDTO } from "@/types/DTO";
import type { Swiper as SwiperType } from "swiper";
import { X } from "lucide-react";

const Stories = () => {
  const { data, isFetching } = useDiscountStories()
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSwiperOpen = (storyId: number) => {
    // Find the index of the clicked story
    const index = data?.data.findIndex(story => story.id === storyId) || 0
    setActiveIndex(index)
    setVisible(true)
  }

  const handleSwiperClose = () => {
    setVisible(false)
  }

  const handleStoryEnd = () => {
    if (data?.data && activeIndex < data.data.length - 1) {
      // Move to next swiper slide
      const nextIndex = activeIndex + 1
      setActiveIndex(nextIndex)
      if (swiperRef.current) {
        swiperRef.current.slideTo(nextIndex)
      }
    } else {
      // All stories finished, close the viewer
      handleSwiperClose()
    }
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

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
  const getStoriesFromAttachments = (attachments: AttachmentsDTO[]) => {
    return attachments.map((attachment) => ({
      content: () => (
        <div className="sr w-full h-full relative">
          <Image
            src={attachment.attachment.url}
            alt="Story"
            className="w-full h-full object-cover"
            fill
          />
        </div>
      ),
    }))
  }

  return (
    <div className="container mx-auto mt-6 mb-12 md:mt-6 md:mb-8">
      <Carousel className="w-full">
        <CarouselContent className="pl-3">
          {!isFetching ? data?.data.map((story) => (
            <CarouselItem onClick={() => handleSwiperOpen(story.id)} key={story.id} className="basis-auto pl-3">
              <StoriesCard data={story} />
            </CarouselItem>
          ))
            : <div>...loading</div>}
        </CarouselContent>
        <CarouselNext className="w-11 h-11 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
        <CarouselPrevious hideWhenDisabled className="w-11 h-11 border-none shadow-[0px 2px 6px 0px #3333331F] md:hidden" />
      </Carousel>

      {visible && data?.data && (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-40 inset-0 bg-black/70 backdrop-blur-sm">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={false}
            spaceBetween={0}
            slideToClickedSlide={true}
            initialSlide={activeIndex}
            onSlideChange={handleSlideChange}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 0,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="mySwiper"
          >
            {data.data.map((story, index) => (
              <SwiperSlide key={story.id} className="rounded-2xl overflow-hidden" style={{ width: '360px', height: '640px' }}>
                {index === activeIndex ? (
                  // Active slide - show StoriesItem
                  <StoriesItem
                    stories={getStoriesFromAttachments(story.attachments)}
                    defaultInterval={4000}
                    width="360px"
                    height="640px"
                    onAllStoriesEnd={handleStoryEnd}
                  // onStoryEnd={(s, st) => {
                  //   // Optional: handle individual story end within a card
                  // }}
                  />
                ) : (
                  // Inactive slide - show StoriesCard
                  <div className="w-full h-full flex items-center justify-center">
                    <StoriesCard className='w-[280px] h-[500px]' data={story} />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={handleSwiperClose}
            className="absolute top-4 right-4 z-50 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
};

export default Stories;