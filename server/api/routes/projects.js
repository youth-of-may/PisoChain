import express from 'express'
import { projectC } from '../utils/contract'

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const projects = await projectC.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;