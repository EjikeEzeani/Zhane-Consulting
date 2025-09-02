## Product Requirements Document (PRD)

### Project: Zhane Consulting — IDO End-to-End Integration

### Problem Statement / Goal
Enable a complete end-to-end Initial DEX Offering (IDO) experience by integrating on-chain smart contracts with the existing Next.js frontend. Users must be able to connect a wallet, view IDO status, approve stablecoin (NAIRA), purchase ZCS tokens during the sale, and claim tokens after the claim phase unlocks. Additionally, provide basic staking interactions. Integration should be network-aware and production-ready.

### Success Criteria
- Users can connect a wallet, switch to a supported network, and see their balances and IDO state.
- Users can approve NAIRA spending and buy ZCS in the IDO.
- Users can claim tokens when claim opens.
- Optional: Users can stake/unstake and claim staking rewards.
- Contract addresses and ABIs are sourced automatically from the contracts build/deploy outputs without manual copy/paste.
- Works on at least one testnet (e.g., Sepolia) and one mainnet (Ethereum, Polygon) configuration.

### Scope
- Frontend wiring to smart contracts using `ethers` v6 (already in project).
- Contracts build/deploy pipeline that outputs ABIs and per-network addresses in a machine-readable format the frontend can import at build time.
- Wallet connection, network switching, approval, purchase, claim, staking, and state read.
- Notifications, loading states, error handling, and optimistic UI where safe.

### Out of Scope
- Advanced KYC/AML flows (beyond a placeholder status display).
- Off-chain order books, price feeds beyond contract-provided price.
- Multi-wallet connectors beyond MetaMask (future: WalletConnect/RainbowKit).

### Users / Personas
- Retail investors participating in the IDO.
- Project operators verifying sale progress and supporting participants.

### Key User Stories
- As a user, I can connect my wallet and see the current network and balances.
- As a user, I can see IDO price, my contribution, total raised, and time to end/claim window.
- As a user, I can approve NAIRA for the IDO contract.
- As a user, I can purchase ZCS by entering a NAIRA amount and confirming the transaction.
- As a user, I can claim ZCS after claim opens.
- As a user, I can view and perform basic staking actions.

### Functional Requirements
- Wallet/Network
  - Detect wallet, connect/disconnect, persist session.
  - Network guard with guided switching to supported chains.
- IDO Read
  - Display token price, user contribution, total raised, end time, claimable amount.
- IDO Write
  - Approve NAIRA allowance for IDO contract.
  - Buy ZCS during sale; disable outside window.
  - Claim ZCS after claim opens.
- Staking (basic)
  - Stake, unstake, claim rewards, read staked/pending amounts.
- UX/State
  - Loading states for all async actions.
  - Toasts/snackbars for success/failure.
  - Disable buttons while pending; validate inputs.

### Non-Functional Requirements
- Security: Guard re-entrancy client patterns (no unbounded callbacks), validate addresses, respect user confirmations.
- Performance: Minimize provider calls; cache reads; subscribe to events where possible.
- Compatibility: MetaMask (EIP-1193); Ethers v6; Next.js 15.
- Accessibility: Keyboard operability; ARIA for dialogs and toasts.

### Current Codebase Summary (Frontend)
- `contexts/web3-context.tsx`: Centralizes provider/signer and exposes contract actions: approve, buyTokens, claimTokens, staking operations.
- `lib/web3-config.ts`: Defines supported chains, default chain (Sepolia), and ABIs for ERC20, IDO, Staking. Addresses are placeholders.
- UI pages/components under `app/` and `components/` already reference wallet and IDO concepts.

### Proposed Architecture for Contract ↔ Frontend Linking
Two viable setups. Recommended: pnpm monorepo with workspace packages.

Option A — Monorepo (recommended)
- Structure
  - `packages/contracts/` — Solidity, tooling (Hardhat or Foundry), deployment scripts
  - `packages/web/` — Next.js app (this repo’s frontend)
  - `packages/contracts/deployments/` — Per-network JSON files with addresses and metadata
  - `packages/contracts/abigen/` or `typechain-types/` — Generated types
