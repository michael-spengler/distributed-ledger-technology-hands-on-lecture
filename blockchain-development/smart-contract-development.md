# Smart Contract Development
We develop our smart contracts using the programming language [solidity](https://soliditylang.org/).  
We use [remix.ethereum.org](https://remix.ethereum.org/) as an online IDE to compile, test and deploy our smart contracts.  
To save gas fees during the development phase we deploy our smart contracts not onto the mainnet but onto the ropsten testnet. 
For later production ready deployments we use either the Ethereum Mainnet or the Layer 2 Scaling Solution Arbitrum. 

## Example Templates
### Currencies based on ERC20
```sol

// SPDX-License-Identifier: AGPL-3.0 license
pragma solidity ^0.8.2;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/release-v4.6/contracts/token/ERC20/ERC20.sol";


contract FixedSupplyExampleCoinSmartContract is ERC20 {
    constructor() ERC20("FixedSupplyExampleCoin", "FSEC") {
        _mint(msg.sender, 21000000 * 10 ** decimals());
    }
}

```

Check it on [wizard.openzeppelin.com](https://wizard.openzeppelin.com/)  

### Non Fungible Tokens (NFTs) based on ERC721
```sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.5.0/contracts/token/ERC721/ERC721.sol";

contract ExampleNFTSmartContract is ERC721 {
    constructor() ERC721("ExampleNFT", "ENFT") {}
}

```

Check it on [wizard.openzeppelin.com](https://wizard.openzeppelin.com/#erc721)  

### Semi Fungible Tokens (SFTs) based on ERC1155

```sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/release-v4.6/contracts/token/ERC1155/ERC1155.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/release-v4.6/contracts/access/Ownable.sol";

contract ExampleSemiFungibleTokenSmartContract is ERC1155, Ownable {
    constructor() ERC1155("https://example-uri...") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}

```

Check it on [wizard.openzeppelin.com](https://wizard.openzeppelin.com/#erc1155)  

## Deep Dives Into Solidity
### Numbers in Solidity
Check [this tutorial](https://www.youtube.com/watch?v=kz4iIS0peMI)  

### Arrays in Solidity
Check [this tutorial](https://www.youtube.com/watch?v=vTxxCbwMPwo)
