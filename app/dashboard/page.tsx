"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, MessageSquare, User } from "lucide-react"
import { getFavorites, getUserMessages } from "@/lib/firebase/firestore"
import type { Game } from "@/lib/types"
import { useCart } from "@/context/CartContext"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth()
  const { cart } = useCart()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login?redirect=/dashboard")
      return
    }

    const loadUserData = async () => {
      try {
        const [favoritesData, messagesData] = await Promise.all([getFavorites(user.uid), getUserMessages(user.uid)])

        setFavorites(favoritesData)
        setMessages(messagesData)
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user, authLoading, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi cuenta</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <Image
                    src={user.photoURL || "/images/avatar-placeholder.png"}
                    alt={user.displayName || "Usuario"}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{user.displayName || "Usuario"}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Miembro desde</p>
                    <p>
                      {user.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "No disponible"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Favoritos</p>
                    <p>{favorites.length} juegos</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Carrito</p>
                    <p>{cart.length} productos</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Mensajes</p>
                    <p>{messages.length} enviados</p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="favorites">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              <TabsTrigger value="cart">Carrito</TabsTrigger>
              <TabsTrigger value="messages">Mensajes</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Mis favoritos</CardTitle>
                  <CardDescription>Juegos que has marcado como favoritos</CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No tienes juegos favoritos</p>
                  ) : (
                    <div className="space-y-4">
                      {favorites.slice(0, 5).map((game) => (
                        <div key={game.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 relative rounded overflow-hidden">
                            <Image
                              src={game.background_image || "/api/placeholder?height=64&width=64"}
                              alt={game.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">
                              <Link href={`/game/${game.slug}`} className="hover:text-orange-500">
                                {game.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500">{game.genres?.map((g) => g.name).join(", ")}</p>
                          </div>
                        </div>
                      ))}

                      {favorites.length > 5 && (
                        <Button asChild variant="link" className="w-full text-orange-500">
                          <Link href="/favorites">Ver todos los favoritos</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cart">
              <Card>
                <CardHeader>
                  <CardTitle>Mi carrito</CardTitle>
                  <CardDescription>Productos en tu carrito de compra</CardDescription>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">Tu carrito está vacío</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 relative rounded overflow-hidden">
                            <Image
                              src={item.image || "/api/placeholder?height=64&width=64"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">
                              <Link href={`/game/${item.slug}`} className="hover:text-orange-500">
                                {item.name}
                              </Link>
                            </h3>
                            <div className="flex justify-between">
                              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                              <p className="font-medium text-orange-500">{(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button asChild variant="link" className="w-full text-orange-500">
                        <Link href="/cart">Ver carrito completo</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Mis mensajes</CardTitle>
                  <CardDescription>Mensajes que has enviado a través del formulario de contacto</CardDescription>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No has enviado ningún mensaje</p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{message.name}</h3>
                            <p className="text-xs text-gray-500">{message.createdAt?.toDate().toLocaleDateString()}</p>
                          </div>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
