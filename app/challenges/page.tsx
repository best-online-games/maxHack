"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import type { Challenge, UserChallenge } from "@/lib/types";

// Mock данные челленджей
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Марафон добрых дел",
    description: "Сделай 250 добрых дел и получи специальный значок",
    icon: "⚡",
    target_count: 250,
    points_reward: 80,
    xp_reward: 250,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Сдай 1 кг макулатуры",
    description: "Помоги природе - сдай макулатуру на переработку",
    icon: "📄",
    target_count: 1,
    points_reward: 5,
    xp_reward: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Сопроводи незрячего соседа в МФЦ",
    description: "Помоги людям с ограниченными возможностями",
    icon: "🤝",
    target_count: 1,
    points_reward: 120,
    xp_reward: 120,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Мини-урок цифровой гигиены",
    description: "Научи пожилых людей безопасности в интернете",
    icon: "💻",
    target_count: 1,
    points_reward: 8,
    xp_reward: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Волонтер недели",
    description: "Участвуй в 5 активностях за неделю",
    icon: "🌟",
    target_count: 5,
    points_reward: 150,
    xp_reward: 200,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Помощник животных",
    description: "Посети приют для животных 3 раза",
    icon: "🐾",
    target_count: 3,
    points_reward: 100,
    xp_reward: 150,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Эко-воин",
    description: "Участвуй в 10 экологических активностях",
    icon: "🌱",
    target_count: 10,
    points_reward: 200,
    xp_reward: 300,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Донор крови",
    description: "Стань донором крови впервые",
    icon: "❤️",
    target_count: 1,
    points_reward: 300,
    xp_reward: 400,
    created_at: new Date().toISOString(),
  },
];

export default function ChallengesPage() {
  const [userChallenges, setUserChallenges] = useState<Record<string, number>>(() => {
    // Загружаем прогресс из localStorage
    const saved = localStorage.getItem("user_challenges");
    return saved ? JSON.parse(saved) : {};
  });

  const handleAcceptChallenge = (challengeId: string) => {
    const newProgress = { ...userChallenges };
    if (!newProgress[challengeId]) {
      newProgress[challengeId] = 0;
      setUserChallenges(newProgress);
      localStorage.setItem("user_challenges", JSON.stringify(newProgress));
      alert("✅ Челлендж принят! Начинай выполнять задания.");
    }
  };

  const handleCompleteChallenge = (challenge: Challenge) => {
    const currentProgress = userChallenges[challenge.id] || 0;
    const newProgress = Math.min(currentProgress + 1, challenge.target_count);

    const updated = { ...userChallenges, [challenge.id]: newProgress };
    setUserChallenges(updated);
    localStorage.setItem("user_challenges", JSON.stringify(updated));

    if (newProgress >= challenge.target_count) {
      // Челлендж завершен
      const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}");
      demoUser.total_points = (demoUser.total_points || 0) + challenge.points_reward;
      demoUser.coins = (demoUser.coins || 0) + Math.floor(challenge.points_reward / 10);
      localStorage.setItem("demo_user", JSON.stringify(demoUser));

      alert(
        `🎉 Челлендж завершен!\n\n"${challenge.title}"\n\n+${challenge.points_reward} очков\n+${challenge.xp_reward} XP\n+${Math.floor(challenge.points_reward / 10)} монет`,
      );
    } else {
      alert(`📈 Прогресс: ${newProgress} / ${challenge.target_count}\n\nПродолжай в том же духе!`);
    }
  };

  const getChallengeProgress = (challengeId: string, targetCount: number) => {
    const current = userChallenges[challengeId] || 0;
    return {
      current,
      isAccepted: challengeId in userChallenges,
      isCompleted: current >= targetCount,
      percentage: Math.min((current / targetCount) * 100, 100),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-24">
      <div className="mx-auto max-w-md">
        {/* Баннер демо-режима */}
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Mock данные
        </div>

        <header className="sticky top-0 z-10 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-lg font-semibold">Челленджи</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 pt-4">
          {/* Статистика */}
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">Твои достижения</h2>
            <div className="flex items-baseline gap-4">
              <div>
                <p className="text-3xl font-bold">{Object.values(userChallenges).filter((v) => v > 0).length}</p>
                <p className="text-sm opacity-90">Активных</p>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  {
                    mockChallenges.filter((c) => {
                      const progress = userChallenges[c.id] || 0;
                      return progress >= c.target_count;
                    }).length
                  }
                </p>
                <p className="text-sm opacity-90">Завершено</p>
              </div>
            </div>
          </div>

          {/* Список челленджей */}
          <div className="space-y-3">
            {mockChallenges.map((challenge) => {
              const progress = getChallengeProgress(challenge.id, challenge.target_count);

              return (
                <div
                  key={challenge.id}
                  className={`overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md ${
                    progress.isCompleted ? "border-2 border-green-400" : ""
                  }`}
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-start gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                        <span className="text-3xl">{challenge.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-gray-900">{challenge.title}</h3>
                        <p className="text-xs text-gray-600">{challenge.description}</p>
                      </div>
                    </div>

                    {/* Награды */}
                    <div className="mb-3 flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
                        +{challenge.points_reward} оч.
                      </span>
                      <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-700">
                        +{challenge.xp_reward} XP
                      </span>
                    </div>

                    {/* Прогресс */}
                    {progress.isAccepted && (
                      <div className="mb-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-gray-700">
                            Прогресс: {progress.current} / {challenge.target_count}
                          </span>
                          <span className="font-semibold text-blue-600">{Math.round(progress.percentage)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full transition-all ${progress.isCompleted ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Кнопки */}
                    {progress.isCompleted ? (
                      <div className="rounded-lg bg-green-50 p-3 text-center">
                        <p className="text-sm font-semibold text-green-700">✅ Челлендж завершен!</p>
                      </div>
                    ) : progress.isAccepted ? (
                      <button
                        onClick={() => handleCompleteChallenge(challenge)}
                        className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-purple-700"
                      >
                        📈 Отметить прогресс
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAcceptChallenge(challenge.id)}
                        className="w-full rounded-full border-2 border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        Принять челлендж
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Подсказка */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">💡 Совет</p>
            <p>Челленджи помогают тебе расти как волонтеру. Выполняй их, получай награды и вдохновляй других!</p>
          </div>
        </main>

        <BottomNav currentPage="home" />
      </div>
    </div>
  );
}
