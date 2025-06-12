// "use client"
// import { Search } from '@/components/shared'
// import { SearchData } from '@/components/shared/Search/Search';
// import { Input } from '@/components/ui/input';
// import React, { useEffect, useRef, useState } from 'react'
// import { ArrowLeft } from "lucide-react"
// import { useRouter } from 'next/navigation';


// const page = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [searchResults, setSearchResults] = useState<SearchData | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   const router = useRouter()
//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       setIsLoading(true);

//       // Simulating API call
//       setTimeout(() => {
//         setSearchResults({
//           suggestions: [
//             {
//               id: "1",
//               label: "Calendar",
//               onSelect: () => console.log("Calendar selected"),
//             },
//             {
//               id: "2",
//               label: "Search Emoji",
//               onSelect: () => console.log("Search Emoji selected"),
//             },
//           ],
//           settings: [
//             {
//               id: "4",
//               label: "Profile",
//               onSelect: () => console.log("Profile selected"),
//             },
//             {
//               id: "5",
//               label: "Settings",
//               onSelect: () => console.log("Settings selected"),
//             },
//           ],
//         });
//         setIsLoading(false);
//       }, 500);
//     } else {
//       setSearchResults(null);
//     }
//   }, [searchQuery]);


//   const handleBlack = () => {
//     router.back()
//   }
//   return (
//     <div >
//       {/* <div className="relative flex items-center">
//         <div onClick={handleBlack} className='absolute left-0 h-full w-[52px] flex justify-center items-center'>
//           <ArrowLeft />
//         </div>
//         <Input ref={inputRef} type="text" placeholder="Ищите горячие скидки" className="h-12 pl-12 shadow-none rounded-none border-b border-[#B4B8CC42] focus:shadow-none text-[#919DA6] text-base  focus-visible:shadow-none ring-accent focus-visible:ring-0 focus-visible:border-[#B4B8CC42]" />
//       </div> */}
//     </div>
//   )
// }
// export default page

"use client"
// import { Search } from '@/components/shared'
// import { SearchData } from '@/components/shared/Search/Search';
// import { Input } from '@/components/ui/input';
// import React, { useEffect, useRef, useState } from 'react'
// import { ArrowLeft } from "lucide-react"
// import { useRouter } from 'next/navigation';

// Hi saytchi

const page = () => {
  // const [searchQuery, setSearchQuery] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [searchResults, setSearchResults] = useState<SearchData | null>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  // const router = useRouter()
  // useEffect(() => {
  //   if (searchQuery.length > 0) {
  //     setIsLoading(true);

  //     // Simulating API call
  //     setTimeout(() => {
  //       setSearchResults({
  //         suggestions: [
  //           {
  //             id: "1",
  //             label: "Calendar",
  //             onSelect: () => console.log("Calendar selected"),
  //           },
  //           {
  //             id: "2",
  //             label: "Search Emoji",
  //             onSelect: () => console.log("Search Emoji selected"),
  //           },
  //         ],
  //         settings: [
  //           {
  //             id: "4",
  //             label: "Profile",
  //             onSelect: () => console.log("Profile selected"),
  //           },
  //           {
  //             id: "5",
  //             label: "Settings",
  //             onSelect: () => console.log("Settings selected"),
  //           },
  //         ],
  //       });
  //       setIsLoading(false);
  //     }, 500);
  //   } else {
  //     setSearchResults(null);
  //   }
  // }, [searchQuery]);


  // const handleBlack = () => {
  //   router.back()
  // }
  return (
    <div >
      sezrch
      {/* <div className="relative flex items-center">
        <div onClick={handleBlack} className='absolute left-0 h-full w-[52px] flex justify-center items-center'>
          <ArrowLeft />
        </div>
        <Input ref={inputRef} type="text" placeholder="Ищите горячие скидки" className="h-12 pl-12 shadow-none rounded-none border-b border-[#B4B8CC42] focus:shadow-none text-[#919DA6] text-base  focus-visible:shadow-none ring-accent focus-visible:ring-0 focus-visible:border-[#B4B8CC42]" />
      </div> */}
    </div>
  )
}
export default page