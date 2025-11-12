"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    // Загружаем данные пользователя из localStorage
    const demoUser = localStorage.getItem("demo_user");
    if (demoUser) {
      const userData = JSON.parse(demoUser);
      setUser(userData);
      setDisplayName(userData.display_name || "");
      setCity(userData.city || "");
    } else {
      // Если пользователя нет, создаем дефолтного
      const defaultUser = {
        id: "demo-user-id",
        email: "demo@test.com",
        display_name: "Демо Пользователь",
        city: "Москва",
        country: "Россия",
        coins: 450,
        total_points: 1250,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem("demo_user", JSON.stringify(defaultUser));
      setUser(defaultUser);
      setDisplayName(defaultUser.display_name);
      setCity(defaultUser.city);
    }
  }, []);

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        display_name: displayName,
        city: city,
      };
      localStorage.setItem("demo_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      alert("✅ Профиль обновлен!");
    }
  };

  const handleLogout = () => {
    if (confirm("Вы уверены, что хотите выйти?")) {
      localStorage.removeItem("demo_user");
      localStorage.removeItem("demo_authenticated");
      localStorage.removeItem("joined_activities");
      localStorage.removeItem("user_challenges");
      router.push("/auth/login");
    }
  };

  const getLevel = (points: number) => {
    return Math.floor(points / 100) + 1;
  };

  const getNextLevelPoints = (points: number) => {
    const level = getLevel(points);
    return level * 100;
  };

  const getLevelProgress = (points: number) => {
    const currentLevelStart = (getLevel(points) - 1) * 100;
    const nextLevelStart = getLevel(points) * 100;
    const progress = points - currentLevelStart;
    const total = nextLevelStart - currentLevelStart;
    return (progress / total) * 100;
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const joinedActivities = JSON.parse(localStorage.getItem("joined_activities") || "[]");
  const userChallenges = JSON.parse(localStorage.getItem("user_challenges") || "{}");
  const completedChallenges = Object.values(userChallenges).filter((count: any) => count > 0).length;

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
              <h1 className="text-lg font-semibold">Профиль</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 py-6 space-y-4">
          {/* Карточка профиля */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-teal-500 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-3xl font-bold">{user.display_name?.charAt(0) || "Д"}</span>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-lg bg-white/20 px-3 py-2 text-white placeholder-white/70 backdrop-blur-sm"
                    placeholder="Ваше имя"
                  />
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{user.display_name}</h2>
                    <p className="text-sm opacity-90">
                      {isEditing ? (
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded-lg bg-white/20 px-3 py-2 text-white placeholder-white/70 backdrop-blur-sm"
                          placeholder="Город"
                        />
                      ) : (
                        `📍 ${user.city || "Не указан"}`
                      )}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/30"
              >
                {isEditing ? "💾 Сохранить" : "✏️ Изменить"}
              </button>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                <p className="mb-1 text-sm opacity-90">Очки</p>
                <p className="text-3xl font-bold">{user.total_points || 0}</p>
              </div>
              <div className="rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                <p className="mb-1 text-sm opacity-90">Монеты</p>
                <p className="text-3xl font-bold">{user.coins || 0} 🪙</p>
              </div>
            </div>
          </div>

          {/* Уровень */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Уровень</p>
                <p className="text-2xl font-bold text-gray-900">{getLevel(user.total_points || 0)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">До следующего</p>
                <p className="font-semibold text-blue-600">
                  {getNextLevelPoints(user.total_points || 0) - (user.total_points || 0)} оч.
                </p>
              </div>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all"
                style={{ width: `${getLevelProgress(user.total_points || 0)}%` }}
              />
            </div>
          </div>

          {/* Достижения */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">🏆 Достижения</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
                <p className="mb-1 text-2xl font-bold text-blue-700">{joinedActivities.length}</p>
                <p className="text-xs text-blue-700">Активностей</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
                <p className="mb-1 text-2xl font-bold text-purple-700">{completedChallenges}</p>
                <p className="text-xs text-purple-700">Челленджей</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
                <p className="mb-1 text-2xl font-bold text-green-700">{Math.floor((user.total_points || 0) / 100)}</p>
                <p className="text-xs text-green-700">Наград</p>
              </div>
            </div>
          </div>

          {/* Значки */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">🎖️ Значки</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: "🌟", name: "Новичок", earned: true },
                { icon: "❤️", name: "Донор", earned: user.total_points >= 300 },
                { icon: "🌱", name: "Эко-герой", earned: user.total_points >= 500 },
                { icon: "📚", name: "Учитель", earned: user.total_points >= 800 },
                { icon: "🐾", name: "Друг животных", earned: user.total_points >= 1000 },
                { icon: "⚡", name: "Активист", earned: user.total_points >= 1500 },
                { icon: "🔥", name: "Легенда", earned: user.total_points >= 2000 },
                { icon: "👑", name: "Чемпион", earned: user.total_points >= 3000 },
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-3 text-center ${
                    badge.earned ? "bg-gradient-to-br from-yellow-100 to-amber-100" : "bg-gray-100 opacity-50 grayscale"
                  }`}
                >
                  <p className="mb-1 text-2xl">{badge.icon}</p>
                  <p className="text-[10px] text-gray-700">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* История */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">📜 История</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                <span className="text-2xl">✨</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Присоединился к платформе</p>
                  <p className="text-xs text-gray-600">
                    {new Date(user.created_at).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {joinedActivities.length > 0 && (
                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                  <span className="text-2xl">🎯</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Первая активность</p>
                    <p className="text-xs text-gray-600">Отличное начало!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Настройки */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">⚙️ Настройки</h3>
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-gray-50 p-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100">
                🔔 Уведомления
              </button>
              <button className="w-full rounded-xl bg-gray-50 p-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100">
                🔒 Приватность
              </button>
              <button className="w-full rounded-xl bg-gray-50 p-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100">
                ℹ️ О приложении
              </button>
              <button
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-50 p-4 text-left text-sm font-medium text-red-600 hover:bg-red-100"
              >
                🚪 Выйти
              </button>
            </div>
          </div>

          {/* Информация о демо-режиме */}
          <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-5">
            <p className="mb-2 text-sm font-semibold text-yellow-800">💡 Демо-режим</p>
            <p className="mb-3 text-xs text-yellow-700">
              Все данные сохраняются локально в вашем браузере. Для полной функциональности настройте Supabase.
            </p>
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-yellow-600 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-700"
            >
              Узнать больше →
            </a>
          </div>
        </main>

        <BottomNav currentPage="profile" />
      </div>
    </div>
  );
}
