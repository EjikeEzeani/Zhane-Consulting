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
@@ -33,9 +33,9 @@
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
    contracts: {
      ZCS_TOKEN: "0x9012345678901234567890123456789012345678",
      NAIRA_TOKEN: "0xDd7639e3920426de6c59A1009C7ce2A9802d0920",
      IDO_CONTRACT: "0x1234567890123456789012345678901234567890",
      STAKING_CONTRACT: "0x2345678901234567890123456789012345678901",
    },
  },
@@ -57,7 +57,7 @@
    "function name() view returns (string)",
  ],
  IDO_CONTRACT: [
    "function buy(uint256 amountB)",
 
    "function owner() view returns (address)",
    "function rate() view returns (uint256)",
    "function tokenA() view returns (address)",
