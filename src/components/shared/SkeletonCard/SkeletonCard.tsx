import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SkeletonCard({ fullscreen = false }: { fullscreen?: boolean }) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton
        className={cn(
          "mb-2 h-38 border-none rounded-[22px]",
          !fullscreen && "md:w-[296px]"
        )}
      />
      <div className="space-y-3">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    </div>
  );
}

export default SkeletonCard;
