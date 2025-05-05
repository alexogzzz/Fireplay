import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fireplay</h3>
            <p className="text-gray-400 mb-4">Tu tienda de videojuegos online con las mejores ofertas y novedades.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-400 hover:text-white">
                  Juegos
                </Link>
              </li>
              <li>
                <Link href="/info" className="text-gray-400 hover:text-white">
                  Información
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Mi cuenta</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Calle Tecnología, 123</li>
              <li>28001 Madrid, España</li>
              <li>info@fireplay.com</li>
              <li>+34 91 123 45 67</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Fireplay. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Este es un proyecto educativo. Los precios y productos son ficticios.</p>
        </div>
      </div>
    </footer>
  )
}
