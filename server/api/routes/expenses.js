import express from 'express'
import { expenseC } from '../utils/contract'

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const expenses = await expenseC.getAllExpenses(); 
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;