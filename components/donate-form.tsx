"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface DonateFormProps {
  userId: string
}

export function DonateForm({ userId }: DonateFormProps) {
  const [amount, setAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDonate = async () => {
    if (!amount) {
      alert("Выберите сумму")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("donations").insert({
        user_id: userId,
        amount: amount,
        fund_name: "VK Добро",
      })

      if (error) throw error

      alert(`Спасибо за пожертвование ${amount}₽!`)
      router.push("/profile")
    } catch (err) {
      console.error("[v0] Error making donation:", err)
      alert("Не удалось сделать пожертвование")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex gap-3">
        {[100, 300, 500].map((value) => (
          <button
            key={value}
            onClick={() => setAmount(value)}
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition ${
              amount === value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            {value} ₽
          </button>
        ))}
      </div>

      <Button
        onClick={handleDonate}
        disabled={isLoading || !amount}
        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 py-6 text-base"
      >
        {isLoading ? "Обработка..." : "Оплатить в VK Добро"}
      </Button>
    </div>
  )
}
