"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";

type HelpFormState = {
  title: string;
  description: string;
  urgency: "now" | "today" | "week";
  location: string;
  requester: string;
  contact: string;
  preferredTime: string;
};

const initialForm: HelpFormState = {
  title: "",
  description: "",
  urgency: "today",
  location: "",
  requester: "",
  contact: "",
  preferredTime: "",
};

const safetyTips = [
  "Не передавай деньги волонтерам — все помощь бесплатна.",
  "Выбирай людные места для встречи, если это офлайн-встреча.",
  "Расскажи близким, что к тебе придет волонтер.",
  "Если что-то смущает — напиши нам в чат поддержки.",
];

export default function AskPage() {
  const [form, setForm] = useState<HelpFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = <Field extends keyof HelpFormState>(field: Field, value: HelpFormState[Field]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const requests = JSON.parse(localStorage.getItem("user_help_requests") || "[]");
    const payload = {
      ...form,
      id: crypto.randomUUID(),
      status: "pending",
      created_at: new Date().toISOString(),
    };
    requests.push(payload);
    localStorage.setItem("user_help_requests", JSON.stringify(requests));

    setSuccessMessage("✨ Заявка отправлена! Мы подберем волонтера и уточним детали в чате.");
    setForm(initialForm);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 pb-24">
      <div className="mx-auto max-w-md">
        <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center text-sm text-yellow-800">
          🎭 <strong>ДЕМО-РЕЖИМ</strong> - Заявка сохраняется локально
        </div>

        <header className="sticky top-0 z-10 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">MAX MINI</p>
              <h1 className="text-lg font-semibold">👥 Попросить помощь</h1>
            </div>
            <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Домой
            </a>
          </div>
        </header>

        <main className="px-4 py-6">
          <section className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 p-6 text-white shadow-lg">
            <p className="text-sm uppercase tracking-wide opacity-90">Мы рядом</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight">Расскажи, что нужно сделать</h2>
            <p className="mt-2 text-sm opacity-90">
              Заявку увидят проверенные волонтеры. Мы проследим, чтобы помощь пришла вовремя и безопасно.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-5 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Что нужно сделать?</label>
              <input
                required
                maxLength={70}
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
                placeholder="Например: Сходить в аптеку"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Опиши задачу подробно</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(event) => handleChange("description", event.target.value)}
                placeholder="Что нужно купить / принести / сделать, есть ли ограничения, что взять с собой?"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Срочность</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "now" as const, label: "Прямо сейчас", emoji: "⏱️" },
                  { id: "today" as const, label: "Сегодня", emoji: "🕓" },
                  { id: "week" as const, label: "В течение недели", emoji: "🗓️" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChange("urgency", option.id)}
                    className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      form.urgency === option.id
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
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
              <label className="mb-2 block text-sm font-medium text-gray-700">Где нужна помощь?</label>
              <input
                required
                value={form.location}
                onChange={(event) => handleChange("location", event.target.value)}
                placeholder="Адрес или район, можно добавить подъезд/этаж"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Для кого заявка?</label>
              <input
                required
                value={form.requester}
                onChange={(event) => handleChange("requester", event.target.value)}
                placeholder="Например: для мамы, для соседа, для себя"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Как с тобой связаться?</label>
              <input
                required
                value={form.contact}
                onChange={(event) => handleChange("contact", event.target.value)}
                placeholder="Телеграм @username или телефон"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Когда удобно встретиться?</label>
              <input
                value={form.preferredTime}
                onChange={(event) => handleChange("preferredTime", event.target.value)}
                placeholder="Например: вечером после 19:00"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800">
              <p className="font-semibold">💬 Проверим и уточним детали</p>
              <p className="mt-1">
                Модератор свяжется с тобой, чтобы подтвердить заявку. После подтверждения волонтеры смогут взять задачу.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-blue-600 hover:shadow-xl disabled:opacity-70"
            >
              {isSubmitting ? "Отправляем..." : "📨 Отправить заявку"}
            </button>
          </form>

          <section className="mt-6 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">🛡️ Правила безопасности</h3>
            <ul className="mt-3 space-y-2 text-xs text-gray-600">
              {safetyTips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-0.5 text-indigo-500">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {successMessage && (
            <div className="mt-5 rounded-2xl border border-indigo-200 bg-white p-5 text-sm text-indigo-800 shadow-sm">
              {successMessage}
            </div>
          )}
        </main>

        <BottomNav currentPage="home" />
      </div>
    </div>
  );
}

