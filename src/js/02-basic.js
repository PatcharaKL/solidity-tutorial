// on page load

const BASIC_MATH_CONTRACT_ABI = "BasicMath.json"
let BasicMath;

const deployContract = async () => {
  // Load Contract abi via AJAX
  $.getJSON(BASIC_MATH_CONTRACT_ABI, async contractABI => {
    // console.log(contractABI)
    try{
      const contract = TruffleContract(contractABI);
      contract.setProvider(web3.currentProvider);
      basicMath = await contract.deployed();
      console.log(basicMath)
    }catch (err) {
      console.log(err)
    }
  });
}

$(async () => {

  // init web3
  try {
    await initWeb3();
  }
  catch (err) {
    console.log(`Error on init Web3 ${err}`)
  }
  try {
    await deployContract();
  }
  catch (err) {
    console.log(`Error deploying contract ${err}`)
  }

  $("#btn-submit").on("click", (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      applyResult(p1, p2);
    } else {
      $("#result").text("one of the param is not a number");
    }
  });
});

const getParameter = () => {
  const p1 = parseFloat($("#param1").val());
  const p2 = parseFloat($("#param2").val());
  return { p1, p2 };
};

const validate = (p1, p2) => {
  if (!Number.isNaN(p1) || !Number.isNaN(p2)) {
    return true;
  }
  return false;
};

const applyResult = (p1, p2) => {
  $("#result").text(p1 + p2);
  $("#param1").text("");
  $("#param2").text("");
};
