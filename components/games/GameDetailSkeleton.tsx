import { Skeleton } from "@/components/ui/skeleton"

export default function GameDetailSkeleton() {
  return (
    <div>
      <div className="relative h-[40vh] md:h-[50vh] w-full mb-8 rounded-xl overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  )
}
