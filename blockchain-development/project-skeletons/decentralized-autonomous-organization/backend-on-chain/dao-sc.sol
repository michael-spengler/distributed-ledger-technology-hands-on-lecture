// SPDX-License-Identifier: GNU GPL v3
pragma solidity ^0.8.2;

// can be used for decentralized budget allocation...
contract EnterpriseDAO {
    topicStruct[] topics;

    struct topicStruct {
        string topicText;
        string[] votingOptions;
        bool completed;
    }

    struct votingOptionStruct {
        string text;
        voteStruct tokensStaked;
    }

    struct voteStruct {
        address payable voterWallet;
        uint256 stakedAmountOfGovernanceTokens;
    }

    // "is 2 > 2", ["yes", "no"]
    function submitNewTopicWithOptions(
        string memory topicText,
        string[] memory votingOptions
    ) public {
        topics.push(topicStruct(topicText, votingOptions, false));
    }

    function getOpenTopics() public view returns (topicStruct[] memory) {
        topicStruct[] memory openTopics = new topicStruct[](topics.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < topics.length; i++) {
            if (topics[i].completed == false) {
                openTopics[counter] = topics[i];
                counter++;
            }
        }

        return openTopics;
    }

    // function voteOnTopic(string memory topic, string memory option) public {
    // require amount of governance tokes > 0
    //     // tbd
    //     // msg.sender
    //     // msg.value
    // }

    // function transferReward(address payable targetWallet, uint256 amount) public {

    // }
}
