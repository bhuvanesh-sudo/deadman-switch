// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DeadMansSwitch {
    address public owner;
    address public beneficiary;
    uint256 public lastHeartbeat;
    uint256 public constant DURATION = 52 weeks;

    constructor(address _beneficiary) {
        owner = msg.sender;
        beneficiary = _beneficiary;
        lastHeartbeat = block.timestamp;
    }

    function ping() external {
        require(msg.sender == owner, "Only owner");
        lastHeartbeat = block.timestamp;
    }

    function claim() external {
        require(block.timestamp > lastHeartbeat + DURATION, "Too soon");
        payable(beneficiary).transfer(address(this).balance);
    }
}