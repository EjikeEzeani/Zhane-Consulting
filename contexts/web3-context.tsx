"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { ethers } from "ethers"
import { WEB3_CONFIG, DEFAULT_CHAIN, CONTRACT_ABIS } from "@/lib/web3-config"
import { toast } from "sonner"

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      selectedAddress?: string
      chainId?: string
    }
  }
}

interface Web3ContextType {
  isConnected: boolean
  account: string | null
  chainId: number | null
  provider: ethers.Provider | null
  signer: ethers.Signer | null
  zcsToken: ethers.Contract | null
  nairaToken: ethers.Contract | null
  idoContract: ethers.Contract | null
  stakingContract: ethers.Contract | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (chainId: number) => Promise<void>
  buyTokens: (nairaAmount: string) => Promise<ethers.ContractTransactionResponse>
  approveToken: (tokenAddress: string, spenderAddress: string, amount: string) => Promise<ethers.ContractTransactionResponse>
  getTokenBalance: (tokenAddress: string) => Promise<string>
  getTokenAllowance: (tokenAddress: string, spenderAddress: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | null>(null)

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [provider, setProvider] = useState<ethers.Provider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [zcsToken, setZcsToken] = useState<ethers.Contract | null>(null)
  const [nairaToken, setNairaToken] = useState<ethers.Contract | null>(null)
  const [idoContract, setIDOContract] = useState<ethers.Contract | null>(null)
  const [stakingContract, setStakingContract] = useState<ethers.Contract | null>(null)

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setIsConnected(false)
      setAccount(null)
      setProvider(null)
      setSigner(null)
      setZcsToken(null)
      setNairaToken(null)
      setIDOContract(null)
      setStakingContract(null)
    } else {
      setAccount(accounts[0])
    }
  }

  const handleChainChanged = (newChainId: string) => {
    setChainId(parseInt(newChainId, 16))
    window.location.reload()
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      // Check if already connected
      const checkConnection = async () => {
        try {
          if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            if (accounts.length > 0) {
              const browserProvider = new ethers.BrowserProvider(window.ethereum)
              const signer = await browserProvider.getSigner()
              const network = await browserProvider.getNetwork()

              setProvider(browserProvider)
              setSigner(signer)
              setAccount(accounts[0])
              setChainId(Number(network.chainId))
              setIsConnected(true)
            }
          }
        } catch (error) {
          console.log("No existing connection found")
        }
      }

      checkConnection()

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [])

  const connectWallet = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask is not installed")
      }

      // Request account access - this will prompt the user to connect
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      
      if (accounts.length > 0) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum)
        const signer = await browserProvider.getSigner()
        const network = await browserProvider.getNetwork()
        const currentChainId = Number(network.chainId)

        // Check if current network is supported
        const isSupported = Object.values(WEB3_CONFIG).some(config => config.chainId === currentChainId)
        
        if (!isSupported) {
          // Auto-switch to default network
          try {
            await switchNetwork(DEFAULT_CHAIN.chainId)
            // After switching, get the new network info
            const newNetwork = await browserProvider.getNetwork()
            setChainId(Number(newNetwork.chainId))
          } catch (switchError) {
            console.warn("Failed to auto-switch network:", switchError)
            // Still allow connection but warn user
            toast?.warning("Connected to unsupported network. Please switch manually.")
          }
        } else {
          setChainId(currentChainId)
        }

        setProvider(browserProvider)
        setSigner(signer)
        setAccount(accounts[0])
        setIsConnected(true)
      } else {
        throw new Error("No accounts found")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setChainId(null)
    setZcsToken(null)
    setNairaToken(null)
    setIDOContract(null)
    setStakingContract(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask is not installed")
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const browserProvider = new ethers.BrowserProvider(window.ethereum)

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          const chainConfig = Object.values(WEB3_CONFIG).find((c) => c.chainId === targetChainId)
          if (chainConfig) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${targetChainId.toString(16)}`,
                  chainName: chainConfig.name,
                  nativeCurrency: {
                    name: "Ether",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: [chainConfig.rpcUrl],
                  blockExplorerUrls: [chainConfig.blockExplorer],
                },
              ],
            })
          }
        } else {
          throw switchError
        }
      }

      const signer = await browserProvider.getSigner()
      const network = await browserProvider.getNetwork()

      setProvider(browserProvider)
      setSigner(signer)
      setChainId(Number(network.chainId))
    } catch (error) {
      console.error("Error switching network:", error)
      throw error
    }
  }

  const buyTokens = async (nairaAmount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!idoContract || !signer) {
      throw new Error("Contract or signer not available")
    }

    try {
      const amount = ethers.parseUnits(nairaAmount, 18)
      // Based on the ABI, the function is called 'buy' and takes amountB parameter
      const tx = await idoContract.buy(amount)
      return tx
    } catch (error) {
      console.error("Error buying tokens:", error)
      throw error
    }
  }

  const approveToken = async (
    tokenAddress: string,
    spenderAddress: string,
    amount: string
  ): Promise<ethers.ContractTransactionResponse> => {
    if (!signer) {
      throw new Error("Signer not available")
    }

    try {
      const token = new ethers.Contract(tokenAddress, CONTRACT_ABIS.ERC20, signer)
      const amountWei = ethers.parseUnits(amount, 18)
      const tx = await token.approve(spenderAddress, amountWei)
      return tx
    } catch (error) {
      console.error("Error approving token:", error)
      throw error
    }
  }

  const getTokenBalance = async (tokenAddress: string): Promise<string> => {
    if (!signer || !account) {
      throw new Error("Signer or account not available")
    }

    try {
      const token = new ethers.Contract(tokenAddress, CONTRACT_ABIS.ERC20, signer)
      const balance = await token.balanceOf(account)
      return ethers.formatUnits(balance, 18)
    } catch (error) {
      console.error("Error getting token balance:", error)
      throw error
    }
  }

  const getTokenAllowance = async (tokenAddress: string, spenderAddress: string): Promise<string> => {
    if (!signer || !account) {
      throw new Error("Signer or account not available")
    }

    try {
      const token = new ethers.Contract(tokenAddress, CONTRACT_ABIS.ERC20, signer)
      const allowance = await token.allowance(account, spenderAddress)
      return ethers.formatUnits(allowance, 18)
    } catch (error: any) {
      console.error("Error getting token allowance:", error)
      
      // Provide more specific error messages
      if (error.code === 'BAD_DATA' || error.message.includes('could not decode result data')) {
        throw new Error("Token contract not found or invalid. Please check the network and contract addresses.")
      } else if (error.message.includes('network')) {
        throw new Error("Network error. Please check your connection and try again.")
      } else {
        throw new Error(`Failed to check token allowance: ${error.message}`)
      }
    }
  }

  useEffect(() => {
    if (signer && chainId) {
      const config = Object.values(WEB3_CONFIG).find((c) => c.chainId === chainId) || DEFAULT_CHAIN
      try {
        const zcs = new ethers.Contract(config.contracts.ZCS_TOKEN, CONTRACT_ABIS.ERC20, signer)
        const naira = new ethers.Contract(config.contracts.NAIRA_TOKEN, CONTRACT_ABIS.ERC20, signer)
        const ido = new ethers.Contract(config.contracts.IDO_CONTRACT, CONTRACT_ABIS.IDO_CONTRACT, signer)
        const staking = new ethers.Contract(config.contracts.STAKING_CONTRACT, CONTRACT_ABIS.STAKING_CONTRACT, signer)

        setZcsToken(zcs)
        setNairaToken(naira)
        setIDOContract(ido)
        setStakingContract(staking)
      } catch (error) {
        console.error("Error initializing contracts:", error)
      }
    }
  }, [signer, chainId])

  const value: Web3ContextType = {
    isConnected,
    account,
    chainId,
    provider,
    signer,
    zcsToken,
    nairaToken,
    idoContract,
    stakingContract,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    buyTokens,
    approveToken,
    getTokenBalance,
    getTokenAllowance,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}
