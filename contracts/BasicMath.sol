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
        int256 sumary = data[0];
        for (uint256 i = 1; i < data.length; i++) {
            sumary += data[i];
        }
        return sumary;
    }

    function min(int256[] memory data) public pure returns (int256) {
        require(data.length > 0, "Empty array is not valid");
        int256 _min = data[0];
        for (uint256 i = 1; i < data.length; i++) {
            if (data[i] < _min) {
                _min = data[i];
            }
        }
        return _min;
    }

    function max(int256[] memory data) public pure returns (int256) {
        require(data.length > 0, "Empty array is not valid");
        int256 _max = data[0];
        for (uint256 i = 1; i < data.length; i++) {
            if (data[i] > _max) {
                _max = data[i];
            }
        }
        return _max;
    }

    function mean(int256[] memory data) public pure returns (uint256) {
        require(data.length > 0, "Empty array is not valid");
        return uint256(sum(data)) / data.length;
    }
}
