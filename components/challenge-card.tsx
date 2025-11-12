import type { Challenge } from "@/lib/types"

interface ChallengeCardProps {
  challenge: Challenge
  userProgress?: {
    current_count: number
    is_completed: boolean
  }
  userId: string
}

export function ChallengeCard({ challenge, userProgress }: ChallengeCardProps) {
  const currentCount = userProgress?.current_count || 0
  const isCompleted = userProgress?.is_completed || false
  const progress = Math.min((currentCount / challenge.target_count) * 100, 100)

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{challenge.icon || "⚡"}</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{challenge.title}</h3>
            <p className="text-xs text-gray-600">{challenge.description}</p>
          </div>
        </div>
        {isCompleted && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Выполнено</span>
        )}
      </div>

      <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">
          Прогресс: {currentCount} / {challenge.target_count}
        </span>
        <span className="font-semibold text-gray-900">
          Очки: {challenge.points_reward} / XP: {challenge.xp_reward}
        </span>
      </div>
    </div>
  )
}
