"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Zap, Gift } from "lucide-react"

export function StakingRewards() {
  const stakingPools = [
    {
      name: "ZCS Staking Pool",
      apy: "24.5%",
      staked: "5,000 ZCS",
      value: "$4,250.00",
      rewards: "127.3 ZCS",
      rewardValue: "$108.21",
      lockPeriod: "30 days",
      status: "active",
    },
    {
<<<<<<< HEAD
      name: "ZCS-NAIRA LP Pool",
      apy: "45.2%",
              staked: "2,500 ZCS + 2,125 NAIRA",
=======
      name: "ZCS-PUSD LP Pool",
      apy: "45.2%",
      staked: "2,500 ZCS + 2,125 PUSD",
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
      value: "$4,250.00",
      rewards: "89.7 ZCS",
      rewardValue: "$76.25",
      lockPeriod: "90 days",
      status: "active",
    },
  ]

  const rewardHistory = [
    { date: "Jan 12", amount: "12.3 ZCS", value: "$10.46", pool: "ZCS Staking" },
    { date: "Jan 11", amount: "11.8 ZCS", value: "$10.03", pool: "ZCS Staking" },
<<<<<<< HEAD
            { date: "Jan 10", amount: "15.4 ZCS", value: "$13.09", pool: "ZCS-NAIRA LP" },
=======
    { date: "Jan 10", amount: "15.4 ZCS", value: "$13.09", pool: "ZCS-PUSD LP" },
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
    { date: "Jan 9", amount: "12.1 ZCS", value: "$10.29", pool: "ZCS Staking" },
  ]

  return (
    <div className="space-y-6">
      {/* Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold">Total Staked</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">7,500 ZCS</div>
            <div className="text-sm text-slate-400">≈ $6,375.00</div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold">Total Rewards</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-400">217.0 ZCS</div>
            <div className="text-sm text-slate-400">≈ $184.46</div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Average APY</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-400">34.9%</div>
            <div className="text-sm text-slate-400">Weighted average</div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold">Claimable</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-400">47.2 ZCS</div>
            <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
              Claim
            </Button>
          </div>
        </Card>
      </div>

      {/* Active Staking Pools */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Active Staking Positions</h3>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Stake More Tokens</Button>
        </div>

        <div className="space-y-4">
          {stakingPools.map((pool, index) => (
            <div key={index} className="p-6 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{pool.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400">{pool.apy} APY</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">{pool.lockPeriod}</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400">{pool.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{pool.staked}</div>
                  <div className="text-sm text-slate-400">{pool.value}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2">Pending Rewards</h5>
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="text-lg font-bold text-emerald-400">{pool.rewards}</div>
                    <div className="text-sm text-slate-400">{pool.rewardValue}</div>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="outline" className="flex-1 border-slate-600 bg-transparent">
                    Unstake
                  </Button>
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Claim Rewards</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reward History */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Rewards</h3>
        <div className="space-y-3">
          {rewardHistory.map((reward, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">{reward.pool}</div>
                  <div className="text-sm text-slate-400">{reward.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-400">{reward.amount}</div>
                <div className="text-sm text-slate-400">{reward.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
