import { Suspense } from "react"
import SearchResults from "@/components/search/SearchResults"
import SearchSkeleton from "@/components/search/SearchSkeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Resultados de búsqueda</h1>
      <p className="text-gray-600 mb-8">Mostrando resultados para: &quot;{query}&quot;</p>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}
