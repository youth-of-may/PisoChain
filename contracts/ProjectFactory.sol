// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/* ------------------------- ROLE REGISTRY ------------------------- */

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

/* ------------------------- ENUMS & STRUCTS ------------------------- */

enum ProjStat { AWAITING, ONGOING, COMPLETED }

enum PaymentStatus { PENDING, APPROVED, REJECTED, PAID }

struct Expense {
    uint expenseID;
    uint amount;
    address contractor;
    string description;
    PaymentStatus status;
}

/* ------------------------- PROJECT CONTRACT ------------------------- */

contract Project {

    // Project details
    uint public id;
    string public name;
    string public projectType;
    string public description;
    string public location;
    string public completionDate; 
    ProjStat public projectStatus;

    // Roles
    address private governmentOfficial;
    address public contractor;

    RoleRegistry public roleRegistry;

    // Funds
    uint public projectTotalBudget;

    // Expense tracking
    Expense[] public expenses;
    uint public nextExpenseId = 0;

    constructor(
        uint _id,
        address _roleRegistry,
        address _official,
        address _contractor,
        string memory _name,
        string memory _projectType,
        string memory _description,
        string memory _location,
        string memory _completionDate
    ) payable {
        require(msg.value > 0, "Project must have ETH");

        roleRegistry = RoleRegistry(_roleRegistry);
        require(roleRegistry.isGovernmentOfficial(_official), "Not a government official");
        require(roleRegistry.isContractor(_contractor), "Not a contractor");

        governmentOfficial = _official;
        contractor = _contractor;
        projectTotalBudget = msg.value;

        id = _id;
        name = _name;
        projectType = _projectType;
        description = _description;
        location = _location;
        completionDate = _completionDate;

        projectStatus = ProjStat.AWAITING;
    }

    modifier onlyGovernmentOfficial() {
        require(msg.sender == governmentOfficial, "Not government official");
        _;
    }

    modifier onlyContractor() {
        require(msg.sender == contractor, "Not project contractor");
        _;
    }

    /* ------------------------- EXPENSE FUNCTIONS ------------------------- */

    function proposeExpense(uint _amount, string memory _description)
        public onlyContractor
    {
        expenses.push(
            Expense(
                nextExpenseId,
                _amount,
                contractor,
                _description,
                PaymentStatus.PENDING
            )
        );
        nextExpenseId++;
    }

    function approveExpense(uint _index)
        public onlyGovernmentOfficial
    {
        require(_index < expenses.length, "Invalid index");
        Expense storage exp = expenses[_index];

        require(exp.status == PaymentStatus.PENDING, "Not pending");
        require(address(this).balance >= exp.amount, "Insufficient funds");

        exp.status = PaymentStatus.APPROVED;
    }

    function rejectExpense(uint _index)
        public onlyGovernmentOfficial
    {
        require(_index < expenses.length, "Invalid index");
        Expense storage exp = expenses[_index];

        require(exp.status == PaymentStatus.PENDING, "Not pending");

        exp.status = PaymentStatus.REJECTED;
    }

    function withdrawExpense(uint _index)
        public onlyContractor
    {
        require(_index < expenses.length, "Invalid index");
        Expense storage exp = expenses[_index];

        require(exp.status == PaymentStatus.APPROVED, "Not approved");
        require(address(this).balance >= exp.amount, "Insufficient balance");

        exp.status = PaymentStatus.PAID;
        payable(contractor).transfer(exp.amount);
    }

    /* ------------------------- STATUS CONTROLS ------------------------- */

    function setProjectOngoing()
        public onlyGovernmentOfficial
    {
        projectStatus = ProjStat.ONGOING;
    }

    function setProjectCompleted()
        public onlyGovernmentOfficial
    {
        projectStatus = ProjStat.COMPLETED;
    }

    /* ------------------------- VIEW FUNCTIONS ------------------------- */

    function getAllExpenses() public view returns (Expense[] memory) {
        return expenses;
    }
}

/* ------------------------- FACTORY CONTRACT ------------------------- */

contract ProjectFactory {
    RoleRegistry public roleRegistry;
    Project[] private deployedProjects;

    uint public nextProjectId = 0;

    constructor(address _roleRegistry) {
        roleRegistry = RoleRegistry(_roleRegistry);
    }

    modifier onlyGovernmentOfficial() {
        require(roleRegistry.isGovernmentOfficial(msg.sender), "Not government official");
        _;
    }

    function proposeProject(address _contractor, string memory _name, string memory _projectType, string memory _description, string memory _location, string memory _completionDate) public payable onlyGovernmentOfficial
    {
        require(msg.value > 0, "Must include project budget in ETH");

        Project newProject = new Project{value: msg.value}(
            nextProjectId,
            address(roleRegistry),
            msg.sender,
            _contractor,
            _name,
            _projectType,
            _description,
            _location,
            _completionDate
        );

        deployedProjects.push(newProject);
        nextProjectId++;
    }

    function getAllProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }

    function getProjectCount() public view returns (uint) {
        return deployedProjects.length;
    }

    function getProjectExpenses(uint _projectID) public view returns(Expense[] memory) {
        require(_projectID < deployedProjects.length, "Invalid project index");
        return deployedProjects[_projectID].getAllExpenses();
    }
}
