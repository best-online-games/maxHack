"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // ДЕМО-РЕЖИМ: Симулируем вход без реального Supabase
      if (!email || !password) {
        throw new Error("Заполните все поля");
      }

      // Симулируем задержку сети
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Проверяем, есть ли сохраненный пользователь
      const savedUser = localStorage.getItem("demo_user");

      if (savedUser) {
        const user = JSON.parse(savedUser);

        // Простая проверка email (в демо режиме пароль не проверяем строго)
        if (user.email === email) {
          localStorage.setItem("demo_authenticated", "true");

          alert(
            "✅ Вход выполнен успешно!\n\n⚠️ ДЕМО-РЕЖИМ: Авторизация локальная.\nДля полной функциональности настройте Supabase.",
          );

          router.push("/");
          router.refresh();
          return;
        }
      }

      // Если пользователя нет, предлагаем зарегистрироваться
      throw new Error(
        "Пользователь не найден. Попробуйте зарегистрироваться или используйте демо: demo@test.com / demo123",
      );
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  // Быстрый демо-вход
  const handleDemoLogin = () => {
    setEmail("demo@test.com");
    setPassword("demo123");

    // Создаем демо пользователя
    const demoUser = {
      id: "demo-user-quick",
      email: "demo@test.com",
      display_name: "Демо Пользователь",
      created_at: new Date().toISOString(),
    };

    localStorage.setItem("demo_user", JSON.stringify(demoUser));
    localStorage.setItem("demo_authenticated", "true");

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <p className="text-xs text-yellow-800 text-center">
              🎭 <strong>ДЕМО-РЕЖИМ</strong>
              <br />
              Вход работает локально
            </p>
          </div>
          <CardTitle className="text-center text-2xl">Добро.Рядом</CardTitle>
          <p className="text-center text-sm text-gray-500">Войти в аккаунт</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ваш пароль"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">или</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full" onClick={handleDemoLogin}>
              🚀 Быстрый демо-вход
            </Button>

            <p className="text-center text-sm text-gray-600">
              Нет аккаунта?{" "}
              <Link href="/auth/signup" className="font-semibold text-blue-600">
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
