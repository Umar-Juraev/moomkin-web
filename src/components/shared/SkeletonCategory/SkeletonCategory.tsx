import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCategory() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-26 h-26 rounded-full mb-2.5" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-[100%]" />
      </div>
    </div>
  );
}

export default SkeletonCategory;
