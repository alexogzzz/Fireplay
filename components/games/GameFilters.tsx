"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GameFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [ordering, setOrdering] = useState(searchParams.get("ordering") || "-rating")

  const handleFilterChange = (value: string) => {
    setOrdering(value)
    router.push(`/games?ordering=${value}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Ordenar por:</span>
        <Select value={ordering} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-rating">Mejor valorados</SelectItem>
            <SelectItem value="rating">Peor valorados</SelectItem>
            <SelectItem value="-released">Más recientes</SelectItem>
            <SelectItem value="released">Más antiguos</SelectItem>
            <SelectItem value="name">Nombre (A-Z)</SelectItem>
            <SelectItem value="-name">Nombre (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={ordering === "-rating" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange("-rating")}
          className={ordering === "-rating" ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          Mejor valorados
        </Button>
        <Button
          variant={ordering === "-released" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange("-released")}
          className={ordering === "-released" ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          Más recientes
        </Button>
        <Button
          variant={ordering === "name" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange("name")}
          className={ordering === "name" ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          A-Z
        </Button>
      </div>
    </div>
  )
}
