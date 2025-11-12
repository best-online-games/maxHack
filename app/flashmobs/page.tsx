"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

interface Flashmob {
  id: string;
  title: string;
  description: string;
  event_time: string;
  points: number;
  location?: string;
  participants_count: number;
  max_participants?: number;
  is_active: boolean;
}

const mockFlashmobs: Flashmob[] = [
  {
    id: "1",
    title: "Чистый двор сегодня",
    description: "Присоединяйся к уборке территории вокруг жилого комплекса. Принеси перчатки и хорошее настроение!",
    event_time: "Сегодня 18:00–19:00",
    points: 100,
    location: "ЖК 'Солнечный', двор 5",
    participants_count: 12,
    max_participants: 20,
    is_active: true,
  },
  {
    id: "2",
    title: "Добрый утренний забег",
    description: "Утренняя пробежка с соседями в парке. Заряд бодрости и новые знакомства гарантированы!",
    event_time: "Завтра 08:00–09:00",
    points: 80,
    location: "Парк Горького, главный вход",
    participants_count: 8,
    max_participants: 15,
    is_active: true,
  },
  {
    id: "3",
    title: "Книжный обмен",
    description: "Принеси книги, которые уже прочитал, и обменяй их на новые. Подари книгам вторую жизнь!",
    event_time: "Суббота 15:00–17:00",
    points: 60,
    location: "Библиотека им. Пушкина",
    participants_count: 25,
    max_participants: 50,
    is_active: true,
  },
  {
    id: "4",
    title: "Вечер настольных игр",
    description: "Собираемся для игры в настолки в уютном кафе. Отличный способ познакомиться с волонтерами!",
    event_time: "Пятница 19:00–22:00",
    points: 50,
    location: "Кафе 'Игротека', центр города",
    participants_count: 18,
    max_participants: 30,
    is_active: true,
  },
  {
    id: "5",
    title: "Мастер-класс по оригами",
    description: "Научись делать журавликов из бумаги и подари их пациентам детской больницы.",
    event_time: "Воскресенье 14:00–16:00",
    points: 90,
    location: "Культурный центр",
    participants_count: 5,
    max_participants: 12,
    is_active: true,
  },
  {
    id: "6",
    title: "Фотопрогулка 'Красота рядом'",
    description: "Фотографируем красивые места города для социальных сетей проекта 'Добро.Рядом'",
    event_time: "Суббота 11:00–13:00",
    points: 70,
    location: "Старый город, начало у фонтана",
    participants_count: 7,
    max_participants: 10,
    is_active: true,
  },
];

