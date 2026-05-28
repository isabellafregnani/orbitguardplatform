"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  time: string
  object?: string
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Risco de Colisão Detectado',
    description: 'ISS e Cosmos 2251 em rota de aproximação',
    time: '2 min atrás',
    object: 'ISS',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Proximidade Orbital',
    description: 'Starlink-1547 entrando em zona de monitoramento',
    time: '15 min atrás',
    object: 'Starlink-1547',
  },
  {
    id: '3',
    type: 'info',
    title: 'Manobra Programada',
    description: 'GPS IIF-2 ajuste de órbita em 2 horas',
    time: '1 hora atrás',
    object: 'GPS IIF-2',
  },
]

const alertStyles = {
  critical: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: AlertTriangle,
    iconColor: 'text-destructive',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    icon: AlertCircle,
    iconColor: 'text-warning',
  },
  info: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    icon: Info,
    iconColor: 'text-secondary',
  },
}

export function AlertsList() {
  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const style = alertStyles[alert.type]
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors",
              style.bg,
              style.border
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                style.bg
              )}>
                <style.icon className={cn("w-4 h-4", style.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {alert.title}
                  </h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  {alert.description}
                </p>
                {alert.object && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                    {alert.object}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
