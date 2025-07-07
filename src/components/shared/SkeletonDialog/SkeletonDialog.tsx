import { Skeleton } from "@/components/ui/skeleton";
import SkeletonMap from "../SkeletonMap/SkeletonMap";

function SkeletonDialog() {
  return (
    <div className="text-text-dark border-none shadow-none p-0 m-0 md:overflow-y-auto">
      <div className="flex p-0 m-0 md:flex-col md:relative">
        {/* Left: Image/Carousel Skeleton */}
        <div className="relative w-full p-2 max-h-[620px] md:max-h-max md:rounded-none">
          <Skeleton className="rounded-3xl overflow-hidden h-[600px] w-[480px] md:max-h-[429px] md:w-full" />
          {/* Percent badge */}
          <Skeleton className="absolute left-5 top-5 md:bottom-5 md:top-auto md:left-32 h-8 w-16 rounded-[22px]" />
          {/* Company icon */}
          <Skeleton className="absolute bottom-1 left-5 rounded-[14px] border border-white shadow-[0px_0.5px_2px_0px_#33333314] md:bottom-5 w-[94px] h-[94px]" />
        </div>
        {/* Right: Info Skeletons */}
        <div className="pt-16 pl-4 relative md:static md:pt-1 w-full">
          {/* Top action buttons */}
          <div className="flex absolute top-4 left-4 gap-2 mr-6 md:w-[92%] md:top-5 md:left-5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full hidden md:flex" />
          </div>
          {/* Company name, title, description */}
          <Skeleton className="hidden md:block h-4 w-32 mb-2" />
          <Skeleton className="mb-2 h-8 w-60 md:w-40" />
          <Skeleton className="mb-3 h-4 w-80 md:w-60" />
          {/* Info block (date/location) */}
          <div className="bg-main-light-gray rounded-2xl px-3 py-2 mb-3 mr-6">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          {/* Tabs: Address */}
          <div className="text-lg font-bold py-2">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          {/* Tab content: Map, working hours, contacts, buttons */}
          <div className="max-h-[190px] overflow-y-auto md:overflow-y-visible md:max-h-max mr-6">
            <div className="h-42.5 flex items-center justify-center">
              <SkeletonMap />
            </div>
            <div className="text-lg font-bold pt-6 pb-2">
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-40 mb-2" />
            {/* Contacts */}
            <div className="pt-6">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-4 w-32 mb-1" />
            </div>
            <div className="pt-6">
              <Skeleton className="h-5 w-32 mb-2" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            </div>
          </div>
          {/* Bottom buttons */}
          <div className="flex gap-2 py-4 md:fixed md:bottom-0 md:bg-white mr-4 md:mr-0">
            <Skeleton className="h-14 w-50 rounded-4xl md:w-[167.5px]" />
            <Skeleton className="h-14 w-50 rounded-4xl md:w-[167.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonDialog; 
