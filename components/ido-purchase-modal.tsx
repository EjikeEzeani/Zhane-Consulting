"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle, Clock, Shield, ArrowRight, X } from "lucide-react"
import { useWeb3 } from "@/contexts/web3-context"
import { toast } from "sonner"

interface IDOPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  nairaAmount: string
  zcsAmount: string
  onComplete?: (txHash: string) => void
}

export function IDOPurchaseModal({ isOpen, onClose, nairaAmount, zcsAmount, onComplete }: IDOPurchaseModalProps) {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const { isConnected, buyTokens, idoContract, nairaToken, approveToken, getTokenAllowance } = useWeb3()

  const handlePurchase = async () => {
    if (!isConnected) {
      setError("Wallet not connected")
      toast.error("Please connect your wallet first")
      return
    }

    if (!idoContract) {
      setError("IDO contract not available")
      toast.error("IDO contract not available. Please check your network connection.")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Get the current network configuration to find the NAIRA token address
      const nairaAmountWei = BigInt(Math.floor(Number.parseFloat(nairaAmount) * 1e18))
      
      // First, check if we need to approve NAIRA tokens (only if NAIRA token is available)
      let needsApproval = false
      if (nairaToken) {
        try {
          const currentAllowance = await getTokenAllowance(
            nairaToken.target as string, 
            idoContract.target as string
          )
          
          const allowanceWei = BigInt(Math.floor(Number.parseFloat(currentAllowance) * 1e18))
          needsApproval = allowanceWei < nairaAmountWei
        } catch (allowanceError) {
          console.warn("Could not check allowance, skipping approval check:", allowanceError)
          // If we can't check allowance, we'll skip approval and try direct purchase
          needsApproval = false
        }
        
        if (needsApproval) {
          toast.info("Approving NAIRA tokens...")
          try {
            const approveTx = await approveToken(
              nairaToken.target as string,
              idoContract.target as string,
              nairaAmount
            )
            
            toast.info("Waiting for approval confirmation...")
            await approveTx.wait()
            toast.success("NAIRA tokens approved successfully!")
          } catch (approvalError) {
            console.warn("Approval failed, trying direct purchase:", approvalError)
            // If approval fails, we'll try the purchase anyway in case it's not needed
          }
        }
      } else {
        console.warn("NAIRA token contract not available, proceeding with direct purchase")
        toast.info("Proceeding with direct purchase...")
      }

      // Now execute the purchase
      toast.info("Executing purchase transaction...")
      const purchaseTx = await buyTokens(nairaAmount)
      
      setTransactionHash(purchaseTx.hash)
      toast.info("Transaction submitted! Waiting for confirmation...")
      
      // Wait for transaction confirmation
      const receipt = await purchaseTx.wait()
      
      if (receipt && receipt.status === 1) {
        toast.success("Purchase completed successfully!")
        setStep(3)
        if (onComplete) {
          onComplete(purchaseTx.hash)
        }
      } else if (receipt && receipt.status === 0) {
        throw new Error("Transaction failed")
      } else {
        throw new Error("Transaction confirmation failed")
      }
      
    } catch (error: any) {
      console.error("Purchase error:", error)
      
      let errorMessage = "Transaction failed"
      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user"
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient NAIRA balance"
      } else if (error.message.includes("gas")) {
        errorMessage = "Transaction failed due to gas issues"
      } else if (error.code === 'BAD_DATA' || error.message.includes("could not decode result data")) {
        errorMessage = "Contract not found or invalid. Please check the network and contract addresses."
      } else if (error.message.includes("Token contract not found")) {
        errorMessage = "Token contract not found. Please check your network connection."
      } else if (error.message.includes("network")) {
        errorMessage = "Network error. Please check your connection and try again."
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
      toast.error(errorMessage)
      setStep(1) // Go back to step 1 to allow retry
    } finally {
      setIsProcessing(false)
    }
  }

  const vestingSchedule = [
    { period: "At TGE", percentage: 25, date: "Jan 15, 2025" },
    { period: "Month 1", percentage: 25, date: "Feb 15, 2025" },
    { period: "Month 2", percentage: 25, date: "Mar 15, 2025" },
    { period: "Month 3", percentage: 25, date: "Apr 15, 2025" },
  ]

  const handleClose = () => {
    setStep(1)
    setError(null)
    setTransactionHash("")
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">Purchase ZCS Tokens</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>Complete your ZCS token purchase with NAIRA</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNum ? "bg-emerald-600" : "bg-slate-700"}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Purchase Details</h3>

              <Card className="bg-slate-800 border-slate-700 p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">You Pay:</span>
                    <span className="font-bold">{nairaAmount} NAIRA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">You Receive:</span>
                    <span className="font-bold text-emerald-400">{zcsAmount} ZCS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exchange Rate:</span>
                    <span>1 NAIRA = 1.176 ZCS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Network Fee:</span>
                    <span>~$2.50</span>
                  </div>
                </div>
              </Card>

              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Vesting Schedule
                </h4>
                <div className="space-y-2">
                  {vestingSchedule.map((vest, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-400">{vest.period}</span>
                      <span>
                        {vest.percentage}% - {vest.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-400 font-medium mb-1">Important Notice</p>
                  <p className="text-slate-300">
                    Your tokens will be subject to the vesting schedule above. 25% will be available immediately upon
                    TGE.
                  </p>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Continue to Payment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Confirm Transaction</h3>

              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">Secure Transaction</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Please confirm the transaction in your wallet. This will transfer {nairaAmount} NAIRA from your wallet
                  to purchase {zcsAmount} ZCS tokens.
                </p>

                {isProcessing && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Processing transaction...</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-red-400 font-medium">Transaction Failed</p>
                        <p className="text-slate-300">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                  className="flex-1 border-slate-700"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing || !isConnected}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  {isProcessing ? "Processing..." : "Confirm Purchase"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-emerald-400">Purchase Successful!</h3>
              <p className="text-slate-400">
                Your ZCS tokens have been successfully purchased and will be distributed according to the vesting
                schedule.
              </p>

              <Card className="bg-slate-800 border-slate-700 p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaction Hash:</span>
                    <span className="font-mono text-emerald-400">{transactionHash.slice(0, 10)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ZCS Purchased:</span>
                    <span className="font-bold">{zcsAmount} ZCS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Available at TGE:</span>
                    <span className="font-bold">{(Number.parseFloat(zcsAmount) * 0.25).toFixed(2)} ZCS</span>
                  </div>
                </div>
              </Card>

              <Button onClick={handleClose} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
