import express from 'express'
import { projectC, getExpenses, projectABI, provider } from '../utils/contract.js'
import { ethers } from 'ethers';
import { supabase } from '../utils/db.js';

const router = express.Router({mergeParams: true});

router.get('/sync/:id/expenses', async (req, res) => {  
  try {
    const projectID = req.params.id;
    console.log(`Getting expenses for project ID: ${projectID}`);

    // 1. Get the project address from the projectID
    const allProjects = await projectC.getAllProjects();
    const projectAddress = allProjects[projectID]; // Array index matches project ID
    
    if (!projectAddress) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // 2. Fetch expenses from blockchain
    const expenses = await getExpenses(projectAddress); // Fixed: was undefined
    
    // 3. Format for database
    const expensesData = expenses.map(exp => ({
      expense_id: parseInt(exp.expenseID),
      project_id: parseInt(projectID), // Use the projectID from params
      amount: exp.amount,
      contractor: exp.contractor,
      description: exp.description,
      status: exp.status
    }));

    // 4. Insert into Supabase
    const { data, error } = await supabase
      .from('expenses')
      .upsert(expensesData, { onConflict: 'project_id,expense_id' });

    if (error) throw error;

    res.json({
      success: true,
      expenses: expensesData
    });

  } catch (error) {
    console.error('Error syncing expenses:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get expenses from database
router.get('/:id/expenses', async (req, res) => {
  try {
    const projectID = req.params.id; // Fixed: was req.params.projectId
    
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('project_id', projectID); // Fixed: changed 'id' to 'project_id'

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/sync-all', async (req, res) => {
  try {
    // 1. Get all projects from database (which have project addresses)
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('id, project_address');

    if (projectError) throw projectError;

    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: 'No projects found. Sync projects first.' });
    }

    // 2. Fetch expenses for all projects in parallel
    const allExpensesData = [];
    
    await Promise.all(
      projects.map(async (project) => {
        try {
          const expenses = await getExpenses(project.project_address);
          
          const formattedExpenses = expenses.map(exp => ({
            expense_id: parseInt(exp.expenseID),
            project_id: parseInt(project.id),
            amount: exp.amount,
            contractor: exp.contractor,
            description: exp.description,
            status: exp.status
          }));
          
          allExpensesData.push(...formattedExpenses);
        } catch (err) {
          console.error(`Error fetching expenses for project ${project.id}:`, err);
        }
      })
    );

    // 3. Bulk insert into Supabase
    if (allExpensesData.length > 0) {
      const { data, error } = await supabase
        .from('expenses')
        .upsert(allExpensesData, { onConflict: 'project_id,expense_id' });

      if (error) throw error;
    }

    res.json({
      success: true,
      message: `Synced ${allExpensesData.length} expenses across ${projects.length} projects`,
      totalExpenses: allExpensesData.length
    });

  } catch (error) {
    console.error('Error syncing all expenses:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;