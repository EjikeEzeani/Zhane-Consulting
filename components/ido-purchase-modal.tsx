"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle, Clock, Shield, ArrowRight, X } from "lucide-react"

interface IDOPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
<<<<<<< HEAD
  nairaAmount: string
  zcsAmount: string
}

export function IDOPurchaseModal({ isOpen, onClose, nairaAmount, zcsAmount }: IDOPurchaseModalProps) {
=======
  pusdAmount: string
  zcsAmount: string
}

export function IDOPurchaseModal({ isOpen, onClose, pusdAmount, zcsAmount }: IDOPurchaseModalProps) {
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simulate transaction processing
    setTimeout(() => {
      setTransactionHash("0x1234567890abcdef1234567890abcdef12345678")
      setStep(3)
      setIsProcessing(false)
    }, 3000)
  }

  const vestingSchedule = [
    { period: "At TGE", percentage: 25, date: "Jan 15, 2025" },
    { period: "Month 1", percentage: 25, date: "Feb 15, 2025" },
    { period: "Month 2", percentage: 25, date: "Mar 15, 2025" },
    { period: "Month 3", percentage: 25, date: "Apr 15, 2025" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">Purchase ZCS Tokens</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
<<<<<<< HEAD
          <DialogDescription>Complete your ZCS token purchase with NAIRA</DialogDescription>
=======
          <DialogDescription>Complete your ZCS token purchase with PUSD</DialogDescription>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
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
<<<<<<< HEAD
                    <span className="font-bold">{nairaAmount} NAIRA</span>
=======
                    <span className="font-bold">{pusdAmount} PUSD</span>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">You Receive:</span>
                    <span className="font-bold text-emerald-400">{zcsAmount} ZCS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exchange Rate:</span>
<<<<<<< HEAD
                    <span>1 NAIRA = 1.176 ZCS</span>
=======
                    <span>1 PUSD = 1.176 ZCS</span>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
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
<<<<<<< HEAD
                  Please confirm the transaction in your wallet. This will transfer {nairaAmount} NAIRA from your wallet
=======
                  Please confirm the transaction in your wallet. This will transfer {pusdAmount} PUSD from your wallet
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
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
              </div>

              <Button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {isProcessing ? "Processing..." : "Confirm Purchase"}
              </Button>
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

              <Button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
