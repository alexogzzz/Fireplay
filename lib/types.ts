export interface Game {
  id: number
  slug: string
  name: string
  released?: string
  background_image?: string
  rating?: number
  ratings_count?: number
  description?: string
  website?: string
  isFavorite?: boolean

  // Relaciones
  genres?: { id: number; name: string }[]
  platforms?: {
    platform: { id: number; name: string }
    requirements?: { minimum?: string; recommended?: string }
  }[]
  developers?: { id: number; name: string }[]
  publishers?: { id: number; name: string }[]
  esrb_rating?: { id: number; name: string }
  tags?: { id: number; name: string }[]
  screenshots?: { id: number; image: string }[]
}
