"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ethers } from "ethers"
import { WEB3_CONFIG, DEFAULT_CHAIN, CONTRACT_ABIS } from "@/lib/web3-config"

interface Web3ContextType {
  // Connection state
  isConnected: boolean
  isConnecting: boolean
  account: string | null
  chainId: number | null
  balance: string

  // Provider and signer
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null

  // Contract instances
  zcsToken: ethers.Contract | null
<<<<<<< HEAD
  nairaToken: ethers.Contract | null
=======
  pusdToken: ethers.Contract | null
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  idoContract: ethers.Contract | null
  stakingContract: ethers.Contract | null

  // Actions
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (chainId: number) => Promise<void>

  // Token operations
  getTokenBalance: (tokenAddress: string) => Promise<string>
  approveToken: (
    tokenAddress: string,
    spenderAddress: string,
    amount: string,
  ) => Promise<ethers.ContractTransactionResponse>

  // IDO operations
<<<<<<< HEAD
  buyTokens: (nairaAmount: string) => Promise<ethers.ContractTransactionResponse>
=======
  buyTokens: (pusdAmount: string) => Promise<ethers.ContractTransactionResponse>
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  claimTokens: () => Promise<ethers.ContractTransactionResponse>
  getClaimableAmount: () => Promise<string>

  // Staking operations
  stakeTokens: (amount: string) => Promise<ethers.ContractTransactionResponse>
  unstakeTokens: (amount: string) => Promise<ethers.ContractTransactionResponse>
  claimStakingRewards: () => Promise<ethers.ContractTransactionResponse>
  getStakedAmount: () => Promise<string>
  getPendingRewards: () => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [balance, setBalance] = useState("0")
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)

  // Contract instances
  const [zcsToken, setZcsToken] = useState<ethers.Contract | null>(null)
<<<<<<< HEAD
  const [nairaToken, setNairaToken] = useState<ethers.Contract | null>(null)
=======
  const [pusdToken, setPusdToken] = useState<ethers.Contract | null>(null)
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
  const [idoContract, setIdoContract] = useState<ethers.Contract | null>(null)
  const [stakingContract, setStakingContract] = useState<ethers.Contract | null>(null)

  // Initialize contracts when signer changes
  useEffect(() => {
    if (signer && chainId) {
      const config = Object.values(WEB3_CONFIG).find((c) => c.chainId === chainId) || DEFAULT_CHAIN

      try {
        const zcs = new ethers.Contract(config.contracts.ZCS_TOKEN, CONTRACT_ABIS.ERC20, signer)
<<<<<<< HEAD
        const naira = new ethers.Contract(config.contracts.NAIRA_TOKEN, CONTRACT_ABIS.ERC20, signer)
=======
        const pusd = new ethers.Contract(config.contracts.PUSD_TOKEN, CONTRACT_ABIS.ERC20, signer)
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
        const ido = new ethers.Contract(config.contracts.IDO_CONTRACT, CONTRACT_ABIS.IDO_CONTRACT, signer)
        const staking = new ethers.Contract(config.contracts.STAKING_CONTRACT, CONTRACT_ABIS.STAKING_CONTRACT, signer)

        setZcsToken(zcs)
<<<<<<< HEAD
        setNairaToken(naira)
=======
        setPusdToken(pusd)
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
        setIdoContract(ido)
        setStakingContract(staking)
      } catch (error) {
        console.error("Error initializing contracts:", error)
      }
    }
  }, [signer, chainId])

  // Check if wallet is already connected on load
  useEffect(() => {
    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      }

      const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  // Update balance when account or chainId changes
  useEffect(() => {
    if (account && provider) {
      updateBalance()
    }
  }, [account, provider, chainId])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          const browserProvider = new ethers.BrowserProvider(window.ethereum)
          const network = await browserProvider.getNetwork()
          const signer = await browserProvider.getSigner()

          setProvider(browserProvider)
          setSigner(signer)
          setAccount(accounts[0])
          setChainId(Number(network.chainId))
          setIsConnected(true)
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask is not installed")
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const network = await browserProvider.getNetwork()
      const signer = await browserProvider.getSigner()

      setProvider(browserProvider)
      setSigner(signer)
      setAccount(accounts[0])
      setChainId(Number(network.chainId))
      setIsConnected(true)
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setSigner(null)
    setAccount(null)
    setChainId(null)
    setBalance("0")
    setIsConnected(false)
    setZcsToken(null)
<<<<<<< HEAD
            setNairaToken(null)
=======
    setPusdToken(null)
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
    setIdoContract(null)
    setStakingContract(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask is not installed")
    }

    const config = Object.values(WEB3_CONFIG).find((c) => c.chainId === targetChainId)
    if (!config) {
      throw new Error("Unsupported network")
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: config.name,
                rpcUrls: [config.rpcUrl],
                blockExplorerUrls: [config.blockExplorer],
              },
            ],
          })
        } catch (addError) {
          throw addError
        }
      } else {
        throw switchError
      }
    }
  }

  const updateBalance = async () => {
    if (account && provider) {
      try {
        const balance = await provider.getBalance(account)
        setBalance(ethers.formatEther(balance))
      } catch (error) {
        console.error("Error updating balance:", error)
      }
    }
  }

  const getTokenBalance = async (tokenAddress: string): Promise<string> => {
    if (!signer || !account) throw new Error("Wallet not connected")

    const tokenContract = new ethers.Contract(tokenAddress, CONTRACT_ABIS.ERC20, signer)
    const balance = await tokenContract.balanceOf(account)
    const decimals = await tokenContract.decimals()
    return ethers.formatUnits(balance, decimals)
  }

  const approveToken = async (
    tokenAddress: string,
    spenderAddress: string,
    amount: string,
  ): Promise<ethers.ContractTransactionResponse> => {
    if (!signer) throw new Error("Wallet not connected")

    const tokenContract = new ethers.Contract(tokenAddress, CONTRACT_ABIS.ERC20, signer)
    const decimals = await tokenContract.decimals()
    const amountWei = ethers.parseUnits(amount, decimals)

    return await tokenContract.approve(spenderAddress, amountWei)
  }

