"use client"

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const stars: { x: number; y: number; radius: number; opacity: number; twinkleSpeed: number }[] = []
    const numStars = resolvedTheme === 'light' ? 80 : 150

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use different star colors based on theme
      const isDark = resolvedTheme !== 'light'
      
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed
        if (star.opacity >= 1 || star.opacity <= 0.3) {
          star.twinkleSpeed = -star.twinkleSpeed
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        
        if (isDark) {
          // White stars for dark mode
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        } else {
          // Subtle purple/blue dots for light mode
          const colors = [
            `rgba(124, 58, 237, ${star.opacity * 0.3})`,  // primary purple
            `rgba(59, 130, 246, ${star.opacity * 0.25})`,  // blue
          ]
          ctx.fillStyle = colors[Math.floor(star.x) % 2]
        }
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
