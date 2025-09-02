"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function InvestorAnalytics() {
  const investmentRanges = [
    { range: "$100-500", count: 487, percentage: 39.1 },
    { range: "$500-1K", count: 312, percentage: 25.0 },
    { range: "$1K-5K", count: 298, percentage: 23.9 },
    { range: "$5K-10K", count: 89, percentage: 7.1 },
    { range: "$10K+", count: 61, percentage: 4.9 },
  ]

  const tierDistribution = [
    { tier: "Tier 1", count: 623, color: "#ef4444" },
    { tier: "Tier 2", count: 498, color: "#f59e0b" },
    { tier: "Tier 3", count: 126, color: "#10b981" },
  ]

  const COLORS = ["#ef4444", "#f59e0b", "#10b981"]

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Investor Analytics</h3>
          <p className="text-slate-400 text-sm">Investment patterns and demographics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Ranges */}
        <div>
          <h4 className="font-medium mb-4">Investment Ranges</h4>
          <ChartContainer
            config={{
              count: {
                label: "Investors",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investmentRanges}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="range" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#64748b" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Tier Distribution */}
        <div>
          <h4 className="font-medium mb-4">KYC Tier Distribution</h4>
          <div className="flex items-center justify-center">
            <ChartContainer
              config={{
                count: {
                  label: "Investors",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tierDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {tierDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {tierDistribution.map((tier, index) => (
              <div key={tier.tier} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                <span className="text-sm">
                  {tier.tier}: {tier.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
