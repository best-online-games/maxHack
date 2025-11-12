"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

interface Reward {
  id: string;
  title: string;
  description: string;
  coins_cost: number;
  image_url?: string;
  stock_quantity?: number;
}

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "Стикер-пак 'Добро.Рядом'",
    description: "Набор из 12 уникальных стикеров для мессенджеров с символикой волонтерства",
    coins_cost: 200,
    stock_quantity: 100,
  },
  {
    id: "2",
    title: "Эко-сумка",
    description: "Многоразовая сумка из переработанных материалов с принтом 'Делай добро'",
    coins_cost: 450,
    stock_quantity: 50,
  },
  {
    id: "3",
    title: "Футболка волонтера",
    description: "Качественная хлопковая футболка с логотипом проекта",
    coins_cost: 800,
    stock_quantity: 30,
  },
  {
    id: "4",
    title: "Термокружка",
    description: "Термокружка из нержавеющей стали 500мл с гравировкой",
    coins_cost: 650,
    stock_quantity: 45,
  },
  {
    id: "5",
    title: "Блокнот 'Мои добрые дела'",
    description: "Красивый блокнот в твердой обложке для записи достижений",
    coins_cost: 300,
    stock_quantity: 80,
  },
  {
    id: "6",
    title: "Значок волонтера",
    description: "Металлический значок с эмалью, можно носить на одежде",
    coins_cost: 150,
    stock_quantity: 200,
  },
  {
    id: "7",
    title: "Сертификат на кофе",
    description: "Сертификат на бесплатный кофе в партнерских кофейнях",
    coins_cost: 400,
    stock_quantity: 100,
  },
  {
    id: "8",
    title: "VIP-статус на месяц",
    description: "Приоритетный доступ к новым активностям и эксклюзивные челленджи",
    coins_cost: 1000,
    stock_quantity: 20,
  },
];

export default function RewardsPage() {
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  // Получаем монеты пользователя
  const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}");
  const userCoins = demoUser.coins || 0;

  const handlePurchase = (reward: Reward) => {
    if (userCoins < reward.coins_cost) {
      alert(
        `❌ Недостаточно монет!\n\nУ вас: ${userCoins} 🪙\nНужно: ${reward.coins_cost} 🪙\n\nУчаствуйте в активностях, чтобы заработать больше монет!`,
      );
      return;
    }

    if (confirm(`Купить "${reward.title}" за ${reward.coins_cost} монет?`)) {
      // Списываем монеты
      const updatedUser = {
        ...demoUser,
        coins: userCoins - reward.coins_cost,
      };
      localStorage.setItem("demo_user", JSON.stringify(updatedUser));

      // Сохраняем покупку
      const purchases = JSON.parse(localStorage.getItem("purchased_rewards") || "[]");
      purchases.push({
        reward_id: reward.id,
        title: reward.title,
        purchased_at: new Date().toISOString(),
      });
      localStorage.setItem("purchased_rewards", JSON.stringify(purchases));

      alert(
        `🎉 Поздравляем с покупкой!\n\n"${reward.title}"\n\n-${reward.coins_cost} монет\nОсталось: ${updatedUser.coins} 🪙\n\nПроверьте раздел "Мои покупки" в профиле.`,
      );

      // Обновляем страницу
      window.location.reload();
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
              <h1 className="text-lg font-semibold">🎁 Магазин подарков</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>

          {/* Баланс монет */}
          <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 p-4 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Твой баланс</p>
                <p className="text-3xl font-bold">{userCoins} 🪙</p>
              </div>
              <a
                href="/activities"
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-white/30"
              >
                Заработать →
              </a>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          {/* Информация */}
          <div className="mb-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">💡 Как это работает?</p>
            <p>Участвуй в активностях, зарабатывай монеты и обменивай их на классные подарки!</p>
          </div>

          {/* Список подарков */}
          <div className="space-y-4">
            {mockRewards.map((reward) => {
              const canAfford = userCoins >= reward.coins_cost;

              return (
                <div
                  key={reward.id}
                  className={`overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md ${
                    !canAfford ? "opacity-60" : ""
                  }`}
                >
                  <div className="p-5">
                    {/* Иконка подарка */}
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100">
                      <span className="text-3xl">🎁</span>
                    </div>

                    {/* Информация */}
                    <div className="mb-4">
                      <h3 className="mb-2 text-lg font-bold text-gray-900">{reward.title}</h3>
                      <p className="mb-3 text-sm text-gray-600">{reward.description}</p>

                      {/* Наличие */}
                      {reward.stock_quantity && (
                        <p className="text-xs text-gray-500">📦 В наличии: {reward.stock_quantity} шт.</p>
                      )}
                    </div>

                    {/* Цена и кнопка */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 p-3 text-center">
                        <p className="text-xs text-white opacity-90">Цена</p>
                        <p className="text-2xl font-bold text-white">{reward.coins_cost} 🪙</p>
                      </div>
                      <button
                        onClick={() => handlePurchase(reward)}
                        disabled={!canAfford}
                        className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold transition ${
                          canAfford
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {canAfford ? "🛒 Купить" : "🔒 Недостаточно монет"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Призыв к действию */}
          {userCoins < 200 && (
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-5 text-center">
              <p className="mb-2 text-sm font-semibold text-gray-800">💪 Заработай больше монет!</p>
              <p className="mb-4 text-xs text-gray-600">
                Участвуй в активностях и челленджах, чтобы накопить на подарки мечты.
              </p>
              <a
                href="/activities"
                className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-semibold text-white hover:from-purple-700 hover:to-pink-700"
              >
                К активностям →
              </a>
            </div>
          )}

          {/* Мои покупки */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">📦 Мои покупки</h3>
            {(() => {
              const purchases = JSON.parse(localStorage.getItem("purchased_rewards") || "[]");
              if (purchases.length === 0) {
                return <p className="text-center text-sm text-gray-500 py-4">Вы еще ничего не купили</p>;
              }
              return (
                <div className="space-y-2">
                  {purchases
                    .slice(-5)
                    .reverse()
                    .map((purchase: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                        <span className="text-2xl">✅</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{purchase.title}</p>
                          <p className="text-xs text-gray-600">
                            {new Date(purchase.purchased_at).toLocaleDateString("ru-RU")}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })()}
          </div>
        </main>

        <BottomNav currentPage="rewards" />
      </div>
    </div>
  );
}
