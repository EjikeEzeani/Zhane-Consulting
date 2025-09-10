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
      NAIRA_TOKEN: "0xDd7639e3920426de6c59A1009C7ce2A9802d0920",
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
      ZCS_TOKEN: "0x9012345678901234567890123456789012345678",
      NAIRA_TOKEN: "0xDd7639e3920426de6c59A1009C7ce2A9802d0920",
      IDO_CONTRACT: "0x1234567890123456789012345678901234567890",
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
      ZCS_TOKEN: "0x78F794133244999CE806B4c41e9Fd17143c0D506",
      NAIRA_TOKEN: "0xDd7639e3920426de6c59A1009C7ce2A9802d0920",
      IDO_CONTRACT: "0x169624F443E57b4c128e9F7FB96Bc4c07D09b3b9",
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
    "function buyTokens(uint256 amountB)",
    "function owner() view returns (address)",
    "function rate() view returns (uint256)",
    "function tokenA() view returns (address)",
    "function tokenB() view returns (address)",
    "function withdrawTokenB()",
    "function withdrawUnsoldTokenA()",
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
