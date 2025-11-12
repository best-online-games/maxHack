export function HeroBanner() {
  return (
    <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-teal-500 p-6 text-white shadow-lg">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide opacity-90">ДОБРО.РЯДОМ</p>
      <h2 className="mb-3 text-2xl font-bold leading-tight">Сделай добро за 10–30 минут</h2>
      <p className="mb-4 text-sm opacity-90">Начни с простого — очки за каждое действие, уровень растёт.</p>
      <div className="flex gap-2">
        <a
          href="/activities?quick=true"
          className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
        >
          Быстрый старт
        </a>
      </div>
    </div>
  )
}
