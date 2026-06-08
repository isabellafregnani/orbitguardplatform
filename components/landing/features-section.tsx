"use client"

import { motion } from 'framer-motion'
import { 
  Radar, 
  AlertCircle, 
  Satellite, 
  LayoutDashboard, 
  History, 
  FileText 
} from 'lucide-react'

const features = [
  {
    icon: Radar,
    title: 'Rastreamento Orbital',
    description: 'Monitoramento contínuo de milhares de objetos em órbita com precisão de metros.',
    color: 'primary',
  },
  {
    icon: AlertCircle,
    title: 'Alertas de Colisão',
    description: 'Sistema inteligente de previsão e notificação de riscos de colisão em tempo real.',
    color: 'destructive',
  },
  {
    icon: Satellite,
    title: 'Monitoramento de Satélites',
    description: 'Acompanhe a saúde, posição e trajetória de todos os seus ativos orbitais.',
    color: 'secondary',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard em Tempo Real',
    description: 'Interface visual intuitiva com dados atualizados a cada segundo.',
    color: 'accent',
  },
  {
    icon: History,
    title: 'Histórico de Eventos',
    description: 'Registro completo de todos os eventos, alertas e manobras realizadas.',
    color: 'success',
  },
  {
    icon: FileText,
    title: 'Relatórios Inteligentes',
    description: 'Geração automática de relatórios detalhados com análises preditivas.',
    color: 'warning',
  },
]

const colorMap = {
  primary: 'bg-primary/10 text-primary group-hover:bg-primary/20',
  secondary: 'bg-secondary/10 text-secondary group-hover:bg-secondary/20',
  accent: 'bg-accent/10 text-accent group-hover:bg-accent/20',
  destructive: 'bg-destructive/10 text-destructive group-hover:bg-destructive/20',
  success: 'bg-success/10 text-success group-hover:bg-success/20',
  warning: 'bg-warning/10 text-warning group-hover:bg-warning/20',
}

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="relative py-20 lg:py-32 bg-background-secondary">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Funcionalidades
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
            Tudo que Você Precisa para Proteger o Espaço
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Nossa plataforma oferece um conjunto completo de ferramentas para monitoramento, 
            análise e proteção de ativos orbitais.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center mb-4 transition-colors`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
