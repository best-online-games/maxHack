"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";

interface LeaderboardUser {
  id: string;
  display_name: string;
  avatar_url?: string;
  total_points: number;
  city?: string;
  rank: number;
}

// Mock данные лидеров
const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    display_name: "Анна Волонтёрова",
    total_points: 5420,
    city: "Москва",
    rank: 1,
  },
  {
    id: "2",
    display_name: "Дмитрий Добрый",
    total_points: 4850,
    city: "Санкт-Петербург",
    rank: 2,
  },
  {
    id: "3",
    display_name: "Мария Помощница",
    total_points: 4200,
    city: "Москва",
    rank: 3,
  },
  {
    id: "4",
    display_name: "Иван Активный",
    total_points: 3890,
    city: "Казань",
    rank: 4,
  },
  {
    id: "5",
    display_name: "Елена Светлая",
    total_points: 3650,
    city: "Екатеринбург",
    rank: 5,
  },
  {
    id: "6",
    display_name: "Петр Заботливый",
    total_points: 3420,
    city: "Москва",
    rank: 6,
  },
  {
    id: "7",
    display_name: "Ольга Сердечная",
    total_points: 3180,
    city: "Новосибирск",
    rank: 7,
  },
  {
    id: "8",
    display_name: "Алексей Смелый",
    total_points: 2950,
    city: "Москва",
    rank: 8,
  },
  {
    id: "9",
    display_name: "Наталья Добрая",
    total_points: 2720,
    city: "Краснодар",
    rank: 9,
  },
  {
    id: "10",
    display_name: "Сергей Отзывчивый",
    total_points: 2500,
    city: "Москва",
    rank: 10,
  },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<"all" | "city">("all");
  const [loading] = useState(false);

  // Получаем текущего пользователя
  const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}");
  const currentUserPoints = demoUser.total_points || 1250;
  const currentUserCity = demoUser.city || "Москва";

  // Фильтрация по городу
  const filteredLeaderboard =
    filter === "city" ? mockLeaderboard.filter((user) => user.city === currentUserCity) : mockLeaderboard;

  // Находим позицию текущего пользователя
  const currentUserRank = mockLeaderboard.findIndex((user) => currentUserPoints >= user.total_points);
  const userRank = currentUserRank === -1 ? mockLeaderboard.length + 1 : currentUserRank + 1;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-amber-500";
    if (rank === 2) return "from-gray-300 to-gray-400";
    if (rank === 3) return "from-orange-400 to-orange-500";
    return "from-blue-400 to-blue-500";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-24">
      <div className="mx-auto max-w-md">
        {/* Баннер демо-режима */}
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Mock данные
        </div>

        <header className="sticky top-0 z-10 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-lg font-semibold">🏆 Рейтинг лидеров</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>

          {/* Фильтры */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              🌍 Все
            </button>
            <button
              onClick={() => setFilter("city")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === "city"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              📍 Мой город
            </button>
          </div>
        </header>

        <main className="px-4 pt-4">
          {/* Карточка текущего пользователя */}
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">Твоя позиция</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-2xl font-bold">{getRankIcon(userRank)}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{demoUser.display_name || "Демо Пользователь"}</p>
                  <p className="text-sm opacity-90">{currentUserCity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{currentUserPoints}</p>
                <p className="text-sm opacity-90">очков</p>
              </div>
            </div>
          </div>

          {/* Топ-3 */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {filteredLeaderboard.slice(0, 3).map((user, index) => (
              <div
                key={user.id}
                className={`rounded-2xl bg-gradient-to-br ${getRankColor(index + 1)} p-4 text-center text-white shadow-lg ${
                  index === 0 ? "col-span-3" : ""
                }`}
              >
                <div className="mb-2 text-4xl">{getRankIcon(index + 1)}</div>
                <p className="mb-1 text-sm font-bold">{user.display_name}</p>
                <p className="text-xs opacity-90">{user.city}</p>
                <p className="mt-2 text-xl font-bold">{user.total_points}</p>
                <p className="text-xs opacity-90">очков</p>
              </div>
            ))}
          </div>

          {/* Остальные участники */}
          <div className="space-y-2">
            {filteredLeaderboard.slice(3).map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-100">
                  <span className="font-bold text-gray-700">{user.rank}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user.display_name}</p>
                  <p className="text-xs text-gray-500">📍 {user.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{user.total_points}</p>
                  <p className="text-xs text-gray-500">очков</p>
                </div>
              </div>
            ))}
          </div>

          {/* Призыв к действию */}
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 p-5 text-center">
            <p className="mb-2 text-sm font-semibold text-gray-800">💪 Хочешь подняться выше?</p>
            <p className="mb-4 text-xs text-gray-600">
              Участвуй в активностях и челленджах, чтобы заработать больше очков!
            </p>
            <a
              href="/activities"
              className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-teal-700"
            >
              К активностям →
            </a>
          </div>

          {/* Информация */}
          <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-2">ℹ️ Как работает рейтинг?</p>
            <ul className="space-y-1 text-xs">
              <li>• Очки начисляются за каждую завершенную активность</li>
              <li>• Рейтинг обновляется в реальном времени</li>
              <li>• Топ-10 получают специальные награды каждый месяц</li>
              <li>• Чем больше активностей — тем выше позиция</li>
            </ul>
          </div>
        </main>

        <BottomNav currentPage="home" />
      </div>
    </div>
  );
}
