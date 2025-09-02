"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Vote, CheckCircle, Clock, Users, TrendingUp } from "lucide-react"

export function GovernanceActivity() {
  const votingPower = {
    total: "15,120 ZCS",
    available: "10,120 ZCS",
    locked: "5,000 ZCS",
    percentage: "0.12%",
  }

  const proposals = [
    {
      id: 8,
      title: "Increase Staking Rewards by 5%",
      description: "Proposal to increase staking rewards from 24.5% to 29.5% APY",
      status: "Active",
      endDate: "Jan 20, 2025",
      forVotes: 2847392,
      againstVotes: 456123,
      totalVotes: 3303515,
      quorum: 5000000,
      userVote: null,
      userPower: "10,120 ZCS",
    },
    {
      id: 7,
      title: "Treasury Allocation for Marketing",
      description: "Allocate 2M ZCS from treasury for Q1 2025 marketing initiatives",
      status: "Passed",
      endDate: "Jan 5, 2025",
      forVotes: 4234567,
      againstVotes: 1234567,
      totalVotes: 5469134,
      quorum: 5000000,
      userVote: "For",
      userPower: "5,000 ZCS",
    },
    {
      id: 6,
      title: "Update Token Vesting Schedule",
      description: "Modify vesting schedule to include 6-month cliff period",
      status: "Rejected",
      endDate: "Dec 28, 2024",
      forVotes: 1876543,
      againstVotes: 3456789,
      totalVotes: 5333332,
      quorum: 5000000,
      userVote: "Against",
      userPower: "5,000 ZCS",
    },
  ]

  const votingHistory = [
    { proposal: "Proposal #7", vote: "For", power: "5,000 ZCS", date: "Jan 5, 2025" },
    { proposal: "Proposal #6", vote: "Against", power: "5,000 ZCS", date: "Dec 28, 2024" },
    { proposal: "Proposal #5", vote: "For", power: "3,000 ZCS", date: "Dec 15, 2024" },
  ]

  return (
    <div className="space-y-6">
      {/* Voting Power Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Vote className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold">Voting Power</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{votingPower.total}</div>
            <div className="text-sm text-slate-400">{votingPower.percentage} of total supply</div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold">Available</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-400">{votingPower.available}</div>
            <div className="text-sm text-slate-400">Ready to vote</div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Locked in Voting</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-400">{votingPower.locked}</div>
            <div className="text-sm text-slate-400">Currently voting</div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold">Participation</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-400">87%</div>
            <div className="text-sm text-slate-400">Voting participation rate</div>
          </div>
        </Card>
      </div>

      {/* Active Proposals */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Governance Proposals</h3>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Create Proposal</Button>
        </div>

        <div className="space-y-6">
          {proposals.map((proposal, index) => {
            const forPercentage = (proposal.forVotes / proposal.totalVotes) * 100
            const againstPercentage = (proposal.againstVotes / proposal.totalVotes) * 100
            const quorumPercentage = (proposal.totalVotes / proposal.quorum) * 100

            return (
              <div key={index} className="p-6 bg-slate-800 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">
                        #{proposal.id} {proposal.title}
                      </h4>
                      <Badge
                        className={
                          proposal.status === "Active"
                            ? "bg-blue-500/20 text-blue-400"
                            : proposal.status === "Passed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{proposal.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Ends: {proposal.endDate}</span>
                      <span>•</span>
                      <span>{proposal.totalVotes.toLocaleString()} votes</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Voting Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">For</span>
                        <span className="text-sm font-medium text-emerald-400">
                          {proposal.forVotes.toLocaleString()} ({forPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={forPercentage} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Against</span>
                        <span className="text-sm font-medium text-red-400">
                          {proposal.againstVotes.toLocaleString()} ({againstPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={againstPercentage} className="h-2 bg-slate-700" />
                    </div>
                  </div>

                  {/* Quorum Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-400">Quorum Progress</span>
                      <span className="text-sm font-medium">
                        {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} (
                        {quorumPercentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={quorumPercentage} className="h-2 bg-slate-700" />
                  </div>

                  {/* User Voting */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Your voting power: {proposal.userPower}</span>
                      {proposal.userVote && (
                        <Badge className="bg-slate-700 text-slate-300 text-xs">Voted: {proposal.userVote}</Badge>
                      )}
                    </div>
                    {proposal.status === "Active" && !proposal.userVote && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          Vote Against
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Vote For
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Voting History */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Your Voting History</h3>
        <div className="space-y-3">
          {votingHistory.map((vote, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Vote className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">{vote.proposal}</div>
                  <div className="text-sm text-slate-400">{vote.date}</div>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  className={vote.vote === "For" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}
                >
                  {vote.vote}
                </Badge>
                <div className="text-sm text-slate-400 mt-1">{vote.power}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
