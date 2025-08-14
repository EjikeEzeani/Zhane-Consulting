"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PortfolioOverviewProps {
  timeRange: string
}

export function PortfolioOverview({ timeRange }: PortfolioOverviewProps) {
  const portfolioData = [
    { date: "Dec 1", value: 8500, zcs: 10000, pusd: 500 },
    { date: "Dec 8", value: 9200, zcs: 10800, pusd: 400 },
    { date: "Dec 15", value: 10100, zcs: 11900, pusd: 200 },
    { date: "Dec 22", value: 11300, zcs: 13300, pusd: 0 },
    { date: "Dec 29", value: 11800, zcs: 13900, pusd: 0 },
    { date: "Jan 5", value: 12200, zcs: 14400, pusd: 0 },
    { date: "Jan 12", value: 12847, zcs: 15120, pusd: 0 },
  ]

  const performanceMetrics = [
    { label: "Total Return", value: "+51.2%", subValue: "+$4,347.50" },
    { label: "Best Performing Day", value: "+8.7%", subValue: "Dec 22, 2024" },
    { label: "Average Daily Return", value: "+1.2%", subValue: "Last 30 days" },
    { label: "Sharpe Ratio", value: "2.34", subValue: "Risk-adjusted return" },
  ]

  return (
    <div className="space-y-6">
      {/* Portfolio Performance Chart */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Portfolio Performance</h3>
            <p className="text-slate-400 text-sm">Total value over time</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">$12,847.50</div>
            <div className="text-sm text-emerald-400">+$4,347.50 (+51.2%)</div>
          </div>
        </div>

        <ChartContainer
          config={{
            value: {
              label: "Portfolio Value (USD)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#portfolioGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-900 border-slate-800 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">{metric.value}</div>
              <div className="text-sm text-slate-400 mb-2">{metric.label}</div>
              <div className="text-xs text-slate-500">{metric.subValue}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Holdings Breakdown */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Current Holdings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZCS</span>
              </div>
              <div>
                <div className="font-medium">ZCS Tokens</div>
                <div className="text-sm text-slate-400">Zhane Consulting Shares</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">15,120 ZCS</div>
              <div className="text-sm text-slate-400">$12,852.00</div>
              <div className="text-xs text-emerald-400">+18.4%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <div className="font-medium">PUSD Balance</div>
                <div className="text-sm text-slate-400">Available for investment</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">0.00 PUSD</div>
              <div className="text-sm text-slate-400">$0.00</div>
              <div className="text-xs text-slate-400">0%</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
