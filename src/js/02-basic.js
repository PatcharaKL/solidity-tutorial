$(() => {
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
