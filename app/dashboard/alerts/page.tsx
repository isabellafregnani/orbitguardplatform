"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Clock, 
  Filter,
  Search,
  CheckCircle,
  XCircle,
  ChevronRight
} from 'lucide-react'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  status: 'active' | 'resolved' | 'monitoring'
  title: string
  description: string
  time: string
  object: string
  objectId: string
  probability?: number
  distance?: string
}

const allAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    status: 'active',
    title: 'Risco de Colisão Iminente',
    description: 'ISS e fragmento Cosmos 2251 em rota de colisão. Manobra evasiva recomendada.',
    time: '2 min atrás',
    object: 'ISS (ZARYA)',
    objectId: 'NORAD-25544',
    probability: 0.0023,
    distance: '2.3 km',
  },
  {
    id: '2',
    type: 'critical',
    status: 'active',
    title: 'Aproximação Crítica Detectada',
    description: 'Hubble e detrito em trajetória de aproximação perigosa.',
    time: '8 min atrás',
    object: 'Hubble Space Telescope',
    objectId: 'NORAD-20580',
    probability: 0.0018,
    distance: '4.7 km',
  },
  {
    id: '3',
    type: 'warning',
    status: 'active',
    title: 'Proximidade Orbital',
    description: 'Starlink-1547 entrando em zona de monitoramento intensificado.',
    time: '15 min atrás',
    object: 'Starlink-1547',
    objectId: 'NORAD-45712',
    probability: 0.0005,
    distance: '12.8 km',
  },
  {
    id: '4',
    type: 'warning',
    status: 'monitoring',
    title: 'Degradação Orbital',
    description: 'Detrito Fengyun-1C em decaimento orbital acelerado.',
    time: '32 min atrás',
    object: 'Fengyun-1C Debris',
    objectId: 'NORAD-29755',
  },
  {
    id: '5',
    type: 'info',
    status: 'active',
    title: 'Manobra Programada',
    description: 'GPS IIF-2 ajuste de órbita programado para as próximas 2 horas.',
    time: '1 hora atrás',
    object: 'GPS IIF-2',
    objectId: 'NORAD-37753',
  },
  {
    id: '6',
    type: 'critical',
    status: 'resolved',
    title: 'Colisão Evitada',
    description: 'Manobra evasiva executada com sucesso. Risco eliminado.',
    time: '3 horas atrás',
    object: 'Tiangong',
    objectId: 'NORAD-48274',
    probability: 0,
    distance: '45.2 km',
  },
  {
    id: '7',
    type: 'warning',
    status: 'resolved',
    title: 'Alerta de Proximidade',
    description: 'Objetos passaram com distância segura. Monitoramento encerrado.',
    time: '5 horas atrás',
    object: 'GOES-16',
    objectId: 'NORAD-41866',
  },
  {
    id: '8',
    type: 'info',
    status: 'resolved',
    title: 'Atualização de Catálogo',
    description: 'Novos 47 objetos adicionados ao catálogo de rastreamento.',
    time: '4 horas atrás',
    object: 'Sistema',
    objectId: 'SYS-001',
  },
]

const alertStyles = {
  critical: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: AlertTriangle,
    iconColor: 'text-destructive',
    label: 'Crítico',
    labelBg: 'bg-destructive/20 text-destructive',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    icon: AlertCircle,
    iconColor: 'text-warning',
    label: 'Alerta',
    labelBg: 'bg-warning/20 text-warning',
  },
  info: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    icon: Info,
    iconColor: 'text-secondary',
    label: 'Info',
    labelBg: 'bg-secondary/20 text-secondary',
  },
}

const statusStyles = {
  active: { label: 'Ativo', icon: AlertCircle, color: 'text-destructive' },
  monitoring: { label: 'Monitorando', icon: Clock, color: 'text-warning' },
  resolved: { label: 'Resolvido', icon: CheckCircle, color: 'text-success' },
}

export default function AlertsPage() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'monitoring' | 'resolved'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAlerts = allAlerts.filter((alert) => {
    const matchesType = filter === 'all' || alert.type === filter
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.object.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const activeCount = allAlerts.filter(a => a.status === 'active').length
  const criticalCount = allAlerts.filter(a => a.type === 'critical' && a.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Central de Alertas
          </h1>
          <p className="text-muted-foreground mt-1">
            {activeCount} alertas ativos • {criticalCount} críticos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 glass-card rounded-lg p-1">
          {(['all', 'critical', 'warning', 'info'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {type === 'all' ? 'Todos' : type === 'critical' ? 'Críticos' : type === 'warning' ? 'Alertas' : 'Info'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 glass-card rounded-lg p-1">
          {(['all', 'active', 'monitoring', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                statusFilter === status
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {status === 'all' ? 'Todos' : status === 'active' ? 'Ativos' : status === 'monitoring' ? 'Monitorando' : 'Resolvidos'}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert, index) => {
          const style = alertStyles[alert.type]
          const status = statusStyles[alert.status]
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "glass-card rounded-xl p-5 border cursor-pointer hover:border-primary/30 transition-all",
                alert.status === 'active' && style.border
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  style.bg
                )}>
                  <style.icon className={cn("w-5 h-5", style.iconColor)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-semibold text-foreground">
                          {alert.title}
                        </h3>
                        <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full", style.labelBg)}>
                          {style.label}
                        </span>
                        <span className={cn("flex items-center gap-1 text-xs", status.color)}>
                          <status.icon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        {alert.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Objeto:</span>
                      <span className="text-xs font-medium text-foreground">{alert.object}</span>
                      <span className="text-xs text-muted-foreground">({alert.objectId})</span>
                    </div>
                    {alert.probability !== undefined && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Probabilidade:</span>
                        <span className={cn(
                          "text-xs font-medium",
                          alert.probability > 0.001 ? "text-destructive" : "text-success"
                        )}>
                          {(alert.probability * 100).toFixed(4)}%
                        </span>
                      </div>
                    )}
                    {alert.distance && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Distância:</span>
                        <span className="text-xs font-medium text-foreground">{alert.distance}</span>
                      </div>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.div>
          )
        })}

        {filteredAlerts.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              Nenhum alerta encontrado
            </h3>
            <p className="text-muted-foreground text-sm">
              Não há alertas correspondentes aos filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
