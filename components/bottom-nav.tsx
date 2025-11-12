"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

interface BottomNavProps {
  currentPage?: string
}

export function BottomNav({ currentPage }: BottomNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (currentPage) return currentPage === path
    return pathname === `/${path}` || pathname === (path === "home" ? "/" : "")
  }

  const navItems = [
    { id: "home", icon: "🏠", label: "Домой", path: "/" },
    { id: "feed", icon: "⚡", label: "Лента", path: "/activities" },
    { id: "flash", icon: "💫", label: "Флеш", path: "/flashmobs" },
    { id: "rewards", icon: "🎁", label: "Подарки", path: "/rewards" },
    { id: "profile", icon: "👤", label: "Профиль", path: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-2xl">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const active = isActive(item.id)
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition ${
                active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <span className={`text-xl ${active ? "scale-110" : ""}`}>{item.icon}</span>
              <span className={`text-xs ${active ? "font-semibold" : "font-normal"}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
