import { ethers } from 'ethers';
import 'dotenv/config';
import projectABI from './contracts/ProjectFactory.json' assert { type: 'json' };
import expenseABI from './contracts/Project.json' assert { type: 'json' };

const url = process.env.API_URL;
const provider = new ethers.JsonRpcProvider(url);
const proj_addr = process.env.CONTRACT_ADDRESS;

// Initialize contracts
export const projectC = new ethers.Contract(proj_addr, projectABI, provider);
export const expenseC = new ethers.Contract(proj_addr, expenseABI, provider);