"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-orange-500">Fireplay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/games" className="text-gray-700 hover:text-orange-500">
              Juegos
            </Link>
            <Link href="/info" className="text-gray-700 hover:text-orange-500">
              Información
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-500">
              Contacto
            </Link>
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar juegos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/favorites" className="text-gray-700 hover:text-orange-500">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link href="/cart" className="text-gray-700 hover:text-orange-500 relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Panel de usuario</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">Favoritos</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/cart">Carrito</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar juegos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <nav className="space-y-4">
              <Link
                href="/games"
                className="block text-gray-700 hover:text-orange-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Juegos
              </Link>
              <Link
                href="/info"
                className="block text-gray-700 hover:text-orange-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Información
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-orange-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-gray-700 hover:text-orange-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    href="/favorites"
                    className="block text-gray-700 hover:text-orange-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Favoritos
                  </Link>
                  <Link
                    href="/cart"
                    className="block text-gray-700 hover:text-orange-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Carrito ({totalItems})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block text-red-500 hover:text-red-700"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2 border-t">
                  <Button asChild variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/login">Iniciar sesión</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/register">Registrarse</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
