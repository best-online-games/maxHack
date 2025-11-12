"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // ДЕМО-РЕЖИМ: Симулируем регистрацию без реального Supabase
      if (!email || !password || !displayName) {
        throw new Error("Заполните все поля");
      }

      if (password.length < 6) {
        throw new Error("Пароль должен быть не менее 6 символов");
      }

      // Симулируем задержку сети
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Сохраняем данные пользователя в localStorage для демо
      const demoUser = {
        id: `demo-user-${Date.now()}`,
        email,
        display_name: displayName,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("demo_user", JSON.stringify(demoUser));
      localStorage.setItem("demo_authenticated", "true");

      // Показываем успешное сообщение
      alert(
        "✅ Регистрация успешна!\n\n⚠️ ДЕМО-РЕЖИМ: Данные сохранены локально.\nДля полной функциональности настройте Supabase.",
      );

      // Редирект на главную
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <p className="text-xs text-yellow-800 text-center">
              🎭 <strong>ДЕМО-РЕЖИМ</strong>
              <br />
              Регистрация работает локально
            </p>
          </div>
          <CardTitle className="text-center text-2xl">Добро.Рядом</CardTitle>
          <p className="text-center text-sm text-gray-500">Создать аккаунт</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="displayName">Имя</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Ваше имя"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
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
                placeholder="Минимум 6 символов"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <Link href="/auth/login" className="font-semibold text-blue-600">
                Войти
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
