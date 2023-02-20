// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auction {
  address payable public auctionOwner;
  uint public auctionStart;
  uint public auctionEnd;
  uint public highestBid;
  address public highestBidder;
  constructor() public {

  }
}
