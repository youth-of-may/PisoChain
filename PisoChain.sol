// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Project {
    Expense[] private projectExpenses;

    address private contractor;
    string public projectName;
    uint public projectTotalBudget;

    constructor(string memory _projectName) {
        contractor = msg.sender;
        projectName = _projectName;
    }

    function approveExpense(address _expense) public {
        Expense(_expense).approve();
        projectTotalBudget += Expense(_expense).getAmount();
    }

    function rejectExpense(address _expense) public {
        Expense(_expense).reject();
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

    function getAmount() public view returns (uint) {
        return amount;
    }
}