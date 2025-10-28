// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

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
    ProjectFunds public projectFunds;

    string public projectName;
    string public projectDescription;
    uint public projectTotalBudget;

    /// @notice Initializes a new project which serves as an expense factory
    constructor(address _official, address _contractor, string memory _projectName, string memory _projectDescription) {
        governmentOfficial = _official;
        contractor = _contractor;
        projectName = _projectName;
        projectDescription = _projectDescription;
        projectFunds = new ProjectFunds(address(this), _contractor);
    }

    modifier onlyGovernmentOfficial() {
        require(msg.sender == governmentOfficial, "You are not a government official");
        _;
    }

    modifier onlyContractor() {
        require(msg.sender == contractor, "Not project contractor");
        _;
    }
    // Only government officials can fund the projects
    function fundProject() public payable onlyGovernmentOfficial {}

    /// @notice Initializes a new expense, msg.sender is a contractor.
    function proposeExpense(uint _amount, string memory _description) public onlyContractor{
        Expense newExpense = new Expense(_amount, msg.sender, _description);
        projectExpenses.push(newExpense);
    }

    /// @notice Approves the expense and transfers funds to the contractor
    function approveExpense(address _expense) public onlyGovernmentOfficial {
        Expense expense = Expense(_expense);
        uint amount = expense.getAmount();
        address contractor = expense.getContractor();

        require(address(this).balance >= amount, "Insufficient project funds");
        require(expense.getStatus() == Expense.Status.PENDING, "Expense not pending");
        
        expense.approve();
        projectTotalBudget += amount;
        approvedExpenses.push(expense);

        // Send funds to ProjectFunds for this contractor
        (bool success, ) = address(projectFunds).call{value: amount}(
            abi.encodeWithSignature("deposit(address,address,uint256)", contractor, _expense, amount)
        );
        require(success, "Escrow deposit failed");
    }

    /// @notice Rejects the expense
    function rejectExpense(address _expense) public onlyGovernmentOfficial{
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
    address private governmentOfficial;
    Project[] private deployedProjects;

    /// @notice Initializes the project factory
    modifier onlyGovernmentOfficial() {
        require(msg.sender == governmentOfficial, "Not Government Official");
        _;
    }

    constructor() {
        governmentOfficial = msg.sender;
    }

    /// @notice Initializes a new project
    function proposeProject(string memory _projectName, string memory _projectDescription, address _contractor) public onlyGovernmentOfficial {
        Project newProject = new Project(msg.sender, _contractor, _projectName, _projectDescription);
        deployedProjects.push(newProject);   
    }

    /// @notice Returns the list of all projects
    function getAllProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }
}
