import type { Game } from "./types"

// Constantes
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY
const API_BASE_URL = "https://api.rawg.io/api"

/**
 * Obtiene una lista de juegos con paginación y ordenamiento
 */
export async function fetchGames(page = 1, ordering = "-rating") {
  try {
    // Intenta obtener los datos de la API local
    const response = await fetch(`/api/games?page=${page}&ordering=${ordering}`)

    if (!response.ok) {
      throw new Error(`Error fetching games: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error en fetchGames:", error)
    
    // Devuelve datos simulados para desarrollo
    return {
      results: Array(12).fill(null).map((_, i) => ({
        id: i + 1,
        name: `Juego de ejemplo ${i + 1}`,
        slug: `juego-ejemplo-${i + 1}`,
        background_image: `/api/placeholder?height=300&width=400`,
        rating: 3 + Math.random() * 2,
        released: "2023-01-01",
        genres: [{ id: 1, name: "Acción" }, { id: 2, name: "Aventura" }],
        ratings_count: Math.floor(Math.random() * 1000) + 100
      })),
      next: page < 3 ? `?page=${page + 1}` : null,
      previous: page > 1 ? `?page=${page - 1}` : null,
      count: 36
    }
  }
}

/**
 * Busca juegos por nombre
 */
export async function searchGames(query: string, page = 1) {
  try {
    // Intenta obtener los datos de la API local
    const response = await fetch(`/api/games?search=${encodeURIComponent(query)}&page=${page}`)

    if (!response.ok) {
      throw new Error(`Error searching games: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error en searchGames:", error)
    
    // Devuelve datos simulados para búsqueda
    return {
      results: Array(5).fill(null).map((_, i) => ({
        id: i + 100,
        name: `Resultado para "${query}" ${i + 1}`,
        slug: `resultado-${query.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        background_image: `/api/placeholder?height=300&width=400`,
        rating: 3 + Math.random() * 2,
        released: "2023-01-01",
        genres: [{ id: 1, name: "Acción" }, { id: 2, name: "Aventura" }],
        ratings_count: Math.floor(Math.random() * 500) + 50
      })),
      next: null,
      previous: null,
      count: 5
    }
  }
}

/**
 * Obtiene los detalles de un juego por su slug
 */
export async function fetchGameBySlug(slug: string): Promise<Game> {
  try {
    // Intenta obtener los datos de la API local
    const response = await fetch(`/api/game/${slug}`)

    if (!response.ok) {
      throw new Error(`Error fetching game: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error en fetchGameBySlug:", error)
    
    // Devuelve datos simulados para el juego
    return {
      id: 999,
      slug,
      name: `Detalles de ${slug.replace(/-/g, ' ')}`,
      background_image: `/api/placeholder?height=600&width=1200`,
      description: `
        <p>Descripción de ejemplo para <strong>${slug.replace(/-/g, ' ')}</strong>. Esta es una descripción simulada para desarrollo.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
        nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, 
        nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
      `,
      rating: 4.5,
      ratings_count: 1250,
      released: "2023-01-01",
      website: "https://example.com",
      genres: [
        { id: 1, name: "Acción" }, 
        { id: 2, name: "Aventura" },
        { id: 3, name: "RPG" }
      ],
      platforms: [
        { 
          platform: { id: 1, name: "PC" }, 
          requirements: { 
            minimum: "Sistema operativo: Windows 10<br>Procesador: Intel Core i5-2500K / AMD FX-6300<br>Memoria: 8 GB RAM<br>Gráficos: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB", 
            recommended: "Sistema operativo: Windows 10<br>Procesador: Intel Core i7-4770K / AMD Ryzen 5 1500X<br>Memoria: 16 GB RAM<br>Gráficos: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 8GB" 
          } 
        },
        { platform: { id: 2, name: "PlayStation 5" } },
        { platform: { id: 3, name: "Xbox Series X" } }
      ],
      developers: [{ id: 1, name: "Desarrollador Ejemplo" }],
      publishers: [{ id: 1, name: "Publisher Ejemplo" }],
      esrb_rating: { id: 4, name: "Mature" },
      screenshots: [
        { id: 1, image: `/api/placeholder?height=400&width=600&text=Screenshot 1` },
        { id: 2, image: `/api/placeholder?height=400&width=600&text=Screenshot 2` },
        { id: 3, image: `/api/placeholder?height=400&width=600&text=Screenshot 3` },
        { id: 4, image: `/api/placeholder?height=400&width=600&text=Screenshot 4` }
      ],
      tags: [
        { id: 1, name: "Acción" }, 
        { id: 2, name: "Multijugador" },
        { id: 3, name: "Mundo abierto" },
        { id: 4, name: "Primera persona" },
        { id: 5, name: "Cooperativo" }
      ]
    }
  }
}

/**
 * Obtiene juegos populares para mostrar en la página de inicio
 */
export async function fetchPopularGames(limit = 4) {
  try {
    // Intenta obtener los datos de la API local
    const response = await fetch(`/api/games?ordering=-rating&page_size=${limit}`)

    if (!response.ok) {
      throw new Error(`Error fetching popular games: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error en fetchPopularGames:", error)
    
    // Devuelve datos simulados para juegos populares
    return Array(limit).fill(null).map((_, i) => ({
      id: i + 200,
      name: `Juego popular ${i + 1}`,
      slug: `juego-popular-${i + 1}`,
      background_image: `/api/placeholder?height=300&width=400&text=Popular ${i + 1}`,
      rating: 4.5 + (Math.random() * 0.5),
      released: "2023-01-01",
      genres: [{ id: 1, name: "Acción" }]
    }))
  }
}

/**
 * Obtiene juegos recientes
 */
export async function fetchRecentGames(limit = 4) {
  try {
    // Intenta obtener los datos de la API local
    const response = await fetch(`/api/games?ordering=-released&page_size=${limit}`)

    if (!response.ok) {
      throw new Error(`Error fetching recent games: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error en fetchRecentGames:", error)
    
    // Devuelve datos simulados para juegos recientes
    return Array(limit).fill(null).map((_, i) => ({
      id: i + 300,
      name: `Lanzamiento reciente ${i + 1}`,
      slug: `lanzamiento-reciente-${i + 1}`,
      background_image: `/api/placeholder?height=300&width=400&text=Reciente ${i + 1}`,
      rating: 3.5 + (Math.random() * 1.5),
      released: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Últimas semanas
      genres: [{ id: 2, name: "Aventura" }]
    }))
  }
}

/**
 * Calcula un precio ficticio basado en la puntuación y la fecha de lanzamiento
 */
export function calculateGamePrice(game: Game): number {
  if (!game) return 19.99
  
  // Base price
  let basePrice = 19.99
  
  // Adjust by rating (higher rating = higher price)
  const ratingMultiplier = game.rating ? (game.rating / 5) * 30 : 1
  
  // Adjust by release date (newer games are more expensive)
  let releaseDateMultiplier = 1
  if (game.released) {
    const releaseDate = new Date(game.released)
    const now = new Date()
    const ageInYears = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
    releaseDateMultiplier = Math.max(0.5, 1 - (ageInYears * 0.1)) // Reduce price by 10% per year, minimum 50%
  }
  
  // Calculate final price
  const price = basePrice + ratingMultiplier
  
  // Round to 2 decimal places
  return Number.parseFloat((price * releaseDateMultiplier).toFixed(2))
}