export default function FlashmobsPage() {
  const router = useRouter();
  const [joinedFlashmobs, setJoinedFlashmobs] = useState<string[]>(() => {
    const saved = localStorage.getItem("joined_flashmobs");
    return saved ? JSON.parse(saved) : [];
  });

  const handleJoin = (flashmob: Flashmob) => {
    if (joinedFlashmobs.includes(flashmob.id)) {
      alert("Вы уже записаны на этот флешмоб!");
      return;
    }

    // Добавляем в список
    const updated = [...joinedFlashmobs, flashmob.id];
    setJoinedFlashmobs(updated);
    localStorage.setItem("joined_flashmobs", JSON.stringify(updated));

    // Начисляем очки (половину от полной награды за регистрацию)
    const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}");
    const registrationBonus = Math.floor(flashmob.points / 4);
    demoUser.total_points = (demoUser.total_points || 0) + registrationBonus;
    demoUser.coins = (demoUser.coins || 0) + Math.floor(registrationBonus / 10);
    localStorage.setItem("demo_user", JSON.stringify(demoUser));

    alert(
      `✅ Вы записались на флешмоб!\n\n"${flashmob.title}"\n\n📅 ${flashmob.event_time}\n📍 ${flashmob.location}\n\n+${registrationBonus} очков за регистрацию\n(+${flashmob.points} очков после участия)`,
    );
  };

  const handleCancel = (flashmobId: string) => {
    if (confirm("Отменить участие во флешмобе?")) {
      const updated = joinedFlashmobs.filter((id) => id !== flashmobId);
      setJoinedFlashmobs(updated);
      localStorage.setItem("joined_flashmobs", JSON.stringify(updated));
      alert("❌ Участие отменено");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-24">
      <div className="mx-auto max-w-md">
        {/* Баннер демо-режима */}
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Mock данные
        </div>

        {/* Шапка */}
        <header className="sticky top-0 z-10 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-lg font-semibold">💫 Флешмобы</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 py-6">
          {/* Информация */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-lg">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">Флешмобы</p>
            <h2 className="mb-3 text-2xl font-bold leading-tight">Объединяйся с другими волонтерами!</h2>
            <p className="text-sm opacity-90">
              Флешмобы — это короткие групповые активности, где можно встретить единомышленников и весело провести
              время.
            </p>
          </div>

          {/* Статистика */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-gray-600">Доступно</p>
              <p className="text-3xl font-bold text-blue-600">{mockFlashmobs.length}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-gray-600">Вы участвуете</p>
              <p className="text-3xl font-bold text-green-600">{joinedFlashmobs.length}</p>
            </div>
          </div>

          {/* Список флешмобов */}
          <div className="space-y-4">
            {mockFlashmobs.map((flashmob) => {
              const isJoined = joinedFlashmobs.includes(flashmob.id);
              const isFull = flashmob.max_participants && flashmob.participants_count >= flashmob.max_participants;

              return (
                <div
                  key={flashmob.id}
                  className={`overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md ${
                    isJoined ? "ring-2 ring-green-400" : ""
                  }`}
                >
                  <div className="p-5">
                    {/* Заголовок и статус */}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg font-bold text-gray-900">{flashmob.title}</h3>
                        <p className="text-sm text-gray-600">{flashmob.description}</p>
                      </div>
                      {isJoined && (
                        <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          ✓ Записан
                        </span>
                      )}
                    </div>

                    {/* Мета информация */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-600">📅</span>
                        <span className="font-medium text-gray-700">{flashmob.event_time}</span>
                      </div>
                      {flashmob.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-blue-600">📍</span>
                          <span className="text-gray-600">{flashmob.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-600">👥</span>
                        <span className="text-gray-600">
                          Участников: {flashmob.participants_count}
                          {flashmob.max_participants && ` / ${flashmob.max_participants}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-600">⭐</span>
                        <span className="font-semibold text-teal-600">+{flashmob.points} очков</span>
                      </div>
                    </div>

                    {/* Прогресс бар участников */}
                    {flashmob.max_participants && (
                      <div className="mb-4">
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full transition-all ${isFull ? "bg-red-500" : "bg-blue-500"}`}
                            style={{
                              width: `${Math.min((flashmob.participants_count / flashmob.max_participants) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        {isFull && <p className="mt-1 text-xs text-red-600 font-medium">⚠️ Мест больше нет</p>}
                      </div>
                    )}

                    {/* Кнопки действий */}
                    {isJoined ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCancel(flashmob.id)}
                          className="flex-1 rounded-full border-2 border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Отменить участие
                        </button>
                        <button className="flex-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-green-700 hover:to-emerald-700">
                          Я на месте! ✓
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleJoin(flashmob)}
                        disabled={isFull}
                        className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                          isFull
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        }`}
                      >
                        {isFull ? "🔒 Мест нет" : "✨ Записаться"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Призыв к действию */}
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-5 text-center">
            <p className="mb-2 text-sm font-semibold text-gray-800">💡 Хочешь организовать свой флешмоб?</p>
            <p className="mb-4 text-xs text-gray-600">
              Создай активность и пригласи других волонтеров присоединиться к твоей идее!
            </p>
            <button className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700">
              Создать флешмоб
            </button>
          </div>

          {/* Правила */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">📋 Правила флешмобов</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Приходи вовремя или предупреди организатора</li>
              <li>• Уважай других участников</li>
              <li>• Помни о цели — делать добро вместе</li>
              <li>• Фотографируй и делись впечатлениями</li>
              <li>• Получай награды за участие</li>
            </ul>
          </div>
        </main>

        <BottomNav currentPage="flashmobs" />
      </div>
    </div>
  );
}
