"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Clock } from "lucide-react"

export function IDOProgressChart() {
  const progressData = {
    raised: 2400000,
    target: 5000000,
    participants: 1247,
    daysRemaining: 12,
    milestones: [
      { amount: 1000000, label: "Soft Cap", reached: true, date: "Dec 20" },
      { amount: 2500000, label: "Marketing Boost", reached: false, date: "Jan 5" },
      { amount: 5000000, label: "Hard Cap", reached: false, date: "Jan 15" },
    ],
  }

  const progressPercentage = (progressData.raised / progressData.target) * 100

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">IDO Progress</h3>
          <p className="text-slate-400 text-sm">Fundraising milestone tracking</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400">{progressPercentage.toFixed(1)}% Complete</Badge>
      </div>

      <div className="space-y-6">
        {/* Main Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-400">Total Raised</span>
            <span className="text-sm font-medium">
              ${progressData.raised.toLocaleString()} / ${progressData.target.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <Users className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-lg font-bold">{progressData.participants}</div>
              <div className="text-xs text-slate-400">Participants</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <Clock className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-lg font-bold">{progressData.daysRemaining}d</div>
              <div className="text-xs text-slate-400">Remaining</div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            Milestones
          </h4>
          <div className="space-y-3">
            {progressData.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${milestone.reached ? "bg-emerald-400" : "bg-slate-600"}`} />
                  <div>
                    <div className="font-medium">{milestone.label}</div>
                    <div className="text-sm text-slate-400">${milestone.amount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">{milestone.date}</div>
                  {milestone.reached && <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Reached</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
