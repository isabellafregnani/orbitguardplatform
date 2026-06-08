"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative p-2 rounded-lg bg-muted/50 transition-all duration-300",
          className
        )}
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative p-2 rounded-lg transition-all duration-300 group",
        "bg-muted/50 hover:bg-muted",
        "border border-border/50 hover:border-primary/30",
        className
      )}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={cn(
            "absolute inset-0 w-5 h-5 transition-all duration-300",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-warning"
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 w-5 h-5 transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100 text-primary"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
    </button>
  )
}
