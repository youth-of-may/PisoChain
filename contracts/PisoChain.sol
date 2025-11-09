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

    enum Status { PENDING, APPROVED, REJECTED }
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

    /// @notice Returns the amount for the expense
    function getAmount() public view returns (uint) {
        return amount;
    }

    function getContractor() public view returns (address) {
        return contractor;
    }

    /// @notice Returns the last updated date for the expense
    function getdate() public view returns (uint) {
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
    ProjectFunds public projectFunds;

    uint public projectTotalBudget;

    constructor(address _roleRegistry, address _official, address _contractor) {
        roleRegistry = RoleRegistry(_roleRegistry);

        require(roleRegistry.isGovernmentOfficial(_official), "Not a government official");
        require(roleRegistry.isContractor(_contractor), "Not a contractor");

        governmentOfficial = _official;
        contractor = _contractor;
        projectFunds = new ProjectFunds(address(this), _contractor);
    }

    modifier onlyGovernmentOfficial() {
        require(msg.sender == governmentOfficial, "Not government official");
        _;
    }

    modifier onlyContractor() {
        require(msg.sender == contractor, "Not project contractor");
        _;
    }

    function fundProject() public payable onlyGovernmentOfficial {}

    function proposeExpense(uint _amount, string memory _description) public onlyContractor {
        Expense newExpense = new Expense(_amount, msg.sender, _description);
        projectExpenses.push(newExpense);
    }

    function approveExpense(address _expense) public onlyGovernmentOfficial {
        Expense expense = Expense(_expense);
        uint amount = expense.getAmount();

        require(address(this).balance >= amount, "Insufficient project funds");
        require(expense.getStatus() == Expense.Status.PENDING, "Expense not pending");

        expense.approve();
        projectTotalBudget += amount;
        approvedExpenses.push(expense);

        (bool success, ) = address(projectFunds).call{value: amount}(
            abi.encodeWithSignature("deposit(address,uint256)", _expense, amount)
        );
        require(success, "Escrow deposit failed");
    }

    function rejectExpense(address _expense) public onlyGovernmentOfficial {
        Expense expense = Expense(_expense);
        expense.reject();
        rejectedExpenses.push(expense);
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
}

contract ProjectFunds {
    address public projectContract;
    address public contractor;

    mapping(address => uint) public expenseBalances;  // expense => amount
    mapping(address => bool) public expenseWithdrawn; // expense => withdrawn?

    modifier onlyProject() {
        require(msg.sender == projectContract, "Only the project can call this");
        _;
    }

    constructor(address _projectContract, address _contractor) {
        projectContract = _projectContract;
        contractor = _contractor;
    }

    receive() external payable {}

    function deposit(address _expense, uint _amount) external payable onlyProject {
        require(msg.value == _amount, "Incorrect deposit amount");
        require(expenseBalances[_expense] == 0, "Expense already deposited");
        expenseBalances[_expense] = _amount;
    }

    function withdraw(address _expense) external {
        require(msg.sender == contractor, "Only contractor can withdraw");
        uint amount = expenseBalances[_expense];
        require(amount > 0, "No funds for this expense");
        require(!expenseWithdrawn[_expense], "Already withdrawn");

        expenseWithdrawn[_expense] = true;
        expenseBalances[_expense] = 0;

        (bool success, ) = payable(contractor).call{value: amount}("");
        require(success, "Withdrawal failed");
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

    function proposeProject(address _contractor) public onlyGovernmentOfficial {
        Project newProject = new Project(address(roleRegistry), msg.sender, _contractor);
        deployedProjects.push(newProject);
    }

    function getAllProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }
}
