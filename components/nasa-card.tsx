"use client"

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ImageIcon } from 'lucide-react'

type ApodResponse = {
  date: string
  explanation: string
  hdurl?: string
  media_type: string
  thumbnail_url?: string
  title: string
  url?: string
}

function summarizeDescription(text: string) {
  if (text.length <= 240) {
    return text
  }

  return `${text.slice(0, 237).trim()}...`
}

export function NasaCard() {
  const [apod, setApod] = useState<ApodResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY

    if (!apiKey) {
      setError('Configure NEXT_PUBLIC_NASA_API_KEY para exibir a imagem.')
      setIsLoading(false)
      return
    }

    async function loadApod() {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=true`,
        )

        if (!response.ok) {
          throw new Error('Nao foi possivel carregar a imagem da NASA.')
        }

        const data = (await response.json()) as ApodResponse
        setApod(data)
      } catch {
        setError('Nao foi possivel carregar a imagem da NASA.')
      } finally {
        setIsLoading(false)
      }
    }

    loadApod()
  }, [])

  const formattedDate = useMemo(() => {
    if (!apod?.date) {
      return ''
    }

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${apod.date}T00:00:00`))
  }, [apod?.date])

  const imageUrl = apod?.media_type === 'image' ? apod.url : apod?.thumbnail_url

  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card glow-secondary mx-auto max-w-5xl rounded-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[260px] sm:min-h-[360px] bg-card-secondary">
              {isLoading && (
                <div className="absolute inset-0 animate-pulse bg-muted/60" />
              )}

              {!isLoading && imageUrl && (
                <img
                  src={imageUrl}
                  alt={apod?.title || 'Imagem da NASA'}
                  className="h-full w-full object-cover"
                />
              )}

              {!isLoading && !imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/40">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                NASA APOD API
              </span>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-4 mb-4 text-balance">
                Imagem Espacial do Dia
              </h2>

              {formattedDate && (
                <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  <span>{formattedDate}</span>
                </div>
              )}

              <h3 className="font-display text-lg font-semibold text-foreground mb-3 text-balance">
                {isLoading ? 'Carregando imagem da NASA...' : apod?.title || 'Imagem indisponivel'}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {error ||
                  (apod?.explanation
                    ? summarizeDescription(apod.explanation)
                    : 'A descricao da imagem sera exibida aqui assim que os dados forem carregados.')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
