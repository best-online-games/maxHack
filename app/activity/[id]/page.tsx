"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import type { Activity } from "@/lib/types";

// Mock данные активностей (те же что и на главной)
const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Сдать кровь впервые (в паре)",
    description:
      "Страшно одному в первый раз? Приходи в паре — наставник поможет. По ТК — выходной за сдачу крови. Донорство крови — это безопасная и важная процедура, которая может спасти чью-то жизнь. Мы поможем вам пройти все этапы и ответим на все вопросы.",
    duration_minutes: 120,
    points: 300,
    bonus_description: "+50% за совместное прохождение",
    bonus_multiplier: 1.5,
    location: "Москва, ул. Поликлиническая 3",
    max_participants: 10,
    current_participants: 3,
    event_date: new Date(Date.now() + 86400000 * 2).toISOString(),
    created_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: "2",
    title: "Сопроводить коляску на горку",
    description:
      "Помоги родителям с колясками подняться по склону в парке. Многие родители с маленькими детьми сталкиваются с трудностями на прогулках. Твоя помощь будет очень ценной!",
    duration_minutes: 30,
    points: 120,
    location: "Парк Сокольники",
    current_participants: 0,
    created_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: "3",
    title: "Онлайн-урок цифровой гигиены",
    description:
      "Проведи урок по безопасности в интернете для пожилых людей. Расскажи о том, как защитить свои данные, не попасться на мошенников и безопасно пользоваться интернет-банкингом.",
    duration_minutes: 40,
    points: 80,
    location: "Онлайн",
    max_participants: 20,
    current_participants: 8,
    event_date: new Date(Date.now() + 86400000 * 5).toISOString(),
    created_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: "4",
    title: "Сдать макулатуру — 1 кг",
    description:
      "Собери и сдай макулатуру на переработку. Помоги природе! Каждый килограмм макулатуры спасает одно дерево от вырубки.",
    duration_minutes: 25,
    points: 50,
    location: "Пункт приема, ул. Ленина 45",
    current_participants: 0,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    is_active: true,
  },
  {
    id: "5",
    title: "Помощь в приюте для животных",
    description:
      "Покорми и выгуляй собак в местном приюте. Животным в приюте нужно внимание и забота. Ты можешь подарить им радость!",
    duration_minutes: 90,
    points: 150,
    location: "Приют 'Добрые руки', Химки",
    max_participants: 5,
    current_participants: 2,
    event_date: new Date(Date.now() + 86400000 * 3).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_active: true,
  },
  {
    id: "6",
    title: "Уборка территории у детской площадки",
    description:
      "Помоги навести порядок на детской площадке в твоем районе. Чистая площадка — безопасное место для игр детей.",
    duration_minutes: 60,
    points: 100,
    location: "Детская площадка, ул. Пушкина 12",
    max_participants: 15,
    current_participants: 7,
    event_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    is_active: true,
  },
  {
    id: "7",
    title: "Чтение книг детям в библиотеке",
    description: "Почитай книги детям в районной библиотеке. Развивай любовь к чтению у младшего поколения!",
    duration_minutes: 45,
    points: 90,
    location: "Библиотека №7, ул. Гоголя 23",
    max_participants: 3,
    current_participants: 1,
    event_date: new Date(Date.now() + 86400000 * 6).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    is_active: true,
  },
  {
    id: "8",
    title: "Посадка деревьев в парке",
    description: "Присоединяйся к акции по озеленению парка. Вместе мы сделаем наш город зеленее и чище!",
    duration_minutes: 120,
    points: 200,
    bonus_description: "+100 очков за посадку более 5 деревьев",
    bonus_multiplier: 1.5,
    location: "Центральный парк",
    max_participants: 30,
    current_participants: 18,
    event_date: new Date(Date.now() + 86400000 * 7).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    is_active: true,
  },
];

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Находим активность по ID
  const activity = mockActivities.find((a) => a.id === resolvedParams.id);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-xl font-bold mb-2">Активность не найдена</h1>
          <p className="text-gray-600 mb-6">Такой активности не существует</p>
          <a
            href="/activities"
            className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
          >
            К списку активностей
          </a>
        </div>
      </div>
    );
  }

  // Проверяем участие из localStorage
  const joinedActivities = JSON.parse(localStorage.getItem("joined_activities") || "[]");
  const alreadyJoined = joinedActivities.includes(activity.id);

  const handleJoin = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Сохраняем участие
      const joined = JSON.parse(localStorage.getItem("joined_activities") || "[]");
      if (!joined.includes(activity.id)) {
        joined.push(activity.id);
        localStorage.setItem("joined_activities", JSON.stringify(joined));

        // Обновляем очки пользователя
        const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}");
        demoUser.total_points = (demoUser.total_points || 0) + activity.points;
        demoUser.coins = (demoUser.coins || 0) + Math.floor(activity.points / 10);
        localStorage.setItem("demo_user", JSON.stringify(demoUser));
      }

      setIsJoined(true);
      setIsLoading(false);

      alert(
        `✅ Вы присоединились к активности!\n\n+${activity.points} очков\n+${Math.floor(activity.points / 10)} монет\n\n${activity.bonus_description ? "Бонус: " + activity.bonus_description : ""}`,
      );
    }, 800);
  };

  const handleComplete = () => {
    alert(
      `🎉 Активность завершена!\n\nВы получили:\n+${activity.points} очков\n+${Math.floor(activity.points / 10)} монет\n\nПродолжайте в том же духе!`,
    );
    router.push("/");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-8">
      <div className="mx-auto max-w-md">
        {/* Баннер демо-режима */}
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Mock данные
        </div>

        <header className="sticky top-0 z-10 bg-white/90 px-4 py-3 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="text-2xl">
              ←
            </button>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-base font-semibold">Активность</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 py-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            {/* Иконка */}
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100">
              <span className="text-4xl">💝</span>
            </div>

            {/* Заголовок */}
            <h2 className="mb-3 text-2xl font-bold text-gray-900">{activity.title}</h2>

            {/* Мета информация */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
                <span className="text-sm text-gray-700">⏱️ {activity.duration_minutes} мин</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-1 text-sm font-semibold text-white">
                  +{activity.points} оч.
                </span>
              </div>
              {activity.location && (
                <div className="w-full flex items-center gap-1.5 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{activity.location}</span>
                </div>
              )}
            </div>

            {/* Дата события */}
            {activity.event_date && (
              <div className="mb-4 rounded-xl bg-blue-50 p-3">
                <p className="text-sm text-blue-800">
                  <strong>📅 Дата:</strong> {formatDate(activity.event_date)}
                </p>
              </div>
            )}

            {/* Участники */}
            {activity.max_participants && (
              <div className="mb-4 rounded-xl bg-purple-50 p-3">
                <p className="text-sm text-purple-800">
                  <strong>👥 Участники:</strong> {activity.current_participants} / {activity.max_participants}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-purple-200">
                  <div
                    className="h-full bg-purple-600 transition-all"
                    style={{ width: `${(activity.current_participants / activity.max_participants) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Описание */}
            <p className="mb-6 text-sm leading-relaxed text-gray-700">{activity.description}</p>

            {/* Бонус */}
            {activity.bonus_description && (
              <div className="mb-6 rounded-xl bg-gradient-to-r from-teal-50 to-green-50 p-4 border border-teal-200">
                <p className="text-sm font-semibold text-teal-800">⭐ Бонус: {activity.bonus_description}</p>
              </div>
            )}

            {/* Кнопки действий */}
            <div className="flex flex-col gap-3">
              {!alreadyJoined && !isJoined ? (
                <>
                  <button
                    onClick={handleJoin}
                    disabled={isLoading}
                    className="w-full rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-4 text-center text-base font-semibold text-white transition hover:from-blue-700 hover:to-teal-700 disabled:opacity-50"
                  >
                    {isLoading ? "Присоединение..." : "✨ Присоединиться"}
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="w-full rounded-full border-2 border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Назад
                  </button>
                </>
              ) : (
                <>
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
                    <p className="text-green-800 font-semibold">✅ Вы участвуете в этой активности</p>
                  </div>
                  <button
                    onClick={handleComplete}
                    className="w-full rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-center text-base font-semibold text-white transition hover:from-green-700 hover:to-emerald-700"
                  >
                    🎯 Завершить активность
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="w-full rounded-full border-2 border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Назад к списку
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow">
            <h3 className="mb-3 font-semibold text-gray-900">ℹ️ Полезная информация</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Возьмите с собой паспорт (если требуется)</li>
              <li>• Придите за 10 минут до начала</li>
              <li>• При отмене предупредите заранее</li>
              <li>• После завершения получите очки автоматически</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
