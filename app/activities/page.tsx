"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { ActivityList } from "@/components/activity-list";
import { SearchBar } from "@/components/search-bar";
import type { Activity } from "@/lib/types";

// Mock данные активностей
const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Сдать кровь впервые (в паре)",
    description: "Страшно одному в первый раз? Приходи в паре — наставник поможет. По ТК — выходной за сдачу крови.",
    duration_minutes: 120,
    points: 300,
    bonus_description: "+50% за совместное прохождение",
    bonus_multiplier: 1.5,
    image_url: undefined,
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
    description: "Помоги родителям с колясками подняться по склону в парке",
    duration_minutes: 30,
    points: 120,
    image_url: undefined,
    location: "Парк Сокольники",
    current_participants: 0,
    created_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: "3",
    title: "Онлайн-урок цифровой гигиены",
    description: "Проведи урок по безопасности в интернете для пожилых людей",
    duration_minutes: 40,
    points: 80,
    image_url: undefined,
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
    description: "Собери и сдай макулатуру на переработку. Помоги природе!",
    duration_minutes: 25,
    points: 50,
    image_url: undefined,
    location: "Пункт приема, ул. Ленина 45",
    current_participants: 0,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    is_active: true,
  },
  {
    id: "5",
    title: "Помощь в приюте для животных",
    description: "Покорми и выгуляй собак в местном приюте",
    duration_minutes: 90,
    points: 150,
    image_url: undefined,
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
    description: "Помоги навести порядок на детской площадке в твоем районе",
    duration_minutes: 60,
    points: 100,
    image_url: undefined,
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
    description: "Почитай книги детям в районной библиотеке",
    duration_minutes: 45,
    points: 90,
    image_url: undefined,
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
    description: "Присоединяйся к акции по озеленению парка",
    duration_minutes: 120,
    points: 200,
    bonus_description: "+100 очков за посадку более 5 деревьев",
    bonus_multiplier: 1.5,
    image_url: undefined,
    location: "Центральный парк",
    max_participants: 30,
    current_participants: 18,
    event_date: new Date(Date.now() + 86400000 * 7).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    is_active: true,
  },
];

export default function ActivitiesPage() {
  const searchParams = useSearchParams();
  const [loading] = useState(false);

  // Фильтрация по поиску
  const search = searchParams.get("search") || "";
  const quickFilter = searchParams.get("quick") === "true";
  const filterType = searchParams.get("filter");

  let filteredActivities = mockActivities;

  if (search) {
    filteredActivities = filteredActivities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (quickFilter) {
    // Быстрые активности (до 60 минут)
    filteredActivities = filteredActivities.filter((activity) => activity.duration_minutes <= 60);
  }

  if (filterType === "quick") {
    // "Do it now" - срочные активности на сегодня/завтра
    const tomorrow = Date.now() + 86400000 * 2;
    filteredActivities = filteredActivities.filter((activity) => {
      if (!activity.event_date) return true;
      return new Date(activity.event_date).getTime() <= tomorrow;
    });
  }

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

        <header className="sticky top-0 z-10 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-lg font-semibold">{filterType === "quick" ? "Do it now 🔥" : "Лента активностей"}</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
          <SearchBar initialSearch={search} />
        </header>

        <main className="px-4 pt-4">
          {filteredActivities.length === 0 ? (
            <div className="mt-8 text-center">
              <p className="text-gray-500">Активности не найдены</p>
              <a href="/activities" className="mt-4 inline-block text-blue-600">
                Показать все
              </a>
            </div>
          ) : (
            <ActivityList activities={filteredActivities} />
          )}
        </main>

        <BottomNav currentPage="feed" />
      </div>
    </div>
  );
}
