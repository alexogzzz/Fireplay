"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { fetchGames } from "@/lib/api"
import type { Game } from "@/lib/types"
import GameCard from "./GameCard"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function GamesList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const searchParams = useSearchParams()
  const ordering = searchParams.get("ordering") || "-rating"

  useEffect(() => {
    // Resetear el estado cuando cambia el ordenamiento
    setGames([])
    setPage(1)
    setLoading(true)
  }, [ordering])

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true)
        const data = await fetchGames(page, ordering)

        if (page === 1) {
          setGames(data.results)
        } else {
          setGames((prev) => [...prev, ...data.results])
        }

        setHasMore(!!data.next)
      } catch (error) {
        console.error("Error loading games:", error)
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [page, ordering])

  const loadMore = () => {
    setPage((prev) => prev + 1)
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
            Cargar más juegos
          </Button>
        </div>
      )}
    </div>
  )
}