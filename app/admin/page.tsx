"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Users,
  Shield,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Wallet,
  Database,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [idoStatus, setIdoStatus] = useState("active")

  const platformStats = [
    { label: "Total Users", value: "2,847", change: "+12.5%", icon: Users },
    { label: "Total Raised", value: "$2.4M", change: "+8.2%", icon: DollarSign },
    { label: "Active Transactions", value: "156", change: "+5.1%", icon: Activity },
    { label: "Platform Revenue", value: "$48K", change: "+15.3%", icon: TrendingUp },
  ]

  const pendingKYC = [
    {
      id: 1,
      wallet: "0x1a2b...3c4d",
      email: "investor1@email.com",
      tier: "Tier 2",
      submitted: "2h ago",
      status: "pending",
    },
    {
      id: 2,
      wallet: "0x5e6f...7g8h",
      email: "investor2@email.com",
      tier: "Tier 3",
      submitted: "4h ago",
      status: "pending",
    },
    {
      id: 3,
      wallet: "0x9i0j...1k2l",
      email: "investor3@email.com",
      tier: "Tier 2",
      submitted: "6h ago",
      status: "pending",
    },
  ]

  const recentTransactions = [
<<<<<<< HEAD
    { id: 1, user: "0x1a2b...3c4d", amount: "5,000 NAIRA", zcs: "5,882 ZCS", status: "completed", time: "2m ago" },
    { id: 2, user: "0x5e6f...7g8h", amount: "2,500 NAIRA", zcs: "2,941 ZCS", status: "pending", time: "5m ago" },
    { id: 3, user: "0x9i0j...1k2l", amount: "10,000 NAIRA", zcs: "11,765 ZCS", status: "failed", time: "8m ago" },
=======
    { id: 1, user: "0x1a2b...3c4d", amount: "5,000 NAIRA", zcs: "5,882 ZCS", status: "completed", time: "2m ago" },
    { id: 2, user: "0x5e6f...7g8h", amount: "2,500 NAIRA", zcs: "2,941 ZCS", status: "pending", time: "5m ago" },
    { id: 3, user: "0x9i0j...1k2l", amount: "10,000 NAIRA", zcs: "11,765 ZCS", status: "failed", time: "8m ago" },
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  ]

  const handleKYCApproval = (id: number, action: "approve" | "reject") => {
    console.log(`KYC ${action} for ID: ${id}`)
  }

  const handleIDOStatusChange = (status: "active" | "paused" | "ended") => {
    setIdoStatus(status)
    console.log(`IDO status changed to: ${status}`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Admin Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-white">ZCS Admin Panel</h1>
              <p className="text-xs text-slate-400">Zhane Consulting Shares Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-emerald-500/20 text-emerald-400">IDO Status: {idoStatus.toUpperCase()}</Badge>
            <Button variant="outline" size="sm" className="border-slate-700 bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-slate-900 border border-slate-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="ido-management" className="data-[state=active]:bg-emerald-600">
                IDO Management
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-emerald-600">
                User Management
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-emerald-600">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-600">
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-4 gap-6">
                {platformStats.map((stat, index) => (
                  <Card key={index} className="bg-slate-900 border-slate-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">{stat.label}</p>
                          <p className="text-white text-2xl font-bold">{stat.value}</p>
                          <p className="text-emerald-400 text-sm">{stat.change}</p>
                        </div>
                        <stat.icon className="w-8 h-8 text-emerald-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Pending KYC Approvals</CardTitle>
                    <CardDescription>Users waiting for verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingKYC.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="text-white text-sm font-medium">{user.wallet}</p>
                          <p className="text-slate-400 text-xs">
                            {user.email} • {user.tier}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleKYCApproval(user.id, "approve")}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleKYCApproval(user.id, "reject")}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Transactions</CardTitle>
                    <CardDescription>Latest platform activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="text-white text-sm font-medium">{tx.user}</p>
                          <p className="text-slate-400 text-xs">
                            {tx.amount} → {tx.zcs}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              tx.status === "completed"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : tx.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }
                          >
                            {tx.status}
                          </Badge>
                          <span className="text-slate-400 text-xs">{tx.time}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* IDO Management Tab */}
            <TabsContent value="ido-management" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">IDO Controls</CardTitle>
                    <CardDescription>Manage the current IDO status and parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => handleIDOStatusChange("active")}
                        className={idoStatus === "active" ? "bg-emerald-600" : "bg-slate-700"}
                      >
                        Start IDO
                      </Button>
                      <Button
                        onClick={() => handleIDOStatusChange("paused")}
                        className={idoStatus === "paused" ? "bg-yellow-600" : "bg-slate-700"}
                      >
                        Pause IDO
                      </Button>
                      <Button
                        onClick={() => handleIDOStatusChange("ended")}
                        className={idoStatus === "ended" ? "bg-red-600" : "bg-slate-700"}
                      >
                        End IDO
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
<<<<<<< HEAD
                        <label className="text-slate-400 text-sm">Token Price (NAIRA)</label>
                        <Input type="number" defaultValue="0.85" className="bg-slate-800 border-slate-700 text-white" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm">Hard Cap (NAIRA)</label>
