// Web3 configuration and contract addresses
export const WEB3_CONFIG = {
  // Ethereum Mainnet
  MAINNET: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
    contracts: {
      ZCS_TOKEN: "0x1234567890123456789012345678901234567890",
<<<<<<< HEAD
      NAIRA_TOKEN: "0x2345678901234567890123456789012345678901",
=======
      PUSD_TOKEN: "0x2345678901234567890123456789012345678901",
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
      IDO_CONTRACT: "0x3456789012345678901234567890123456789012",
      STAKING_CONTRACT: "0x4567890123456789012345678901234567890123",
    },
  },
  // Polygon Mainnet
  POLYGON: {
    chainId: 137,
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://polygonscan.com",
    contracts: {
      ZCS_TOKEN: "0x5678901234567890123456789012345678901234",
<<<<<<< HEAD
      NAIRA_TOKEN: "0x6789012345678901234567890123456789012345",
=======
      PUSD_TOKEN: "0x6789012345678901234567890123456789012345",
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
      IDO_CONTRACT: "0x7890123456789012345678901234567890123456",
      STAKING_CONTRACT: "0x8901234567890123456789012345678901234567",
    },
  },
  // Sepolia Testnet
  SEPOLIA: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
    contracts: {
      ZCS_TOKEN: "0x9012345678901234567890123456789012345678",
<<<<<<< HEAD
      NAIRA_TOKEN: "0x0123456789012345678901234567890123456789",
=======
      PUSD_TOKEN: "0x0123456789012345678901234567890123456789",
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
      IDO_CONTRACT: "0x1234567890123456789012345678901234567890",
      STAKING_CONTRACT: "0x2345678901234567890123456789012345678901",
    },
  },
}

export const SUPPORTED_CHAINS = [WEB3_CONFIG.MAINNET, WEB3_CONFIG.POLYGON, WEB3_CONFIG.SEPOLIA]

export const DEFAULT_CHAIN = WEB3_CONFIG.SEPOLIA // Use testnet by default

// Contract ABIs (simplified for demo)
export const CONTRACT_ABIS = {
  ERC20: [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)",
  ],
  IDO_CONTRACT: [
<<<<<<< HEAD
    "function buyTokens(uint256 nairaAmount) payable",
=======
    "function buyTokens(uint256 pusdAmount) payable",
>>>>>>> 59d80e45fe4a67683c07bfbd9453374c12f99eaa
    "function getTokenPrice() view returns (uint256)",
    "function getUserInvestment(address user) view returns (uint256)",
    "function getTotalRaised() view returns (uint256)",
    "function getIdoEndTime() view returns (uint256)",
    "function claimTokens()",
    "function getClaimableAmount(address user) view returns (uint256)",
  ],
  STAKING_CONTRACT: [
    "function stake(uint256 amount)",
    "function unstake(uint256 amount)",
    "function claimRewards()",
    "function getStakedAmount(address user) view returns (uint256)",
    "function getPendingRewards(address user) view returns (uint256)",
    "function getAPY() view returns (uint256)",
  ],
}
