"use client"

import { useState, useEffect } from "react"
import { searchGames } from "@/lib/api"
import type { Game } from "@/lib/types"
import GameCard from "@/components/games/GameCard"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function SearchResults({ query }: { query: string }) {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!query) return

      try {
        setLoading(true)
        const data = await searchGames(query, page)

        if (page === 1) {
          setGames(data.results)
        } else {
          setGames((prev) => [...prev, ...data.results])
        }

        setHasMore(!!data.next)
      } catch (error) {
        console.error("Error searching games:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSearchResults()
  }, [query, page])

  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  if (loading && games.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">No se encontraron resultados</h2>
        <p className="text-gray-600">
          No hemos encontrado juegos que coincidan con &quot;{query}&quot;. Intenta con otra búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner />
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} className="bg-orange-500 hover:bg-orange-600">
            Cargar más resultados
          </Button>
        </div>
      )}
    </div>
  )
}