- Frontend consumes: `import deployments from '@zhane/contracts/deployments/sepolia.json'` and ABIs from the same package. Type-safe factories via TypeChain.

Option B — Single repo, colocated folders
- Structure
  - `contracts/` — Solidity, tooling
  - `contracts/deployments/` — Per-network JSON outputs
  - Frontend imports using relative paths, e.g., `import sepolia from '../contracts/deployments/sepolia.json'`.

Contract Build/Deploy Output Contract
- For each chain, generate a deployment file, e.g., `deployments/11155111.json`:
```json
{
  "chainId": 11155111,
  "networkName": "sepolia",
  "contracts": {
    "ZCS_TOKEN": { "address": "0x...", "abi": [/* ABI */] },
    "NAIRA_TOKEN": { "address": "0x...", "abi": [/* ABI */] },
    "IDO_CONTRACT": { "address": "0x...", "abi": [/* ABI */] },
    "STAKING_CONTRACT": { "address": "0x...", "abi": [/* ABI */] }
  }
}
```
- Frontend should load the file matching the active chainId at runtime/build time.

ABI and Types
- Use TypeChain (for Hardhat) or `forge typechain` (for Foundry) to emit typed factories consumed by the frontend.
- Keep canonical ABIs in contract build artifacts; do not hand-maintain ABIs in `lib/web3-config.ts`.

### Frontend Integration Plan
1) Replace manual addresses and ABIs in `lib/web3-config.ts` with generated data sourced from `deployments/<chainId>.json`.
   - Keep `SUPPORTED_CHAINS` with metadata (id, name, rpc, explorer), but remove hardcoded addresses.
   - Load addresses dynamically from generated deployment files.
2) Update `contexts/web3-context.tsx` to instantiate contracts using ABIs from deployments instead of `CONTRACT_ABIS` constants, e.g.:
   - `new ethers.Contract(deployments.contracts.IDO_CONTRACT.address, deployments.contracts.IDO_CONTRACT.abi, signer)`.
3) Add event subscriptions for live updates:
   - IDO: `TokenPurchased(address buyer, uint256 amountNAIRA, uint256 amountZCS)`
   - Claim: `TokensClaimed(address user, uint256 amount)`
   - Staking: `Staked`, `Unstaked`, `RewardsClaimed`
4) UI/State
   - Derive price, totals, user contribution, claimable via reads on mount and when events fire.
   - Disable actions outside their windows (buy before end, claim after claim-enabled flag/time).

### Contracts Requirements (Interface-Level)
Assumed/Required functions (align with existing code):
- ERC20: `balanceOf`, `decimals`, `approve`, `allowance`.
- IDO:
  - `function buyTokens(uint256 nairaAmount)`
  - `function getTokenPrice() view returns (uint256)`
  - `function getUserInvestment(address) view returns (uint256)`
  - `function getTotalRaised() view returns (uint256)`
  - `function getIdoEndTime() view returns (uint256)`
  - `function claimTokens()`
  - `function getClaimableAmount(address) view returns (uint256)`
  - Events: `TokenPurchased`, `TokensClaimed`
- Staking:
  - `stake(uint256)`, `unstake(uint256)`, `claimRewards()`
  - Reads: `getStakedAmount(address)`, `getPendingRewards(address)`, `getAPY()`

If the actual contracts differ, update the ABI and integration points accordingly.

### Environment / Config
- `.env.local`
  - `NEXT_PUBLIC_DEFAULT_CHAIN_ID=11155111`
  - `NEXT_PUBLIC_RPC_URL_SEPOLIA=...`
  - `NEXT_PUBLIC_RPC_URL_MAINNET=...`
  - `NEXT_PUBLIC_RPC_URL_POLYGON=...`
- Optional backendless RPCs are acceptable; prefer public RPCs with fallback.

### Package Management and Workspace
- Use `pnpm`.
- If adopting monorepo:
  - Root `package.json` with `"private": true` and `"workspaces": ["packages/*"]`.
  - `packages/contracts` and `packages/web` as separate packages.
  - Frontend depends on `@zhane/contracts` for deployments and ABIs.

