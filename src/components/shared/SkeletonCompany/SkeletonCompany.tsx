import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCompany() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-23 h-23 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-[100%]" />
      </div>
    </div>
  );
}

export default SkeletonCompany;
