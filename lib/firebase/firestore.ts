import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./config"
import type { Game } from "../types"

// Favoritos
export async function toggleFavorite(userId: string, game: Game): Promise<boolean> {
  const favoriteRef = doc(db, "users", userId, "favorites", game.id.toString())
  const favoriteDoc = await getDoc(favoriteRef)

  if (favoriteDoc.exists()) {
    await deleteDoc(favoriteRef)
    return false
  } else {
    await setDoc(favoriteRef, {
      id: game.id,
      slug: game.slug,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
      genres: game.genres,
      addedAt: serverTimestamp(),
    })
    return true
  }
}

export async function checkIsFavorite(userId: string, gameId: number): Promise<boolean> {
  const favoriteRef = doc(db, "users", userId, "favorites", gameId.toString())
  const favoriteDoc = await getDoc(favoriteRef)
  return favoriteDoc.exists()
}

export async function getFavorites(userId: string): Promise<Game[]> {
  const favoritesRef = collection(db, "users", userId, "favorites")
  const favoritesSnapshot = await getDocs(favoritesRef)

  return favoritesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    isFavorite: true,
  })) as Game[]
}

// Carrito
export async function saveCart(userId: string, cart: any[]) {
  await setDoc(
    doc(db, "users", userId),
    {
      cart,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export async function getCart(userId: string) {
  const userDoc = await getDoc(doc(db, "users", userId))

  if (userDoc.exists() && userDoc.data().cart) {
    return userDoc.data().cart
  }

  return []
}

// Mensajes de contacto
export async function saveContactMessage(message: any) {
  const messageData = {
    ...message,
    createdAt: serverTimestamp(),
  }

  await addDoc(collection(db, "messages"), messageData)
}

export async function getUserMessages(userId: string) {
  const messagesRef = collection(db, "messages")
  const q = query(messagesRef, where("userId", "==", userId))
  const messagesSnapshot = await getDocs(q)

  return messagesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
