const WEB3_URL = process.env.WEB3_URL;

// Global Variable
let web3;

const initWeb3 = async () => {
  let provider;
  
  // (1) create web3 provider
  if (WEB3_URL.startsWith("http")) {
    // create web3 object for "HTTP RPC"
    provider = new Web3.provider.HttpProvider(WEB3_URL);
  } else {
    // create web3 object for "Websocket RPC"
    provider = new Web3.provider.WebSocketProvider(WEB3_URL);
  }

  web3 = new Web3(provider);
  console.log(web3);
};
