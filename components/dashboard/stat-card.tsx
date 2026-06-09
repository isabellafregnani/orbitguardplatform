"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  delay?: number
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-primary',
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="w-full min-w-0 glass-card rounded-xl p-4 transition-all duration-300 hover:border-primary/30 sm:p-5"
    >
      <div className="mb-4 flex min-w-0 items-start justify-between gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          iconColor.includes('primary') ? 'bg-primary/10' :
          iconColor.includes('secondary') ? 'bg-secondary/10' :
          iconColor.includes('accent') ? 'bg-accent/10' :
          iconColor.includes('destructive') ? 'bg-destructive/10' :
          iconColor.includes('success') ? 'bg-success/10' :
          'bg-muted'
        )}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {change && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            changeType === 'positive' && "bg-success/10 text-success",
            changeType === 'negative' && "bg-destructive/10 text-destructive",
            changeType === 'neutral' && "bg-muted text-muted-foreground"
          )}>
            {change}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-display text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        <div className="break-words text-sm text-muted-foreground">{title}</div>
      </div>
    </motion.div>
  )
}
