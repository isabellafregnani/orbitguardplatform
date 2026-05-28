"use client"

import { useEffect, useRef } from 'react'

export function OrbitVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = Math.min(500, window.innerWidth - 40)
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    let time = 0

    const satellites = [
      { angle: 0, radius: size * 0.35, speed: 0.008, color: '#7C3AED', size: 4 },
      { angle: Math.PI / 2, radius: size * 0.28, speed: 0.012, color: '#3B82F6', size: 3 },
      { angle: Math.PI, radius: size * 0.42, speed: 0.005, color: '#22D3EE', size: 5 },
      { angle: Math.PI * 1.5, radius: size * 0.22, speed: 0.015, color: '#10B981', size: 3 },
    ]

    const debris = Array.from({ length: 20 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: size * 0.15 + Math.random() * size * 0.3,
      speed: 0.002 + Math.random() * 0.008,
      size: 1 + Math.random() * 2,
    }))

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      // Gradiente radial para o planeta
      const planetGradient = ctx.createRadialGradient(
        centerX - 10, centerY - 10, 0,
        centerX, centerY, size * 0.12
      )
      planetGradient.addColorStop(0, '#3B82F6')
      planetGradient.addColorStop(0.5, '#1E40AF')
      planetGradient.addColorStop(1, '#1E3A8A')

      // Desenha o planeta
      ctx.beginPath()
      ctx.arc(centerX, centerY, size * 0.12, 0, Math.PI * 2)
      ctx.fillStyle = planetGradient
      ctx.fill()

      // Atmosfera brilhante
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, size * 0.1,
        centerX, centerY, size * 0.18
      )
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      glowGradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(centerX, centerY, size * 0.18, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Desenha órbitas
      satellites.forEach((sat) => {
        ctx.beginPath()
        ctx.arc(centerX, centerY, sat.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `${sat.color}20`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Desenha detritos
      debris.forEach((d) => {
        d.angle += d.speed
        const x = centerX + Math.cos(d.angle) * d.radius
        const y = centerY + Math.sin(d.angle) * d.radius

        ctx.beginPath()
        ctx.arc(x, y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'
        ctx.fill()
      })

      // Desenha satélites
      satellites.forEach((sat) => {
        sat.angle += sat.speed
        const x = centerX + Math.cos(sat.angle) * sat.radius
        const y = centerY + Math.sin(sat.angle) * sat.radius

        // Glow
        const satGlow = ctx.createRadialGradient(x, y, 0, x, y, sat.size * 3)
        satGlow.addColorStop(0, sat.color)
        satGlow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(x, y, sat.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = satGlow
        ctx.fill()

        // Satélite
        ctx.beginPath()
        ctx.arc(x, y, sat.size, 0, Math.PI * 2)
        ctx.fillStyle = sat.color
        ctx.fill()
      })

      time += 0.01
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
      />
    </div>
  )
}
