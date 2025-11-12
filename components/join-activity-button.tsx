"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface JoinActivityButtonProps {
  activityId: string
  userId: string
  isJoined: boolean
  status?: string
}

export function JoinActivityButton({ activityId, userId, isJoined, status }: JoinActivityButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleJoin = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.from("user_activities").insert({
        user_id: userId,
        activity_id: activityId,
        status: "accepted",
      })

      if (error) throw error

      router.refresh()
    } catch (err) {
      console.error("[v0] Error joining activity:", err)
      setError(err instanceof Error ? err.message : "Ошибка при записи")
    } finally {
      setIsLoading(false)
    }
  }

  const handleComplete = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // Находим запись user_activity
      const { data: userActivity } = await supabase
        .from("user_activities")
        .select("id")
        .eq("user_id", userId)
        .eq("activity_id", activityId)
        .single()

      if (!userActivity) throw new Error("Активность не найдена")

      // Вызываем функцию завершения активности
      const { data, error } = await supabase.rpc("complete_activity", {
        p_user_activity_id: userActivity.id,
      })

      if (error) throw error

      if (data?.success) {
        alert(`Поздравляем! Вы получили ${data.points_earned} очков и ${data.coins_earned} монет!`)
        router.push("/")
      } else {
        throw new Error(data?.message || "Не удалось завершить активность")
      }
    } catch (err) {
      console.error("[v0] Error completing activity:", err)
      setError(err instanceof Error ? err.message : "Ошибка при завершении")
    } finally {
      setIsLoading(false)
    }
  }

  if (isJoined && status === "completed") {
    return (
      <Button disabled className="flex-1 bg-green-600">
        Выполнено ✓
      </Button>
    )
  }

  if (isJoined && status === "accepted") {
    return (
      <Button
        onClick={handleComplete}
        disabled={isLoading}
        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500"
      >
        {isLoading ? "Завершение..." : "Отметить выполнение"}
      </Button>
    )
  }

  return (
    <>
      <Button onClick={handleJoin} disabled={isLoading} className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600">
        {isLoading ? "Запись..." : "Найти напарника"}
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </>
  )
}
