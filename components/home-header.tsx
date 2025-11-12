import type { Profile } from "@/lib/types"
import Image from "next/image"

interface HomeHeaderProps {
  profile: Profile | null
}

export function HomeHeader({ profile }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url || "/placeholder.svg"}
                alt={profile.display_name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <span className="text-sm font-bold text-white">{profile?.display_name?.[0] || "В"}</span>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500">MAX MINI</p>
            <h1 className="text-base font-semibold">Добро.Рядом</h1>
          </div>
        </div>
        <a href="/profile" className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Меню
        </a>
      </div>
    </header>
  )
}