=======
                        <label className="text-slate-400 text-sm">Token Price (NAIRA)</label>
                        <Input type="number" defaultValue="0.85" className="bg-slate-800 border-slate-700 text-white" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm">Hard Cap (NAIRA)</label>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                        <Input
                          type="number"
                          defaultValue="5000000"
                          className="bg-slate-800 border-slate-700 text-white"
                        />
                      </div>
                      <div>
<<<<<<< HEAD
                        <label className="text-slate-400 text-sm">Minimum Purchase (NAIRA)</label>
=======
                        <label className="text-slate-400 text-sm">Minimum Purchase (NAIRA)</label>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                        <Input type="number" defaultValue="100" className="bg-slate-800 border-slate-700 text-white" />
                      </div>
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Update IDO Parameters</Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Token Distribution</CardTitle>
                    <CardDescription>Manage token allocation and vesting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">IDO Allocation:</span>
                        <span className="text-white">40% (40M ZCS)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Team & Advisors:</span>
                        <span className="text-white">20% (20M ZCS)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Liquidity Pool:</span>
                        <span className="text-white">25% (25M ZCS)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Marketing:</span>
                        <span className="text-white">10% (10M ZCS)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Reserve:</span>
                        <span className="text-white">5% (5M ZCS)</span>
                      </div>
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Database className="w-4 h-4 mr-2" />
                      Distribute Tokens
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">User Management</CardTitle>
                  <CardDescription>Manage platform users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        placeholder="Search users by wallet or email..."
                        className="bg-slate-800 border-slate-700 text-white flex-1"
                      />
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Search</Button>
                    </div>

                    <div className="space-y-3">
                      {pendingKYC.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.wallet}</p>
                              <p className="text-slate-400 text-sm">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className="bg-emerald-500/20 text-emerald-400">{user.tier}</Badge>
                            <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Transaction Management</CardTitle>
                  <CardDescription>Monitor and manage all platform transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        placeholder="Search by transaction hash or wallet..."
                        className="bg-slate-800 border-slate-700 text-white flex-1"
                      />
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Search</Button>
                    </div>

                    <div className="space-y-3">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                              <Wallet className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{tx.user}</p>
                              <p className="text-slate-400 text-sm">
                                {tx.amount} → {tx.zcs}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge
                              className={
                                tx.status === "completed"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : tx.status === "pending"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {tx.status}
                            </Badge>
                            <span className="text-slate-400 text-sm">{tx.time}</span>
                            <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Platform Analytics</CardTitle>
                    <CardDescription>Key performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Daily Active Users:</span>
                        <span className="text-white">847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Conversion Rate:</span>
                        <span className="text-emerald-400">12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Average Investment:</span>
                        <span className="text-white">$1,924</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Platform Fee Revenue:</span>
                        <span className="text-emerald-400">$48,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">System Health</CardTitle>
                    <CardDescription>Platform status and alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">API Status:</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Database:</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Blockchain:</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          <Clock className="w-3 h-3 mr-1" />
                          Syncing
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Security:</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          <Shield className="w-3 h-3 mr-1" />
                          Secure
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
