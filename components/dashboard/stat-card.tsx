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
      className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
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
      <div>
        <div className="font-display text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </motion.div>
  )
}
