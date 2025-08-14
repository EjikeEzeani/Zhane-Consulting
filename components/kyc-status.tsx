"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Clock, Shield, ExternalLink } from "lucide-react"

interface KYCStatusProps {
  status: "verified" | "pending" | "required"
  tier: number
}

export function KYCStatus({ status, tier }: KYCStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          color: "text-emerald-400",
          bgColor: "bg-emerald-900/20",
          borderColor: "border-emerald-800",
          badge: "bg-emerald-500/20 text-emerald-400",
          title: "KYC Verified",
          description: "Your identity has been verified successfully",
        }
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-400",
          bgColor: "bg-yellow-900/20",
          borderColor: "border-yellow-800",
          badge: "bg-yellow-500/20 text-yellow-400",
          title: "KYC Pending",
          description: "Your KYC submission is under review",
        }
      default:
        return {
          icon: AlertCircle,
          color: "text-red-400",
          bgColor: "bg-red-900/20",
          borderColor: "border-red-800",
          badge: "bg-red-500/20 text-red-400",
          title: "KYC Required",
          description: "Complete KYC to participate in the IDO",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const tierLimits = {
    1: { max: "1,000 PUSD", features: ["Basic verification", "Standard allocation"] },
    2: { max: "10,000 PUSD", features: ["Enhanced verification", "Priority allocation", "Bonus rewards"] },
    3: { max: "50,000 PUSD", features: ["Premium verification", "Maximum allocation", "VIP benefits", "Early access"] },
  }

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border p-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${config.color}`} />
          <div>
            <h3 className="font-semibold">{config.title}</h3>
            <p className="text-sm text-slate-400">{config.description}</p>
          </div>
        </div>
        <Badge className={config.badge}>Tier {tier}</Badge>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Investment Limit:</span>
          <span className="font-medium">{tierLimits[tier as keyof typeof tierLimits]?.max}</span>
        </div>

        <div className="space-y-1">
          <span className="text-sm text-slate-400">Benefits:</span>
          <ul className="text-sm space-y-1">
            {tierLimits[tier as keyof typeof tierLimits]?.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {status !== "verified" && (
          <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 mt-3">
            <Shield className="w-4 h-4 mr-2" />
            {status === "pending" ? "Check Status" : "Complete KYC"}
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  )
}
