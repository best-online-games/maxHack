import type { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Middleware временно отключен для демо-режима
  // Для production раскомментируйте код ниже и настройте Supabase

  /*
  import { updateSession } from "@/lib/supabase/middleware"
  return await updateSession(request)
  */

  // В демо-режиме пропускаем все запросы без проверки авторизации
  return;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
