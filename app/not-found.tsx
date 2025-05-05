import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/games">
            <Search className="mr-2 h-4 w-4" />
            Explorar juegos
          </Link>
        </Button>
      </div>
    </div>
  )
}
