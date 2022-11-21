// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ThoughtsAndPrayers is ERC20, Ownable {
  uint256 constant public waitTime = 5 minutes;
  uint256 private unit;

  mapping(address => uint256) lastReceivedTime;

  constructor() ERC20("Thoughts and Prayers", "TAP") {
    unit = 10 ** decimals();
    _mint(msg.sender, 50 * unit);
  }

  modifier allowedToReceive(address _address) {
    require(lastReceivedTime[_address] == 0 || block.timestamp >= lastReceivedTime[_address]);
    _;
  }

  function mint(uint amount) public {
    payable(owner()).tranfer(amount);
    _mint(msg.sender, amount * unit);
  }

  function faucet(address _address) public onlyOwner allowedToReceive(_address) {
    _mint(msg.sender, unit);
    transfer(_address, unit);
    lastReceivedTime[_address] = block.timestamp + waitTime;
  }
}