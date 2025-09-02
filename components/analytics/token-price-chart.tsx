"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TokenPriceChartProps {
  timeRange: string
}

export function TokenPriceChart({ timeRange }: TokenPriceChartProps) {
  const priceData = [
    { time: "00:00", price: 0.82, volume: 45000 },
    { time: "04:00", price: 0.83, volume: 52000 },
    { time: "08:00", price: 0.81, volume: 38000 },
    { time: "12:00", price: 0.84, volume: 67000 },
    { time: "16:00", price: 0.85, volume: 71000 },
    { time: "20:00", price: 0.86, volume: 58000 },
    { time: "24:00", price: 0.85, volume: 63000 },
  ]

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">ZCS Token Price</h3>
          <p className="text-slate-400 text-sm">Real-time price movement</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400">$0.85</div>
          <div className="text-sm text-emerald-400">+2.1% (24h)</div>
        </div>
      </div>

      <ChartContainer
        config={{
          price: {
            label: "Price (USD)",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} domain={["dataMin - 0.01", "dataMax + 0.01"]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  )
}
