"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign, TrendingUp, Percent, Target } from "lucide-react"

interface RevenueMetricsProps {
  timeRange: string
}

export function RevenueMetrics({ timeRange }: RevenueMetricsProps) {
  const revenueData = [
    { date: "Dec 1", revenue: 180000, fees: 4500, transactions: 89 },
    { date: "Dec 8", revenue: 320000, fees: 8000, transactions: 156 },
    { date: "Dec 15", revenue: 580000, fees: 14500, transactions: 287 },
    { date: "Dec 22", revenue: 890000, fees: 22250, transactions: 445 },
    { date: "Dec 29", revenue: 1200000, fees: 30000, transactions: 623 },
    { date: "Jan 5", revenue: 1680000, fees: 42000, transactions: 847 },
    { date: "Jan 12", revenue: 2400000, fees: 60000, transactions: 1247 },
  ]

  const metrics = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+42.3%",
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      title: "Platform Fees",
      value: "$60K",
      change: "+38.7%",
      icon: Percent,
      color: "text-blue-400",
    },
    {
      title: "Growth Rate",
      value: "156%",
      change: "+23.1%",
      icon: TrendingUp,
      color: "text-purple-400",
    },
    {
      title: "Target Progress",
      value: "48%",
      change: "+12.5%",
      icon: Target,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Revenue Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <span className="text-emerald-400 text-sm font-medium">{metric.change}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                <p className="text-slate-400 text-sm">{metric.title}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Revenue Growth</h3>
            <p className="text-slate-400 text-sm">Cumulative revenue over time</p>
          </div>
        </div>

        <ChartContainer
          config={{
            revenue: {
              label: "Revenue (USD)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  )
}
