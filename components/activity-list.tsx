import type { Activity } from "@/lib/types"

interface ActivityListProps {
  activities: Activity[]
}

export function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">Активности не найдены</p>
        <p className="mt-2 text-xs text-gray-400">Попробуйте изменить параметры поиска</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <a
          key={activity.id}
          href={`/activity/${activity.id}`}
          className="block rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-100">
              <span className="text-2xl">💝</span>
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-sm font-semibold leading-tight text-gray-900">{activity.title}</h3>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-xs text-gray-600">{activity.duration_minutes} мин</span>
                <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                  +{activity.points} оч.
                </span>
              </div>
              {activity.bonus_description && (
                <p className="text-xs font-medium text-teal-600">{activity.bonus_description}</p>
              )}
            </div>
            <button className="rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800">
              Открыть
            </button>
          </div>
        </a>
      ))}
    </div>
  )
}
