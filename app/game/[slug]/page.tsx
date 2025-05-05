import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import GameDetail from "@/components/games/GameDetail"
import GameDetailSkeleton from "@/components/games/GameDetailSkeleton"

export default function GamePage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<GameDetailSkeleton />}>
        <GameDetail slug={params.slug} />
      </Suspense>

      <div className="mt-8 flex justify-center">
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href={`/product-sheety/${params.slug}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ver ficha de producto
          </Link>
        </Button>
      </div>
    </div>
  )
}
