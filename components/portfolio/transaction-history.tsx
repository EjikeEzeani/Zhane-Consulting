"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Award, Clock, Vote, RefreshCw } from "lucide-react"

export function TransactionHistory() {
  const transactions = [
    {
      id: "0xabc123...",
      type: "Purchase",
      amount: "2,350 ZCS",
      value: "$1,997.50",
      price: "$0.85",
      date: "Jan 12, 2025",
      time: "14:32",
      status: "Completed",
      icon: ArrowUpRight,
      color: "text-emerald-400",
    },
    {
      id: "0xdef456...",
      type: "Staking Reward",
      amount: "47.2 ZCS",
      value: "$40.12",
      price: "$0.85",
      date: "Jan 11, 2025",
      time: "09:15",
      status: "Claimed",
      icon: Award,
      color: "text-blue-400",
    },
    {
      id: "0xghi789...",
      type: "Vesting Unlock",
      amount: "1,176 ZCS",
      value: "$999.60",
      price: "$0.85",
      date: "Jan 10, 2025",
      time: "00:00",
      status: "Unlocked",
      icon: Clock,
      color: "text-purple-400",
    },
    {
      id: "0xjkl012...",
      type: "Purchase",
      amount: "1,000 ZCS",
      value: "$850.00",
      price: "$0.85",
      date: "Jan 8, 2025",
      time: "16:45",
      status: "Completed",
      icon: ArrowUpRight,
      color: "text-emerald-400",
    },
    {
      id: "0xmno345...",
      type: "Governance Vote",
      amount: "5,000 ZCS",
      value: "Proposal #7",
      price: "Voting Power",
      date: "Jan 5, 2025",
      time: "11:20",
      status: "Voted",
      icon: Vote,
      color: "text-orange-400",
    },
    {
      id: "0xpqr678...",
      type: "Stake",
      amount: "5,000 ZCS",
      value: "$4,250.00",
      price: "$0.85",
      date: "Jan 3, 2025",
      time: "13:10",
      status: "Staked",
      icon: ArrowDownRight,
      color: "text-yellow-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search transactions..." className="pl-10 bg-slate-800 border-slate-700" />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="stake">Staking</SelectItem>
              <SelectItem value="reward">Rewards</SelectItem>
              <SelectItem value="vesting">Vesting</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="30d">
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

          <Button variant="outline" className="border-slate-700 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" className="border-slate-700 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </Card>

      {/* Transaction List */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx, index) => {
            const Icon = tx.icon
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <Icon className={`w-5 h-5 ${tx.color}`} />
                  </div>
                  <div>
                    <div className="font-medium">{tx.type}</div>
                    <div className="text-sm text-slate-400">
                      {tx.date} at {tx.time}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{tx.id}</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="font-bold">{tx.amount}</div>
                  <div className="text-sm text-slate-400">{tx.value}</div>
                  <div className="text-xs text-slate-500">{tx.price}</div>
                </div>

                <div className="text-right">
                  <Badge
                    className={
                      tx.status === "Completed" ||
                      tx.status === "Claimed" ||
                      tx.status === "Unlocked" ||
                      tx.status === "Voted" ||
                      tx.status === "Staked"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : tx.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
          <div className="text-sm text-slate-400">Showing 6 of 24 transactions</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-700 bg-transparent">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 bg-transparent">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
