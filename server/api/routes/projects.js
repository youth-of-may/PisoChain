import express from 'express'
import { projectC, getProjectDetails } from '../utils/contract.js'

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all projects from blockchain...');
    const projectAddresses = await projectC.getAllProjects();
    console.log(`Received ${projectAddresses.length} projects from blockchain`);
    console.log('Projects:', projectAddresses);
    const projects = await Promise.all(
      projectAddresses.map(address => getProjectDetails(address))
    );
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;