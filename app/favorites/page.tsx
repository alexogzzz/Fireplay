"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { getFavorites } from "@/lib/firebase/firestore"
import GameCard from "@/components/games/GameCard"
import type { Game } from "@/lib/types"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login?redirect=/favorites")
      return
    }

    const loadFavorites = async () => {
      try {
        const favoritesData = await getFavorites(user.uid)
        setFavorites(favoritesData)
      } catch (error) {
        console.error("Error loading favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mis favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No tienes juegos favoritos</h2>
          <p className="text-gray-600 mb-6">Explora nuestro catálogo y añade juegos a tus favoritos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
