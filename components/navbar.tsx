"use client"

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Satellite } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#funcionalidades', label: 'Funcionalidades' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:glow-primary transition-all duration-300">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="font-display text-xl font-bold text-foreground tracking-tight">
                OrbitGuard
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-foreground border border-primary/50 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-200"
              >
                Entrar
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white gradient-primary rounded-lg hover:opacity-90 transition-all duration-200 glow-primary"
              >
                Acessar Sistema
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-border/50"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground text-sm">Tema</span>
                <ThemeToggle />
              </div>
              <div className="pt-3 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center text-sm font-medium text-foreground border border-primary/50 rounded-lg hover:border-primary transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center text-sm font-medium text-white gradient-primary rounded-lg"
                >
                  Acessar Sistema
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
