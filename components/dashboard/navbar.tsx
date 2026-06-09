"use client"

import { Bell, Search, User, Activity } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

interface NasaNotification {
  messageId: string
  messageType: string
  messageIssueTime: string
  messageURL: string
  messageBody: string
}

export function DashboardNavbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState<NasaNotification[]>([])
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  useEffect(() => {
    const API_URL = `https://api.nasa.gov/DONKI/notifications?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`

    async function fetchNotifications() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Erro ao carregar notificações da NASA.')
        }

        const data: NasaNotification[] = await response.json()
        setNotifications(data)
      } catch (error) {
        console.error('Erro na conexão com a API DONKI:', error)
      }
    }

    fetchNotifications()
  }, [])

  const latestNotifications = notifications.slice(0, 3)

  return (
    <header className="min-h-16 border-b border-border bg-background-secondary/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex h-full min-w-0 flex-col gap-3 px-4 py-3 sm:px-6 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
        {/* Search */}
        <div className="w-full min-w-0 md:max-w-md md:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar satélites, detritos, alertas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
          {/* System Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 glass-card rounded-lg">
            <Activity className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">Sistema Online</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((open) => !open)}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors group"
              aria-label="Notificações da NASA"
              aria-expanded={isNotificationsOpen}
            >
              <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-destructive text-[10px] font-semibold text-white flex items-center justify-center animate-pulse">
                  {notifications.length > 99 ? '99+' : notifications.length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-border/50 bg-card p-3 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Alertas NASA</span>
                  <span className="text-xs text-muted-foreground">{notifications.length} total</span>
                </div>

                <div className="space-y-2">
                  {latestNotifications.length > 0 ? (
                    latestNotifications.map((item) => (
                      <a
                        key={item.messageId || item.messageURL || item.messageIssueTime}
                        href={item.messageURL}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium text-primary">{item.messageType}</span>
                          <span className="text-[11px] text-muted-foreground">
                            {new Date(item.messageIssueTime).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {item.messageBody}
                        </p>
                      </a>
                    ))
                  ) : (
                    <p className="py-4 text-center text-xs text-muted-foreground">
                      Nenhuma notificação encontrada.
                    </p>
                  )}
                </div>

                <a
                  href="/alerts"
                  className="mt-3 block rounded-lg border border-border/50 px-3 py-2 text-center text-xs font-medium text-primary transition-colors hover:bg-muted/50"
                >
                  Ver todos
                </a>
              </div>
            )}
          </div>

          {/* User */}
          <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
