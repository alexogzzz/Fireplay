"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Tipo de usuario simulado
interface MockUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  metadata: {
    creationTime: string
  }
}

interface AuthContextType {
  user: MockUser | null
  loading: boolean
  register: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Simular carga del usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("mockUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const register = async (name: string, email: string, password: string) => {
    // Simular registro
    console.log("Registrando usuario:", { name, email, password: "***" })
    
    // Crear usuario simulado
    const mockUser: MockUser = {
      uid: `mock-${Date.now()}`,
      email,
      displayName: name,
      photoURL: null,
      metadata: {
        creationTime: new Date().toISOString()
      }
    }
    
    // Guardar en localStorage
    localStorage.setItem("mockUser", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const login = async (email: string, password: string) => {
    // Simular login
    console.log("Iniciando sesión:", { email, password: "***" })
    
    // Crear usuario simulado
    const mockUser: MockUser = {
      uid: `mock-${Date.now()}`,
      email,
      displayName: "Usuario de prueba",
      photoURL: null,
      metadata: {
        creationTime: new Date().toISOString()
      }
    }
    
    // Guardar en localStorage
    localStorage.setItem("mockUser", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = async () => {
    // Simular logout
    localStorage.removeItem("mockUser")
    setUser(null)
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}