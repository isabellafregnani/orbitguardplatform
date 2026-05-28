"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Rocket } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 bg-background-secondary overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-12 lg:p-16"
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 glow-primary">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Pronto para Proteger o Espaço?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Junte-se a agências espaciais e operadores de satélites que confiam na OrbitGuard 
            para monitorar e proteger seus ativos orbitais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium gradient-primary rounded-lg hover:opacity-90 transition-all duration-200 glow-primary"
            >
              Acessar Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-foreground font-medium border border-border hover:border-primary/50 rounded-lg transition-all duration-200"
            >
              Falar com Especialista
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Confiado por organizações líderes
            </p>
            <div className="flex items-center justify-center gap-8 opacity-50">
              <span className="font-display text-lg font-bold text-foreground">NASA</span>
              <span className="font-display text-lg font-bold text-foreground">ESA</span>
              <span className="font-display text-lg font-bold text-foreground">JAXA</span>
              <span className="font-display text-lg font-bold text-foreground">SpaceX</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
