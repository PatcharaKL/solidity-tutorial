const BasicMath = artifacts.require("BasicMath");

contract("BasicMath", () => {
  it("should return the addition result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const x = 7;
    const y = 5;
    const expected = x + y; // 12

    // ACT
    const actual = await basicMath.add.call(x, y);

    // Assert
    assert.equal(actual, expected, "The add function returns incorrect result");
  });

  it("should return the subtraction result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const x = 5;
    const y = 6;
    const expected = x - y; // -1

    // ACT
    const actual = await basicMath.subtract.call(x, y);

    // Assert
    assert.equal(actual, expected, "The subtract function returns incorrect result");
  });
});
