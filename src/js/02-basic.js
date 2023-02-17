// on page load

const BASIC_MATH_CONTRACT_ABI = "BasicMath.json";
let basicMath;

const lazyErrorHandler = async (func, errorMsg = "") => {
  try {
    await func();
  } catch (e) {
    console.log(`Error: ${e} \nMessage: ${errorMsg}`);
  }
};

const deployContract = async () => {
  // Load Contract abi via AJAX
  await $.getJSON(BASIC_MATH_CONTRACT_ABI, async (contractABI) => {
    lazyErrorHandler(async () => {
      // console.log(contractABI);
      const contract = await TruffleContract(contractABI);
      await contract.setProvider(web3.currentProvider);
      basicMath = await contract.deployed();
      console.log(basicMath);
    });
  });
};

const calculate = (calFunc) => {
  const { p1, p2 } = getParameter();
    if (!validate(p1, p2)) {
      $("#result").text("Please enter number");
      return;
    }
    lazyErrorHandler(async ()=>{
      const result = await calFunc(p1, p2); //TODO: func as param
      return result;
    })
}

$(async () => {
  // init web3
  await lazyErrorHandler(initWeb3);
  await lazyErrorHandler(deployContract);

  $("#btn-add").on("click", async (e) => {
    // const sumResult = calculate(basicMath.add(p1, p2));
    // applyResult(sumResult);
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.add(p1, p2);
        applyResult(result);
      } catch (e) {
        console.log(e);
      }
    } else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-remove").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.subtract(p1, p2);
        applyResult(result);
      } catch (e) {
        console.log(e);
      }
    } else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-multiply").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.multiply(p1, p2);
        applyResult(result);
      } catch (e) {
        console.log(e);
      }
    } else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-divide").on("click", async (e) => {
    const { p1, p2 } = getParameter();
    if (validate(p1, p2)) {
      try {
        const result = await basicMath.divide(p1, p2);
        applyResult(result);
      } catch (e) {
        console.log(e.message);
        let error = e.message.split(":");
        $("#result").text(error[2].trim().slice(7));
      }
    } else {
      $("#result").text("Please enter number");
    }
  });
  $("#btn-sum").on("click", async (e) => {
    const param = $("#agg-param").val();
    const stringArg = param.split(" ");
    const numArg = stringArg.map(Number)
    console.log(numArg);
    try {
      const result = await basicMath.sum(numArg);
      applyResult(result);
    } catch (e) {
      console.log(e.message);
      let error = e.message.split(":");
      $("#result").text(e);
    }
  });
  $("#btn-min").on("click", async (e) => {
    const param = $("#agg-param").val();
    const stringArg = param.split(" ");
    const numArg = stringArg.map(Number)
    console.log(numArg);
    try {
      const result = await basicMath.min(numArg);
      applyResult(result);
    } catch (e) {
      console.log(e.message);
      let error = e.message.split(":");
      $("#result").text(e);
    }
  });

  $("#btn-max").on("click", async (e) => {
    const param = $("#agg-param").val();
    const stringArg = param.split(" ");
    const numArg = stringArg.map(Number)
    console.log(numArg);
    try {
      const result = await basicMath.max(numArg);
      applyResult(result);
    } catch (e) {
      console.log(e.message);
      let error = e.message.split(":");
      $("#result").text(e);
    }
  });
  
  $("#btn-mean").on("click", async (e) => {
    const param = $("#agg-param").val();
    const stringArg = param.split(" ");
    const numArg = stringArg.map(Number)
    console.log(numArg);
    try {
      const result = await basicMath.mean(numArg);
      applyResult(result);
    } catch (e) {
      console.log(e.message);
      let error = e.message.split(":");
      $("#result").text(e);
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
  $("#agg-param").val("");
};
