"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react"
import { fetchGameBySlug } from "@/lib/api"
import type { Game } from "@/lib/types"
import GameReviews from "@/components/games/GameReviews"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function ProductSheetyPage() {
  const { slug } = useParams() as { slug: string }
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameData = await fetchGameBySlug(slug)
        setGame(gameData)
      } catch (error) {
        console.error("Error loading game:", error)
      } finally {
        setLoading(false)
      }
    }

    loadGame()
  }, [slug])

  const handleAddToCart = () => {
    if (game) {
      addToCart({
        id: game.id,
        name: game.name,
        slug: game.slug,
        price: calculatePrice(game),
        image: game.background_image,
      })

      toast({
        title: "Añadido al carrito",
        description: `${game.name} ha sido añadido a tu carrito`,
        variant: "default",
      })
    }
  }

  const calculatePrice = (game: Game) => {
    // Precio ficticio basado en la puntuación y la fecha de lanzamiento
    const basePrice = 19.99
    const ratingMultiplier = game.rating ? (game.rating / 5) * 30 : 1
    return Number.parseFloat((basePrice + ratingMultiplier).toFixed(2))
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!game) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-bold text-center">Juego no encontrado</h1>
      </div>
    )
  }

  const price = calculatePrice(game)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={game.background_image || "/api/placeholder?height=600&width=800"}
              alt={game.name}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {game.screenshots?.slice(0, 3).map((screenshot, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Image
                  src={screenshot.image || "/api/placeholder?height=200&width=300"}
                  alt={`Screenshot ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{game.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-500 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5" fill={i < Math.floor(game.rating || 0) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-600">({game.ratings_count || 0} valoraciones)</span>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Precio</p>
                  <p className="text-3xl font-bold">{price.toFixed(2)} €</p>
                </div>
                <Button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-600">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Detalles del producto</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Desarrollador:</span>{" "}
                    {game.developers?.map((d) => d.name).join(", ") || "No disponible"}
                  </li>
                  <li>
                    <span className="font-medium">Género:</span>{" "}
                    {game.genres?.map((g) => g.name).join(", ") || "No disponible"}
                  </li>
                  <li>
                    <span className="font-medium">Plataformas:</span>{" "}
                    {game.platforms?.map((p) => p.platform.name).join(", ") || "No disponible"}
                  </li>
                  <li>
                    <span className="font-medium">Fecha de lanzamiento:</span> {game.released || "No disponible"}
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <div
              className="text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: game.description || "No hay descripción disponible." }}
            />
          </div>
        </div>
      </div>

      <GameReviews gameId={game.id} gameName={game.name} />
    </div>
  )
}
