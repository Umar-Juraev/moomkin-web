import { Card, CardContent } from "@/components/ui/card";
import React, { FC } from "react";

interface Props {
  index?:number
}

const StoriesCard: FC<Props> = ({ index }) => {
  return (
    <Card className="w-40 h-50 md:h-30 md:w-24 rounded-2xl bg-amber-200 border-none shadow-none">
      <CardContent>
        <span className="text-2xl font-semibold">{index}</span>
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
