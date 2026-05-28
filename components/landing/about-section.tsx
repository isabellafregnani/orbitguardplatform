"use client"

import { motion } from 'framer-motion'
import { AlertTriangle, Satellite, Globe } from 'lucide-react'

const stats = [
  { value: '36,000+', label: 'Detritos maiores que 10cm', icon: AlertTriangle },
  { value: '1M+', label: 'Fragmentos menores de 1cm', icon: Globe },
  { value: '8,000+', label: 'Satélites ativos', icon: Satellite },
]

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Sobre o Problema
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
              O Lixo Espacial é uma Ameaça Crescente
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Desde o início da era espacial em 1957, milhares de lançamentos criaram uma nuvem 
                de detritos orbitando a Terra. Esses fragmentos viajam a velocidades superiores a 
                28.000 km/h, representando risco crítico para satélites e missões espaciais.
              </p>
              <p>
                O <span className="text-foreground font-medium">Síndrome de Kessler</span> descreve 
                um cenário onde colisões em cascata podem tornar certas órbitas inutilizáveis por 
                décadas. Monitorar e prever esses riscos é essencial para o futuro espacial.
              </p>
              <p>
                A OrbitGuard utiliza tecnologia de ponta para rastrear detritos em tempo real, 
                prever colisões e proteger os ativos orbitais mais valiosos do mundo.
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
