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

  $("#btn-add").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.add(p1, p2)
        applyResult(result)
      } catch (e) {
        console.log(e)
      }
    }
    else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-remove").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.subtract(p1, p2)
        applyResult(result)
      } catch (e) {
        console.log(e)
      }
    }
    else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-multiply").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.multiply(p1, p2)
        applyResult(result)
      } catch (e) {
        console.log(e)
      }
    }
    else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-divide").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.divide(p1, p2)
        applyResult(result)
      } catch (e) {
        console.log(e.message)
        let error = e.message.split(":")
        $("#result").text(error[2].trim().slice(7));
      }
    }
    else {
      $("#result").text("Please enter number");
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

const applyResult = (res) => {
  $("#result").text(res);
  $("#param1").val("");
  $("#param2").val("");
};
