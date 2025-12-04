import express from 'express'
import { projectC, getProjectDetails } from '../utils/contract.js'
import { supabase } from '../utils/db.js';

const router = express.Router();

router.get('/sync', async (req, res) => {
  try {
    // 1. Fetch from blockchain
    const projectAddresses = await projectC.getAllProjects();
    
    // 2. Get details for each project
    const projectsData = await Promise.all(
      projectAddresses.map(async (address) => {
        const details = await getProjectDetails(address);
        return {
          id: parseInt(details.id),
          contractor: details.contractor,
          name: details.name,
          project_type: details.projectType,
          description: details.description,
          status: details.status,
          location: details.location,
          completion_date: details.completionDate,
          budget: details.budget,
          project_address: address
        };
      })
    );

    // 3. Insert into Supabase (upsert to avoid duplicates)
    const { data, error } = await supabase
      .from('projects')
      .upsert(projectsData, { onConflict: 'id' });

    if (error) throw error;

    res.json({
      success: true,
      message: `Synced ${projectsData.length} projects`,
      projects: projectsData
    });

  } catch (error) {
    console.error('Error syncing projects:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET all projects from database
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) { // Added this catch block
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;