### UX Flows
- Connect Wallet
  - Click Connect → Request accounts → Store `account`, `chainId`, `provider`, `signer`.
- Approve + Buy
  - Input NAIRA amount → `approve(NAIRA -> IDO, amount)` → `buyTokens(amount)`.
- Claim
  - After claim window starts → `claimTokens()` → update balances.
- Staking
  - Input ZCS amount → `stake(amount)`; later `unstake(amount)`; claim rewards.

### Error Handling
- Surface JSON-RPC errors plainly with user-friendly mapping (e.g., insufficient funds, user rejected, underflow/overflow).
- Validate numeric inputs; prevent 0 or negative; cap at available balances/allowance.
- Fallback when ABI or deployments file for a chainId is missing.

### Telemetry / Metrics
- Log transaction hash, confirmation time (client-side only, no PII).
- Count successful/failed actions by action type.

### Testing Strategy
- Contracts: unit tests for IDO price logic, purchase caps, claim windows, staking math.
- Integration: spin local node (Hardhat/Anvil), deploy contracts, run Playwright/Cypress E2E to simulate approve → buy → claim.
- Frontend: component tests for state changes (loading, error, success), and wallet-mocked flows.

### Deployment Process
1) Deploy contracts per environment; output `deployments/<chainId>.json` with addresses + ABIs.
2) Publish `@zhane/contracts` (if monorepo), or copy deployments folder into repo in colocated mode.
3) Build Next.js app; verify that the correct chainId mappings exist at runtime.

### Acceptance Criteria
- Dynamic contract addresses/ABIs are consumed from deployments with no hardcoded addresses in `lib/web3-config.ts`.
- Approve/Purchase/Claim work on Sepolia using deployed contracts.
- Staking basic actions work if staking contract is deployed; if not, UI degrades gracefully.
- Network switching prompts when on unsupported chain.
- All actions have loading and success/failure toasts.

### Risks / Mitigations
- ABI drift vs. frontend expectations → Pin versions and auto-generate types; single source of truth from deployments.
- Wrong chain selected → Enforce network guard and switch prompt.
- Allowance race conditions → Re-read allowance post-approve before enabling buy.
- Price decimals mismatch → Read decimals and format amounts dynamically; never assume 18 unless contract guarantees.

### Implementation Plan (Milestones)
M1 — Contracts package and outputs
- Add `contracts/` (or `packages/contracts/`) with Hardhat/Foundry.
- Implement deployment scripts that emit `deployments/<chainId>.json` with addresses and ABIs.

M2 — Frontend dynamic wiring
- Replace `CONTRACT_ABIS` and static addresses in `lib/web3-config.ts` with a loader for `deployments/<chainId>.json`.
- Update `contexts/web3-context.tsx` to instantiate contracts from deployments.
- Add event listeners to refresh state after txs.

M3 — UI polish and validations
- Improve forms, input validation, and toasts. Disable actions by sale phase.
- Add empty/error states for missing deployments.

M4 — E2E on testnet
- Deploy to Sepolia, connect FE to Sepolia artifacts, complete full approve → buy → claim flow.

### Open Questions
- Which network(s) are primary for launch? Final RPCs?
- Final token decimals and symbol for ZCS and NAIRA?
- Are there participant caps, whitelists, or vesting schedules beyond claim?

### Developer Notes (Practical How-To)
- Hardhat example outputs using `hardhat-deploy` automatically create `deployments/<network>` with address + ABI JSON. If not using it, write a post-deploy script to collect addresses and ABIs into a single `deployments/<chainId>.json` as specified above.
- Frontend loader example (conceptual):
```ts
// lib/deployments.ts
export async function loadDeployments(chainId: number) {
  // if colocated: dynamic import based on chainId
  const map: Record<number, string> = {
    1: 'deployments/1.json',
    137: 'deployments/137.json',
    11155111: 'deployments/11155111.json'
  }
  const path = map[chainId]
  if (!path) throw new Error('Unsupported chain')
  return (await import(`../${path}`)).default
}
```
- Replace direct uses of `CONTRACT_ABIS` with ABIs from the loaded deployments object.



