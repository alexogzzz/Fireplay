"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star } from "lucide-react"
import { fetchGameBySlug } from "@/lib/api"
import type { Game } from "@/lib/types"
import { toggleFavorite, checkIsFavorite } from "@/lib/firebase/firestore"
import { useToast } from "@/components/ui/use-toast"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function GameDetail({ slug }: { slug: string }) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameData = await fetchGameBySlug(slug)
        setGame(gameData)

        if (user) {
          const favoriteStatus = await checkIsFavorite(user.uid, gameData.id)
          setIsFavorite(favoriteStatus)
        }
      } catch (error) {
        console.error("Error loading game:", error)
      } finally {
        setLoading(false)
      }
    }

    loadGame()
  }, [slug, user])

  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para guardar favoritos",
        variant: "default",
      })
      return
    }

    if (!game || isTogglingFavorite) return

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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (!game) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Juego no encontrado</h2>
        <p className="text-gray-600 mt-2">No se pudo encontrar el juego solicitado</p>
      </div>
    )
  }

  return (
    <div>
      <div className="relative h-[40vh] md:h-[50vh] w-full mb-8 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        <Image
          src={game.background_image || "/api/placeholder?height=600&width=1200"}
          alt={game.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.name}</h1>
              <div className="flex items-center text-white/90">
                <div className="flex items-center mr-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500"
                      fill={i < Math.floor(game.rating || 0) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-2">{game.rating?.toFixed(1) || "N/A"}</span>
                </div>
                <span className="mr-4">|</span>
                <span>{game.released ? new Date(game.released).toLocaleDateString() : "Fecha no disponible"}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${
                isFavorite
                  ? "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
                  : "bg-white/20 text-white border-white/20 hover:bg-white/30"
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="about" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="about">Información</TabsTrigger>
          <TabsTrigger value="screenshots">Capturas</TabsTrigger>
          <TabsTrigger value="requirements">Requisitos</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: game.description || "No hay descripción disponible." }} />
          </div>
        </TabsContent>

        <TabsContent value="screenshots">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.screenshots && game.screenshots.length > 0 ? (
              game.screenshots.map((screenshot, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <Image
                    src={screenshot.image || "/api/placeholder?height=400&width=600"}
                    alt={`Screenshot ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hay capturas disponibles para este juego.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Requisitos mínimos</h3>
              {game.platforms?.some((p) => p.requirements?.minimum) ? (
                <div className="prose max-w-none">
                  {game.platforms
                    .filter((p) => p.requirements?.minimum)
                    .map((p, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-bold">{p.platform.name}</h4>
                        <div dangerouslySetInnerHTML={{ __html: p.requirements.minimum || "" }} />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">No hay requisitos mínimos disponibles.</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Requisitos recomendados</h3>
              {game.platforms?.some((p) => p.requirements?.recommended) ? (
                <div className="prose max-w-none">
                  {game.platforms
                    .filter((p) => p.requirements?.recommended)
                    .map((p, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-bold">{p.platform.name}</h4>
                        <div dangerouslySetInnerHTML={{ __html: p.requirements.recommended || "" }} />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">No hay requisitos recomendados disponibles.</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Información general</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Desarrollador:</span>{" "}
                  {game.developers?.map((d) => d.name).join(", ") || "No disponible"}
                </li>
                <li>
                  <span className="font-medium">Publicador:</span>{" "}
                  {game.publishers?.map((p) => p.name).join(", ") || "No disponible"}
                </li>
                <li>
                  <span className="font-medium">Fecha de lanzamiento:</span> {game.released || "No disponible"}
                </li>
                <li>
                  <span className="font-medium">Sitio web:</span>{" "}
                  {game.website ? (
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline"
                    >
                      {game.website}
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Detalles</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Géneros</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.genres?.map((genre) => (
                      <span key={genre.id} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {genre.name}
                      </span>
                    )) || "No disponible"}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Plataformas</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms?.map((p) => (
                      <span key={p.platform.id} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {p.platform.name}
                      </span>
                    )) || "No disponible"}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.tags?.slice(0, 8).map((tag) => (
                      <span key={tag.id} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag.name}
                      </span>
                    )) || "No disponible"}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">ESRB</h4>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {game.esrb_rating?.name || "No clasificado"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
