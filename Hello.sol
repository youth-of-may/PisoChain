// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Hello {
    string public name;
    function setName(string memory _name) public returns(string memory) {
        name = _name;
        return name;
    }
    function sayHello() public view returns (string memory) {
        return string(abi.encodePacked("Hello ", name));
    }
}