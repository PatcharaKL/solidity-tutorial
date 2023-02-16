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
    assert.equal(
      actual,
      expected,
      "The subtract function returns incorrect result"
    );
  });

  it("should return the divided result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const x = 5;
    const y = 5;
    const expected = Math.floor(x / y); // 1

    // ACT
    const actual = await basicMath.divide.call(x, y);

    // Assert
    assert.equal(
      actual,
      expected,
      "The divide function returns incorrect result"
    );
  });
  it("should return divide by zero when argument is divide by zero", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const x = 5;
    const y = 0;
    const expected = "Divide by zero";

    // ACT
    const actual = await basicMath.divide.call(x, y);

    // Assert
    assert.equal(
      actual,
      expected,
      "The divide function does not returns divide by zero"
    );
  });
  
  it("should return the multiply result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const x = 5;
    const y = 5;
    const expected = x * y; // 25
  
    // ACT
    const actual = await basicMath.multiply.call(x, y);
  
    // Assert
    assert.equal(
      actual,
      expected,
      "The multiply function returns incorrect result"
    );
  });
});
