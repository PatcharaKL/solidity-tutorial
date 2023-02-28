// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Auction {
    address payable public auctionOwner;
    uint256 public auctionStart;
    uint256 public auctionEnd;
    uint256 public highestBid;
    address public highestBidder;

    // bide keyword into enum (number)
    enum AuctionState {
        STARTED,
        CANCELLED,
        ENDED,
        DESTRUCTED
    }

    // declare state of AuctionState type
    AuctionState public STATE;

    struct Product {
        string Brand;
        string SerialNum;
    }

    function cancelAuction() public virtual returns (bool);

    function endAuction() public virtual returns (bool);

    function bid() public payable virtual returns (bool);

    function getProductInfo()
        public
        virtual
        returns (string memory, string memory); // If data are complex, then we store it into memory.

    function withdraw() public virtual returns (bool);

    function getMyBid(address bidder) public virtual returns (uint256);
}
