"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

interface Fund {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalRaised: number;
  goal: number;
}

const mockFunds: Fund[] = [
  {
    id: "1",
    name: "VK Добро",
    description: "Официальный благотворительный фонд VK, помогающий детям и взрослым по всей России",
    icon: "❤️",
    totalRaised: 15420000,
    goal: 20000000,
  },
  {
    id: "2",
    name: "Помощь детям",
    description: "Фонд помощи детям с тяжелыми заболеваниями, обеспечение лечения и реабилитации",
    icon: "👶",
    totalRaised: 8750000,
    goal: 10000000,
  },
  {
    id: "3",
    name: "Приюты для животных",
    description: "Помощь бездомным животным: корм, лечение, поиск хозяев",
    icon: "🐾",
    totalRaised: 3200000,
    goal: 5000000,
  },
  {
    id: "4",
    name: "Экология России",
    description: "Проекты по защите окружающей среды, посадка деревьев, очистка водоемов",
    icon: "🌱",
    totalRaised: 5600000,
    goal: 8000000,
  },
];

export default function DonatePage() {
  const router = useRouter();
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleDonate = () => {
    if (!selectedFund || donationAmount <= 0) {
      alert("❌ Выберите фонд и укажите сумму");
      return;
    }

    // Сохраняем донат
    const donations = JSON.parse(localStorage.getItem("user_donations") || "[]");
    donations.push({
      fund_id: selectedFund.id,
      fund_name: selectedFund.name,
      amount: donationAmount,
      date: new Date().toISOString(),
    });
    localStorage.setItem("user_donations", JSON.stringify(donations));

    // Начисляем бонусные очки (10% от суммы)
    const bonusPoints = Math.floor(donationAmount / 10);
    const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}");
    demoUser.total_points = (demoUser.total_points || 0) + bonusPoints;
    demoUser.coins = (demoUser.coins || 0) + Math.floor(bonusPoints / 10);
    localStorage.setItem("demo_user", JSON.stringify(demoUser));

    alert(
      `🎉 Спасибо за ваш вклад!\n\n${donationAmount} ₽ → "${selectedFund.name}"\n\n✨ Бонус:\n+${bonusPoints} очков\n+${Math.floor(bonusPoints / 10)} монет\n\nВаша доброта делает мир лучше!`,
    );

    // Сбрасываем форму
    setSelectedFund(null);
    setDonationAmount(0);
    setCustomAmount("");
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("ru-RU").format(amount);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
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
              <h1 className="text-lg font-semibold">🎁 Пожертвования</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 py-6">
          {/* Информационный блок */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-lg">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">Делай добро</p>
            <h2 className="mb-3 text-2xl font-bold leading-tight">Поддержи благотворительные фонды</h2>
            <p className="text-sm opacity-90">
              Твое пожертвование поможет тем, кто в этом нуждается. Празднуй и благодари, делясь добротой!
            </p>
          </div>

          {/* Выбор фонда */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Выбери фонд</h3>
            <div className="space-y-3">
              {mockFunds.map((fund) => {
                const isSelected = selectedFund?.id === fund.id;
                const progress = getProgressPercentage(fund.totalRaised, fund.goal);

                return (
                  <button
                    key={fund.id}
                    onClick={() => setSelectedFund(fund)}
                    className={`w-full rounded-2xl bg-white p-5 text-left shadow-sm transition hover:shadow-md ${
                      isSelected ? "ring-2 ring-pink-500" : ""
                    }`}
                  >
                    <div className="mb-3 flex items-start gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-rose-100">
                        <span className="text-3xl">{fund.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 font-bold text-gray-900">{fund.name}</h4>
                        <p className="text-xs text-gray-600">{fund.description}</p>
                      </div>
                      {isSelected && <span className="text-2xl">✓</span>}
                    </div>

                    {/* Прогресс сбора */}
                    <div className="mb-2">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-700">Собрано: {formatMoney(fund.totalRaised)} ₽</span>
                        <span className="font-semibold text-pink-600">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Цель: {formatMoney(fund.goal)} ₽</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Выбор суммы */}
          {selectedFund && (
            <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Выбери сумму</h3>

              {/* Быстрый выбор */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setDonationAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      donationAmount === amount
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {amount} ₽
                  </button>
                ))}
              </div>

              {/* Своя сумма */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Или укажи свою сумму</label>
                <div className="relative">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount(parseInt(e.target.value) || 0);
                    }}
                    placeholder="Введи сумму"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pr-12 text-gray-900 focus:border-pink-500 focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                </div>
              </div>

              {/* Бонусная информация */}
              {donationAmount > 0 && (
                <div className="mt-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4 text-sm">
                  <p className="font-semibold text-pink-800">
                    ✨ Бонус: +{Math.floor(donationAmount / 10)} очков за донат!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Кнопка пожертвования */}
          {selectedFund && donationAmount > 0 && (
            <button
              onClick={handleDonate}
              className="w-full rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:from-pink-700 hover:to-rose-700 hover:shadow-xl"
            >
              💝 Пожертвовать {donationAmount} ₽
            </button>
          )}

          {/* История донатов */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">📜 История пожертвований</h3>
            {(() => {
              const donations = JSON.parse(localStorage.getItem("user_donations") || "[]");
              if (donations.length === 0) {
                return (
                  <div className="py-8 text-center">
                    <p className="mb-2 text-4xl">🎁</p>
                    <p className="text-sm text-gray-500">Вы еще не делали пожертвований</p>
                  </div>
                );
              }
              return (
                <div className="space-y-2">
                  {donations
                    .slice(-10)
                    .reverse()
                    .map((donation: any, index: number) => (
                      <div key={index} className="flex items-center justify-between rounded-xl bg-pink-50 p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">❤️</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{donation.fund_name}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(donation.date).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-pink-600">{donation.amount} ₽</p>
                      </div>
                    ))}
                </div>
              );
            })()}
          </div>

          {/* Статистика */}
          {(() => {
            const donations = JSON.parse(localStorage.getItem("user_donations") || "[]");
            const totalDonated = donations.reduce((sum: number, d: any) => sum + d.amount, 0);
            if (totalDonated > 0) {
              return (
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white shadow-lg">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">Твой вклад</p>
                  <p className="text-4xl font-bold">{formatMoney(totalDonated)} ₽</p>
                  <p className="mt-2 text-sm opacity-90">
                    Ты помог {donations.length} {donations.length === 1 ? "фонду" : "фондам"}
                  </p>
                </div>
              );
            }
          })()}

          {/* Информация */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-sm text-blue-800">
            <p className="mb-2 font-semibold">💡 Как это работает?</p>
            <ul className="space-y-1 text-xs">
              <li>• Выбери фонд, которому хочешь помочь</li>
              <li>• Укажи сумму пожертвования</li>
              <li>• Получи бонусные очки (10% от суммы)</li>
              <li>• Вся сумма идет напрямую в фонд</li>
              <li>• Празднуй добрые дела и делись радостью</li>
            </ul>
          </div>

          {/* Призыв */}
          <div className="mt-6 rounded-2xl border-2 border-pink-300 bg-pink-50 p-5 text-center">
            <p className="mb-2 text-sm font-semibold text-pink-800">💖 Спасибо за твою доброту!</p>
            <p className="text-xs text-pink-700">
              Каждое пожертвование помогает изменить чью-то жизнь к лучшему. Ты — настоящий герой!
            </p>
          </div>
        </main>

        <BottomNav currentPage="home" />
      </div>
    </div>
  );
}
