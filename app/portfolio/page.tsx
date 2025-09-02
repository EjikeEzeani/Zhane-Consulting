"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  TrendingUp,
  Clock,
  Award,
  History,
  PieChart,
  Download,
  RefreshCw,
  ArrowUpRight,
  Vote,
} from "lucide-react"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { VestingSchedule } from "@/components/portfolio/vesting-schedule"
import { StakingRewards } from "@/components/portfolio/staking-rewards"
import { TransactionHistory } from "@/components/portfolio/transaction-history"
import { GovernanceActivity } from "@/components/portfolio/governance-activity"

export default function PortfolioPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")

  const portfolioStats = [
    {
      title: "Total Portfolio Value",
      value: "$12,847.50",
      change: "+$1,247.30",
      changePercent: "+10.75%",
      trend: "up",
      icon: Wallet,
      description: "Current value of all holdings",
    },
    {
      title: "ZCS Holdings",
      value: "15,120 ZCS",
      change: "+2,350 ZCS",
      changePercent: "+18.4%",
      trend: "up",
      icon: TrendingUp,
      description: "Total ZCS tokens owned",
    },
    {
      title: "Vested Tokens",
      value: "8,945 ZCS",
      change: "+1,176 ZCS",
      changePercent: "59.2%",
      trend: "up",
      icon: Clock,
      description: "Currently available tokens",
    },
    {
      title: "Staking Rewards",
      value: "$347.80",
      change: "+$47.20",
      changePercent: "+15.7%",
      trend: "up",
      icon: Award,
      description: "Total rewards earned",
    },
  ]

  const recentActivity = [
    {
      type: "Purchase",
      amount: "2,350 ZCS",
      value: "$1,997.50",
      time: "2 hours ago",
      status: "Completed",
      icon: ArrowUpRight,
      color: "text-emerald-400",
    },
    {
      type: "Staking Reward",
      amount: "47.2 ZCS",
      value: "$40.12",
      time: "1 day ago",
      status: "Claimed",
      icon: Award,
      color: "text-blue-400",
    },
    {
      type: "Vesting Unlock",
      amount: "1,176 ZCS",
      value: "$999.60",
      time: "3 days ago",
      status: "Unlocked",
      icon: Clock,
      color: "text-purple-400",
    },
    {
      type: "Governance Vote",
      amount: "Proposal #7",
      value: "5,000 ZCS",
      time: "1 week ago",
      status: "Voted",
      icon: Vote,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Portfolio Dashboard</h1>
            <p className="text-slate-400">Track your ZCS investments and performance</p>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>

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
          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-slate-900 border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-emerald-600/20 rounded-lg">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <Badge
                      className={`${
                        stat.trend === "up" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {stat.changePercent}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                    <p className="text-xs text-emerald-400">{stat.change}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Portfolio Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-slate-800 border-slate-700">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">
                    <PieChart className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="vesting" className="data-[state=active]:bg-emerald-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Vesting
                  </TabsTrigger>
                  <TabsTrigger value="staking" className="data-[state=active]:bg-emerald-600">
                    <Award className="w-4 h-4 mr-2" />
                    Staking
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-emerald-600">
                    <History className="w-4 h-4 mr-2" />
                    History
                  </TabsTrigger>
                  <TabsTrigger value="governance" className="data-[state=active]:bg-emerald-600">
                    <Vote className="w-4 h-4 mr-2" />
                    Governance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <PortfolioOverview timeRange={timeRange} />
                </TabsContent>

                <TabsContent value="vesting">
                  <VestingSchedule />
                </TabsContent>

                <TabsContent value="staking">
                  <StakingRewards />
                </TabsContent>

                <TabsContent value="history">
                  <TransactionHistory />
                </TabsContent>

                <TabsContent value="governance">
                  <GovernanceActivity />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 justify-start">
                    <Wallet className="w-4 h-4 mr-2" />
                    Buy More ZCS
                  </Button>
                  <Button variant="outline" className="w-full border-slate-700 justify-start bg-transparent">
                    <Award className="w-4 h-4 mr-2" />
                    Stake Tokens
                  </Button>
                  <Button variant="outline" className="w-full border-slate-700 justify-start bg-transparent">
                    <Clock className="w-4 h-4 mr-2" />
                    Claim Vested
                  </Button>
                  <Button variant="outline" className="w-full border-slate-700 justify-start bg-transparent">
                    <Vote className="w-4 h-4 mr-2" />
                    View Proposals
                  </Button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-lg">
                          <Icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{activity.type}</p>
                            <Badge className="bg-slate-700 text-slate-300 text-xs">{activity.status}</Badge>
                          </div>
                          <p className="text-sm text-slate-400">{activity.amount}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{activity.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Portfolio Allocation */}
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-400">ZCS Tokens</span>
                      <span className="text-sm font-medium">78.5%</span>
                    </div>
                    <Progress value={78.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-400">Staked ZCS</span>
                      <span className="text-sm font-medium">15.2%</span>
                    </div>
                    <Progress value={15.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
<<<<<<< HEAD
                      <span className="text-sm text-slate-400">NAIRA Balance</span>
=======
                      <span className="text-sm text-slate-400">PUSD Balance</span>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                      <span className="text-sm font-medium">6.3%</span>
                    </div>
                    <Progress value={6.3} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
