const MyAuction = artifacts.require("MyAuction");
const product = require('../migrations/product.json');
const BN = require('bn.js');
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MyAuction", function (accounts) {
  // it("should assert true", async function () {
  //   await MyAuction.deployed();
  //   return assert.isTrue(false);
  // });

  //
  it("should return the correct auction owner (address)", async function () {
    const auction = await MyAuction.deployed();
    const owner = await auction.auctionOwner.call();
    return assert.equal(owner, accounts[0], "The auction owner must be the same as account #0");
  });

  // should return the information of product / merchandise
it("should return the information of product / merchandise", async function () {
    const auction = await MyAuction.deployed();
    const info = await auction.getProductInfo();
    const brand = info['0'];
    const serial = info['1'];
    const result = (brand == product.brand) && (serial == product.serial);
    // console.log(info);
    return assert.isTrue(result, "The production information is incorrect");
  });

  // should make some bids
const sampleBidAmounts = [1, 1.2, 1.5, 2, 2.31 ];
const sampleBidAmountsBN = sampleBidAmounts.map(amount => web3.utils.toWei(String(amount)));
const bidders = accounts.slice(1);
it("should make some bids", async function () {
    const auction = await MyAuction.deployed();
    let i;
    for( i = 0; i < sampleBidAmountsBN.length; i++) {
      await auction.bid({from: bidders[i], value: sampleBidAmountsBN[i]});
    }

    const madeBids = [];
    for( i = 0; i < sampleBidAmountsBN.length; i++ ) {
      madeBids.push ( await auction.getMyBid(bidders[i]));
    }
    // console.log(madeBids);
    const compareResult = madeBids.every((bid, i) => bid.toString() == sampleBidAmountsBN[i].toString());
    assert.isTrue(compareResult, "All or some of the bid amount are incorrect");
  });

  // should return the highest bidder
it("should return the highest bidder", async function () {
    const auction = await MyAuction.deployed();
    const highestBidder = await auction.highestBidder.call();
    return assert.equal(highestBidder, bidders[sampleBidAmounts.length - 1], "The highest bidder info is incorrect");
  });

  // should return the highest bid
it("should return the highest bid", async function () {
  const auction = await MyAuction.deployed();
  const highestBid = await auction.highestBid.call();
  return assert.equal(highestBid.toString(), sampleBidAmountsBN[sampleBidAmounts.length - 1].toString(),
     "The highest bid info is incorrect");
  });

  // should not allow a bid with the same amount again
it("should not allow a bid with the same amount again", async function () {
    const auction = await MyAuction.deployed();
    const bidAmount = sampleBidAmountsBN[sampleBidAmountsBN.length - 1];
    let bidFailed = false;
    try {
      await auction.bid({ from: bidders[sampleBidAmountsBN.length], value: bidAmount });
    } catch (err) {
        bidFailed = true;
        console.log(err.reason);
    }
    return assert.isTrue(bidFailed, "The other bidder must not be able to bid with the previous amount");
  });

  // should not allow to withdraw during the ongoing auction
it("should not allow to withdraw during the ongoing auction", async function () {
    const auction = await MyAuction.deployed();
    let withdrawFailed = false;
    try {
      await auction.withdraw({from: bidders[0]});
    } catch (err) {
      withdrawFailed = true;
      console.log (err.reason);
    }
    return assert.isTrue(withdrawFailed, "Any bidder must not be able to withdraw during ongoing auction");
  });

  // should close the auction properly
  const auctionStates = ["STARTED", "CANCELLED", "ENDED", "DESTRUCTED"];
  it("should close the auction properly", async function () {
    const auction = await MyAuction.deployed();
    await auction.endAuction({from: accounts[0]});
    const currentState = await auction.STATE.call();
    return assert.equal(currentState, auctionStates.indexOf("ENDED"),
     "The auction is still not ended!");
  });

  // should allow any withdrawal after the auction has ended
it("should allow any withdrawal after the auction has ended", async function () {
    const auction = await MyAuction.deployed();
    let i;
    let success = true;
    try {
      for(i = 0; i < sampleBidAmountsBN.length - 1; i++) {
        await auction.withdraw({from: bidders[i]});
      }
    } catch (err) {
      success = false;
      console.log(err.reason);
    }
    return assert.isTrue(success, "Some bidders can not withdraw!");
  });

  // should not allow to bid after the auction has ended
  it("should not allow to bid after the auction has ended", async function () {
    const auction = await MyAuction.deployed();
    let bidAmount = sampleBidAmountsBN[sampleBidAmountsBN.length - 1];
    bidAmount = new BN(bidAmount).add(new BN(1));
    let bidFailed = false;
    try {
      await auction.bid({from: bidders[sampleBidAmountsBN.length], value: bidAmount });
    } catch (err) {
      console.log(err.reason);
      bidFailed = true;
    }
    return assert.isTrue(bidFailed, "No one must not be able to bid after auction has ended!");
  });
});