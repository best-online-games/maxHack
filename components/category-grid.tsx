export function CategoryGrid() {
  const categories = [
    { id: "suggest", icon: "💡", label: "Предложить...", subtitle: "подтвердим в чате" },
    { id: "ask", icon: "👥", label: "Попросить...", subtitle: "для себя или близких" },
    { id: "donate", icon: "🎁", label: "Пожертвовать", subtitle: "празднуя и благодаря" },
    { id: "challenges", icon: "⚡", label: "Челленджи", subtitle: "очки и XP" },
  ]

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`/${cat.id}`}
          className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 text-xl">
            {cat.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{cat.label}</p>
            <p className="text-xs text-gray-500">{cat.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
