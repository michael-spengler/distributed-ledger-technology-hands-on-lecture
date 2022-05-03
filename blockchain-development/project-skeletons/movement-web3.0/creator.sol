// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./erc-721.sol"; //any contract will do


contract Creator {

    MyToken[] tokens;  //imported contract


    constructor() {
        for (uint8 i =0 ; i < 2; i++) 
        {
            string memory name = string(abi.encodePacked("GeneratedToken", Strings.toString(i+1)));
            string memory symbol = string(abi.encodePacked("GT", Strings.toString(i+1)));
            tokens.push(new MyToken(name, symbol)); //constructor of imported contract
        }
    }

 
    function getTokenAt(uint8  index) public view returns(MyToken) {
        return tokens[index];
    }

    function getTokenNameAt(uint8  index) public view returns(string memory) {
        return tokens[index].name();
    }

}
