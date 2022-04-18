# Implementing a Decentralized Autonomous Organization

## Develop and Deploy a Smart Contract Representing the Governance Token
We develop our smart contracts using the programming language [solidity](https://soliditylang.org/).  
We use [remix.ethereum.org](https://remix.ethereum.org/) as an online IDE to compile, test and deploy our smart contracts.  
To save gas fees during the development phase we deploy our smart contracts not onto the mainnet but onto the ropsten testnet. 
For later production ready deployments we use either the Ethereum Mainnet or the Layer 2 Scaling Solution Arbitrum. 

Governance tokens are typically implemented as fungible tokens - e.g. using the ERC20 template. You might refer to [the wizard](https://wizard.openzeppelin.com/) or use and adjust the example code below.

```sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 21000000 * 10 ** decimals());
    }
}

```

## Develop a Voting Smart Contract 
This Smart Contract should have the following functions:   
1. submitNewTopicWithOptions(topic, options)   
2. voteOnTopic(topic, option)  


## Develop a Distributed App (dApp) as Distributed Governance Interface
Create a distributed App (dApp) allowing users to interact with a smart contract on the Ethereum Blockchain via a Browser Wallet like Metamask.   
You can do so by following the steps ahead.

### Install Deno
[Deno Installation instructions](https://deno.land/#installation)

### Install Snel 
```sh 
deno run --allow-run --allow-read https://deno.land/x/snel/install.ts
```

## Gamestorm on Features and Incentive Systems

## Consider Deploying on Arbitrum

 
