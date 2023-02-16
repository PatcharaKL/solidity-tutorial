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

    function testSum() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());

        int256[] memory args = new int256[](4);
        args[0] = 10;
        args[1] = 20;
        args[2] = 30;
        args[3] = 40;
        int256 expected = 100;

        // Act
        int256 actual = basicMath.sum(args);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The Sum function returns incorrect result"
        );
    }

    function testMin() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());

        int256[] memory args = new int256[](4);
        args[0] = 10;
        args[1] = 20;
        args[2] = 30;
        args[3] = 40;
        int256 expected = 10;

        // Act
        int256 actual = basicMath.min(args);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The Sum function returns incorrect result"
        );
    }

    function testMax() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());

        int256[] memory args = new int256[](4);
        args[0] = 10;
        args[1] = 20;
        args[2] = 30;
        args[3] = 40;
        int256 expected = 40;

        // Act
        int256 actual = basicMath.max(args);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The Sum function returns incorrect result"
        );
    }

    function testMean() public {
        // Arrange
        BasicMath basicMath = BasicMath(DeployedAddresses.BasicMath());

        int256[] memory args = new int256[](4);
        args[0] = 10;
        args[1] = 20;
        args[2] = 30;
        args[3] = 40;
        uint256 expected = 25;

        // Act
        uint256 actual = basicMath.mean(args);

        // Assert
        Assert.equal(
            actual,
            expected,
            "The Sum function returns incorrect result"
        );
    }
}
