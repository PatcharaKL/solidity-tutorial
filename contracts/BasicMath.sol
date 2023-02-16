// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BasicMath {
    function add(int256 x, int256 y) public pure returns (int256) {
        return x + y;
    }

    function subtract(int256 x, int256 y) public pure returns (int256) {
        return x - y;
    }

    function divide(int256 x, int256 y) public pure returns (int256) {
        require(y != 0, "Divide by zero");
        return x / y;
    }

    function multiply(int256 x, int256 y) public pure returns (int256) {
        return x * y;
    }

    function sum(int256[] memory data) public pure returns (int256) {
        require(data.length > 0, "Empty array is not valid");
        int256 sumary = 0;
        for (uint256 i = 0; i < data.length; i++) {
            sumary += data[i];
        }
        return sumary;
    }
}
