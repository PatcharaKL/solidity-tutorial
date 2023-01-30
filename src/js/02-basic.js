$(() => {
  $("#btn-submit").on("click", (e) => {
    const p1 = parseFloat($("#param1").val());
    const p2 = parseFloat($("#param2").val());
    if (!Number.isNaN(p1) || !Number.isNaN(p2)) {
      $("#result").text(p1 + p2);
    }
    else {
        $("#result").text("one of the param is not a number");
    }
  });
});
