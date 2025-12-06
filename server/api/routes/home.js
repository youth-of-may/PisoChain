import express from 'express'
import { supabase } from '../utils/db.js';

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        // Get all project budgets
        const { data: projects, error: projectError } = await supabase
            .from('projects')
            .select('budget');
        
        if (projectError) throw projectError;
        
        // Calculate total budget
        const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0) * 18800000000000;
        
        // Get project count
        const { count: numProjects, error: countError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true });
        
        if (countError) throw countError;
        
        // Get approved expenses
        const { data: expenses, error: expenseError } = await supabase
            .from('expenses')
            .select('amount')
            .eq('status', 'APPROVED');
        
        if (expenseError) throw expenseError;
        
        // Calculate total approved expenses
        const approvedExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0) * 18800000000000;
        
        res.json({
            totalBudget,
            numProjects,
            approvedExpenses
        });
        
    } catch(error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
})

export default router;