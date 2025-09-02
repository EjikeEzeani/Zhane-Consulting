"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { KYCStatus } from "@/components/kyc-status"
import { WalletConnection } from "@/components/wallet-connection"
import { useWeb3 } from "@/contexts/web3-context"
import { Search, Settings, Shield, BarChart3, Users, Wallet } from "lucide-react"
import { IDOPurchaseModal } from "@/components/ido-purchase-modal"

export default function ZhaneConsultingIDOPlatform() {
  const [activeTab, setActiveTab] = useState("Buy ZCS")
<<<<<<< HEAD
  const [nairaAmount, setNairaAmount] = useState("0.00")
=======
  const [pusdAmount, setPusdAmount] = useState("0.00")
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  const [zcsAmount, setZcsAmount] = useState("0.00")
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showTxStatus, setShowTxStatus] = useState(false)
  const [currentTxHash, setCurrentTxHash] = useState<string | null>(null)

  const { isConnected, account } = useWeb3()

  const idoStats = [
    { label: "Total Raised", value: "$2.4M", change: "+12.5%", target: "$5M" },
    { label: "Participants", value: "1,247", change: "+8.2%", target: "2,500" },
    { label: "ZCS Price", value: "$0.85", change: "+2.1%", target: "Fixed" },
    { label: "Time Remaining", value: "12d 5h", change: "-1d", target: "30 days" },
  ]

  const recentInvestors = [
<<<<<<< HEAD
    { wallet: "0x1a2b...3c4d", amount: "5,000 NAIRA", zcs: "5,882 ZCS", time: "2m ago" },
    { wallet: "0x5e6f...7g8h", amount: "2,500 NAIRA", zcs: "2,941 ZCS", time: "5m ago" },
    { wallet: "0x9i0j...1k2l", amount: "10,000 NAIRA", zcs: "11,765 ZCS", time: "8m ago" },
=======
    { wallet: "0x1a2b...3c4d", amount: "5,000 PUSD", zcs: "5,882 ZCS", time: "2m ago" },
    { wallet: "0x5e6f...7g8h", amount: "2,500 PUSD", zcs: "2,941 ZCS", time: "5m ago" },
    { wallet: "0x9i0j...1k2l", amount: "10,000 PUSD", zcs: "11,765 ZCS", time: "8m ago" },
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  ]

  const userTransactions = [
    {
      type: "Purchase",
<<<<<<< HEAD
      amount: "1,000 NAIRA",
=======
      amount: "1,000 PUSD",
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
      zcs: "1,176 ZCS",
      status: "Completed",
      hash: "0xabc123...",
      time: "2 hours ago",
    },
<<<<<<< HEAD
    { type: "Purchase", amount: "500 NAIRA", zcs: "588 ZCS", status: "Pending", hash: "0xdef456...", time: "1 day ago" },
  ]

  const handleNairaChange = (value: string) => {
    setNairaAmount(value)
    const nairaValue = Number.parseFloat(value) || 0
    const zcsValue = nairaValue * 1.176 // Exchange rate
=======
    { type: "Purchase", amount: "500 PUSD", zcs: "588 ZCS", status: "Pending", hash: "0xdef456...", time: "1 day ago" },
  ]

  const handlePusdChange = (value: string) => {
    setPusdAmount(value)
    const pusdValue = Number.parseFloat(value) || 0
    const zcsValue = pusdValue * 1.176 // Exchange rate
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
    setZcsAmount(zcsValue.toFixed(2))
  }

  const handleZcsChange = (value: string) => {
    setZcsAmount(value)
    const zcsValue = Number.parseFloat(value) || 0
<<<<<<< HEAD
    const nairaValue = zcsValue / 1.176 // Reverse exchange rate
    setNairaAmount(nairaValue.toFixed(2))
=======
    const pusdValue = zcsValue / 1.176 // Reverse exchange rate
    setPusdAmount(pusdValue.toFixed(2))
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  }

  const handlePurchaseComplete = (txHash: string) => {
    setCurrentTxHash(txHash)
    setShowTxStatus(true)
    setShowPurchaseModal(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-serif">ZCS</span>
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-white">Zhane Consulting</h1>
                <p className="text-xs text-slate-400">Shares Token Platform</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-emerald-400 font-medium">
                IDO
              </a>
              <a href="/analytics" className="text-slate-400 hover:text-white">
                Analytics
              </a>
              <a href="/portfolio" className="text-slate-400 hover:text-white">
                Portfolio
              </a>
              <a href="/admin" className="text-slate-400 hover:text-white">
                Admin
              </a>
              <a href="#" className="text-slate-400 hover:text-white flex items-center gap-1">
                Staking{" "}
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs">
                  Live
                </Badge>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                Governance
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search tokens or wallet"
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            {/* Replaced static connect button with Web3 wallet connection component */}
            <WalletConnection />
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Secure IDO Platform</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-slate-400">ZCS</span>
            <span className="text-white">$0.85</span>
            <span className="text-emerald-400">+2.1%</span>
<<<<<<< HEAD
            <span className="text-slate-400">NAIRA</span>
=======
            <span className="text-slate-400">PUSD</span>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
            <span className="text-white">$1.00</span>
          </div>
          {/* Added wallet connection status indicator */}
          {isConnected && account && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-slate-400">
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 border-r border-slate-800 p-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 rounded-lg p-6 border border-emerald-800/30 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="/financial-growth-chart.png"
                  alt="Financial prosperity"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-serif font-bold text-white mb-2">Empowering Your Investment Journey</h2>
                <p className="text-slate-300 text-sm mb-4">
<<<<<<< HEAD
                  Join the future of finance with Zhane Consulting Shares. Invest with confidence using NAIRA.
=======
                  Join the future of finance with Zhane Consulting Shares. Invest with confidence using PUSD.
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Get Started with ZCS Today
                </Button>
              </div>
            </div>

            <KYCStatus status="verified" tier={2} />

            <div>
              <h3 className="text-slate-400 text-sm font-medium mb-4">Platform Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300 hover:text-white cursor-pointer">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span>Real-Time Analytics</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 hover:text-white cursor-pointer">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>Secure Transactions</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 hover:text-white cursor-pointer">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>Community Governance</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 hover:text-white cursor-pointer">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                  <span>Portfolio Management</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src="/placeholder-sivgo.png"
                    alt="Success story"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">Success Story</p>
                    <p className="text-slate-400 text-xs">Verified Investor</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm italic">
                  "ZCS transformed my portfolio. 340% returns in 6 months!"
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-emerald-900/30 to-slate-900/30 rounded-lg p-6 border border-emerald-800/20 relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-20 w-48 h-full">
                <img src="/golden-treasure-growth.png" alt="Wealth growth" className="h-full w-full object-cover" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Build Generational Wealth with ZCS</h2>
                <p className="text-slate-300 mb-4">
                  Join 1,247+ investors who've already secured their financial future
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-emerald-500/20 text-emerald-400">🏆 Top Performing IDO</Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-400">💎 Premium Investment</Badge>
                </div>
              </div>
            </div>

            {/* IDO Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              {idoStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-lg p-4 border border-slate-800 relative overflow-hidden"
                >
                  {index === 0 && (
                    <div className="absolute top-2 right-2 opacity-30">
                      <img src="/golden-money-bag.png" alt="Wealth" className="w-6 h-6" />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-2 right-2 opacity-30">
                      <img src="/confetti-trophy-celebration.png" alt="Success" className="w-6 h-6" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-2 right-2 opacity-30">
                      <img src="/premium-golden-star.png" alt="Premium" className="w-6 h-6" />
                    </div>
                  )}
                  {index === 3 && (
                    <div className="absolute top-2 right-2 opacity-30">
                      <img src="/placeholder-by72y.png" alt="Time" className="w-6 h-6" />
                    </div>
                  )}
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                  <div className="text-white text-xl font-bold">{stat.value}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-emerald-400 text-sm">{stat.change}</span>
                    <span className="text-slate-500 text-xs">Target: {stat.target}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <img src="/golden-star-success.png" alt="Success" className="w-5 h-5" />
                  Recent Success Stories
                </h3>
                <Button variant="ghost" size="sm" className="text-emerald-400">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentInvestors.map((investor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`/professional-investor-avatar.png?key=dzn69&height=32&width=32&query=professional investor avatar ${index + 1} in business attire`}
                        alt="Investor"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white text-sm font-medium">{investor.wallet}</div>
                        <div className="text-slate-400 text-xs">{investor.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 text-sm font-medium">{investor.amount}</div>
                      <div className="text-slate-400 text-xs">{investor.zcs}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IDO Purchase Interface */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 opacity-5">
                <img src="/financial-prosperity.png" alt="Prosperity background" className="w-50 h-25 object-cover" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-xl font-serif font-bold">Purchase ZCS Tokens</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-400">Live IDO</Badge>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
<<<<<<< HEAD
                      <label className="text-slate-400 text-sm mb-2 block">You Pay (NAIRA)</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                                  value={nairaAmount}
          onChange={(e) => handleNairaChange(e.target.value)}
=======
                      <label className="text-slate-400 text-sm mb-2 block">You Pay (PUSD)</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={pusdAmount}
                        onChange={(e) => handlePusdChange(e.target.value)}
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                        className="bg-slate-800 border-slate-700 text-white text-lg h-12"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">You Receive (ZCS)</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={zcsAmount}
                        onChange={(e) => handleZcsChange(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white text-lg h-12"
                      />
                    </div>

                    <Button
                      onClick={() => setShowPurchaseModal(true)}
<<<<<<< HEAD
                      disabled={!isConnected || !nairaAmount || Number.parseFloat(nairaAmount) <= 0}
=======
                      disabled={!isConnected || !pusdAmount || Number.parseFloat(pusdAmount) <= 0}
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                      className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-medium"
                    >
                      {!isConnected ? "Connect Wallet First" : "Purchase ZCS Tokens"}
                    </Button>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Exchange Rate:</span>
<<<<<<< HEAD
                      <span className="text-white">1 NAIRA = 1.176 ZCS</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Minimum Purchase:</span>
                      <span className="text-white">100 NAIRA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Bonus (≥1000 NAIRA):</span>
=======
                      <span className="text-white">1 PUSD = 1.176 ZCS</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Minimum Purchase:</span>
                      <span className="text-white">100 PUSD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Bonus (≥1000 PUSD):</span>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
                      <span className="text-emerald-400">+10% ZCS</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Vesting Period:</span>
                      <span className="text-white">6 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Prosperity Section */}
            <div className="bg-gradient-to-r from-slate-900 to-emerald-900/20 rounded-lg p-6 border border-emerald-800/30 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">
                    Securing Prosperity for Five Generations
                  </h3>
                  <p className="text-slate-300 mb-4">
                    At Zhane Consulting Shares, we believe in building wealth that lasts. Our ZCS token represents more
                    than an investment—it's a legacy for your children, grandchildren, great-grandchildren, and beyond.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-slate-300 text-sm">Generational wealth building strategies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-slate-300 text-sm">Family-focused investment planning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-slate-300 text-sm">Long-term value preservation</span>
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Your Family's Legacy</Button>
                </div>
                <div className="relative">
                  <div className="rounded-lg overflow-hidden border-2 border-emerald-600/30 shadow-2xl">
                    <img
                      src="/five-generation-family.png"
                      alt="Happy five-generation family celebrating financial success together"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-sm font-medium">5 Generations Strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Purchase Modal */}
        <IDOPurchaseModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
<<<<<<< HEAD
          nairaAmount={nairaAmount}
          zcsAmount={zcsAmount}
=======
          onComplete={handlePurchaseComplete}
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
        />
      </div>
    </div>
  )
}
