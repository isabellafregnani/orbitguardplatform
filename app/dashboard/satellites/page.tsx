"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  Search, 
  Filter, 
  Satellite,
  ArrowUpDown,
  ChevronRight,
  Globe,
  Zap,
  Gauge,
  Radio
} from 'lucide-react'

interface SatelliteData {
  id: string
  name: string
  noradId: string
  type: 'communications' | 'navigation' | 'weather' | 'scientific' | 'military'
  status: 'operational' | 'degraded' | 'inactive'
  altitude: number
  velocity: number
  inclination: number
  period: number
  country: string
  launchDate: string
  risk: 'low' | 'medium' | 'high'
}

const satellites: SatelliteData[] = [
  {
    id: '1',
    name: 'ISS (ZARYA)',
    noradId: '25544',
    type: 'scientific',
    status: 'operational',
    altitude: 408,
    velocity: 7.66,
    inclination: 51.64,
    period: 92.9,
    country: 'Internacional',
    launchDate: '1998-11-20',
    risk: 'medium',
  },
  {
    id: '2',
    name: 'Hubble Space Telescope',
    noradId: '20580',
    type: 'scientific',
    status: 'operational',
    altitude: 547,
    velocity: 7.59,
    inclination: 28.47,
    period: 95.4,
    country: 'EUA',
    launchDate: '1990-04-24',
    risk: 'low',
  },
  {
    id: '3',
    name: 'Starlink-1547',
    noradId: '45712',
    type: 'communications',
    status: 'operational',
    altitude: 550,
    velocity: 7.59,
    inclination: 53.0,
    period: 95.6,
    country: 'EUA',
    launchDate: '2020-06-13',
    risk: 'medium',
  },
  {
    id: '4',
    name: 'GPS IIF-2',
    noradId: '37753',
    type: 'navigation',
    status: 'operational',
    altitude: 20180,
    velocity: 3.87,
    inclination: 55.0,
    period: 717.9,
    country: 'EUA',
    launchDate: '2011-07-16',
    risk: 'low',
  },
  {
    id: '5',
    name: 'GOES-16',
    noradId: '41866',
    type: 'weather',
    status: 'operational',
    altitude: 35786,
    velocity: 3.07,
    inclination: 0.04,
    period: 1436.1,
    country: 'EUA',
    launchDate: '2016-11-19',
    risk: 'low',
  },
  {
    id: '6',
    name: 'Tiangong',
    noradId: '48274',
    type: 'scientific',
    status: 'operational',
    altitude: 389,
    velocity: 7.68,
    inclination: 41.47,
    period: 92.2,
    country: 'China',
    launchDate: '2021-04-29',
    risk: 'low',
  },
  {
    id: '7',
    name: 'Sentinel-2A',
    noradId: '40697',
    type: 'scientific',
    status: 'operational',
    altitude: 786,
    velocity: 7.45,
    inclination: 98.57,
    period: 100.6,
    country: 'Europa',
    launchDate: '2015-06-23',
    risk: 'low',
  },
  {
    id: '8',
    name: 'GLONASS-M 751',
    noradId: '40315',
    type: 'navigation',
    status: 'degraded',
    altitude: 19140,
    velocity: 3.95,
    inclination: 64.8,
    period: 675.7,
    country: 'Rússia',
    launchDate: '2014-06-14',
    risk: 'medium',
  },
]

const typeLabels = {
  communications: { label: 'Comunicação', color: 'bg-secondary/20 text-secondary' },
  navigation: { label: 'Navegação', color: 'bg-primary/20 text-primary' },
  weather: { label: 'Meteorológico', color: 'bg-accent/20 text-accent' },
  scientific: { label: 'Científico', color: 'bg-success/20 text-success' },
  military: { label: 'Militar', color: 'bg-warning/20 text-warning' },
}

const statusLabels = {
  operational: { label: 'Operacional', color: 'text-success' },
  degraded: { label: 'Degradado', color: 'text-warning' },
  inactive: { label: 'Inativo', color: 'text-muted-foreground' },
}

const riskLabels = {
  low: { label: 'Baixo', color: 'text-success' },
  medium: { label: 'Médio', color: 'text-warning' },
  high: { label: 'Alto', color: 'text-destructive' },
}

export default function SatellitesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<keyof SatelliteData>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredSatellites = satellites
    .filter((sat) => {
      const matchesSearch = sat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sat.noradId.includes(searchQuery)
      const matchesType = typeFilter === 'all' || sat.type === typeFilter
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      return 0
    })

  const handleSort = (field: keyof SatelliteData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Satélites Monitorados
          </h1>
          <p className="text-muted-foreground mt-1">
            {satellites.length} satélites no catálogo
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Radio className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="font-display text-xl font-bold text-foreground">
                {satellites.filter(s => s.status === 'operational').length}
              </div>
              <div className="text-xs text-muted-foreground">Operacionais</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-display text-xl font-bold text-foreground">
                {satellites.filter(s => s.type === 'communications').length}
              </div>
              <div className="text-xs text-muted-foreground">Comunicação</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Satellite className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display text-xl font-bold text-foreground">
                {satellites.filter(s => s.type === 'navigation').length}
              </div>
              <div className="text-xs text-muted-foreground">Navegação</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="font-display text-xl font-bold text-foreground">
                {satellites.filter(s => s.risk !== 'low').length}
              </div>
              <div className="text-xs text-muted-foreground">Em Risco</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome ou NORAD ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
        >
          <option value="all">Todos os tipos</option>
          <option value="communications">Comunicação</option>
          <option value="navigation">Navegação</option>
          <option value="weather">Meteorológico</option>
          <option value="scientific">Científico</option>
          <option value="military">Militar</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Satélite
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-4 hidden md:table-cell">
                  <span className="text-sm font-medium text-muted-foreground">Tipo</span>
                </th>
                <th className="text-left p-4 hidden lg:table-cell">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('altitude')}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Altitude
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-4 hidden lg:table-cell">
                  <button
                    onClick={() => handleSort('velocity')}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Velocidade
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-4 hidden xl:table-cell">
                  <span className="text-sm font-medium text-muted-foreground">País</span>
                </th>
                <th className="text-left p-4">
                  <span className="text-sm font-medium text-muted-foreground">Risco</span>
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredSatellites.map((satellite, index) => (
                <motion.tr
                  key={satellite.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Satellite className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{satellite.name}</div>
                        <div className="text-xs text-muted-foreground">NORAD: {satellite.noradId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={cn("px-2 py-1 text-xs font-medium rounded-full", typeLabels[satellite.type].color)}>
                      {typeLabels[satellite.type].label}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={cn("text-sm font-medium", statusLabels[satellite.status].color)}>
                      {statusLabels[satellite.status].label}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{satellite.altitude.toLocaleString()} km</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm text-foreground">{satellite.velocity} km/s</span>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <span className="text-sm text-muted-foreground">{satellite.country}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn("text-sm font-medium", riskLabels[satellite.risk].color)}>
                      {riskLabels[satellite.risk].label}
                    </span>
                  </td>
                  <td className="p-4">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
