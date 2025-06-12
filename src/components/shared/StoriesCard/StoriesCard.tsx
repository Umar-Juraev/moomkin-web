
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
import { StoriesDTO } from "@/types/DTO";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  data: StoriesDTO
}

const StoriesCard: FC<Props> = ({ data }) => {
  return (
    <Card className="w-40 h-50 md:h-30 md:w-24 rounded-2xl bg-amber-200 border-none shadow-none relative">
      <CardContent>
        <Image src={data.attachments[0].original_filename} alt={data.name} width={160} height={200} />
        <span className="text-2xl font-semibold absolute">{data.name}</span>
      </CardContent>
    </Card>
  );
};

export default StoriesCard;

// "use client"
// import React, { useState } from "react";
// import Stories from "react-insta-stories";
// import Image from "next/image";
// import spa from "../../../../public/images/spa.png";

// interface ImageCaptionPost {
//   image: string;
//   caption: string;
//   captionColor: string;
// }


// const storiesData: ImageCaptionPost[] = [
//   {
//     image: "../../../../public/images/spa.png",
//     caption: "Delicious 😋",
//     captionColor: "white",
//   },
//   {
//     image: "../../../../public/images/pin.png",
//     caption: "Yummy",
//     captionColor: "white",
//   },
//   {
//     image: "../../../../public/images/spa.png",
//     caption: "Wow",
//     captionColor: "white",
//   },
// ];

// export default function StoriesCard() {
//   function redirectToHome() {
//     console.log("xaxa");
//   }
//   function getStoriesObject() {
//     const stories = storiesData.map((item) => {
//         return {
//           content: (props) => (
//             <div className="sr">
//               <div
//                 className=""
//                 style={{ backgroundImage: `url(${item.image})` }}
//               >
//                 <div
//                   className=""
//                   style={{ color: item.captionColor }}
//                 >
//                   <span>{item.caption}</span>
//                 </div>
//               </div>
//             </div>
//           ),
//         };
//     });
//     return stories;
//   }
//   return (
//     <div className="stories-container w-screen h-screen">
//       <Stories
//         stories={getStoriesObject()}
//         defaultInterval={5000}
//         width={"100%"}
//         height="100vh"
//         onAllStoriesEnd={redirectToHome}
//         onStoryEnd={() => console.log('end story')}
//       />
//     </div>
//   );
// }
