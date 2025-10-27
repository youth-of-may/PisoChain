// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Project {
    Expense[] private projectExpenses;
    Expense[] private approvedExpenses;
    Expense[] private rejectedExpenses;

    address private contractor;
    string public projectName;
    uint public projectTotalBudget;

    constructor(string memory _projectName) {
        contractor = msg.sender;
        projectName = _projectName;
    }

    function proposeExpense(uint _amount) public {
        Expense newExpense = new Expense(_amount);
        projectExpenses.push(newExpense);
    }

    function approveExpense(address _expense) public {
        Expense(_expense).approve();
        projectTotalBudget += Expense(_expense).getAmount();
        approvedExpenses.push(Expense(_expense));
    }

    function rejectExpense(address _expense) public {
        Expense(_expense).reject();
        rejectedExpenses.push(Expense(_expense));
    } 

    function getAllExpenses() public view returns (Expense[] memory) {
        return projectExpenses;
    }

    function getApprovedExpenses() public view returns (Expense[] memory) {
        return approvedExpenses;
    }

    function getRejectedExpenses() public view returns (Expense[] memory) {
        return rejectedExpenses;
    }

    function getTotalBudget() public view returns (uint) {
        return projectTotalBudget;
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