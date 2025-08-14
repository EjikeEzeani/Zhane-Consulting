"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, Calendar, Gift } from "lucide-react"

export function VestingSchedule() {
  const vestingPeriods = [
    {
      period: "TGE (Token Generation Event)",
      date: "Jan 15, 2025",
      percentage: 25,
      amount: "3,780 ZCS",
      value: "$3,213.00",
      status: "unlocked",
      claimed: true,
    },
    {
      period: "Month 1",
      date: "Feb 15, 2025",
      percentage: 25,
      amount: "3,780 ZCS",
      value: "$3,213.00",
      status: "unlocked",
      claimed: true,
    },
    {
      period: "Month 2",
      date: "Mar 15, 2025",
      percentage: 25,
      amount: "3,780 ZCS",
      value: "$3,213.00",
      status: "unlocked",
      claimed: false,
    },
    {
      period: "Month 3",
      date: "Apr 15, 2025",
      percentage: 25,
      amount: "3,780 ZCS",
      value: "$3,213.00",
      status: "locked",
      claimed: false,
    },
  ]

  const totalVested = vestingPeriods.filter((p) => p.status === "unlocked").length
  const totalClaimed = vestingPeriods.filter((p) => p.claimed).length
  const vestingProgress = (totalVested / vestingPeriods.length) * 100
  const claimProgress = (totalClaimed / vestingPeriods.length) * 100

  return (
    <div className="space-y-6">
      {/* Vesting Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold">Vesting Progress</h3>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold">{vestingProgress}%</div>
            <Progress value={vestingProgress} className="h-2" />
            <p className="text-sm text-slate-400">
              {totalVested} of {vestingPeriods.length} periods unlocked
            </p>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold">Available to Claim</h3>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-blue-400">3,780 ZCS</div>
            <p className="text-sm text-slate-400">≈ $3,213.00</p>
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              Claim Tokens
            </Button>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Total Claimed</h3>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-purple-400">7,560 ZCS</div>
            <Progress value={claimProgress} className="h-2" />
            <p className="text-sm text-slate-400">{claimProgress}% of total allocation</p>
          </div>
        </Card>
      </div>

      {/* Vesting Schedule Details */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Vesting Timeline</h3>
          <Badge className="bg-emerald-500/20 text-emerald-400">Total: 15,120 ZCS</Badge>
        </div>

        <div className="space-y-4">
          {vestingPeriods.map((period, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    period.status === "unlocked" ? "bg-emerald-600" : "bg-slate-700"
                  }`}
                >
                  {period.claimed ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : period.status === "unlocked" ? (
                    <Gift className="w-5 h-5 text-white" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{period.period}</div>
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {period.date}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">{period.amount}</div>
                <div className="text-sm text-slate-400">{period.value}</div>
                <div className="text-xs text-slate-500">{period.percentage}% of total</div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  className={
                    period.claimed
                      ? "bg-emerald-500/20 text-emerald-400"
                      : period.status === "unlocked"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-slate-500/20 text-slate-400"
                  }
                >
                  {period.claimed ? "Claimed" : period.status === "unlocked" ? "Available" : "Locked"}
                </Badge>
                {period.status === "unlocked" && !period.claimed && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
                  >
                    Claim
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
