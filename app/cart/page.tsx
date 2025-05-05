"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = () => {
    setCheckoutLoading(true)

    // Simulamos un proceso de compra
    setTimeout(() => {
      toast({
        title: "¡Compra realizada con éxito!",
        description: "Gracias por tu compra en Fireplay",
        variant: "default",
      })
      clearCart()
      setCheckoutLoading(false)
    }, 1500)
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Parece que aún no has añadido ningún juego a tu carrito</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/games">Explorar juegos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-32 h-32 relative">
                      <Image
                        src={item.image || "/api/placeholder?height=200&width=200"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col sm:flex-row justify-between">
                      <div>
                        <h3 className="font-medium">
                          <Link href={`/game/${item.slug}`} className="hover:text-orange-500">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-orange-500 font-medium">{item.price.toFixed(2)} €</p>
                      </div>
                      <div className="flex items-center mt-4 sm:mt-0">
                        <div className="flex items-center mr-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Productos ({totalItems})</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Procesando..." : "Finalizar compra"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
