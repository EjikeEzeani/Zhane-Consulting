"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWeb3 } from "@/contexts/web3-context"
import { WEB3_CONFIG } from "@/lib/web3-config"
import { CheckCircle, AlertCircle, Clock, ExternalLink, X } from "lucide-react"
import type { ethers } from "ethers"

interface TransactionStatusProps {
  isOpen: boolean
  onClose: () => void
  txHash: string | null
  title: string
  description: string
}

export function TransactionStatus({ isOpen, onClose, txHash, title, description }: TransactionStatusProps) {
  const { provider, chainId } = useWeb3()
  const [status, setStatus] = useState<"pending" | "success" | "failed">("pending")
  const [receipt, setReceipt] = useState<ethers.TransactionReceipt | null>(null)
  const [error, setError] = useState<string | null>(null)

  const currentNetwork = Object.values(WEB3_CONFIG).find((config) => config.chainId === chainId)

  useEffect(() => {
    if (txHash && provider) {
      checkTransactionStatus()
    }
  }, [txHash, provider])

  const checkTransactionStatus = async () => {
    if (!txHash || !provider) return

    try {
      setStatus("pending")
      setError(null)

      // Wait for transaction to be mined
      const receipt = await provider.waitForTransaction(txHash)

      if (receipt) {
        setReceipt(receipt)
        if (receipt.status === 1) {
          setStatus("success")
        } else {
          setStatus("failed")
          setError("Transaction failed")
        }
      }
    } catch (error: any) {
      console.error("Transaction error:", error)
      setStatus("failed")
      setError(error.message || "Transaction failed")
    }
  }

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          color: "text-emerald-400",
          bgColor: "bg-emerald-900/20",
          borderColor: "border-emerald-800",
          title: "Transaction Successful",
          description: "Your transaction has been confirmed on the blockchain.",
        }
      case "failed":
        return {
          icon: AlertCircle,
          color: "text-red-400",
          bgColor: "bg-red-900/20",
          borderColor: "border-red-800",
          title: "Transaction Failed",
          description: error || "Your transaction failed to execute.",
        }
      default:
        return {
          icon: Clock,
          color: "text-yellow-400",
          bgColor: "bg-yellow-900/20",
          borderColor: "border-yellow-800",
          title: "Transaction Pending",
          description: "Your transaction is being processed on the blockchain.",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const openInExplorer = () => {
    if (txHash && currentNetwork) {
      window.open(`${currentNetwork.blockExplorer}/tx/${txHash}`, "_blank")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">{title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Display */}
          <div className={`p-6 ${config.bgColor} ${config.borderColor} border rounded-lg text-center`}>
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <Icon className={`w-8 h-8 ${config.color}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
            <p className="text-slate-400 text-sm">{config.description}</p>
          </div>

          {/* Transaction Details */}
          {txHash && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Transaction Hash</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{`${txHash.slice(0, 10)}...${txHash.slice(-8)}`}</span>
                  <Button variant="ghost" size="sm" onClick={openInExplorer}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {receipt && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Block Number</span>
                    <span className="text-sm">{receipt.blockNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Gas Used</span>
                    <span className="text-sm">{receipt.gasUsed.toString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Status</span>
                    <Badge
                      className={
                        receipt.status === 1 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      }
                    >
                      {receipt.status === 1 ? "Success" : "Failed"}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {status !== "pending" && (
              <Button onClick={onClose} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Close
              </Button>
            )}
            {txHash && currentNetwork && (
              <Button variant="outline" onClick={openInExplorer} className="flex-1 border-slate-700 bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
