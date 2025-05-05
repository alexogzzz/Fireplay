import { Skeleton } from "@/components/ui/skeleton"

export default function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
