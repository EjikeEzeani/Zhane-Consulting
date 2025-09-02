"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Filter, Download, RefreshCw } from "lucide-react"
import { TokenPriceChart } from "@/components/analytics/token-price-chart"
import { IDOProgressChart } from "@/components/analytics/ido-progress-chart"
import { InvestorAnalytics } from "@/components/analytics/investor-analytics"
import { TokenDistribution } from "@/components/analytics/token-distribution"
import { RevenueMetrics } from "@/components/analytics/revenue-metrics"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [activeTab, setActiveTab] = useState("overview")

  const kpiMetrics = [
    {
      title: "Total Value Locked",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Total NAIRA invested in IDO",
    },
    {
      title: "Active Investors",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "Unique wallet addresses",
    },
    {
      title: "Token Price",
      value: "$0.85",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      description: "Current ZCS price",
    },
    {
      title: "Market Activity",
      value: "94.2%",
      change: "+5.7%",
      trend: "up",
      icon: Activity,
      description: "Platform engagement score",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Real-Time Insights</h1>
            <p className="text-slate-400">For Informed Decisions</p>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="border-slate-700 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            <Button variant="outline" size="sm" className="border-slate-700 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <Card key={index} className="bg-slate-900 border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-emerald-600/20 rounded-lg">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <Badge
                      className={`${
                        metric.trend === "up" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                    <p className="text-slate-400 text-sm mb-2">{metric.title}</p>
                    <p className="text-xs text-slate-500">{metric.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Analytics Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="token" className="data-[state=active]:bg-emerald-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Token Analytics
              </TabsTrigger>
              <TabsTrigger value="investors" className="data-[state=active]:bg-emerald-600">
                <Users className="w-4 h-4 mr-2" />
                Investors
              </TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-emerald-600">
                <DollarSign className="w-4 h-4 mr-2" />
                Revenue
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TokenPriceChart timeRange={timeRange} />
                <IDOProgressChart />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <InvestorAnalytics />
                </div>
                <TokenDistribution />
              </div>
            </TabsContent>

            <TabsContent value="token" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TokenPriceChart timeRange={timeRange} />
                <Card className="bg-slate-900 border-slate-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Token Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Supply</span>
                      <span className="font-medium">100,000,000 ZCS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Circulating Supply</span>
                      <span className="font-medium">25,000,000 ZCS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Market Cap</span>
                      <span className="font-medium">$21,250,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">24h Volume</span>
                      <span className="font-medium">$847,320</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Holders</span>
                      <span className="font-medium">1,247</span>
                    </div>
                  </div>
                </Card>
              </div>
              <TokenDistribution />
            </TabsContent>

            <TabsContent value="investors" className="space-y-6">
              <InvestorAnalytics />
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <RevenueMetrics timeRange={timeRange} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
