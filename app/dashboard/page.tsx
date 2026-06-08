"use client"

import { Satellite, Trash2, AlertTriangle, Activity } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { OrbitalMap } from '@/components/dashboard/orbital-map'
import { AlertsList } from '@/components/dashboard/alerts-list'
import { DebrisChart } from '@/components/dashboard/debris-chart'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitoramento orbital em tempo real
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Objetos Monitorados"
          value="34,521"
          change="+124"
          changeType="neutral"
          icon={Activity}
          iconColor="text-primary"
          delay={0}
        />
        <StatCard
          title="Satélites Ativos"
          value="8,234"
          change="+12"
          changeType="positive"
          icon={Satellite}
          iconColor="text-secondary"
          delay={0.1}
        />
        <StatCard
          title="Detritos Rastreados"
          value="26,287"
          change="+112"
          changeType="negative"
          icon={Trash2}
          iconColor="text-accent"
          delay={0.2}
        />
        <StatCard
          title="Alertas Ativos"
          value="7"
          change="2 críticos"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-destructive"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orbital Map */}
        <div className="lg:col-span-2 glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Mapa Orbital
            </h2>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Atualização em tempo real
            </span>
          </div>
          <div className="h-[400px]">
            <OrbitalMap />
          </div>
        </div>

        {/* Alerts */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Alertas Recentes
            </h2>
            <a href="/dashboard/alerts" className="text-xs text-primary hover:underline">
              Ver todos
            </a>
          </div>
          <AlertsList />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Debris Evolution */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Evolução de Detritos
            </h2>
            <select className="text-xs bg-muted border border-border rounded-lg px-2 py-1 text-muted-foreground">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
              <option>Últimos 5 anos</option>
            </select>
          </div>
          <DebrisChart />
        </div>

        {/* Quick Stats */}
        <div className="glass-card rounded-xl p-4">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Resumo do Sistema
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-muted-foreground">Última colisão detectada</span>
              <span className="text-foreground font-medium">Há 47 dias</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-muted-foreground">Manobras evasivas (mês)</span>
              <span className="text-foreground font-medium">23</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-muted-foreground">Precisão de previsão</span>
              <span className="text-success font-medium">99.7%</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-muted-foreground">Uptime do sistema</span>
              <span className="text-success font-medium">99.99%</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">Próxima janela crítica</span>
              <span className="text-warning font-medium">Em 4h 23min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
