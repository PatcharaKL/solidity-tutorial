const MyAuction = artifacts.require("MyAuction");
const product = require('../migrations/Product.json')

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MyAuction", function (accounts) {
  // it("should assert false", async function () {
  //   await MyAuction.deployed();
  //   return assert.isTrue(false);
  // });
  
  // Should return the correct auction owner
  it("Should return the correct auction owner", async function () {
    const auction = await MyAuction.deployed()
    const owner = await auction.auctionOwner.call()
    return assert.equal(owner, accounts[0], "The auction owner must be the same as account #0")
  });

  // Should return the information of the products / merchandise
  it("Should return the information of the products / merchandise", async function () {
    const auction = await MyAuction.deployed()
    const info = await auction.getProductInfo()
    const brand = info['0']
    const serial = info['1']
    const result = (brand == product.brand) && (serial == product.serial)
    return assert.isTrue(result, "The production information is incorrect");
  });

  // Should make some bids
  const sampleBidAmounts = [1, 1.2, 1.5, 2, 2.31]
  const sampleBidAmountBN = sampleBidAmounts.map(amount => web3.utils.toWei(String(amount)))
  const bidders = accounts.slice(1)
  it("Should make some bids", async function () {
    const auction = await MyAuction.deployed();
    let i;
    for (i = 0; i < sampleBidAmountBN.length; i++){
      await auction.bid({from: bidders[i], value: sampleBidAmountBN[i]});
    }

    const madeBids = [];
    for (i = 0; i < sampleBidAmountBN.length; i++){
      madeBids.push(await auction.getMyBid(bidders[i]));
    }
    const compareResult = madeBids.every((bid, i)=>bid.toString() == sampleBidAmountBN.toString());
    assert.isTrue(compareResult, "All or some of the bid amount are incorrect"); 
  });

  // // Should return hightest bid
  it("Should return hightest bider", async function () {
    const auction = await MyAuction.deployed();
    const highestBidder = await auction.highestBidder.call();
    return assert.equal(highestBidder, bidders[sampleBidAmounts.length - 1], "the hightest bidder info is incorrect");
  });
  
  it("Should return hightest bid", async function () {
    const auction = await MyAuction.deployed();
    const highestBid = await auction.highestBid.call();
    return assert.equal(highestBid.toString(), sampleBidAmountBN[sampleBidAmounts.length - 1].toString(), "the hightest bid info is incorrect");
  });

  // Should not allow a bid with thw same amount again
  it("Should not allow a bid with thw same amount again", async function () {
    const auction = await MyAuction.deployed();
    const bidAmount = sampleBidAmountBN[sampleBidAmounts.length - 1];
    let bidFailed = false;
    try {
      await auction.bid({from: bidders[sampleBidAmountBN.length], value: bidAmount});
    } catch (e) {
      bidFailed = true;
      console.log(e.data.reason)
    } finally {

    }
    return assert.isTrue(bidFailed, "either bidder must not be able to bid with previous amount");
  });

  // // Should not allow to withdraw during the ongoing auction
  it("Should not allow to withdraw during the ongoing auction", async function () {
    const auction = await MyAuction.deployed();
    let withdrawFailed = false;
    try {
      await auction.withdraw({from: bidder[0]});
    } catch (e) {
      withdrawFailed = false;
      console.log(e.data.reason);
    }
    return assert.isTrue(withdrawFailed, "Any bidder must not be abl to withdraw during ongoing auction");
  });

  const auctionStates = [
    "STARTED",
    "CANCELLED",
    "ENDED",
    "DESTRUCTED"
  ]
  it("Should close auction properly", async () => {
    const auction = await MyAuction.deployed();
    await auction.endAuction({from: accounts[0]});
    const currentState = await auction.STATE.call();
    return assert.equal(currentState, auctionStates.indexOf("ENDED"), "The auction must be closed properly");
  })
    // // Should not 
});
