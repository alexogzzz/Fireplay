import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY
const API_BASE_URL = "https://api.rawg.io/api"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  
  try {
    // Obtener detalles del juego
    const gameResponse = await fetch(`${API_BASE_URL}/games/${slug}?key=${API_KEY}`)
    
    if (!gameResponse.ok) {
      throw new Error(`Error fetching game details: ${gameResponse.status}`)
    }
    
    const gameData = await gameResponse.json()
    
    // Obtener capturas de pantalla
    const screenshotsResponse = await fetch(`${API_BASE_URL}/games/${slug}/screenshots?key=${API_KEY}`)
    
    let screenshots = []
    
    if (screenshotsResponse.ok) {
      const screenshotsData = await screenshotsResponse.json()
      screenshots = screenshotsData.results
    }
    
    return NextResponse.json({
      ...gameData,
      screenshots
    })
  } catch (error) {
    console.error("Error fetching game:", error)
    return NextResponse.json({ error: 'Error fetching game details' }, { status: 500 })
  }
}