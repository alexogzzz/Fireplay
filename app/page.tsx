import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, GamepadIcon as GameController, ShieldCheck, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Fireplay - Tu tienda de videojuegos"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bienvenido a <span className="text-orange-500">Fireplay</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Tu destino definitivo para descubrir, explorar y adquirir los mejores videojuegos del mercado.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/games">Explorar juegos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/register">Crear cuenta</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Fireplay Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿Qué es <span className="text-orange-500">Fireplay</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Fireplay es una plataforma moderna que te permite descubrir y adquirir los mejores videojuegos del
                mercado. Utilizamos tecnologías de vanguardia como Next.js 15, React 19 y Firebase para ofrecerte una
                experiencia fluida y segura.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Nuestra misión es conectar a los jugadores con sus títulos favoritos de manera sencilla, proporcionando
                información detallada, opiniones de la comunidad y los mejores precios.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/info">
                  Más información <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-fireplay.jpg"
                alt="Sobre Fireplay"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <GameController className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Explora</h3>
              <p className="text-gray-600">
                Navega por nuestro extenso catálogo de videojuegos, filtra por categorías y descubre nuevos títulos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Conecta</h3>
              <p className="text-gray-600">
                Crea tu cuenta para guardar favoritos, gestionar tu carrito y acceder a funciones exclusivas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Disfruta</h3>
              <p className="text-gray-600">
                Adquiere tus juegos favoritos con total seguridad y comienza a disfrutar de experiencias únicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar tu aventura?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de jugadores que ya disfrutan de la experiencia Fireplay.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/games">Explorar catálogo</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
