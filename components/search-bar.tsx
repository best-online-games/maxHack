"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  initialSearch?: string
}

export function SearchBar({ initialSearch }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(initialSearch || "")

  const handleSearch = (value: string) => {
    setSearch(value)
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    startTransition(() => {
      router.push(`/activities?${params.toString()}`)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Найти активность / тег"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pr-10"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          </div>
        )}
      </div>
      <button className="rounded-full bg-white p-2.5 shadow-sm">
        <span className="text-lg">🔍</span>
      </button>
    </div>
  )
}
