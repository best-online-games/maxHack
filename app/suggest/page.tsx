"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";

const activityTemplates = [
  { id: "eco", icon: "🌿", title: "Экология", description: "Уборки, сортировка, посадки" },
  { id: "care", icon: "🤝", title: "Опека", description: "Наставничество, сопровождение" },
  { id: "health", icon: "🩺", title: "Здоровье", description: "Донорство, помощь медикам" },
  { id: "community", icon: "🏡", title: "Сообщество", description: "Соседи, двор, ТСЖ" },
  { id: "digital", icon: "💻", title: "Онлайн", description: "Цифровая помощь" },
  { id: "event", icon: "🎉", title: "События", description: "Флешмобы, праздники" },
];

type SuggestFormState = {
  title: string;
  description: string;
  format: "solo" | "pair" | "group";
  duration: string;
  location: string;
  contact: string;
  templateId?: string;
};

const initialForm: SuggestFormState = {
  title: "",
  description: "",
  format: "solo",
  duration: "30",
  location: "",
  contact: "",
};

export default function SuggestPage() {
  const [form, setForm] = useState<SuggestFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setForm((prev) => ({
      ...prev,
      templateId,
    }));
  };

  const handleChange = (field: keyof SuggestFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const suggestions = JSON.parse(localStorage.getItem("user_suggestions") || "[]");
    const payload = {
      ...form,
      created_at: new Date().toISOString(),
      id: crypto.randomUUID(),
    };
    suggestions.push(payload);
    localStorage.setItem("user_suggestions", JSON.stringify(suggestions));

    setSuccessMessage("🎉 Отправлено модераторам! Мы вернемся с ответом в течение дня.");
    setForm(initialForm);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-24">
      <div className="mx-auto max-w-md">
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Отправка сохраняется локально
        </div>

        <header className="sticky top-0 z-10 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-lg font-semibold">💡 Предложить активность</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 py-6">
          <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Выбери направление</h2>
            <div className="grid grid-cols-2 gap-3">
              {activityTemplates.map((template) => {
                const isActive = form.templateId === template.id;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      isActive ? "border-teal-500 bg-teal-50 shadow-md" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-2xl">{template.icon}</span>
                    <p className="mt-2 text-sm font-semibold text-gray-900">{template.title}</p>
                    <p className="text-xs text-gray-500">{template.description}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-5 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Название активности</label>
              <input
                required
                maxLength={70}
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
                placeholder="Например: Утренняя уборка во дворе"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Что нужно сделать?</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(event) => handleChange("description", event.target.value)}
                placeholder="Поделись деталями, кого зовем, что берем с собой, какие бонусы"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Формат участия</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "solo", label: "Соло", emoji: "🧍" },
                  { id: "pair", label: "Пара", emoji: "👫" },
                  { id: "group", label: "Группа", emoji: "🧑‍🤝‍🧑" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChange("format", option.id as SuggestFormState["format"])}
                    className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      form.format === option.id
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <span className="mr-1 text-lg">{option.emoji}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Длительность</label>
              <select
                value={form.duration}
                onChange={(event) => handleChange("duration", event.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none"
              >
                <option value="15">15 минут</option>
                <option value="30">30 минут</option>
                <option value="45">45 минут</option>
                <option value="60">1 час</option>
                <option value="90">1,5 часа</option>
                <option value="120">2 часа</option>
                <option value="180">3 часа</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Локация / формат</label>
              <input
                required
                value={form.location}
                onChange={(event) => handleChange("location", event.target.value)}
                placeholder="Москва, двор на Ленинградке или Онлайн"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Как с тобой связаться?</label>
              <input
                required
                value={form.contact}
                onChange={(event) => handleChange("contact", event.target.value)}
                placeholder="Телеграм @username или телефон"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="rounded-xl bg-teal-50 p-4 text-sm text-teal-800">
              <p className="font-semibold">⚡ Что дальше?</p>
              <p className="mt-1">
                Мы проверим идею, соберем команду и откроем активность в ленте. Ты получишь уведомление в чате.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:from-teal-600 hover:to-cyan-600 hover:shadow-xl disabled:opacity-70"
            >
              {isSubmitting ? "Отправляем..." : "🚀 Отправить предложение"}
            </button>
          </form>

          {successMessage && (
            <div className="mt-5 rounded-2xl border border-teal-200 bg-white p-5 text-sm text-teal-800 shadow-sm">
              {successMessage}
            </div>
          )}
        </main>

        <BottomNav currentPage="home" />
      </div>
    </div>
  );
}

