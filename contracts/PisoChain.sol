// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


contract RoleRegistry {
    mapping(address => bool) public isGovernmentOfficial;
    mapping(address => bool) public isContractor;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function registerOfficial(address _official) external onlyAdmin {
        isGovernmentOfficial[_official] = true;
    }

    function registerContractor(address _contractor) external onlyAdmin {
        isContractor[_contractor] = true;
    }

    function revokeOfficial(address _official) external onlyAdmin {
        isGovernmentOfficial[_official] = false;
    }

    function revokeContractor(address _contractor) external onlyAdmin {
        isContractor[_contractor] = false;
    }
}

contract Expense {
    uint public amount;
    uint public lastUpdatedDate;
    address public contractor;
    string public description;

    enum Status { PENDING, APPROVED, REJECTED, PAID }
    Status public status;

    /// @notice Initializes a new expense with an amount
    constructor(uint _amount, address _contractor, string memory _description) {
        amount = _amount;
        contractor = _contractor;
        description = _description;
        status = Status.PENDING;
        lastUpdatedDate = block.timestamp;
    }

    /// @notice Sets the expense status to APPROVED
    function approve() public {
        require(status == Status.PENDING, "Can only approve pending expenses");
        status = Status.APPROVED;
        lastUpdatedDate = block.timestamp;
    }

    /// @notice Sets the expense status to REJECTED
    function reject() public {
        require(status == Status.PENDING, "Can only approve pending expenses");
        status = Status.REJECTED;
        lastUpdatedDate = block.timestamp;
    }

    /// @notice Sets the status to PAID
    function markAsPaid() public {
        require(status == Status.APPROVED, "Can only pay approved expenses");
        status = Status.PAID;
        lastUpdatedDate = block.timestamp;
    }

    /// @notice Returns the amount for the expense
    function getAmount() public view returns (uint) {
        return amount;
    }

    /// @notice Returns the address of the contractor
    function getContractor() public view returns (address) {
        return contractor;
    }

    /// @notice Returns the last updated date for the expense
    function getDate() public view returns (uint) {
        return lastUpdatedDate;
    }

    function getStatus() public view returns (Status) {
        return status;
    }
}

contract Project {
    Expense[] private projectExpenses;
    Expense[] private approvedExpenses;
    Expense[] private rejectedExpenses;

    address private governmentOfficial;
    address public contractor;
    RoleRegistry public roleRegistry;

    string projectName;

    constructor(address _roleRegistry, address _official, address _contractor, string memory _projectName) payable {
        require(msg.value > 0, "Project must have ETH");
        
        roleRegistry = RoleRegistry(_roleRegistry);

        require(roleRegistry.isGovernmentOfficial(_official), "Not a government official");
        require(roleRegistry.isContractor(_contractor), "Not a contractor");

        governmentOfficial = _official;
        contractor = _contractor;
        projectName = _projectName;
    }

    modifier onlyGovernmentOfficial() {
        require(msg.sender == governmentOfficial, "Not government official");
        _;
    }

    modifier onlyContractor() {
        require(msg.sender == contractor, "Not project contractor");
        _;
    }

    /// @notice proposes an expense to the project.
    function proposeExpense(uint _amount, string memory _description) public onlyContractor {
        Expense newExpense = new Expense(_amount, msg.sender, _description);
        projectExpenses.push(newExpense);
    }

    /// @notice approves the expense of the project.
    function approveExpense(address _expense) public onlyGovernmentOfficial {
        Expense expense = Expense(_expense);

        require(address(this).balance >= expense.getAmount(), "Insufficient project funds");
        require(expense.getStatus() == Expense.Status.PENDING, "Expense not pending");

        expense.approve();
        approvedExpenses.push(expense);
    }

    /// @notice rejects the expense of the project.
    function rejectExpense(address _expense) public onlyGovernmentOfficial {
        Expense expense = Expense(_expense);
        require(expense.getStatus() == Expense.Status.PENDING, "Expense not pending.");

        expense.reject();
        rejectedExpenses.push(expense);
    }

    /// @notice withdraws the expense of the project.
    function withdrawExpense(address _expenseAddr) public onlyContractor {
        Expense expense = Expense(_expenseAddr);
        require(expense.getStatus() == Expense.Status.APPROVED, "Expense not approved");

        uint256 amount = expense.getAmount();
        require(address(this).balance >= amount, "Insufficient balance");
        
        expense.markAsPaid();
        payable(contractor).transfer(amount);
    }

    // View Functions
    function getAllExpenses() public view returns (Expense[] memory) {
        return projectExpenses;
    }

    function getApprovedExpenses() public view returns (Expense[] memory) {
        return approvedExpenses;
    }

    function getRejectedExpenses() public view returns (Expense[] memory) {
        return rejectedExpenses;
    }

    function getProjectName() public view returns(string memory) {
        return projectName;
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}

// Note: Only Government officials can create projects.
contract ProjectFactory {
    RoleRegistry public roleRegistry;
    Project[] private deployedProjects;

    constructor(address _roleRegistry) {
        roleRegistry = RoleRegistry(_roleRegistry);
    }

    modifier onlyGovernmentOfficial() {
        require(roleRegistry.isGovernmentOfficial(msg.sender), "Not government official");
        _;
    }

    function proposeProject(address _contractor, string memory projectName) public payable onlyGovernmentOfficial {
        require(msg.value > 0, "Must include project budget in ETH");

        Project newProject = (new Project){value: msg.value}(address(roleRegistry), msg.sender, _contractor, projectName);
        deployedProjects.push(newProject);
    }

    function getAllProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }
}
