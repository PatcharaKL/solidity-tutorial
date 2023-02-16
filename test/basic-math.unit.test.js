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

  it("should return the sum result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const args = [10 ,20, 30, 40];
    const expected = 100;
  
    // ACT
    const actual = await basicMath.sum.call(args);
  
    // Assert
    assert.equal(
      actual,
      expected,
      "The sum function returns incorrect result"
    );
  });
  it("should return the min result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const args = [10 ,20, 30, 40];
    const expected = 10;
  
    // ACT
    const actual = await basicMath.min.call(args);
  
    // Assert
    assert.equal(
      actual,
      expected,
      "The min function returns incorrect result"
    );
  });
  it("should return the max result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const args = [10 ,20, 30, 40];
    const expected = 40;
  
    // ACT
    const actual = await basicMath.max.call(args);
  
    // Assert
    assert.equal(
      actual,
      expected,
      "The max function returns incorrect result"
    );
  });
  it("should return the mean result correctly", async () => {
    // Arrange
    const basicMath = await BasicMath.deployed();
    const args = [10 ,20, 30, 40];
    const expected = 25;
  
    // ACT
    const actual = await basicMath.mean.call(args);
  
    // Assert
    assert.equal(
      actual,
      expected,
      "The mean function returns incorrect result"
    );
  });
});

