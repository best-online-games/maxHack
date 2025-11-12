"use client";

import { useState } from "react";
import { HomeHeader } from "@/components/home-header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryGrid } from "@/components/category-grid";
import { ActivityFeed } from "@/components/activity-feed";
import { LocalRequests } from "@/components/local-requests";
import { BottomNav } from "@/components/bottom-nav";
import { QuickActions } from "@/components/quick-actions";
import type { Profile, Activity, HelpRequest } from "@/lib/types";

// Mock данные для демо-режима
const mockProfile: Profile = {
  id: "demo-user-id",
  display_name: "Демо Пользователь",
  avatar_url: undefined,
  city: "Москва",
  country: "Россия",
  coins: 450,
  total_points: 1250,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

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
    description: "Помоги родителям с колясками подняться по склону",
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
];

const mockHelpRequests: HelpRequest[] = [
  {
    id: "1",
    title: "Помощь с покупками в магазине",
    description: "Нужна помощь пожилой соседке сходить в магазин за продуктами",
    requester_name: "Анна Ивановна",
    requester_age: 78,
    location: "ул. Ленина, д. 15",
    distance_meters: 350,
    points: 50,
    status: "open",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "Выгул собаки",
    description: "Соседу нужно уехать, ищу кто может выгулять собаку вечером",
    requester_name: "Петр С.",
    location: "ул. Пушкина, д. 8",
    distance_meters: 520,
    points: 30,
    status: "open",
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function HomePage() {
  const [profile] = useState<Profile>(mockProfile);
  const [activities] = useState<Activity[]>(mockActivities);
  const [helpRequests] = useState<HelpRequest[]>(mockHelpRequests);
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-32">
      <div className="mx-auto max-w-md">
        {/* Баннер демо-режима */}
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Используются mock данные. Настройте Supabase для полной функциональности.
        </div>

        <HomeHeader profile={profile} />

        <main className="px-4 pb-4">
          <HeroBanner />
          <CategoryGrid />

          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Рекомендуем начать</h2>
              <a href="/activities" className="text-sm text-blue-600">
                Показать все
              </a>
            </div>
            <ActivityFeed activities={activities} />
          </section>

          <section className="mt-6">
            <h2 className="mb-4 text-lg font-semibold">Сегодня рядом</h2>
            <LocalRequests requests={helpRequests} />
          </section>
        </main>

        <QuickActions />
        <BottomNav currentPage="home" />
      </div>
    </div>
  );
}
