"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TokenDistribution() {
  const distribution = [
    { category: "IDO Sale", percentage: 40, amount: "40,000,000 ZCS", color: "bg-emerald-500" },
    { category: "Team & Advisors", percentage: 20, amount: "20,000,000 ZCS", color: "bg-blue-500" },
    { category: "Marketing", percentage: 15, amount: "15,000,000 ZCS", color: "bg-purple-500" },
    { category: "Development", percentage: 15, amount: "15,000,000 ZCS", color: "bg-orange-500" },
    { category: "Reserve", percentage: 10, amount: "10,000,000 ZCS", color: "bg-red-500" },
  ]

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Token Distribution</h3>
          <p className="text-slate-400 text-sm">ZCS allocation breakdown</p>
        </div>
      </div>

      <div className="space-y-4">
        {distribution.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="font-medium">{item.category}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">{item.percentage}%</div>
                <div className="text-xs text-slate-400">{item.amount}</div>
              </div>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Total Supply</span>
          <span className="font-medium">100,000,000 ZCS</span>
        </div>
      </div>
    </Card>
  )
}
