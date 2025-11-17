import { ethers } from 'ethers';
import 'dotenv/config';


const projectFactoryABI = [
  // Public variables
  "function roleRegistry() view returns (address)",
  "function nextProjectId() view returns (uint)",
  "function getProjectCount() view returns (uint)",

  // Main functions
  "function proposeProject(address _contractor, string _name, string _projectType, string _description, string _location, string _completionDate) payable",
  "function getAllProjects() view returns (address[] memory)",

  // Expense fetcher (delegated)
  "function getProjectExpenses(uint _projectID) view returns (tuple(uint expenseID, uint amount, address contractor, string description, uint8 status)[])"
]
const projectABI = [
  // Public project info
  "function id() view returns (uint)",
  "function name() view returns (string)",
  "function projectType() view returns (string)",
  "function description() view returns (string)",
  "function location() view returns (string)",
  "function completionDate() view returns (string)",
  "function projectStatus() view returns (uint8)",   // enum ProjStat

  // Roles
  "function contractor() view returns (address)",
  "function roleRegistry() view returns (address)",

  // Funds
  "function projectTotalBudget() view returns (uint)",

  // Expense getters
  "function expenses(uint index) view returns (uint expenseID, uint amount, address contractor, string description, uint8 status)",
  "function nextExpenseId() view returns (uint)",
  "function getAllExpenses() view returns (tuple(uint expenseID, uint amount, address contractor, string description, uint8 status)[])",

  // Contractor actions
  "function proposeExpense(uint _amount, string _description)",
  "function withdrawExpense(uint _index)",

  // Government official actions
  "function approveExpense(uint _index)",
  "function rejectExpense(uint _index)",
  "function setProjectOngoing()",
  "function setProjectCompleted()"
]


const url = process.env.API_URL;
const provider = new ethers.JsonRpcProvider(url);
const proj_addr = process.env.CONTRACT_ADDRESS;

// Initialize contracts
export const projectC = new ethers.Contract(proj_addr, projectFactoryABI, provider);
//helper function to iterate each project contract 
export async function getProjectDetails(projectAddress) {
  const projectContract = new ethers.Contract(projectAddress, projectABI, provider);
  const [id, contractor, name, projectType, status, description, location, completionDate, budget] =
  await Promise.all([
    projectContract.id(),
    projectContract.contractor(),
    projectContract.name(),
    projectContract.projectType(),
    projectContract.projectStatus(),
    projectContract.description(),
    projectContract.location(),
    projectContract.completionDate(),
    projectContract.projectTotalBudget()
  ]);
  const statusMap = ['AWAITING', 'ONGOING', 'COMPLETED'];
  return {
    id: id.toString(), //need to convert to string because it treats it as a BigInt
    contractor,
    name,
    projectType,
    description,
    status: statusMap[Number(status)], //enum returns a number so we still have to map it here
    location,
    completionDate,
    budget: ethers.formatEther(budget)
  }
}