import express from 'express'
import { projectC } from '../utils/contract.js'

const router = express.Router({mergeParams: true});
router.get('/expenses', async (req, res) => {
  try {
    const projectID = req.params.id;
    console.log(`Getting expenses for ${projectID}`);
    const expenses = await projectC.getProjectExpenses(projectID); 
    console.log(`Received ${expenses.length} expenses`);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;