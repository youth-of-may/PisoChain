import express from 'express'
import { projectC, getExpenses, projectABI, provider } from '../utils/contract.js'
import { ethers } from 'ethers';

const router = express.Router({mergeParams: true});

router.get('/:id/expenses', async (req, res) => {  
  try {
    const projectID = req.params.id;
    console.log(`Getting expenses for project ID: ${projectID}`);

    if (!projectID || projectID === 'undefined') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    
    const projectAddresses = await projectC.getAllProjects();
    
    let targetProjectAddress = null;
    for (const address of projectAddresses) {
      const projectContract = new ethers.Contract(address, projectABI, provider);
      const id = await projectContract.id();
      if (id.toString() === projectID) {
        targetProjectAddress = address;
        break;
      }
    }
    
    if (!targetProjectAddress) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const expenses = await getExpenses(targetProjectAddress);
    console.log(`Received ${expenses.length} expenses`);
    res.json(expenses);
  } catch (error) {
    console.error('Error in expenses route:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;