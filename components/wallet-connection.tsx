"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWeb3 } from "@/contexts/web3-context"
import { SUPPORTED_CHAINS } from "@/lib/web3-config"
import { Wallet, ExternalLink, AlertCircle, CheckCircle, Copy, LogOut, Network } from "lucide-react"
import { toast } from "sonner"

interface WalletConnectionProps {
  className?: string
}

export function WalletConnection({ className }: WalletConnectionProps) {
  const { isConnected, account, chainId, connectWallet, disconnectWallet, switchNetwork } =
    useWeb3()

  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const currentNetwork = SUPPORTED_CHAINS.find((chain) => chain.chainId === chainId)
  const isUnsupportedNetwork = chainId && !currentNetwork

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      await connectWallet()
      setShowWalletModal(false)
      toast.success("Wallet connected successfully!")
    } catch (error: any) {
      console.error("Connection error:", error)
      
      // Provide more specific error messages
      let errorMessage = "Failed to connect wallet"
      if (error.message.includes("MetaMask is not installed")) {
        errorMessage = "Please install MetaMask first"
      } else if (error.message.includes("User rejected")) {
        errorMessage = "Connection was rejected by user"
      } else if (error.message.includes("No accounts found")) {
        errorMessage = "No wallet accounts found"
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    toast.success("Wallet disconnected")
  }

  const handleNetworkSwitch = async (targetChainId: string) => {
    try {
      await switchNetwork(Number.parseInt(targetChainId))
      setShowNetworkModal(false)
      toast.success("Network switched successfully!")
    } catch (error: any) {
      console.error("Network switch error:", error)
      toast.error(error.message || "Failed to switch network")
    }
  }

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      toast.success("Address copied to clipboard")
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    return Number.parseFloat(balance).toFixed(4)
  }

  if (!isConnected) {
    return (
      <>
        <Button
          onClick={() => setShowWalletModal(true)}
          className={`bg-emerald-600 hover:bg-emerald-700 text-white font-medium ${className}`}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>

        <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
          <DialogContent className="bg-slate-900 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-serif">Connect Your Wallet</DialogTitle>
              <DialogDescription>Connect your wallet to start investing in ZCS tokens</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-400 font-medium mb-1">MetaMask Required</p>
                    <p className="text-slate-300">
                      You need MetaMask or a compatible wallet to participate in the IDO.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 justify-start"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  {isConnecting ? "Connecting..." : "MetaMask"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-slate-700 justify-start bg-transparent"
                  onClick={() => window.open("https://metamask.io/download/", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Install MetaMask
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Network Status */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNetworkModal(true)}
          className={`border-slate-700 ${isUnsupportedNetwork ? "border-red-600 text-red-400" : ""}`}
        >
          <Network className="w-4 h-4 mr-2" />
          {isUnsupportedNetwork ? "Unsupported" : currentNetwork?.name || "Unknown"}
          {isUnsupportedNetwork && <AlertCircle className="w-3 h-3 ml-1" />}
        </Button>

        {/* Account Info */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg">
          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
          <div className="text-sm">
            <div className="font-medium">{formatAddress(account!)}</div>
            <div className="text-slate-400 text-xs">0.0000 ETH</div>
          </div>
          <Button variant="ghost" size="sm" onClick={copyAddress}>
            <Copy className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDisconnect}>
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Network Switch Modal */}
      <Dialog open={showNetworkModal} onOpenChange={setShowNetworkModal}>
        <DialogContent className="bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Switch Network</DialogTitle>
            <DialogDescription>Select a supported network to continue</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isUnsupportedNetwork && (
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-red-400 font-medium mb-1">Unsupported Network</p>
                    <p className="text-slate-300">Please switch to a supported network to continue.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {SUPPORTED_CHAINS.map((chain) => (
                <Button
                  key={chain.chainId}
                  variant={chainId === chain.chainId ? "default" : "outline"}
                  className={`w-full justify-between ${
                    chainId === chain.chainId ? "bg-emerald-600 hover:bg-emerald-700" : "border-slate-700"
                  }`}
                  onClick={() => handleNetworkSwitch(chain.chainId.toString())}
                >
                  <span>{chain.name}</span>
                  {chainId === chain.chainId && <CheckCircle className="w-4 h-4" />}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
