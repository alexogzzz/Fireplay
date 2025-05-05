"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { saveContactMessage } from "@/lib/firebase/firestore"

export default function ContactPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveContactMessage({
        name,
        email,
        message,
        userId: user?.uid || null,
        createdAt: new Date(),
      })

      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te responderemos lo antes posible.",
        variant: "default",
      })

      // Limpiar el formulario
      if (!user) {
        setName("")
        setEmail("")
      }
      setMessage("")
    } catch (error) {
      toast({
        title: "Error al enviar el mensaje",
        description: "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Contacto</h1>
        <p className="text-gray-600 mb-8 text-center">
          ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Información de contacto</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Dirección</h3>
                <p className="text-gray-600">Calle Tecnología, 123</p>
                <p className="text-gray-600">28001 Madrid, España</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">info@fireplay.com</p>
              </div>
              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-gray-600">+34 91 123 45 67</p>
              </div>
              <div>
                <h3 className="font-medium">Horario de atención</h3>
                <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
                <CardDescription>Completa el formulario y te responderemos lo antes posible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={!!user?.displayName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={!!user?.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
