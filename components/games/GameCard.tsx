"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import type { Game } from "@/lib/types"
import { toggleFavorite } from "@/lib/firebase/firestore"

export default function GameCard({ game }: { game: Game }) {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(game.isFavorite || false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const { toast } = useToast()

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para guardar favoritos",
        variant: "default",
      })
      return
    }

    if (isTogglingFavorite) return

    setIsTogglingFavorite(true)

    try {
      const newStatus = await toggleFavorite(user.uid, game)
      setIsFavorite(newStatus)

      toast({
        title: newStatus ? "Añadido a favoritos" : "Eliminado de favoritos",
        description: newStatus
          ? `${game.name} ha sido añadido a tus favoritos`
          : `${game.name} ha sido eliminado de tus favoritos`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar los favoritos",
        variant: "destructive",
      })
    } finally {
      setIsTogglingFavorite(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <Link href={`/game/${game.slug}`}>
        <div className="relative aspect-video">
          <Image
            src={game.background_image || "/api/placeholder?height=300&width=400"}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-700"
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold truncate">{game.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <div
                className={`w-10 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                  (game.rating || 0) >= 4
                    ? "bg-green-100 text-green-800"
                    : (game.rating || 0) >= 3
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {game.rating ? (typeof game.rating === 'number' ? game.rating.toFixed(1) : Number(game.rating).toFixed(1)) : "N/A"}
              </div>
            </div>
            <div className="text-sm text-gray-500">{game.released ? new Date(game.released).getFullYear() : "N/A"}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
