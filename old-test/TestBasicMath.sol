// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BasicMath.sol";

contract TestBasicMath {
    function testAdd() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());
        int256 x = 7;
        int256 y = 5;
        int256 expected = x + y; //* 12

        // Act
        int256 actual = basicMath.add(x, y);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The add function returns incorrect result"
        );
    }

    function testSubtract() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());
        int256 x = 7;
        int256 y = 5;
        int256 expected = x - y; //* 12

        // Act
        int256 actual = basicMath.subtract(x, y);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The subtract function returns incorrect result"
        );
    }

    function testDivide() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());
        int256 x = 7;
        int256 y = 5;
        int256 expected = x / y; //* 12

        // Act
        int256 actual = basicMath.divide(x, y);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The divide function returns incorrect result"
        );
    }

    function testMultiply() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());
        int256 x = 7;
        int256 y = 5;
        int256 expected = x * y; //* 12

        // Act
        int256 actual = basicMath.multiply(x, y);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The divide function returns incorrect result"
        );
    }
}
