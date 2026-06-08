"use client"

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid,
} from 'recharts'

const data = [
  { month: 'Jan', detritos: 32400, colisoes: 12 },
  { month: 'Fev', detritos: 33100, colisoes: 8 },
  { month: 'Mar', detritos: 33800, colisoes: 15 },
  { month: 'Abr', detritos: 34200, colisoes: 10 },
  { month: 'Mai', detritos: 34600, colisoes: 7 },
  { month: 'Jun', detritos: 35100, colisoes: 11 },
]

export function DebrisChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDetritos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#94A3B8" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#94A3B8" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              color: '#F3F4F6',
            }}
            formatter={(value: number) => [`${value.toLocaleString()}`, 'Detritos']}
          />
          <Area
            type="monotone"
            dataKey="detritos"
            stroke="#7C3AED"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorDetritos)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
