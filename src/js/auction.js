async function init() {
    try {
        await initWeb3();
    } catch (err) {
        console.log(err);
    }
    if (typeof window.web3 == 'undefined')
        throw (new Error('ERROR: Unable to connect with web3 provider!!!'));
    console.log('current web3', web3);

    // w3.eth.defaultAccount = bidder;
    $.getJSON('MyAuction.json', async contractABI => {

        const auctionContract = TruffleContract(contractABI);
        auctionContract.setProvider(web3.currentProvider);
        try {
            accounts = await web3.eth.getAccounts();
            // console.log(accounts);
            bidder = accounts[0];
            updateAccounts(accounts);
            auction = await auctionContract.deployed();
        } catch (err) {
            console.log(err);
            return;
        };

        try {
            const auctionEnd = await auction.auctionEnd.call();
            const highestBidder = await auction.highestBidder.call();
            const highestBid = await auction.highestBid.call();
            const myProduct = await auction.getInfo();
            const currentState = await auction.STATE.call();
            const myBidEther = await auction.getMyBid.call(bidder);
            const dateString = new Date(auctionEnd * 1000);
            $("#AuctionOwner").text(auctionOwner);
            $("#AuctionEnd").text(dateString.toLocaleString());
            $("#HighestBidder").text(highestBidder);
            let bidEther = web3.utils.fromWei(highestBid, 'ether');
            $("#HighestBid").text(bidEther + ' Ether');
            $("#State").text(AuctionState[currentState]);
            $("#ProductBrand").text(myProduct[0]);
            $("#SerialNumber").text(myProduct[1]);
            bidEther = web3.utils.fromWei(myBidEther, 'ether');
            $("#MyBid").text(bidEther + ' Ether');
        } catch (err) {
            console.log(err);
            return;
        };

    });
}