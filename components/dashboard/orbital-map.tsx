"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface OrbitObject {
  id: string
  name: string
  type: 'satellite' | 'debris'
  angle: number
  radius: number
  speed: number
  color: string
  size: number
  risk?: 'low' | 'medium' | 'high'
}

const initialObjects: OrbitObject[] = [
  { id: 'sat-1', name: 'ISS', type: 'satellite', angle: 0, radius: 0.35, speed: 0.006, color: '#3B82F6', size: 6, risk: 'low' },
  { id: 'sat-2', name: 'Hubble', type: 'satellite', angle: Math.PI / 3, radius: 0.42, speed: 0.004, color: '#7C3AED', size: 5, risk: 'low' },
  { id: 'sat-3', name: 'Starlink-1547', type: 'satellite', angle: Math.PI, radius: 0.28, speed: 0.01, color: '#22D3EE', size: 4, risk: 'medium' },
  { id: 'sat-4', name: 'GPS IIF-2', type: 'satellite', angle: Math.PI * 1.5, radius: 0.55, speed: 0.003, color: '#10B981', size: 4, risk: 'low' },
  { id: 'deb-1', name: 'Cosmos 2251', type: 'debris', angle: Math.PI / 4, radius: 0.38, speed: 0.007, color: '#EF4444', size: 3, risk: 'high' },
  { id: 'deb-2', name: 'Fengyun-1C', type: 'debris', angle: Math.PI * 0.8, radius: 0.32, speed: 0.008, color: '#F59E0B', size: 3, risk: 'medium' },
]

export function OrbitalMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedObject, setSelectedObject] = useState<OrbitObject | null>(null)
  const [zoom, setZoom] = useState(1)
  const objectsRef = useRef<OrbitObject[]>([...initialObjects])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)

    const debris = Array.from({ length: 30 }, (_, i) => ({
      id: `small-debris-${i}`,
      angle: Math.random() * Math.PI * 2,
      radius: 0.2 + Math.random() * 0.4,
      speed: 0.002 + Math.random() * 0.006,
      size: 1 + Math.random() * 1.5,
    }))

    let animationId: number

    const animate = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2
      const baseRadius = Math.min(width, height) / 2 - 40

      ctx.clearRect(0, 0, width, height)

      // Background grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)'
      ctx.lineWidth = 1
      for (let i = 0; i < 10; i++) {
        const r = (baseRadius * (i + 1)) / 10 * zoom
        ctx.beginPath()
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Radial lines
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(
          centerX + Math.cos(angle) * baseRadius * zoom,
          centerY + Math.sin(angle) * baseRadius * zoom
        )
        ctx.stroke()
      }

      // Earth
      const earthRadius = baseRadius * 0.12 * zoom
      const earthGradient = ctx.createRadialGradient(
        centerX - earthRadius * 0.3, centerY - earthRadius * 0.3, 0,
        centerX, centerY, earthRadius
      )
      earthGradient.addColorStop(0, '#60A5FA')
      earthGradient.addColorStop(0.5, '#3B82F6')
      earthGradient.addColorStop(1, '#1E40AF')

      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.fillStyle = earthGradient
      ctx.fill()

      // Atmosphere glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, earthRadius,
        centerX, centerY, earthRadius * 1.5
      )
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      glowGradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Small debris
      debris.forEach((d) => {
        d.angle += d.speed
        const r = baseRadius * d.radius * zoom
        const x = centerX + Math.cos(d.angle) * r
        const y = centerY + Math.sin(d.angle) * r

        ctx.beginPath()
        ctx.arc(x, y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)'
        ctx.fill()
      })

      // Main objects
      objectsRef.current.forEach((obj) => {
        obj.angle += obj.speed
        const r = baseRadius * obj.radius * zoom
        const x = centerX + Math.cos(obj.angle) * r
        const y = centerY + Math.sin(obj.angle) * r

        // Orbit path
        ctx.beginPath()
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
        ctx.strokeStyle = `${obj.color}30`
        ctx.lineWidth = 1
        ctx.stroke()

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, obj.size * 4)
        glow.addColorStop(0, obj.color)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(x, y, obj.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Object
        ctx.beginPath()
        ctx.arc(x, y, obj.size, 0, Math.PI * 2)
        ctx.fillStyle = obj.color
        ctx.fill()

        // Selection ring
        if (selectedObject?.id === obj.id) {
          ctx.beginPath()
          ctx.arc(x, y, obj.size + 8, 0, Math.PI * 2)
          ctx.strokeStyle = obj.color
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationId)
    }
  }, [selectedObject, zoom])

  return (
    <div className="relative flex h-full min-h-[520px] w-full flex-col sm:block sm:min-h-[400px]">
      <canvas
        ref={canvasRef}
        className="h-[360px] w-full sm:h-full"
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          className="p-2 glass-card rounded-lg hover:bg-muted transition-colors"
          aria-label="Aumentar zoom"
        >
          <ZoomIn className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="p-2 glass-card rounded-lg hover:bg-muted transition-colors"
          aria-label="Diminuir zoom"
        >
          <ZoomOut className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="p-2 glass-card rounded-lg hover:bg-muted transition-colors"
          aria-label="Resetar zoom"
        >
          <RotateCcw className="w-4 h-4 text-foreground" />
        </button>
        <button
          className="p-2 glass-card rounded-lg hover:bg-muted transition-colors"
          aria-label="Tela cheia"
        >
          <Maximize2 className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Legend */}
      <div className="mt-4 glass-card rounded-lg p-3 sm:absolute sm:bottom-4 sm:left-4 sm:mt-0">
        <div className="text-xs font-medium text-foreground mb-2">Legenda</div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-xs text-muted-foreground">Satélite Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Detrito (Alto Risco)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Detrito (Médio Risco)</span>
          </div>
        </div>
      </div>

      {/* Object Info Panel */}
      {selectedObject && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 glass-card rounded-lg p-4 w-64"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-semibold text-foreground">
              {selectedObject.name}
            </h4>
            <button
              onClick={() => setSelectedObject(null)}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Fechar
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo:</span>
              <span className="text-foreground capitalize">{selectedObject.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risco:</span>
              <span className={
                selectedObject.risk === 'high' ? 'text-destructive' :
                selectedObject.risk === 'medium' ? 'text-warning' : 'text-success'
              }>
                {selectedObject.risk === 'high' ? 'Alto' : selectedObject.risk === 'medium' ? 'Médio' : 'Baixo'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
