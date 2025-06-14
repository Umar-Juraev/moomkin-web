
// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// export default function StoriesCard() {
//   return (
//     <Swiper
//       effect="coverflow"
//       grabCursor={true}
//       centeredSlides={true}
//       slidesPerView="auto"
//       coverflowEffect={{
//         rotate: 0,
//         stretch: 0,
//         depth: 100,
//         modifier: 2.5,
//         slideShadows: false,
//       }}
//       navigation
//       pagination={{ clickable: true }}
//       modules={[EffectCoverflow, Navigation, Pagination]}
//       className="mySwiper"
//     >
//       {[...Array(5)].map((_, index) => (
//         <SwiperSlide key={index} style={{ width: '300px' }}>
//           <div className="rounded-xl bg-blue-500 p-6 text-white shadow-lg">
//             <h2 className="text-2xl font-bold">Grocery Delivery</h2>
//             <p className="mt-2">From Yandex Lavka</p>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }


import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StoriesDTO } from "@/types/DTO";
import Image from "next/image";
import React, { FC } from "react";
interface Props {
  data: StoriesDTO,
  className?: string
}

const StoriesCard: FC<Props> = ({ data, className }) => {
  return (
    <Card className={cn("w-40 h-50 md:h-30 md:w-24 overflow-hidden rounded-2xl bg-amber-200 border-none shadow-none relative cursor-pointer p-0 z-1",className)}>
      <CardContent className="p-0">
        <Image src={data.attachments[0].attachment.url} alt={data.name} fill />
        <span className="absolute text-xl text-white font-semibold w-full left-1/2 -translate-x-1/2 bottom-5 z-1 px-4 md:px-2 md:text-base md:bottom-1">{data.name}</span>
      </CardContent>
    </Card>
  );
};

export default StoriesCard;