// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Depot {
    mapping(address => uint256) balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256 balance) {
        return balances[msg.sender];
    }

    function withdraw() public {}
}
