import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import projectRoutes from './api/routes/projects.js';
import expenseRoutes from './api/routes/expenses.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/projects', projectRoutes)
app.use('/projects', expenseRoutes)

app.listen(5000, () => console.log(`Server running on port 5000`));
