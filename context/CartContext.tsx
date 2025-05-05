"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { saveCart, getCart } from "@/lib/firebase/firestore"

interface CartItem {
  id: number
  name: string
  slug: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const { user } = useAuth()

  // Cargar carrito al iniciar
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // Si el usuario está autenticado, cargar desde Firestore
        try {
          const userCart = await getCart(user.uid)
          setCart(userCart)
        } catch (error) {
          console.error("Error loading cart from Firestore:", error)
          // Fallback a localStorage
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            setCart(JSON.parse(savedCart))
          }
        }
      } else {
        // Si no está autenticado, cargar desde localStorage
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      }
    }

    loadCart()
  }, [user])

  // Guardar carrito cuando cambia
  useEffect(() => {
    if (cart.length > 0) {
      // Siempre guardar en localStorage como respaldo
      localStorage.setItem("cart", JSON.stringify(cart))

      // Si el usuario está autenticado, guardar también en Firestore
      if (user) {
        saveCart(user.uid, cart).catch((error) => {
          console.error("Error saving cart to Firestore:", error)
        })
      }
    } else {
      localStorage.removeItem("cart")
      if (user) {
        saveCart(user.uid, []).catch((error) => {
          console.error("Error clearing cart in Firestore:", error)
        })
      }
    }
  }, [cart, user])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
