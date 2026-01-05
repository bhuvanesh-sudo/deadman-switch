# 💀 KeepAlive: Decentralized Dead Man's Switch

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.19-363636.svg)
![Network](https://img.shields.io/badge/Network-Sepolia-orange.svg)

**KeepAlive** is a programmable, censorship-resistant smart contract designed for digital asset inheritance and emergency contingency. 

Unlike traditional wills or custodial services, this protocol relies entirely on code ("Code is Law") to execute asset transfers. If the owner fails to interact with the contract ("Ping") within a predefined epoch, the logic assumes the owner is incapacitated and unlocks the funds for the designated beneficiary.

---

## ⚡ Key Features

* **Trustless Architecture:** No intermediaries (lawyers, banks) are required to execute the transfer.
* **Proof-of-Life Mechanism:** The owner must sign a transaction (`ping()`) periodically to reset the countdown.
* **Time-Locked Security:** Funds are cryptographically locked and cannot be withdrawn by the beneficiary until the `block.timestamp` exceeds the threshold.
* **Beneficiary-Pull Pattern:** Following security best practices, the beneficiary must initiate the withdrawal transaction to prevent reentrancy attacks or gas limit issues.

---

## 🛠 Tech Stack

* **Smart Contract:** Solidity (v0.8.19)
* **Development Environment:** Hardhat (TypeScript)
* **Testing:** Mocha/Chai
* **Client Interaction:** Ethers.js / Viem
* **Network:** Ethereum Sepolia Testnet

---

## ⚙️ How It Works

1.  **Deployment:** The owner deploys the contract, specifying a `beneficiary` address.
2.  **Funding:** The contract accepts ETH via the standard `receive()` fallback function.
3.  **Heartbeat:** The owner calls `ping()` every few weeks/months. This updates the `lastHeartbeat` timestamp on the blockchain.
4.  **Trigger:** If the owner stops pinging (e.g., due to loss of keys or incapacitation) and the duration (e.g., 52 weeks) passes, the `claim()` function becomes executable.
5.  **Execution:** The beneficiary calls `claim()`, and the contract transfers the entire balance to them.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* NPM or Yarn
* An Ethereum Wallet (MetaMask)

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/yourusername/keep-alive-switch.git](https://github.com/yourusername/keep-alive-switch.git)
    cd keep-alive-switch
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Compile the Smart Contracts**
    ```bash
    npx hardhat compile
    ```

4.  **Run Tests**
    *Includes time-travel simulation to verify the 52-week lock.*
    ```bash
    npx hardhat test
    ```

---

## 🧪 Testing Strategy

This project uses **Hardhat Network Helpers** to simulate the passage of time without waiting for real-world blocks.

* `test/Lock.ts`: Verifies that:
    * The beneficiary **cannot** claim funds immediately.
    * The owner **can** ping and reset the timer.
    * The network time can be fast-forwarded 53 weeks.
    * The beneficiary **can** claim funds after the duration expires.

---

## 🛡 Security Considerations

* **Access Control:** The `ping` function is protected by an `onlyOwner` modifier.
* **Pull-over-Push:** The contract does not automatically send funds (push) to avoid getting stuck if the receiving address is a contract that rejects payments. The beneficiary must explicitly claim (pull) the funds.
* **Visibility:** All state variables (balance, last heartbeat, beneficiary) are public and verifiable on-chain.

---

## 🔮 Future Roadmap

* [ ] **Multi-Asset Support:** Allow the contract to hold ERC-20 tokens (USDC, USDT) in addition to ETH.
* [ ] **Chainlink Automation:** Integrate Chainlink Keepers to auto-execute the claim function when conditions are met.
* [ ] **Multi-Sig Logic:** Allow the owner to be a Multi-Sig wallet (e.g., Gnosis Safe) for added security during the "alive" phase.

## 📄 License
MIT
