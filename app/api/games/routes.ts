import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY
const API_BASE_URL = "https://api.rawg.io/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const ordering = searchParams.get('ordering') || '-rating'
  const search = searchParams.get('search') || ''
  
  let url = `${API_BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=12&ordering=${ordering}`
  
  if (search) {
    url += `&search=${search}`
  }

  try {
    const response = await fetch(url)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching games:", error)
    return NextResponse.json({ error: 'Error fetching games' }, { status: 500 })
  }
}