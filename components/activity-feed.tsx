import type { Activity } from "@/lib/types"

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center">
        <p className="text-sm text-gray-500">Нет доступных активностей</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <a
          key={activity.id}
          href={`/activity/${activity.id}`}
          className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-100">
            <span className="text-2xl">💝</span>
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold text-gray-900">{activity.title}</h3>
            <div className="mb-2 flex items-center gap-3 text-xs text-gray-600">
              <span>{activity.duration_minutes} мин</span>
              <span className="rounded-full bg-gray-900 px-2 py-0.5 font-medium text-white">
                +{activity.points} оч.
              </span>
            </div>
            {activity.bonus_description && (
              <p className="text-xs font-medium text-teal-600">{activity.bonus_description}</p>
            )}
          </div>
          <button className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white">Открыть</button>
        </a>
      ))}
    </div>
  )
}
