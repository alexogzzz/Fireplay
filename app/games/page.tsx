import { Suspense } from "react"
import GamesList from "@/components/games/GamesList"
import GameFilters from "@/components/games/GameFilters"
import GamesSkeleton from "@/components/games/GamesSkeleton"

export default function GamesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Catálogo de juegos</h1>

      <GameFilters />

      <Suspense fallback={<GamesSkeleton />}>
        <GamesList />
      </Suspense>
    </div>
  )
}