<<<<<<< HEAD
  const buyTokens = async (nairaAmount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!idoContract || !nairaToken) throw new Error("Contracts not initialized")

    const decimals = await nairaToken.decimals()
    const amountWei = ethers.parseUnits(nairaAmount, decimals)
=======
  const buyTokens = async (pusdAmount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!idoContract || !pusdToken) throw new Error("Contracts not initialized")

    const decimals = await pusdToken.decimals()
    const amountWei = ethers.parseUnits(pusdAmount, decimals)
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa

    return await idoContract.buyTokens(amountWei)
  }

  const claimTokens = async (): Promise<ethers.ContractTransactionResponse> => {
    if (!idoContract) throw new Error("IDO contract not initialized")
    return await idoContract.claimTokens()
  }

  const getClaimableAmount = async (): Promise<string> => {
    if (!idoContract || !account) throw new Error("Contract not initialized or wallet not connected")

    const amount = await idoContract.getClaimableAmount(account)
    return ethers.formatUnits(amount, 18) // Assuming 18 decimals for ZCS
  }

  const stakeTokens = async (amount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!stakingContract) throw new Error("Staking contract not initialized")

    const amountWei = ethers.parseUnits(amount, 18)
    return await stakingContract.stake(amountWei)
  }

  const unstakeTokens = async (amount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!stakingContract) throw new Error("Staking contract not initialized")

    const amountWei = ethers.parseUnits(amount, 18)
    return await stakingContract.unstake(amountWei)
  }

  const claimStakingRewards = async (): Promise<ethers.ContractTransactionResponse> => {
    if (!stakingContract) throw new Error("Staking contract not initialized")
    return await stakingContract.claimRewards()
  }

  const getStakedAmount = async (): Promise<string> => {
    if (!stakingContract || !account) throw new Error("Contract not initialized or wallet not connected")

    const amount = await stakingContract.getStakedAmount(account)
    return ethers.formatUnits(amount, 18)
  }

  const getPendingRewards = async (): Promise<string> => {
    if (!stakingContract || !account) throw new Error("Contract not initialized or wallet not connected")

    const amount = await stakingContract.getPendingRewards(account)
    return ethers.formatUnits(amount, 18)
  }

  const value: Web3ContextType = {
    // Connection state
    isConnected,
    isConnecting,
    account,
    chainId,
    balance,

    // Provider and signer
    provider,
    signer,

    // Contract instances
    zcsToken,
<<<<<<< HEAD
    nairaToken,
=======
    pusdToken,
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
    idoContract,
    stakingContract,

    // Actions
    connectWallet,
    disconnectWallet,
    switchNetwork,

    // Token operations
    getTokenBalance,
    approveToken,

    // IDO operations
    buyTokens,
    claimTokens,
    getClaimableAmount,

    // Staking operations
    stakeTokens,
    unstakeTokens,
    claimStakingRewards,
    getStakedAmount,
    getPendingRewards,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}
