"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Reseñas simuladas
const MOCK_REVIEWS = [
  {
    id: 1,
    user: {
      name: "Carlos Rodríguez",
      avatar: "/images/avatars/avatar-1.jpg",
    },
    rating: 4.5,
    date: "2023-10-15",
    content:
      "Un juego increíble con gráficos impresionantes y una historia cautivadora. La jugabilidad es fluida y los personajes están muy bien desarrollados. Totalmente recomendado para los fans del género.",
  },
  {
    id: 2,
    user: {
      name: "Laura Martínez",
      avatar: "/images/avatars/avatar-2.jpg",
    },
    rating: 5,
    date: "2023-09-28",
    content:
      "Simplemente perfecto. No puedo dejar de jugarlo. La banda sonora es espectacular y los escenarios están llenos de detalles. Una obra maestra que todo jugador debería experimentar.",
  },
  {
    id: 3,
    user: {
      name: "Miguel Sánchez",
      avatar: "/images/avatars/avatar-3.jpg",
    },
    rating: 3.5,
    date: "2023-11-02",
    content:
      "Buen juego, aunque tiene algunos problemas de rendimiento en ciertas secciones. La historia es interesante pero podría ser más profunda. En general, una experiencia satisfactoria.",
  },
]

export default function GameReviews({ gameId, gameName }: { gameId: number; gameName: string }) {
  const [reviews, setReviews] = useState(MOCK_REVIEWS)
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para dejar una reseña",
        variant: "default",
      })
      return
    }

    if (!newReview.trim()) {
      toast({
        title: "Reseña vacía",
        description: "Por favor, escribe tu opinión sobre el juego",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    // Simulamos el envío de la reseña
    setTimeout(() => {
      const review = {
        id: Date.now(),
        user: {
          name: user.displayName || "Usuario",
          avatar: user.photoURL || "/images/avatars/avatar-default.jpg",
        },
        rating,
        date: new Date().toISOString().split("T")[0],
        content: newReview,
      }

      setReviews([review, ...reviews])
      setNewReview("")
      setRating(5)
      setSubmitting(false)

      toast({
        title: "Reseña publicada",
        description: "Tu opinión ha sido publicada correctamente",
        variant: "default",
      })
    }, 1000)
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Opiniones sobre {gameName}</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Deja tu opinión</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="flex items-center mb-2">
            <div className="mr-2">Puntuación:</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star className="h-6 w-6 text-yellow-500" fill={star <= rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Comparte tu experiencia con este juego..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={submitting}>
            {submitting ? "Publicando..." : "Publicar opinión"}
          </Button>
        </form>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={review.user.avatar || "/api/placeholder"} alt={review.user.name} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{review.user.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                      fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-2 text-sm">{review.rating}</span>
                </div>
                <p className="text-gray-700 mt-2">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
