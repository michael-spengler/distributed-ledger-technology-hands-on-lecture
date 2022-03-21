# Smart Contract Development
We develop our smart contracts using the programming language [solidity](https://soliditylang.org/).  
We use [remix.ethereum.org](https://remix.ethereum.org/) as an online IDE to compile, test and deploy our smart contracts.  
To save gas fees during the development phase we deploy our smart contracts not onto the mainnet but onto the ropsten testnet. 
For later production ready deployments we use either the Ethereum Mainnet or the Layer 2 Scaling Solution Arbitrum. 

## Example Templates
### Currencies based on ERC20
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

Check it on [wizard.openzeppelin.com](https://wizard.openzeppelin.com/)  

### Non Fungible Tokens (NFTs) based on ERC721
```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MTK") {}
}
```

Check it on [wizard.openzeppelin.com](https://wizard.openzeppelin.com/#erc721)  

### Semi Fungible Tokens (SFTs) based on ERC1155
```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MySemiFungibleToken is ERC1155, Ownable {
    constructor() ERC1155("") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
```

Check it on [wizard.openzeppelin.com](https://wizard.openzeppelin.com/#erc1155)  

## Deep Dives
### Numbers in Solidity
Check [this tutorial](https://www.youtube.com/watch?v=kz4iIS0peMI)  
