export function QuickActions() {
  return (
    <div className="fixed bottom-20 left-1/2 flex -translate-x-1/2 gap-3">
      <a
        href="/leaderboard"
        className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-lg transition hover:shadow-xl"
      >
        <span className="text-lg">🏆</span>
        Рейтинг
      </a>
      <a
        href="/activities?filter=quick"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
      >
        <span className="text-lg">🔥</span>
        Do it now
      </a>
    </div>
  )
}
