// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Project {
    Expense[] private projectExpenses;
    Expense[] private approvedExpenses;
    Expense[] private rejectedExpenses;

    address private contractor;
    string public projectName;
    uint public projectTotalBudget;

    /// @notice Initializes a new project which serves as an expense factory
    constructor(string memory _projectName) {
        contractor = msg.sender;
        projectName = _projectName;
    }

    /// @notice Initializes a new expense
    function proposeExpense(uint _amount) public {
        Expense newExpense = new Expense(_amount);
        projectExpenses.push(newExpense);
    }

    /// @notice Approves the expense and adds the amount the project budget
    function approveExpense(address _expense) public {
        Expense(_expense).approve();
        projectTotalBudget += Expense(_expense).getAmount();
        approvedExpenses.push(Expense(_expense));
    }

    /// @notice Rejects the expense
    function rejectExpense(address _expense) public {
        Expense(_expense).reject();
        rejectedExpenses.push(Expense(_expense));
    } 

    /// @notice Returns the list of all expenses for the project
    function getAllExpenses() public view returns (Expense[] memory) {
        return projectExpenses;
    }

    /// @notice Returns the list of approved expenses for the project
    function getApprovedExpenses() public view returns (Expense[] memory) {
        return approvedExpenses;
    }

    /// @notice Returns the list of rejected expenses for the project
    function getRejectedExpenses() public view returns (Expense[] memory) {
        return rejectedExpenses;
    }

    /// @notice Returns the total budget from approved expenses for the project
    function getTotalBudget() public view returns (uint) {
        return projectTotalBudget;
    }
}

contract Expense {
    uint public amount;

    enum Status { PENDING, APPROVED, REJECTED }
    Status public status;

    /// @notice Initializes a new expense with an amount
    constructor(uint _amount) {
        amount = _amount;
        status = Status.PENDING;
    }

    /// @notice Sets the expense status to APPROVED
    function approve() public {
        status = Status.APPROVED;
    }

    /// @notice Sets the expense status to REJECTED
    function reject() public {
        status = Status.REJECTED;
    }

    /// @notice Returns the amount for the expense
    function getAmount() public view returns (uint) {
        return amount;
    }
}