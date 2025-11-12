"use client"

import type { Reward } from "@/lib/types"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface RewardCardProps {
  reward: Reward
  userId: string
  userCoins: number
}

export function RewardCard({ reward, userId, userCoins }: RewardCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const canAfford = userCoins >= reward.coins_cost

  const handlePurchase = async () => {
    if (!canAfford) {
      alert("Недостаточно монет!")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      // Создаем покупку
      const { error: purchaseError } = await supabase.from("user_rewards").insert({
        user_id: userId,
        reward_id: reward.id,
        status: "pending",
      })

      if (purchaseError) throw purchaseError

      // Списываем монеты
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          coins: userCoins - reward.coins_cost,
        })
        .eq("id", userId)

      if (updateError) throw updateError

      alert(`Поздравляем! Вы получили: ${reward.title}`)
      router.refresh()
    } catch (err) {
      console.error("[v0] Error purchasing reward:", err)
      alert("Не удалось приобрести подарок")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-100">
        <span className="text-4xl">🎁</span>
      </div>
      <h3 className="mb-1 text-sm font-semibold text-gray-900">{reward.title}</h3>
      <p className="mb-3 text-xs text-gray-600">{reward.coins_cost} очков</p>
      <button
        onClick={handlePurchase}
        disabled={isLoading || !canAfford}
        className={`w-full rounded-full px-4 py-2 text-xs font-semibold transition ${
          !canAfford ? "bg-gray-200 text-gray-400" : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        {isLoading ? "..." : "Получить"}
      </button>
    </div>
  )
}
