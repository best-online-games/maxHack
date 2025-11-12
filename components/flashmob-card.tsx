"use client"

import type { Flashmob } from "@/lib/types"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface FlashmobCardProps {
  flashmob: Flashmob
  userId: string
  isParticipating: boolean
}

export function FlashmobCard({ flashmob, userId, isParticipating: initialIsParticipating }: FlashmobCardProps) {
  const [isParticipating, setIsParticipating] = useState(initialIsParticipating)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleJoin = async () => {
    if (isParticipating) return

    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("flashmob_participants").insert({
        user_id: userId,
        flashmob_id: flashmob.id,
      })

      if (error) throw error

      setIsParticipating(true)
      router.refresh()
    } catch (err) {
      console.error("[v0] Error joining flashmob:", err)
      alert("Не удалось присоединиться к флешмобу")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-gray-900">{flashmob.title}</h3>
      <p className="mb-3 text-sm text-gray-600">{flashmob.event_time}</p>
      {flashmob.description && <p className="mb-4 text-sm text-gray-700">{flashmob.description}</p>}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white">
          +{flashmob.points} оч.
        </span>
        <button
          onClick={handleJoin}
          disabled={isLoading || isParticipating}
          className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
            isParticipating ? "bg-green-100 text-green-700" : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Загрузка..." : isParticipating ? "Участвую" : "Участвовать"}
        </button>
      </div>
    </div>
  )
}
