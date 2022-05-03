// SPDX-License-Identifier: GNU GPL v3
pragma solidity ^0.8.2;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.5.0/contracts/token/ERC721/ERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.5.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.5.0/contracts/access/Ownable.sol";
import "https://raw.githubusercontent.com/distributed-ledger-technology/solidity-logger/main/src/logger.sol";

contract MaxiMotionNFT is ERC721, ERC721URIStorage, Ownable {
    string purchaseRight1Status = "available";
    string purchaseRight2Status = "available";

    struct offer {
        address payable from;
        uint256 amount;
        bool obsolete;
    }

    offer[] offers;

    constructor() ERC721("MaxiMotion NFT 2", "MXMNFT2") {}

    function executePurchaseRight1() public {
        purchaseRight1Status = "consumed";
    }

    function executePurchaseRight2() public {
        purchaseRight2Status = "consumed";
    }

    function getPurchaseRight1Status() public view returns (string memory) {
        return purchaseRight1Status;
    }

    function getPurchaseRight2Status() public view returns (string memory) {
        return purchaseRight2Status;
    }

    function addToExistingOffer() public payable {
        // require(msg.value > 5000000000000000000000);

        uint256 i = 0;
        for (i; i < offers.length; i++) {
            if (offers[i].from == msg.sender && offers[i].obsolete == false) {
                offers[i].amount = offers[i].amount + msg.value;
            }
        }
    }

    function makeOffer() public payable {
        // require(msg.value > 5000000000000000000000);

        if (offers.length > 0) {
            offer memory highestOffer = this.getHighestOffer();
            require(msg.value > highestOffer.amount);
        } else {
            require(msg.value > 0);
        }

        offers.push(offer(payable(msg.sender), msg.value, false));
    }

    function getOffers() public view returns (offer[] memory) {
        return offers;
    }

    function getHighestOffer() public view returns (offer memory) {
        uint256 i = 0;
        if (offers.length < 1) {
            return
                offer(
                    payable(0x68E40cb2809eCDb3Ae3CC3c0363BcAFDf4583431),
                    0,
                    false
                );
        }
        offer memory highestOffer = offers[i];
        for (i; i < offers.length; i++) {
            if (
                highestOffer.amount < offers[i].amount &&
                offers[i].obsolete == false
            ) {
                highestOffer = offers[i];
            }
        }
        return highestOffer;
    }

    function acceptHighestOffer() external {
        offer memory highestOffer = this.getHighestOffer();

        payable(this.owner()).transfer(highestOffer.amount); // transfers the money of the highest offer to the seller

        transferOwnership(highestOffer.from); // transfers the NFT to the buyer

        // experimental: return other offer amounts - how much would this cost

        uint256 i = 0;

        for (i; i < offers.length; i++) {
            if (
                offers[i].amount == highestOffer.amount &&
                offers[i].obsolete == false
            ) {
                offers[i].obsolete = true;
            }
        }
    }

    function claimOfferAmountBack() public {
        uint256 i = 0;
        uint256 amountToBeSentBack = 0;
        offer memory highestOffer = this.getHighestOffer();

        for (i; i < offers.length; i++) {
            if (
                offers[i].from == msg.sender &&
                offers[i].obsolete == false &&
                offers[i].amount < highestOffer.amount
            ) {
                amountToBeSentBack += offers[i].amount;
                offers[i].obsolete = true;
            }
        }
        payable(msg.sender).transfer(amountToBeSentBack); // transfers the money back
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}
