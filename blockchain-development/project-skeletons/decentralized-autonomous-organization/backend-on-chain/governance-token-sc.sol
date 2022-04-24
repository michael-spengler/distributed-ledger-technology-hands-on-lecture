// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyGovernanceToken is ERC20 {
    constructor() ERC20("MyGovernanceToken", "MYGT") {
        _mint(msg.sender, 21000000 * 10**decimals());
    }
}
