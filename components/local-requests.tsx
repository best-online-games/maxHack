import type { HelpRequest } from "@/lib/types"

interface LocalRequestsProps {
  requests: HelpRequest[]
}

export function LocalRequests({ requests }: LocalRequestsProps) {
  if (requests.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center">
        <p className="text-sm text-gray-500">Нет активных заявок поблизости</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <a
          key={request.id}
          href={`/request/${request.id}`}
          className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-teal-100">
            <span className="text-2xl">👥</span>
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold text-gray-900">
              {request.requester_name}, {request.requester_age}
            </h3>
            <p className="mb-2 text-xs text-gray-600">{request.title}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📍 {request.distance_meters}м</span>
              {request.points > 0 && <span className="text-teal-600">+{request.points} оч.</span>}
            </div>
          </div>
          <button className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white">Помочь</button>
        </a>
      ))}
    </div>
  )
}
