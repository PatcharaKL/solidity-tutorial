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
        return x / y;
    }
}
