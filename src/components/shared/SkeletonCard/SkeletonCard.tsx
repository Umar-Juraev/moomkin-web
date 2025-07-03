import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="mb-2 h-38 border-none  md:w-[296px] rounded-[22px]" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[30%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    </div>
  );
}

export default SkeletonCard;
