const WEB3_URL = "http://127.0.0.1:9545/";

// Global Variable
let web3;

const initWeb3 = async () => {
  let provider;
  
  // (1) create web3 provider
  // switch (WEB3_URL) {
  //   case WEB3_URL.startsWith("http"):
  //     provider = new Web3.providers.HttpProvider(WEB3_URL);
  //     break;
  //   case WEB3_URL.startsWith("swc"):
  //     provider = new Web3.providers.WebSocketProvider(WEB3_URL);
  //     break;
  //   default:
  //     console.error("Invalid Web3URL")
  // }

  if (WEB3_URL.startsWith("http")) {
    // create web3 object for "HTTP RPC"
    provider = new Web3.providers.HttpProvider(WEB3_URL);
  } else if (WEB3_URL.startsWith("swc")) {
    // create web3 object for "Websocket RPC"
    provider = new Web3.providers.WebSocketProvider(WEB3_URL);
  } else {
    console.error("Invalid Web3URL")
  }

  web3 = new Web3(provider);
  console.log(web3);
};
