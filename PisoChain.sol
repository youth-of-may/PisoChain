// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Project {

    function setName(string memory _name) public returns(string memory) {
        
    }
    function sayHello() public view returns (string memory) {
        
    }
}

contract Expense {
    uint public amount;

    enum Status { PENDING, APPROVED, REJECTED }
    Status public status;

    constructor(uint _amount) {
        amount = _amount;
        status = Status.PENDING;
    }

    function approve() public {
        status = Status.APPROVED;
    }

    function reject() public {
        status = Status.REJECTED;
    }
}